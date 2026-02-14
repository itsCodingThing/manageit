import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";

export const adminTable = pgTable("admin", {
	id: text()
		.primaryKey()
		.$defaultFn(() => createId()),
	userId: text().notNull(),
	name: text().notNull(),
	email: text().notNull(),
	phoneNumber: text().notNull(),
	status: text().default("pending").notNull(),
	createdAt: timestamp().defaultNow().notNull(),
	updatedAt: timestamp()
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
});
