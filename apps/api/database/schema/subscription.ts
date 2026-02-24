import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import {
	index,
	pgTable,
	text,
	timestamp,
	integer,
	boolean,
} from "drizzle-orm/pg-core";
import { schoolTable } from "./school";

export const subscriptionPlanTable = pgTable(
	"subscription_plan",
	{
		id: text()
			.primaryKey()
			.$defaultFn(() => createId()),
		name: text().notNull(),
		description: text(),
		price: integer().notNull().default(0),
		currency: text().notNull().default("USD"),
		interval: text().notNull().default("month"),
		maxStudents: integer().notNull().default(0),
		maxTeachers: integer().notNull().default(0),
		maxExams: integer().notNull().default(0),
		maxBatches: integer().notNull().default(0),
		features: text().array().default([]).notNull(),
		status: text().default("active").notNull(),
		isDefault: boolean().default(false).notNull(),
		createdAt: timestamp().defaultNow().notNull(),
		updatedAt: timestamp()
			.defaultNow()
			.$onUpdate(() => new Date())
			.notNull(),
	},
	(table) => [index("subscription_plan_status_idx").on(table.status)],
);

export const subscriptionTable = pgTable(
	"subscription",
	{
		id: text()
			.primaryKey()
			.$defaultFn(() => createId()),
		schoolId: text()
			.notNull()
			.references(() => schoolTable.id, { onDelete: "cascade" }),
		planId: text()
			.notNull()
			.references(() => subscriptionPlanTable.id, { onDelete: "cascade" }),
		status: text().default("active").notNull(),
		startDate: timestamp().defaultNow().notNull(),
		endDate: timestamp().notNull(),
		autoRenew: text().default("true").notNull(),
		paymentStatus: text().default("pending").notNull(),
		createdAt: timestamp().defaultNow().notNull(),
		updatedAt: timestamp()
			.defaultNow()
			.$onUpdate(() => new Date())
			.notNull(),
	},
	(table) => [
		index("subscription_schoolId_idx").on(table.schoolId),
		index("subscription_status_idx").on(table.status),
	],
);

export const subscriptionPlanRelations = relations(
	subscriptionPlanTable,
	({ many }) => ({
		subscriptions: many(subscriptionTable),
	}),
);

export const subscriptionRelations = relations(
	subscriptionTable,
	({ one }) => ({
		school: one(schoolTable, {
			fields: [subscriptionTable.schoolId],
			references: [schoolTable.id],
		}),
		plan: one(subscriptionPlanTable, {
			fields: [subscriptionTable.planId],
			references: [subscriptionPlanTable.id],
		}),
	}),
);

export type SubscriptionPlan = typeof subscriptionPlanTable.$inferSelect;
export type Subscription = typeof subscriptionTable.$inferSelect;
