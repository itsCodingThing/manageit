import { db } from "@/database/db";
import {
	subscriptionPlanTable,
	subscriptionTable,
	schoolTable,
} from "@/database/schema";
import { authMiddleware } from "@/middleware/auth";
import { ApiError } from "@/utils/error";
import { createJsonResponse } from "@/utils/response";
import { zod } from "@/utils/validation";
import { eq, desc } from "drizzle-orm";
import { Elysia } from "elysia";

const subscription = new Elysia({ prefix: "/api/subscription" })
	.use(authMiddleware)
	.get("/plans", async () => {
		const plans = await db
			.select({
				id: subscriptionPlanTable.id,
				name: subscriptionPlanTable.name,
				description: subscriptionPlanTable.description,
				price: subscriptionPlanTable.price,
				currency: subscriptionPlanTable.currency,
				interval: subscriptionPlanTable.interval,
				maxStudents: subscriptionPlanTable.maxStudents,
				maxTeachers: subscriptionPlanTable.maxTeachers,
				maxExams: subscriptionPlanTable.maxExams,
				maxBatches: subscriptionPlanTable.maxBatches,
				features: subscriptionPlanTable.features,
				status: subscriptionPlanTable.status,
				isDefault: subscriptionPlanTable.isDefault,
				createdAt: subscriptionPlanTable.createdAt,
				updatedAt: subscriptionPlanTable.updatedAt,
			})
			.from(subscriptionPlanTable)
			.where(eq(subscriptionPlanTable.status, "active"))
			.orderBy(desc(subscriptionPlanTable.createdAt));

		return createJsonResponse({ data: plans });
	})
	.get(
		"/plans/:id",
		async ({ params }) => {
			const [plan] = await db
				.select({
					id: subscriptionPlanTable.id,
					name: subscriptionPlanTable.name,
					description: subscriptionPlanTable.description,
					price: subscriptionPlanTable.price,
					currency: subscriptionPlanTable.currency,
					interval: subscriptionPlanTable.interval,
					maxStudents: subscriptionPlanTable.maxStudents,
					maxTeachers: subscriptionPlanTable.maxTeachers,
					maxExams: subscriptionPlanTable.maxExams,
					maxBatches: subscriptionPlanTable.maxBatches,
					features: subscriptionPlanTable.features,
					status: subscriptionPlanTable.status,
					isDefault: subscriptionPlanTable.isDefault,
					createdAt: subscriptionPlanTable.createdAt,
					updatedAt: subscriptionPlanTable.updatedAt,
				})
				.from(subscriptionPlanTable)
				.where(eq(subscriptionPlanTable.id, params.id));

			if (!plan) {
				throw new ApiError({ msg: "subscription plan not found", code: 404 });
			}

			return createJsonResponse({ data: plan });
		},
		{
			params: zod.object({
				id: zod.string("id required"),
			}),
		},
	)
	.post(
		"/plans",
		async ({ body }) => {
			const [plan] = await db
				.insert(subscriptionPlanTable)
				.values({
					name: body.name,
					description: body.description,
					price: body.price ?? 0,
					currency: body.currency ?? "USD",
					interval: body.interval ?? "month",
					maxStudents: body.maxStudents ?? 0,
					maxTeachers: body.maxTeachers ?? 0,
					maxExams: body.maxExams ?? 0,
					maxBatches: body.maxBatches ?? 0,
					features: body.features ?? [],
					status: body.status ?? "active",
					isDefault: body.isDefault ?? false,
				})
				.returning();

			return createJsonResponse({
				data: plan,
				msg: "subscription plan created successfully",
			});
		},
		{
			body: zod.object({
				name: zod.string("name required"),
				description: zod.string().optional(),
				price: zod.number().optional(),
				currency: zod.string().optional(),
				interval: zod.string().optional(),
				maxStudents: zod.number().optional(),
				maxTeachers: zod.number().optional(),
				maxExams: zod.number().optional(),
				maxBatches: zod.number().optional(),
				features: zod.array(zod.string()).optional(),
				status: zod.literal(["active", "inactive"]).optional(),
				isDefault: zod.boolean().optional(),
			}),
		},
	)
	.post(
		"/assign",
		async ({ body }) => {
			const [existingSchool] = await db
				.select({ id: schoolTable.id })
				.from(schoolTable)
				.where(eq(schoolTable.id, body.schoolId))
				.limit(1);

			if (!existingSchool) {
				throw new ApiError({ msg: "school not found", code: 404 });
			}

			const [existingPlan] = await db
				.select({
					id: subscriptionPlanTable.id,
					maxStudents: subscriptionPlanTable.maxStudents,
					maxTeachers: subscriptionPlanTable.maxTeachers,
				})
				.from(subscriptionPlanTable)
				.where(eq(subscriptionPlanTable.id, body.planId))
				.limit(1);

			if (!existingPlan) {
				throw new ApiError({ msg: "subscription plan not found", code: 404 });
			}

			const startDate = body.startDate ? new Date(body.startDate) : new Date();
			let endDate = new Date();

			if (body.interval === "year") {
				endDate.setFullYear(endDate.getFullYear() + 1);
			} else {
				endDate.setMonth(endDate.getMonth() + 1);
			}

			endDate = body.endDate
				? new Date(body.endDate)
				: endDate;

			const [subscription] = await db
				.insert(subscriptionTable)
				.values({
					schoolId: body.schoolId,
					planId: body.planId,
					startDate: startDate,
					endDate: endDate,
				})
				.returning();

			await db
				.update(schoolTable)
				.set({
					maxStudents: existingPlan.maxStudents.toString(),
					maxTeachers: existingPlan.maxTeachers.toString(),
				})
				.where(eq(schoolTable.id, body.schoolId));

			return createJsonResponse({
				data: subscription,
				msg: "subscription assigned to school successfully",
			});
		},
		{
			body: zod.object({
				schoolId: zod.string("schoolId required"),
				planId: zod.string("planId required"),
				startDate: zod.iso.datetime().optional(),
				endDate: zod.iso.datetime().optional(),
				interval: zod.literal(["month", "year"]).optional(),
			}),
		},
	)
	.put(
		"/plans/:id",
		async ({ params, body }) => {
			const [existingPlan] = await db
				.select({ id: subscriptionPlanTable.id })
				.from(subscriptionPlanTable)
				.where(eq(subscriptionPlanTable.id, params.id));

			if (!existingPlan) {
				throw new ApiError({ msg: "subscription plan not found", code: 404 });
			}

			const [updatedPlan] = await db
				.update(subscriptionPlanTable)
				.set({
					name: body.name,
					description: body.description,
					price: body.price,
					currency: body.currency,
					interval: body.interval,
					maxStudents: body.maxStudents,
					maxTeachers: body.maxTeachers,
					maxExams: body.maxExams,
					maxBatches: body.maxBatches,
					features: body.features,
					status: body.status,
					isDefault: body.isDefault ?? false,
				})
				.where(eq(subscriptionPlanTable.id, params.id))
				.returning();

			return createJsonResponse({
				data: updatedPlan,
				msg: "subscription plan updated successfully",
			});
		},
		{
			params: zod.object({
				id: zod.string("id required"),
			}),
			body: zod.object({
				name: zod.string().optional(),
				description: zod.string().optional(),
				price: zod.number().optional(),
				currency: zod.string().optional(),
				interval: zod.string().optional(),
				maxStudents: zod.number().optional(),
				maxTeachers: zod.number().optional(),
				maxExams: zod.number().optional(),
				maxBatches: zod.number().optional(),
				features: zod.array(zod.string()).optional(),
				status: zod.literal(["active", "inactive"]).optional(),
				isDefault: zod.boolean().optional(),
			}),
		},
	)
	.delete(
		"/plans/:id",
		async ({ params }) => {
			const [existingPlan] = await db
				.select({ id: subscriptionPlanTable.id })
				.from(subscriptionPlanTable)
				.where(eq(subscriptionPlanTable.id, params.id));

			if (!existingPlan) {
				throw new ApiError({ msg: "subscription plan not found", code: 404 });
			}

			await db
				.delete(subscriptionPlanTable)
				.where(eq(subscriptionPlanTable.id, params.id));
			return createJsonResponse({
				msg: "subscription plan deleted successfully",
			});
		},
		{
			params: zod.object({
				id: zod.string("id required"),
			}),
		},
	);

export type SubscriptionApiType = typeof subscription;
export default subscription;
