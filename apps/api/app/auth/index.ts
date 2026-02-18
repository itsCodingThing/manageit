import { db } from "@/database/db";
import { schoolTable, studentTable, teacherTable } from "@/database/schema";
import { betterAuthApi } from "@/services/auth";
import { ApiError } from "@/utils/error";
import { createJsonResponse } from "@/utils/response";
import { zod } from "@/utils/validation";
import { eq } from "drizzle-orm";
import { Elysia } from "elysia";

const auth = new Elysia({ prefix: "/api/auth" })
	.post(
		"/sign-up",
		async ({ body }) => {
			const [school] = await db
				.select({ id: schoolTable.id })
				.from(schoolTable)
				.where(eq(schoolTable.schoolCode, body.schoolCode));

			if (!school) {
				throw new ApiError({ msg: "invalid school code" });
			}

			const authenticate = await betterAuthApi.signUpEmail({
				body: {
					name: body.name,
					email: body.email,
					password: body.password,
					phoneNumber: body.phoneNumber,
				},
			});

			if (body.type === "student") {
				await db.insert(studentTable).values({
					name: body.name,
					email: body.email,
					phoneNumber: body.phoneNumber,
					userId: authenticate.user.id,
					schoolId: school.id,
				});
			}

			if (body.type === "teacher") {
				await db.insert(teacherTable).values({
					name: body.name,
					email: body.email,
					phoneNumber: body.phoneNumber,
					userId: authenticate.user.id,
					schoolId: school.id,
				});
			}

			return createJsonResponse({
				data: { token: authenticate.token },
			});
		},
		{
			body: zod.object({
				type: zod.literal(["teacher", "student"], "need valid user type"),
				email: zod.email("email required"),
				password: zod
					.string("password required")
					.min(5, "password minimum length should be 5"),
				name: zod.string("name required").min(1, "need name field"),
				phoneNumber: zod
					.string("phoneNumber required")
					.length(10, "invalid contact"),
				schoolCode: zod
					.string("school code required")
					.min(1, "invalid school code"),
			}),
		},
	)
	.post(
		"/sign-in",
		async ({ body }) => {
			if (body.loginMethod === "email") {
				const authenticate = await betterAuthApi.signInEmail({
					body: { email: body.email, password: body.password },
				});

				return createJsonResponse({
					data: { token: authenticate.token },
				});
			}

			if (body.loginMethod === "contact") {
				// TODO: Implement contact-based authentication
				// For now, return a mock response
				return createJsonResponse({
					data: { token: "mock-contact-token" },
				});
			}
		},
		{
			body: zod.discriminatedUnion(
				"loginMethod",
				[
					zod.object({
						loginMethod: zod.literal("email", "required login method"),
						type: zod.literal(["teacher", "student"], "required user type"),
						email: zod.email("email required"),
						password: zod
							.string("password required")
							.min(5, "password minimum length should be 5"),
					}),
					zod.object({
						loginMethod: zod.literal("contact", "required login method"),
						type: zod.literal(["teacher", "student"], "required user type"),
						contact: zod
							.string("contact required")
							.length(10, "invalid contact"),
					}),
				],
				"required valid login type",
			),
		},
	)
	.post(
		"/admin/sign-in",
		async ({ body }) => {
			const authenticate = await betterAuthApi.signInEmail({
				body: { email: body.email, password: body.password },
			});

			return createJsonResponse({
				data: { token: authenticate.token },
			});
		},
		{
			body: zod.object({
				email: zod.email("required email"),
				password: zod.string("required password"),
			}),
		},
	);

export type AuthApiType = typeof auth;
export default auth;
