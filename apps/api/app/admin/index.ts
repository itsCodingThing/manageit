import { db } from "@/database/db";
import { adminTable, schoolTable, studentTable, teacherTable, batchTable } from "@/database/schema";
import { authMiddleware } from "@/middleware/auth";
import { ApiError } from "@/utils/error";
import { createJsonResponse } from "@/utils/response";
import { zod } from "@/utils/validation";
import { betterAuthApi } from "@/services/auth";
import { eq, sql } from "drizzle-orm";
import { Elysia } from "elysia";

const admin = new Elysia({ prefix: "/api/admin" })
	.use(authMiddleware)
	.get("/", async () => {
		const admins = await db
			.select({
				id: adminTable.id,
				name: adminTable.name,
				email: adminTable.email,
				phoneNumber: adminTable.phoneNumber,
				status: adminTable.status,
				createdAt: adminTable.createdAt,
				updatedAt: adminTable.updatedAt,
			})
			.from(adminTable);

		return createJsonResponse({ data: admins });
	})
	.get("/stats", async () => {
		const [totalAdmins] = await db
			.select({ count: sql<number>`count(*)` })
			.from(adminTable);

		const [totalSchools] = await db
			.select({ count: sql<number>`count(*)` })
			.from(schoolTable);

		const [totalStudents] = await db
			.select({ count: sql<number>`count(*)` })
			.from(studentTable);

		const [totalTeachers] = await db
			.select({ count: sql<number>`count(*)` })
			.from(teacherTable);

		const [totalBatches] = await db
			.select({ count: sql<number>`count(*)` })
			.from(batchTable);

		const schoolsByStatus = await db
			.select({
				status: schoolTable.status,
				count: sql<number>`count(*)`,
			})
			.from(schoolTable)
			.groupBy(schoolTable.status);

		const studentsByStatus = await db
			.select({
				status: studentTable.status,
				count: sql<number>`count(*)`,
			})
			.from(studentTable)
			.groupBy(studentTable.status);

		const teachersByStatus = await db
			.select({
				status: teacherTable.status,
				count: sql<number>`count(*)`,
			})
			.from(teacherTable)
			.groupBy(teacherTable.status);

		return createJsonResponse({
			data: {
				totalAdmins: Number(totalAdmins?.count ?? 0),
				totalSchools: Number(totalSchools?.count ?? 0),
				totalStudents: Number(totalStudents?.count ?? 0),
				totalTeachers: Number(totalTeachers?.count ?? 0),
				totalBatches: Number(totalBatches?.count ?? 0),
				schoolsByStatus,
				studentsByStatus,
				teachersByStatus,
			},
		});
	})
	.get(
		"/:id",
		async ({ params }) => {
			const [admin] = await db
				.select({
					id: adminTable.id,
					name: adminTable.name,
					email: adminTable.email,
					phoneNumber: adminTable.phoneNumber,
					status: adminTable.status,
					createdAt: adminTable.createdAt,
					updatedAt: adminTable.updatedAt,
				})
				.from(adminTable)
				.where(eq(adminTable.id, params.id));

			if (!admin) {
				throw new ApiError({ msg: "admin not found", code: 404 });
			}

			return createJsonResponse({ data: admin });
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
			const user = await betterAuthApi.signUpEmail({
				body: {
					name: body.name,
					email: body.email,
					password: body.password,
					phoneNumber: body.phoneNumber,
				},
			});

			const [newAdmin] = await db
				.insert(adminTable)
				.values({
					userId: user.user.id,
					name: body.name,
					email: body.email,
					phoneNumber: body.phoneNumber,
					status: body.status ?? "active",
				})
				.returning();

			return createJsonResponse({
				data: newAdmin,
				msg: "admin created successfully",
			});
		},
		{
			body: zod.object({
				name: zod.string("name required"),
				email: zod.email("email required"),
				password: zod.string("password required").min(5),
				phoneNumber: zod.string("phoneNumber required"),
				status: zod.literal(["active", "inactive"]).optional(),
			}),
		},
	)
	.put(
		"/:id",
		async ({ params, body }) => {
			const [existingAdmin] = await db
				.select({ id: adminTable.id })
				.from(adminTable)
				.where(eq(adminTable.id, params.id));

			if (!existingAdmin) {
				throw new ApiError({ msg: "admin not found", code: 404 });
			}

			const [updatedAdmin] = await db
				.update(adminTable)
				.set({
					name: body.name,
					email: body.email,
					phoneNumber: body.phoneNumber,
					status: body.status,
				})
				.where(eq(adminTable.id, params.id))
				.returning();

			return createJsonResponse({
				data: updatedAdmin,
				msg: "admin updated successfully",
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
				status: zod.literal(["active", "inactive", "pending"]).optional(),
			}),
		},
	)
	.delete(
		"/:id",
		async ({ params }) => {
			const [existingAdmin] = await db
				.select({ id: adminTable.id })
				.from(adminTable)
				.where(eq(adminTable.id, params.id));

			if (!existingAdmin) {
				throw new ApiError({ msg: "admin not found", code: 404 });
			}

			await db.delete(adminTable).where(eq(adminTable.id, params.id));
			return createJsonResponse({ msg: "admin deleted successfully" });
		},
		{
			params: zod.object({
				id: zod.string("id required"),
			}),
		},
	);

export type AdminApiType = typeof admin;
export default admin;
