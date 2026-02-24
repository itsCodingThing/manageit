import { db } from "@/database/db";
import { teacherTable } from "@/database/schema";
import { authMiddleware } from "@/middleware/auth";
import { checkSubscriptionLimit } from "@/services/subscription";
import { ApiError } from "@/utils/error";
import { createJsonResponse } from "@/utils/response";
import { zod } from "@/utils/validation";
import { betterAuthApi } from "@/services/auth";
import { eq } from "drizzle-orm";
import { Elysia } from "elysia";

const teacher = new Elysia({ prefix: "/api/teacher" })
	.use(authMiddleware)
	.get("/", async () => {
		const teachers = await db
			.select({
				id: teacherTable.id,
				userId: teacherTable.userId,
				schoolId: teacherTable.schoolId,
				name: teacherTable.name,
				dob: teacherTable.dob,
				email: teacherTable.email,
				phoneNumber: teacherTable.phoneNumber,
				image: teacherTable.image,
				address: teacherTable.address,
				roles: teacherTable.roles,
				batchIds: teacherTable.batchIds,
				status: teacherTable.status,
				createdAt: teacherTable.createdAt,
				updatedAt: teacherTable.updatedAt,
			})
			.from(teacherTable);

		return createJsonResponse({ data: teachers });
	})
	.get(
		"/:id",
		async ({ params }) => {
			const [teacher] = await db
				.select({
					id: teacherTable.id,
					userId: teacherTable.userId,
					schoolId: teacherTable.schoolId,
					name: teacherTable.name,
					dob: teacherTable.dob,
					email: teacherTable.email,
					phoneNumber: teacherTable.phoneNumber,
					image: teacherTable.image,
					address: teacherTable.address,
					roles: teacherTable.roles,
					batchIds: teacherTable.batchIds,
					status: teacherTable.status,
					createdAt: teacherTable.createdAt,
					updatedAt: teacherTable.updatedAt,
				})
				.from(teacherTable)
				.where(eq(teacherTable.id, params.id));

			if (!teacher) {
				throw new ApiError({ msg: "teacher not found", code: 404 });
			}

			return createJsonResponse({ data: teacher });
		},
		{
			params: zod.object({
				id: zod.string("id required"),
			}),
		},
	)
	.post(
		"/",
		async ({ body }) => {
			await checkSubscriptionLimit(body.schoolId, "teacher");

			const [existingTeacher] = await db
				.select({ id: teacherTable.id })
				.from(teacherTable)
				.where(eq(teacherTable.email, body.email));

			if (existingTeacher) {
				throw new ApiError({ msg: "teacher email already exists", code: 400 });
			}

			const user = await betterAuthApi.signUpEmail({
				body: {
					name: body.name,
					email: body.email,
					password: body.password,
					phoneNumber: body.phoneNumber,
				},
			});

			const [newTeacher] = await db
				.insert(teacherTable)
				.values({
					userId: user.user.id,
					schoolId: body.schoolId,
					name: body.name,
					email: body.email,
					phoneNumber: body.phoneNumber,
					image: body.image ?? "",
					address: body.address ?? "",
					roles: body.roles ?? ["teacher"],
					status: body.status ?? "pending",
				})
				.returning();

			return createJsonResponse({
				data: newTeacher,
				msg: "teacher created successfully",
			});
		},
		{
			body: zod.object({
				schoolId: zod.string("schoolId required"),
				name: zod.string("name required"),
				email: zod.email("email required"),
				phoneNumber: zod.string("phone required"),
				password: zod.string("password required").min(5),
				image: zod.string().optional(),
				address: zod.string().optional(),
				roles: zod.array(zod.enum(["teacher", "school_admin"])).optional(),
				status: zod.literal(["active", "inactive", "pending"]).optional(),
			}),
		},
	)
	.put(
		"/:id",
		async ({ params, body }) => {
			const [existingTeacher] = await db
				.select({ id: teacherTable.id })
				.from(teacherTable)
				.where(eq(teacherTable.id, params.id));

			if (!existingTeacher) {
				throw new ApiError({ msg: "teacher not found", code: 404 });
			}

			if (body.email) {
				const [existingEmail] = await db
					.select({ id: teacherTable.id })
					.from(teacherTable)
					.where(eq(teacherTable.email, body.email));

				if (existingEmail && existingEmail.id !== params.id) {
					throw new ApiError({ msg: "email already exists", code: 400 });
				}
			}

			const [updatedTeacher] = await db
				.update(teacherTable)
				.set({
					name: body.name,
					email: body.email,
					phoneNumber: body.phoneNumber,
					image: body.image,
					address: body.address,
					roles: body.roles,
					status: body.status,
				})
				.where(eq(teacherTable.id, params.id))
				.returning();

			return createJsonResponse({
				data: updatedTeacher,
				msg: "teacher updated successfully",
			});
		},
		{
			params: zod.object({
				id: zod.string("id required"),
			}),
			body: zod.object({
				name: zod.string().optional(),
				email: zod.email().optional(),
				phoneNumber: zod.string().optional(),
				image: zod.string().optional(),
				address: zod.string().optional(),
				roles: zod
					.array(zod.enum(["teacher", "admin", "principal", "master_admin"]))
					.optional(),
				status: zod.literal(["active", "inactive", "pending"]).optional(),
			}),
		},
	)
	.delete(
		"/:id",
		async ({ params }) => {
			const [existingTeacher] = await db
				.select({ id: teacherTable.id })
				.from(teacherTable)
				.where(eq(teacherTable.id, params.id));

			if (!existingTeacher) {
				throw new ApiError({ msg: "teacher not found", code: 404 });
			}

			await db.delete(teacherTable).where(eq(teacherTable.id, params.id));
			return createJsonResponse({ msg: "teacher deleted successfully" });
		},
		{
			params: zod.object({
				id: zod.string("id required"),
			}),
		},
	);

export type TeacherApiType = typeof teacher;
export default teacher;
