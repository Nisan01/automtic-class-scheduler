import { pgTable, unique, integer, varchar, timestamp } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const users = pgTable("users", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "users_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	name: varchar({ length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull(),
	profileImg: varchar("profile_img", { length: 255 }).notNull(),
	role: varchar({ length: 20 }).default('student').notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	password: varchar(),
}, (table) => [
	unique("users_email_unique").on(table.email),
]);
