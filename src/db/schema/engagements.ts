import { integer, pgTable } from "drizzle-orm/pg-core";

export const engagementsTable = pgTable("engagements", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  content_id: integer().notNull(),
  claps: integer().notNull().default(0),
  likes: integer().notNull().default(0),
});
