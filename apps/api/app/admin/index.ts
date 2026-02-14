import { db } from "@/database/db";
import { adminTable } from "@/database/schema";
import { authMiddleware } from "@/middleware/auth";
import { ApiError } from "@/utils/error";
import { createJsonResponse } from "@/utils/response";
import { zod } from "@/utils/validation";
import { eq } from "drizzle-orm";
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
			const [newAdmin] = await db
				.insert(adminTable)
				.values({
					userId: body.userId,
					name: body.name,
					email: body.email,
					phoneNumber: body.phoneNumber,
					status: body.status ?? "pending",
				})
				.returning();

			return createJsonResponse({
				data: newAdmin,
				msg: "admin created successfully",
			});
		},
		{
			body: zod.object({
				userId: zod.string("userId required"),
				name: zod.string("name required"),
				email: zod.email("email required"),
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
