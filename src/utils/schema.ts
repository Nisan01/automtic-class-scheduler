import { pgTable, unique, integer, varchar, timestamp ,json} from "drizzle-orm/pg-core"
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



export const teachersData=pgTable("teachersData",{

 id: integer().primaryKey().generatedAlwaysAsIdentity({
      name: "teachers_id_seq",
      startWith: 1,
      increment: 1,
      minValue: 1
    }),
    t_id: varchar({ length: 10 }).notNull(), 
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull(),
    maxLoad: integer().notNull(),
    subjectExpertise: json().notNull(), 
    availableDays: json().notNull(), 
    createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
  },
  (table) => [
    unique("teachers_email_unique").on(table.email),
    unique("teachers_tid_unique").on(table.t_id), 
  ]
);
