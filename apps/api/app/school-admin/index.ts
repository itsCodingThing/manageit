import { db } from "@/database/db";
import { teacherTable } from "@/database/schema";
import { authMiddleware } from "@/middleware/auth";
import { ApiError } from "@/utils/error";
import { createJsonResponse } from "@/utils/response";
import { zod } from "@/utils/validation";
import { betterAuthApi } from "@/services/auth";
import { eq } from "drizzle-orm";
import { Elysia } from "elysia";

const schoolAdmin = new Elysia({ prefix: "/api/school-admin" })
	.use(authMiddleware)
	.get(
		"/",
		async ({ query }) => {
			const schoolId = query.schoolId;

			let queryBuilder = db
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

			if (schoolId) {
				queryBuilder = queryBuilder.where(
					eq(teacherTable.schoolId, schoolId),
				) as typeof queryBuilder;
			}

			const schoolAdmins = await queryBuilder;

			const filtered = schoolAdmins.filter((teacher) =>
				teacher.roles?.some((role) =>
					["admin", "master_admin", "principal"].includes(role),
				),
			);

			return createJsonResponse({ data: filtered });
		},
		{
			query: zod.object({
				schoolId: zod.string().optional(),
			}),
		},
	)
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
				throw new ApiError({ msg: "school admin not found", code: 404 });
			}

			const hasAdminRole = teacher.roles?.some((role) =>
				["admin", "master_admin", "principal"].includes(role),
			);

			if (!hasAdminRole) {
				throw new ApiError({ msg: "user is not a school admin", code: 403 });
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
			const [existingTeacher] = await db
				.select({ id: teacherTable.id })
				.from(teacherTable)
				.where(eq(teacherTable.email, body.email));

			if (existingTeacher) {
				throw new ApiError({
					msg: "school admin email already exists",
					code: 400,
				});
			}

			const user = await betterAuthApi.signUpEmail({
				body: {
					name: body.name,
					email: body.email,
					password: body.password,
					phoneNumber: body.phoneNumber,
				},
			});

			const [newSchoolAdmin] = await db
				.insert(teacherTable)
				.values({
					userId: user.user.id,
					schoolId: body.schoolId,
					name: body.name,
					email: body.email,
					phoneNumber: body.phoneNumber,
					dob: body.dob ?? new Date(),
					image: body.image ?? "",
					address: body.address ?? "",
					roles: [body.role ?? "admin"],
					status: body.status ?? "pending",
				})
				.returning();

			return createJsonResponse({
				data: newSchoolAdmin,
				msg: "school admin created successfully",
			});
		},
		{
			body: zod.object({
				schoolId: zod.string("schoolId required"),
				name: zod.string("name required"),
				email: zod.email("email required"),
				phoneNumber: zod.string("phone required"),
				password: zod.string("password required").min(5),
				dob: zod.date().optional(),
				image: zod.string().optional(),
				address: zod.string().optional(),
				role: zod.enum(["admin", "master_admin", "principal"]).optional(),
				status: zod.literal(["active", "inactive", "pending"]).optional(),
			}),
		},
	)
	.put(
		"/:id",
		async ({ params, body }) => {
			const [existingTeacher] = await db
				.select({ id: teacherTable.id, roles: teacherTable.roles })
				.from(teacherTable)
				.where(eq(teacherTable.id, params.id));

			if (!existingTeacher) {
				throw new ApiError({ msg: "school admin not found", code: 404 });
			}

			const hasAdminRole = existingTeacher.roles?.some((role) =>
				["admin", "master_admin", "principal"].includes(role),
			);

			if (!hasAdminRole) {
				throw new ApiError({ msg: "user is not a school admin", code: 403 });
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

			const updateRoles = body.roles ?? existingTeacher.roles;
			const hasAdminRoleAfterUpdate = updateRoles?.some((role) =>
				["admin", "master_admin", "principal"].includes(role),
			);

			if (!hasAdminRoleAfterUpdate) {
				throw new ApiError({
					msg: "school admin must have admin, master_admin, or principal role",
					code: 400,
				});
			}

			const [updatedSchoolAdmin] = await db
				.update(teacherTable)
				.set({
					name: body.name,
					email: body.email,
					phoneNumber: body.phoneNumber,
					dob: body.dob,
					image: body.image,
					address: body.address,
					roles: body.roles,
					status: body.status,
				})
				.where(eq(teacherTable.id, params.id))
				.returning();

			return createJsonResponse({
				data: updatedSchoolAdmin,
				msg: "school admin updated successfully",
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
				dob: zod.date().optional(),
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
				.select({ id: teacherTable.id, roles: teacherTable.roles })
				.from(teacherTable)
				.where(eq(teacherTable.id, params.id));

			if (!existingTeacher) {
				throw new ApiError({ msg: "school admin not found", code: 404 });
			}

			const hasAdminRole = existingTeacher.roles?.some((role) =>
				["admin", "master_admin", "principal"].includes(role),
			);

			if (!hasAdminRole) {
				throw new ApiError({ msg: "user is not a school admin", code: 403 });
			}

			await db.delete(teacherTable).where(eq(teacherTable.id, params.id));
			return createJsonResponse({ msg: "school admin deleted successfully" });
		},
		{
			params: zod.object({
				id: zod.string("id required"),
			}),
		},
	);

export type SchoolAdminApiType = typeof schoolAdmin;
export default schoolAdmin;
