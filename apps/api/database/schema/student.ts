import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { index, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { schoolTable } from "./school";

export const studentTable = pgTable(
	"student",
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
		batchIds: text().array().default([]).notNull(), // Array of batch IDs this student belongs to
		status: text().default("pending").notNull(),
		createdAt: timestamp().defaultNow().notNull(),
		updatedAt: timestamp()
			.defaultNow()
			.$onUpdate(() => new Date())
			.notNull(),
	},
	(table) => [
		index("student_schoolId_idx").on(table.schoolId),
		index("student_userId_idx").on(table.userId),
	],
);

// Relations
export const studentRelations = relations(studentTable, ({ one }) => ({
	school: one(schoolTable, {
		fields: [studentTable.schoolId],
		references: [schoolTable.id],
	}),
}));
