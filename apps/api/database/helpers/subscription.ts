import { db } from "@/database/db";
import {
  subscriptionTable,
  subscriptionPlanTable,
  schoolTable,
  studentTable,
  teacherTable,
  batchTable,
} from "@/database/schema";
import { ServiceError } from "@/utils/error";
import { eq, and, sql } from "drizzle-orm";

export type ResourceType = "student" | "teacher" | "exam" | "batch";

export async function checkSubscriptionLimit(
  schoolId: string,
  resourceType: ResourceType,
): Promise<void> {
  const [subscription] = await db
    .select({
      id: subscriptionTable.id,
      status: subscriptionTable.status,
      endDate: subscriptionTable.endDate,
      maxStudents: subscriptionPlanTable.maxStudents,
      maxTeachers: subscriptionPlanTable.maxTeachers,
      maxExams: subscriptionPlanTable.maxExams,
      maxBatches: subscriptionPlanTable.maxBatches,
    })
    .from(subscriptionTable)
    .innerJoin(
      subscriptionPlanTable,
      eq(subscriptionTable.planId, subscriptionPlanTable.id),
    )
    .where(
      and(
        eq(subscriptionTable.schoolId, schoolId),
        eq(subscriptionTable.status, "active"),
      ),
    )
    .limit(1);

  if (!subscription) {
    throw new ServiceError({
      msg: "no active subscription found for this school",
    });
  }

  const now = new Date();
  if (new Date(subscription.endDate) < now) {
    throw new ServiceError({
      msg: "subscription has expired",
    });
  }

  let currentCount = 0;
  let maxLimit = 0;

  switch (resourceType) {
    case "student": {
      const [result] = await db
        .select({ count: sql<number>`count(*)` })
        .from(studentTable)
        .where(eq(studentTable.schoolId, schoolId));

      currentCount = result?.count ?? 0;
      maxLimit = subscription.maxStudents;
      break;
    }
    case "teacher": {
      const [result] = await db
        .select({ count: sql<number>`count(*)` })
        .from(teacherTable)
        .where(eq(teacherTable.schoolId, schoolId));

      currentCount = result?.count ?? 0;
      maxLimit = subscription.maxTeachers;
      break;
    }
    case "batch": {
      const [result] = await db
        .select({ count: sql<number>`count(*)` })
        .from(batchTable)
        .where(eq(batchTable.schoolId, schoolId));

      currentCount = result?.count ?? 0;
      maxLimit = subscription.maxBatches;
      break;
    }
    case "exam": {
      currentCount = 0;
      maxLimit = subscription.maxExams;
      break;
    }
  }

  if (maxLimit > 0 && currentCount >= maxLimit) {
    throw new ServiceError({
      msg: `subscription limit reached for ${resourceType}s. Maximum allowed: ${maxLimit}`,
    });
  }
}

export async function getSubscriptionLimits(schoolId: string): Promise<{
  maxStudents: number;
  maxTeachers: number;
  maxExams: number;
  maxBatches: number;
  currentStudents: number;
  currentTeachers: number;
  currentBatches: number;
  hasActiveSubscription: boolean;
}> {
  const [subscription] = await db
    .select({
      id: subscriptionTable.id,
      status: subscriptionTable.status,
      endDate: subscriptionTable.endDate,
      maxStudents: subscriptionPlanTable.maxStudents,
      maxTeachers: subscriptionPlanTable.maxTeachers,
      maxExams: subscriptionPlanTable.maxExams,
      maxBatches: subscriptionPlanTable.maxBatches,
    })
    .from(subscriptionTable)
    .innerJoin(
      subscriptionPlanTable,
      eq(subscriptionTable.planId, subscriptionPlanTable.id),
    )
    .where(
      and(
        eq(subscriptionTable.schoolId, schoolId),
        eq(subscriptionTable.status, "active"),
      ),
    )
    .limit(1);

  if (!subscription) {
    const [school] = await db
      .select({
        maxStudents: schoolTable.maxStudents,
        maxTeachers: schoolTable.maxTeachers,
      })
      .from(schoolTable)
      .where(eq(schoolTable.id, schoolId))
      .limit(1);

    return {
      maxStudents: Number(school?.maxStudents ?? 0),
      maxTeachers: Number(school?.maxTeachers ?? 0),
      maxExams: 0,
      maxBatches: 0,
      currentStudents: 0,
      currentTeachers: 0,
      currentBatches: 0,
      hasActiveSubscription: false,
    };
  }

  const [studentsResult] = await db
    .select({ count: sql<number>`count(*)` })
    .from(studentTable)
    .where(eq(studentTable.schoolId, schoolId));

  const [teachersResult] = await db
    .select({ count: sql<number>`count(*)` })
    .from(teacherTable)
    .where(eq(teacherTable.schoolId, schoolId));

  const [batchesResult] = await db
    .select({ count: sql<number>`count(*)` })
    .from(batchTable)
    .where(eq(batchTable.schoolId, schoolId));

  const isExpired = new Date(subscription.endDate) < new Date();

  return {
    maxStudents: subscription.maxStudents,
    maxTeachers: subscription.maxTeachers,
    maxExams: subscription.maxExams,
    maxBatches: subscription.maxBatches,
    currentStudents: Number(studentsResult?.count ?? 0),
    currentTeachers: Number(teachersResult?.count ?? 0),
    currentBatches: Number(batchesResult?.count ?? 0),
    hasActiveSubscription: !isExpired && subscription.status === "active",
  };
}

export async function verifySubscription(schoolId: string): Promise<void> {
  const [subscription] = await db
    .select({
      id: subscriptionTable.id,
      status: subscriptionTable.status,
      endDate: subscriptionTable.endDate,
    })
    .from(subscriptionTable)
    .innerJoin(
      subscriptionPlanTable,
      eq(subscriptionTable.planId, subscriptionPlanTable.id),
    )
    .where(
      and(
        eq(subscriptionTable.schoolId, schoolId),
        eq(subscriptionTable.status, "active"),
      ),
    )
    .limit(1);

  if (!subscription) {
    throw new ServiceError({
      msg: "no active subscription found for this school",
    });
  }

  const now = new Date();
  if (new Date(subscription.endDate) < now) {
    throw new ServiceError({
      msg: "subscription has expired",
    });
  }
}
