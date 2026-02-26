import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { studentTable } from "./student";
import { teacherTable } from "./teacher";
import { batchTable } from "./batch";

export const schoolTable = pgTable("school", {
	id: text()
		.primaryKey()
		.$defaultFn(() => createId()),
	schoolCode: text().notNull().unique(),
	name: text().notNull(),
	email: text().notNull().unique(),
	phone: text().notNull(),
	address: text().notNull(),
	city: text().notNull(),
	state: text().notNull(),
	country: text().notNull(),
	postalCode: text().notNull(),
	logo: text().default(""),
	website: text().default(""),
	description: text().default(""),
	establishedYear: text().default(""),
	board: text().default(""),
	status: text({enum: ["active", "inactive"]}).default("active").notNull(),
	currentStudents: text().default("0"),
	currentTeachers: text().default("0"),
	maxTeachers: text().default(""),
	maxStudents: text().default(""),
	accreditation: text().default(""),
	facilities: text().array().default([]), // JSON array of facilities
	createdAt: timestamp().defaultNow().notNull(),
	updatedAt: timestamp()
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
});

// Relations
export const schoolRelations = relations(schoolTable, ({ many }) => ({
	students: many(studentTable),
	teachers: many(teacherTable),
	batches: many(batchTable),
}));

export type School = typeof schoolTable.$inferSelect;
