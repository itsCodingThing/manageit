import { eq } from "drizzle-orm";
import { Elysia } from "elysia";
import { db } from "@/database/db";
import { ApiError } from "@/utils/error";
import { zod } from "@/utils/validation";
import { betterAuthApi } from "@/services/auth";
import { studentTable } from "@/database/schema";
import { authMiddleware } from "@/middleware/auth";
import { createJsonResponse } from "@/utils/response";
import { checkSubscriptionLimit } from "@/database/helpers/subscription";

const student = new Elysia({ prefix: "/api/student" })
	.use(authMiddleware)
	.get("/", async () => {
		const students = await db
			.select({
				id: studentTable.id,
				userId: studentTable.userId,
				schoolId: studentTable.schoolId,
				name: studentTable.name,
				dob: studentTable.dob,
				email: studentTable.email,
				phoneNumber: studentTable.phoneNumber,
				image: studentTable.image,
				address: studentTable.address,
				batchIds: studentTable.batchIds,
				status: studentTable.status,
				createdAt: studentTable.createdAt,
				updatedAt: studentTable.updatedAt,
			})
			.from(studentTable);

		return createJsonResponse({ data: students });
	})
	.get(
		"/:id",
		async ({ params }) => {
			const [student] = await db
				.select({
					id: studentTable.id,
					userId: studentTable.userId,
					schoolId: studentTable.schoolId,
					name: studentTable.name,
					dob: studentTable.dob,
					email: studentTable.email,
					phoneNumber: studentTable.phoneNumber,
					image: studentTable.image,
					address: studentTable.address,
					batchIds: studentTable.batchIds,
					status: studentTable.status,
					createdAt: studentTable.createdAt,
					updatedAt: studentTable.updatedAt,
				})
				.from(studentTable)
				.where(eq(studentTable.id, params.id));

			if (!student) {
				throw new ApiError({ msg: "student not found", code: 404 });
			}

			return createJsonResponse({ data: student });
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
			await checkSubscriptionLimit(body.schoolId, "student");

			const [existingStudent] = await db
				.select({ id: studentTable.id })
				.from(studentTable)
				.where(eq(studentTable.email, body.email));

			if (existingStudent) {
				throw new ApiError({ msg: "student email already exists", code: 400 });
			}

			const user = await betterAuthApi.signUpEmail({
				body: {
					name: body.name,
					email: body.email,
					password: body.password,
					phoneNumber: body.phoneNumber,
				},
			});

			const [newStudent] = await db
				.insert(studentTable)
				.values({
					userId: user.user.id,
					schoolId: body.schoolId,
					name: body.name,
					email: body.email,
					phoneNumber: body.phoneNumber,
					dob: body.dob ?? new Date(),
					image: body.image ?? "",
					address: body.address ?? "",
					batchIds: body.batchIds ?? [],
					status: body.status ?? "pending",
				})
				.returning();

			return createJsonResponse({
				data: newStudent,
				msg: "student created successfully",
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
				batchIds: zod.array(zod.string()).optional(),
				status: zod.literal(["active", "inactive", "pending"]).optional(),
			}),
		},
	)
	.put(
		"/:id",
		async ({ params, body }) => {
			const [existingStudent] = await db
				.select({ id: studentTable.id })
				.from(studentTable)
				.where(eq(studentTable.id, params.id));

			if (!existingStudent) {
				throw new ApiError({ msg: "student not found", code: 404 });
			}

			if (body.email) {
				const [existingEmail] = await db
					.select({ id: studentTable.id })
					.from(studentTable)
					.where(eq(studentTable.email, body.email));

				if (existingEmail && existingEmail.id !== params.id) {
					throw new ApiError({ msg: "email already exists", code: 400 });
				}
			}

			const [updatedStudent] = await db
				.update(studentTable)
				.set({
					name: body.name,
					email: body.email,
					phoneNumber: body.phoneNumber,
					dob: body.dob,
					image: body.image,
					address: body.address,
					batchIds: body.batchIds,
					status: body.status,
				})
				.where(eq(studentTable.id, params.id))
				.returning();

			return createJsonResponse({
				data: updatedStudent,
				msg: "student updated successfully",
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
				batchIds: zod.array(zod.string()).optional(),
				status: zod.literal(["active", "inactive", "pending"]).optional(),
			}),
		},
	)
	.delete(
		"/:id",
		async ({ params }) => {
			const [existingStudent] = await db
				.select({ id: studentTable.id })
				.from(studentTable)
				.where(eq(studentTable.id, params.id));

			if (!existingStudent) {
				throw new ApiError({ msg: "student not found", code: 404 });
			}

			await db.delete(studentTable).where(eq(studentTable.id, params.id));
			return createJsonResponse({ msg: "student deleted successfully" });
		},
		{
			params: zod.object({
				id: zod.string("id required"),
			}),
		},
	);

export type StudentApiType = typeof student;
export default student;
