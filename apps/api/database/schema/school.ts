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
	logo: text(),
	website: text(),
	description: text(),
	establishedYear: text(),
	board: text(),
	status: text().default("active").notNull(),
	maxStudents: text(),
	currentStudents: text().default("0"),
	maxTeachers: text(),
	currentTeachers: text().default("0"),
	accreditation: text(),
	facilities: text(), // JSON array of facilities
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
