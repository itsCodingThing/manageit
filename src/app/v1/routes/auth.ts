import type { FastifyPluginAsync } from "fastify";

import { compareHashPassword, encryptPassword } from "project/utils/encrypt";
import { createToken, verifyJWT, removeOldTokens } from "project/services/jwt";
import {
	sendJsonResponse,
	sendSuccessResponse,
} from "project/utils/server-response";
import { parseAsync, zod } from "project/utils/validation";
import { prisma } from "project/database/db";
import { sendOTP } from "project/services/otp";
import { scheduler } from "project/services/scheduler";
import { ApiError } from "project/utils/error";

export const authRoutes: FastifyPluginAsync = async (fastify) => {
	/**
	 * @rotue   POST "/api/v1/auth/register"
	 * @desc    Register users
	 */
	fastify.route({
		method: "POST",
		url: "/auth/register",
		handler: async (req, res) => {
			const body = await parseAsync(
				zod.object({
					type: zod.union([
						zod.literal("admin"),
						zod.literal("student"),
						zod.literal("teacher"),
					]),
					email: zod.string(),
					password: zod.string(),
					name: zod.string().optional(),
					contact: zod.string().optional(),
				}),
				req.body,
			);

			const user = await prisma.authUser.findFirst({
				where: { email: body.email },
			});
			if (user) {
				throw new ApiError({ msg: "Email already register with us" });
			}

			const result = await prisma.$transaction(async (tx) => {
				let userId = 0;

				if (body.type === "admin") {
					const newUser = await tx.adminUser.create({
						data: {
							email: body.email,
							name: body.name ?? "",
							contact: body.contact ?? "",
						},
					});
					userId = newUser.id;
				}

				if (body.type === "student") {
					const newUser = await tx.student.create({
						data: {
							email: body.email,
							name: body.name ?? "",
							contact: body.contact ?? "",
							school_id: 0,
							address: "",
						},
					});
					userId = newUser.id;
				}

				if (body.type === "teacher") {
					const newUser = await tx.teacher.create({
						data: {
							email: body.email,
							name: body.name ?? "",
							contact: body.contact ?? "",
							school_id: 0,
							address: "",
						},
					});
					userId = newUser.id;
				}

				return await tx.authUser.create({
					data: {
						type: body.type,
						user_id: userId,
						email: body.email,
						password: encryptPassword(body.password),
					},
				});
			});

			return sendJsonResponse(res, {
				data: result,
			});
		},
	});

	/**
	 * @rotue   POST "/api/v1/auth/login
	 * @desc    Login user
	 */
	fastify.route({
		method: "POST",
		url: "/auth/login",
		handler: async (req, res) => {
			const body = await parseAsync(
				zod.object({
					type: zod.union([
						zod.literal("admin"),
						zod.literal("student"),
						zod.literal("teacher"),
					]),
					email: zod.string().email("enter a valid email"),
					password: zod
						.string()
						.min(8, "please enter password min 8 charactor long"),
				}),
				req.body,
			);

			const user = await prisma.authUser.findFirst({
				where: { email: body.email, type: body.type },
			});
			if (!user) {
				throw new ApiError({ msg: "Email already register with us" });
			}

			if (!compareHashPassword(body.password, user.password)) {
				throw new ApiError({ msg: "invalid password" });
			}

			// if user is admin then we create token and return the response
			if (body.type === "admin") {
				const { opaqueToken, refreshToken } = await createToken({
					userId: user.id.toString(),
					userType: body.type,
				});

				return sendJsonResponse(res, {
					data: { token: opaqueToken, refreshToken },
					msg: "successfully logged in",
				});
			}

			// for other users otp authentication needed
			const otp = await sendOTP("0123456789");
			const otpAuth = await prisma.userOTP.upsert({
				where: {
					user_id: user.id,
				},
				update: {
					otp: otp,
				},
				create: {
					user_id: user.id,
					otp: otp,
				},
			});
			await scheduler.scheduleRemoveOTP(otpAuth.id.toString());

			return sendJsonResponse(res, { data: { id: user.id, otp } });
		},
	});

	/**
	 * @rotue   POST "/api/v1/auth/verify
	 * @desc    verify otp for user
	 */
	fastify.route({
		method: "POST",
		url: "/auth/verify",
		handler: async (req, res) => {
			const body = await parseAsync(
				zod.object({
					type: zod.union([zod.literal("student"), zod.literal("teacher")]),
					id: zod.string(),
					otp: zod.string(),
				}),
				req.body,
			);

			const otpData = await prisma.userOTP.findFirst({
				where: { user_id: Number(body.id) },
			});
			if (!otpData) {
				throw new ApiError({ msg: "no otp available" });
			}

			if (otpData.otp !== body.otp) {
				throw new ApiError({ msg: "invalid otp" });
			}

			await prisma.userOTP.update({
				where: { user_id: Number(body.id) },
				data: { otp: "" },
			});

			const { opaqueToken, refreshToken } = await createToken({
				userId: body.id.toString(),
				userType: body.type,
			});

			return sendSuccessResponse({
				response: res,
				data: { token: opaqueToken, refreshToken },
			});
		},
	});

	/**
	 * @rotue   POST "/api/v1/auth/refresh
	 * @desc    refresh user token
	 */
	fastify.route({
		method: "POST",
		url: "/auth/refresh",
		handler: async (req, res) => {
			const body = await parseAsync(
				zod.object({
					refreshToken: zod.string(),
				}),
				req.body,
			);

			const payload = verifyJWT(body.refreshToken);

			await removeOldTokens(body.refreshToken);

			const tokens = await createToken({
				userId: payload.id,
				userType: payload.type,
			});

			return sendJsonResponse(res, {
				data: { token: tokens.opaqueToken, refreshToken: tokens.refreshToken },
			});
		},
	});
};
