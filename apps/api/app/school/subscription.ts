import { db } from "@/database/db";
import {
	subscriptionPlanTable,
	subscriptionTable,
	schoolTable,
} from "@/database/schema";
import { ApiError } from "@/utils/error";
import { createJsonResponse } from "@/utils/response";
import { zod } from "@/utils/validation";
import { eq, desc } from "drizzle-orm";
import { Elysia } from "elysia";

const schoolSubscriptionApi = new Elysia({ prefix: "/subscription" }).get(
	"/my",
	async ({ headers }) => {
		const session = await import("@/services/auth").then((m) =>
			m.betterAuthApi.getSession({ headers }),
		);
		if (!session) {
			throw new ApiError({ msg: "unauthorized", code: 401 });
		}

		const { teacherTable } = await import("@/database/schema");
		const [teacherRecord] = await db
			.select({ schoolId: teacherTable.schoolId })
			.from(teacherTable)
			.where(eq(teacherTable.userId, session.user.id))
			.limit(1);

		if (!teacherRecord) {
			throw new ApiError({ msg: "school not found for this user", code: 404 });
		}

		const schoolId = teacherRecord.schoolId;
		const [subscriptionData] = await db
			.select({
				id: subscriptionTable.id,
				schoolId: subscriptionTable.schoolId,
				planId: subscriptionTable.planId,
				status: subscriptionTable.status,
				startDate: subscriptionTable.startDate,
				endDate: subscriptionTable.endDate,
				autoRenew: subscriptionTable.autoRenew,
				paymentStatus: subscriptionTable.paymentStatus,
				planName: subscriptionPlanTable.name,
				planDescription: subscriptionPlanTable.description,
				planPrice: subscriptionPlanTable.price,
				planCurrency: subscriptionPlanTable.currency,
				planInterval: subscriptionPlanTable.interval,
				planMaxStudents: subscriptionPlanTable.maxStudents,
				planMaxTeachers: subscriptionPlanTable.maxTeachers,
				planMaxExams: subscriptionPlanTable.maxExams,
				planMaxBatches: subscriptionPlanTable.maxBatches,
				planFeatures: subscriptionPlanTable.features,
				createdAt: subscriptionTable.createdAt,
			})
			.from(subscriptionTable)
			.innerJoin(
				subscriptionPlanTable,
				eq(subscriptionTable.planId, subscriptionPlanTable.id),
			)
			.where(eq(subscriptionTable.schoolId, schoolId))
			.orderBy(desc(subscriptionTable.createdAt))
			.limit(1);

		if (!subscriptionData) {
			throw new ApiError({
				msg: "no active subscription found",
				code: 404,
			});
		}

		return createJsonResponse({ data: subscriptionData });
	},
);

export type SubscriptionApiType = typeof schoolSubscriptionApi;
export default schoolSubscriptionApi;
