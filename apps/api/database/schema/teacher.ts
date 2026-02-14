import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { index, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { schoolTable } from "./school";

export const teacherRoles = [
	"teacher",
	"admin",
	"principal",
	"master_admin",
] as const;
export type TeacherRole = (typeof teacherRoles)[number];

export const teacherTable = pgTable(
	"teacher",
	{
		id: text()
			.primaryKey()
			.$defaultFn(() => createId()),
		userId: text().notNull(),
		schoolId: text()
			.notNull()
			.references(() => schoolTable.id, { onDelete: "cascade" }),
		name: text().notNull(),
		dob: timestamp().defaultNow().notNull(),
		email: text().notNull(),
		phoneNumber: text().notNull(),
		image: text().default("").notNull(),
		address: text().default("").notNull(),
		roles: text().array().default(["teacher"]).notNull(), // Array of roles: teacher, admin, principal, master_admin
		batchIds: text().array().default([]).notNull(), // Array of batch IDs this teacher belongs to
		status: text().default("pending").notNull(),
		createdAt: timestamp().defaultNow().notNull(),
		updatedAt: timestamp()
			.defaultNow()
			.$onUpdate(() => new Date())
			.notNull(),
	},
	(table) => [
		index("teacher_schoolId_idx").on(table.schoolId),
		index("teacher_userId_idx").on(table.userId),
		index("teacher_roles_idx").on(table.roles),
	],
);

// Relations
export const teacherRelations = relations(teacherTable, ({ one }) => ({
	school: one(schoolTable, {
		fields: [teacherTable.schoolId],
		references: [schoolTable.id],
	}),
}));
