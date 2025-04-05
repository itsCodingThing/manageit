import type { FastifyPluginAsync } from "fastify";

import { compareHashPassword, encryptPassword } from "project/utils/encrypt";
import { generateJWT } from "project/utils/jwt";
import {
	sendErrorResponse,
	sendSuccessResponse,
} from "project/utils/server-response";
import { parseAsync, zod } from "project/utils/validation";
import { prisma } from "project/database/db";
import { sendOTP } from "project/services/otp";
import { scheduler } from "project/services/scheduler";

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
				return sendErrorResponse({
					msg: "Email already register with us",
					response: res,
				});
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

			return sendSuccessResponse({
				data: result,
				response: res,
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
				return sendErrorResponse({
					msg: "Email already register with us",
					response: res,
				});
			}

			if (!compareHashPassword(body.password, user.password)) {
				return sendErrorResponse({ msg: "Invalid password", response: res });
			}

			if (body.type === "admin") {
				const jwt = generateJWT({ id: user.id.toString(), type: body.type });
				return sendSuccessResponse({ response: res, data: jwt });
			}

			// for other users otp authentication need
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

			return sendSuccessResponse({ response: res, data: { id: user.id, otp } });
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
					type: zod.union([
						zod.literal("admin"),
						zod.literal("student"),
						zod.literal("teacher"),
					]),
					id: zod.string(),
					otp: zod.string(),
				}),
				req.body,
			);

			const otpData = await prisma.userOTP.findFirst({
				where: { user_id: Number(body.id) },
			});
			if (!otpData) {
				return sendErrorResponse({ msg: "invalid otp", response: res });
			}

			if (otpData.otp !== body.otp) {
				return sendErrorResponse({ msg: "invalid otp", response: res });
			}

			await prisma.userOTP.update({
				where: { user_id: Number(body.id) },
				data: { otp: "" },
			});

			const jwt = generateJWT({ id: body.id.toString(), type: body.type });
			return sendSuccessResponse({ response: res, data: jwt });
		},
	});
};
