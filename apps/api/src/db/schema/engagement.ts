import { integer } from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';

export const engagementTable = pgTable('engagement', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  contentId: integer().notNull(),
  likes: integer().default(0),
  claps: integer().default(0),
});
