import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { index, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { schoolTable } from "./school";

export const batchTable = pgTable(
	"batch",
	{
		id: text()
			.primaryKey()
			.$defaultFn(() => createId()),
		schoolId: text()
			.notNull()
			.references(() => schoolTable.id, { onDelete: "cascade" }),
		name: text().notNull(),
		description: text(),
		image: text(),
		status: text().default("active").notNull(),
		teacherIds: text().array().default([]).notNull(), // Array of teacher IDs
		studentIds: text().array().default([]).notNull(), // Array of student IDs
		createdAt: timestamp().defaultNow().notNull(),
		updatedAt: timestamp()
			.defaultNow()
			.$onUpdate(() => new Date())
			.notNull(),
	},
	(table) => [
		index("batch_schoolId_idx").on(table.schoolId),
		index("batch_status_idx").on(table.status),
	],
);

// Change tracking table for batch assignments
export const batchAssignmentHistoryTable = pgTable("batch_assignment_history", {
	id: text()
		.primaryKey()
		.$defaultFn(() => createId()),
	batchId: text()
		.notNull()
		.references(() => batchTable.id, { onDelete: "cascade" }),
	action: text().notNull(), // 'added' or 'removed'
	createdBy: text(), // User ID who made the change
	createdAt: timestamp().defaultNow().notNull(),
	updatedAt: timestamp()
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
});

// Relations
export const batchRelations = relations(batchTable, ({ one }) => ({
	school: one(schoolTable, {
		fields: [batchTable.schoolId],
		references: [schoolTable.id],
	}),
}));
