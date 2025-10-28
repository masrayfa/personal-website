import { z } from "@hono/zod-openapi";
import { integer, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { toZodV4SchemaTyped } from "@/lib/zod-utils";

export const engagements = pgTable("engagements", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  contentId: integer().notNull(),
  likes: integer().default(0),
  claps: integer().default(0),
});

export const selectEngagementsSchema = toZodV4SchemaTyped(
  createSelectSchema(engagements),
);

export const insertEngagementsSchema = toZodV4SchemaTyped(
  createInsertSchema(engagements, {
    claps: (field) => field.min(0),
    likes: (field) => field.min(0),
  }).required({
    contentId: true,
  }),
);

// @ts-expect-error partial exists on zod v4 type
export const patchEngagementsSchema = insertEngagementsSchema.partial();
