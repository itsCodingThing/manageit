import { validator } from "hono/validator";
import { ApiError } from "@/utils/error";
import { betterAuthApi } from "@/services/auth";
import { hono } from "@/app/hono-factory";
import Messages from "@/constants/messages";
import { createResponse } from "@/utils/response";
import { parseAsync, zod } from "@/utils/validation";
import { prisma } from "@/database/db.connection";

const auth = hono.createApp();

/**
 * @rotue   POST "/api/auth/sign-up"
 * @desc    register student/teacher
 */
auth.post(
	"/sign-up",
	validator("json", async (value) => {
		return await parseAsync(
			zod.object({
				type: zod.literal(["teacher", "student"]),
				email: zod.email(),
				password: zod.string().min(5),
				name: zod.string().default(() => new Date().toUTCString()),
				contact: zod.string().length(10),
			}),
			value,
		);
	}),
	async (ctx) => {
		const body = ctx.req.valid("json");

		const authenticate = await betterAuthApi.signUpEmail({
			body: {
				name: body.name,
				email: body.email,
				password: body.password,
				phoneNumber: body.contact,
			},
		});

		return ctx.json(
			createResponse({
				data: { token: authenticate.token },
			}),
		);
	},
);

/**
 * @rotue   POST "/api/auth/sign-in
 * @desc    login student/teacher
 */
auth.post(
	"/sign-in",
	validator("json", async (value) => {
		return await parseAsync(
			zod.discriminatedUnion("loginMethod", [
				zod.object({
					loginMethod: zod.literal("contact"),
					type: zod.literal(["teacher", "student"]),
					contact: zod.string().length(10),
				}),
				zod.object({
					loginMethod: zod.literal("password"),
					type: zod.literal(["teacher", "student"]),
					email: zod.email(),
					password: zod.string(),
				}),
			]),
			value,
		);
	}),
	async (ctx) => {
		const body = ctx.req.valid("json");

		if (body.loginMethod === "password") {
			const user = await betterAuthApi.signInEmail({
				body: {
					email: body.email,
					password: body.password,
				},
			});

			return ctx.json(
				createResponse({
					msg: Messages.SUCCESS.AUTH_LOGIN_SUCCESS.message,
					data: { token: user.token, user: user.user },
				}),
			);
		}

		if (body.loginMethod === "contact") {
			await betterAuthApi.sendPhoneNumberOTP({
				body: { phoneNumber: body.contact },
			});

			return ctx.json(
				createResponse({
					msg: Messages.SUCCESS.AUTH_OTP_SENT.message,
				}),
			);
		}

		throw new ApiError({
			msg: Messages.ERROR.INVALID_LOGIN_METHOD.message,
		});
	},
);

/**
 * @rotue   POST "/api/auth/verify-otp
 * @desc    verify otp student/teacher
 */
auth.post(
	"/verify-otp",
	validator("json", async (value) => {
		return await parseAsync(
			zod.object({
				contact: zod.string(),
				otp: zod.string(),
			}),
			value,
		);
	}),
	async (ctx) => {
		const body = ctx.req.valid("json");

		const data = await betterAuthApi.verifyPhoneNumber({
			body: {
				phoneNumber: body.contact,
				code: body.otp,
			},
		});

		if (!data.status) {
			throw new ApiError({
				msg: "invalid otp",
			});
		}

		return ctx.json(
			createResponse({
				data: { token: data.token, user: { id: data.user.id } },
			}),
		);
	},
);

/**
 * @rotue   POST "/api/auth/admin/sign-up"
 * @desc    register admin
 */
auth.post(
	"/admin/sign-up",
	validator("json", async (value) => {
		return await parseAsync(
			zod.object({
				email: zod.email(),
				password: zod.string().min(5),
				name: zod.string().min(1),
				phoneNumber: zod.string().length(10),
			}),
			value,
		);
	}),
	async (ctx) => {
		const body = ctx.req.valid("json");

		const result = await betterAuthApi.signUpEmail({
			body: {
				name: body.name,
				email: body.email,
				password: body.password,
				phoneNumber: body.phoneNumber,
			},
		});

		await prisma.admin.create({
			data: {
				name: body.name,
				email: body.email,
				phoneNumber: body.phoneNumber,
			},
		});

		return ctx.json(
			createResponse({
				msg: Messages.SUCCESS.USER_CREATED.message,
				data: { token: result.token, user: { id: result.user.id } },
			}),
		);
	},
);

/**
 * @rotue   POST "/api/auth/admin/sign-in"
 * @desc    login admin
 */
auth.post(
	"/admin/sign-in",
	validator(
		"json",
		async (value) =>
			await parseAsync(
				zod.object({
					email: zod.email(),
					password: zod.string(),
				}),
				value,
			),
	),
	async (ctx) => {
		const body = ctx.req.valid("json");

		const authenticate = await betterAuthApi.signInEmail({
			body: {
				email: body.email,
				password: body.password,
			},
		});

		return ctx.json(
			createResponse({
				data: { token: authenticate.token },
			}),
		);
	},
);

export type AuthApiType = typeof auth;
export default auth;
