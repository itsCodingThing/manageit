import { validator } from "hono/validator";
import { createResponse } from "@/utils/response";
import { parseAsync } from "@/utils/validation";
import { authAPI } from "@/services/auth";
import { hono } from "@/app/hono-factory";
import { prisma } from "@/database/db.connection";
import authValidators from "@/app/auth/validators";
import { ApiError } from "@/utils/error";

const auth = hono.createApp();

/**
 * @rotue   POST "/api/auth/sign-up"
 * @desc    register student/teacher
 */
auth.post(
	"/sign-up",
	validator(
		"json",
		async (value) => await parseAsync(authValidators.signUp, value),
	),
	async (ctx) => {
		const body = ctx.req.valid("json");

		const authenticate = await authAPI.signUpEmail({
			body: {
				type: body.type,
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
	validator(
		"json",
		async (value) => await parseAsync(authValidators.signIn, value),
	),
	async (ctx) => {
		const body = ctx.req.valid("json");

		if (body.loginMethod === "password") {
			const user = await authAPI.signInEmail({
				body: {
					email: body.email,
					password: body.password,
				},
			});

			return ctx.json(
				createResponse({
					data: { token: user.token, user: user.user },
				}),
			);
		}

		if (body.loginMethod === "contact") {
			await authAPI.sendPhoneNumberOTP({ body: { phoneNumber: body.contact } });

			return ctx.json(
				createResponse({
					msg: "otp send successfully",
				}),
			);
		}

		throw new ApiError({
			msg: "need valid login method",
		});
	},
);

/**
 * @rotue   POST "/api/auth/verify-otp
 * @desc    verify otp student/teacher
 */
auth.post(
	"/verify-otp",
	validator(
		"json",
		async (value) => await parseAsync(authValidators.verifyOtp, value),
	),
	async (ctx) => {
		const body = ctx.req.valid("json");

		const data = await authAPI.verifyPhoneNumber({
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
				data: { token: data.token, user: data.user },
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
	validator(
		"json",
		async (value) => await parseAsync(authValidators.adminSignUp, value),
	),
	async (ctx) => {
		const body = ctx.req.valid("json");

		const authenticate = await authAPI.signUpEmail({
			body: {
				type: "admin",
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
				data: { token: authenticate.token },
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
		async (value) => await parseAsync(authValidators.adminSignIn, value),
	),
	async (ctx) => {
		const body = ctx.req.valid("json");

		const authenticate = await authAPI.signInEmail({
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
