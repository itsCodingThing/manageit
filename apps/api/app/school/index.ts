import { db } from "@/database/db";
import {
	schoolTable,
	teacherTable,
	studentTable,
	batchTable,
} from "@/database/schema";
import { authMiddleware } from "@/middleware/auth";
import { ApiError } from "@/utils/error";
import { createJsonResponse } from "@/utils/response";
import { zod } from "@/utils/validation";
import { betterAuthApi } from "@/services/auth";
import { eq, sql } from "drizzle-orm";
import { Elysia } from "elysia";

const school = new Elysia({ prefix: "/api/school" })
	.use(authMiddleware)
	.get("/", async () => {
		const schools = await db
			.select({
				id: schoolTable.id,
				schoolCode: schoolTable.schoolCode,
				name: schoolTable.name,
				email: schoolTable.email,
				phone: schoolTable.phone,
				address: schoolTable.address,
				city: schoolTable.city,
				state: schoolTable.state,
				country: schoolTable.country,
				postalCode: schoolTable.postalCode,
				logo: schoolTable.logo,
				website: schoolTable.website,
				description: schoolTable.description,
				establishedYear: schoolTable.establishedYear,
				board: schoolTable.board,
				status: schoolTable.status,
				maxStudents: schoolTable.maxStudents,
				currentStudents: schoolTable.currentStudents,
				maxTeachers: schoolTable.maxTeachers,
				currentTeachers: schoolTable.currentTeachers,
				accreditation: schoolTable.accreditation,
				facilities: schoolTable.facilities,
				createdAt: schoolTable.createdAt,
				updatedAt: schoolTable.updatedAt,
			})
			.from(schoolTable);

		return createJsonResponse({ data: schools });
	})
	.get("/stats", async () => {
		const [totalSchools] = await db
			.select({ count: sql<number>`count(*)` })
			.from(schoolTable);

		const totalStudentsResult = await db
			.select({
				schoolId: studentTable.schoolId,
				count: sql<number>`count(*)`,
			})
			.from(studentTable)
			.groupBy(studentTable.schoolId);

		const totalStudents = totalStudentsResult.reduce(
			(acc, row) => acc + Number(row.count),
			0,
		);

		const totalTeachersResult = await db
			.select({
				schoolId: teacherTable.schoolId,
				count: sql<number>`count(*)`,
			})
			.from(teacherTable)
			.groupBy(teacherTable.schoolId);

		const totalTeachers = totalTeachersResult.reduce(
			(acc, row) => acc + Number(row.count),
			0,
		);

		const totalBatchesResult = await db
			.select({
				schoolId: batchTable.schoolId,
				count: sql<number>`count(*)`,
			})
			.from(batchTable)
			.groupBy(batchTable.schoolId);

		const totalBatches = totalBatchesResult.reduce(
			(acc, row) => acc + Number(row.count),
			0,
		);

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
				totalSchools: Number(totalSchools?.count ?? 0),
				totalStudents,
				totalTeachers,
				totalBatches,
				schoolsByStatus,
				studentsByStatus,
				teachersByStatus,
			},
		});
	})
	.get(
		"/:id",
		async ({ params }) => {
			const [school] = await db
				.select({
					id: schoolTable.id,
					schoolCode: schoolTable.schoolCode,
					name: schoolTable.name,
					email: schoolTable.email,
					phone: schoolTable.phone,
					address: schoolTable.address,
					city: schoolTable.city,
					state: schoolTable.state,
					country: schoolTable.country,
					postalCode: schoolTable.postalCode,
					logo: schoolTable.logo,
					website: schoolTable.website,
					description: schoolTable.description,
					establishedYear: schoolTable.establishedYear,
					board: schoolTable.board,
					status: schoolTable.status,
					maxStudents: schoolTable.maxStudents,
					currentStudents: schoolTable.currentStudents,
					maxTeachers: schoolTable.maxTeachers,
					currentTeachers: schoolTable.currentTeachers,
					accreditation: schoolTable.accreditation,
					facilities: schoolTable.facilities,
					createdAt: schoolTable.createdAt,
					updatedAt: schoolTable.updatedAt,
				})
				.from(schoolTable)
				.where(eq(schoolTable.id, params.id));

			if (!school) {
				throw new ApiError({ msg: "school not found", code: 404 });
			}

			return createJsonResponse({ data: school });
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
			const [existingSchool] = await db
				.select({ id: schoolTable.id })
				.from(schoolTable)
				.where(eq(schoolTable.schoolCode, body.schoolCode));

			if (existingSchool) {
				throw new ApiError({ msg: "school code already exists", code: 400 });
			}

			const [existingEmail] = await db
				.select({ id: schoolTable.id })
				.from(schoolTable)
				.where(eq(schoolTable.email, body.email));

			if (existingEmail) {
				throw new ApiError({ msg: "email already exists", code: 400 });
			}

			const [newSchool] = await db
				.insert(schoolTable)
				.values({
					schoolCode: body.schoolCode,
					name: body.name,
					email: body.email,
					phone: body.phone,
					address: body.address,
					city: body.city,
					state: body.state,
					country: body.country,
					postalCode: body.postalCode,
					logo: body.logo,
					website: body.website,
					description: body.description,
					establishedYear: body.establishedYear,
					board: body.board,
					status: body.status ?? "active",
					maxStudents: body.maxStudents,
					maxTeachers: body.maxTeachers,
					accreditation: body.accreditation,
					facilities: body.facilities,
				})
				.returning();

			const user = await betterAuthApi.signUpEmail({
				body: {
					name: body.adminName,
					email: body.adminEmail,
					password: body.adminPassword,
					phoneNumber: body.adminPhone,
				},
			});

			await db.insert(teacherTable).values({
				userId: user.user.id,
				schoolId: newSchool.id,
				name: body.adminName,
				email: body.adminEmail,
				phoneNumber: body.adminPhone,
				roles: ["admin"],
				status: "active",
			});

			return createJsonResponse({
				data: newSchool,
				msg: "school created successfully with admin teacher",
			});
		},
		{
			body: zod.object({
				schoolCode: zod.string("schoolCode required"),
				name: zod.string("name required"),
				email: zod.email("email required"),
				phone: zod.string("phone required"),
				address: zod.string("address required"),
				city: zod.string("city required"),
				state: zod.string("state required"),
				country: zod.string("country required"),
				postalCode: zod.string("postalCode required"),
				logo: zod.string().optional(),
				website: zod.string().optional(),
				description: zod.string().optional(),
				establishedYear: zod.string().optional(),
				board: zod.string().optional(),
				status: zod.literal(["active", "inactive"]).optional(),
				maxStudents: zod.string().optional(),
				maxTeachers: zod.string().optional(),
				accreditation: zod.string().optional(),
				facilities: zod.string().optional(),
				adminName: zod.string("admin name required"),
				adminEmail: zod.email("admin email required"),
				adminPassword: zod.string("admin password required").min(5),
				adminPhone: zod.string("admin phone required"),
			}),
		},
	)
	.put(
		"/:id",
		async ({ params, body }) => {
			const [existingSchool] = await db
				.select({ id: schoolTable.id })
				.from(schoolTable)
				.where(eq(schoolTable.id, params.id));

			if (!existingSchool) {
				throw new ApiError({ msg: "school not found", code: 404 });
			}

			if (body.schoolCode) {
				const [existingCode] = await db
					.select({ id: schoolTable.id })
					.from(schoolTable)
					.where(eq(schoolTable.schoolCode, body.schoolCode));

				if (existingCode && existingCode.id !== params.id) {
					throw new ApiError({ msg: "school code already exists", code: 400 });
				}
			}

			if (body.email) {
				const [existingEmail] = await db
					.select({ id: schoolTable.id })
					.from(schoolTable)
					.where(eq(schoolTable.email, body.email));

				if (existingEmail && existingEmail.id !== params.id) {
					throw new ApiError({ msg: "email already exists", code: 400 });
				}
			}

			const [updatedSchool] = await db
				.update(schoolTable)
				.set({
					schoolCode: body.schoolCode,
					name: body.name,
					email: body.email,
					phone: body.phone,
					address: body.address,
					city: body.city,
					state: body.state,
					country: body.country,
					postalCode: body.postalCode,
					logo: body.logo,
					website: body.website,
					description: body.description,
					establishedYear: body.establishedYear,
					board: body.board,
					status: body.status,
					maxStudents: body.maxStudents,
					maxTeachers: body.maxTeachers,
					accreditation: body.accreditation,
					facilities: body.facilities,
				})
				.where(eq(schoolTable.id, params.id))
				.returning();

			return createJsonResponse({
				data: updatedSchool,
				msg: "school updated successfully",
			});
		},
		{
			params: zod.object({
				id: zod.string("id required"),
			}),
			body: zod.object({
				schoolCode: zod.string().optional(),
				name: zod.string().optional(),
				email: zod.email().optional(),
				phone: zod.string().optional(),
				address: zod.string().optional(),
				city: zod.string().optional(),
				state: zod.string().optional(),
				country: zod.string().optional(),
				postalCode: zod.string().optional(),
				logo: zod.string().optional(),
				website: zod.string().optional(),
				description: zod.string().optional(),
				establishedYear: zod.string().optional(),
				board: zod.string().optional(),
				status: zod.literal(["active", "inactive"]).optional(),
				maxStudents: zod.string().optional(),
				maxTeachers: zod.string().optional(),
				accreditation: zod.string().optional(),
				facilities: zod.string().optional(),
			}),
		},
	)
	.delete(
		"/:id",
		async ({ params }) => {
			const [existingSchool] = await db
				.select({ id: schoolTable.id })
				.from(schoolTable)
				.where(eq(schoolTable.id, params.id));

			if (!existingSchool) {
				throw new ApiError({ msg: "school not found", code: 404 });
			}

			await db.delete(schoolTable).where(eq(schoolTable.id, params.id));
			return createJsonResponse({ msg: "school deleted successfully" });
		},
		{
			params: zod.object({
				id: zod.string("id required"),
			}),
		},
	);

export type SchoolApiType = typeof school;
export default school;
