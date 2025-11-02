import { status } from "elysia";

import type { EngagementsModel } from "./model";
import { db } from "@/db/index";
import { engagementsTable } from "@/db/schema/engagements";
import { eq } from "drizzle-orm";

const serviceName = "EngagementsService";

// If the class doesn't need to store a property,
// you may use `abstract class` to avoid class allocation
export abstract class EngagementsService {
  static async getAll() {
    try {
      const rows = await db.select().from(engagementsTable);
      console.log(`[${serviceName}]::getAll rows:`, rows);
      return rows;
    } catch (err) {
      console.error(`[${serviceName}::getAll] Error:`, err);
      throw err;
    }
  }

  static async getById(id: number) {
    try {
      const [row] = await db
        .select()
        .from(engagementsTable)
        .where(eq(engagementsTable.id, id));

      console.log(`[${serviceName}]::getAll rows:`, row);

      return row;
    } catch (err) {
      console.error(`[${serviceName}::getById] Error:`, err);
      throw err;
    }
  }

  static async getByContentId(contentId: number) {
    try {
      const [row] = await db
        .select()
        .from(engagementsTable)
        .where(eq(engagementsTable.content_id, contentId))
        .limit(1);

      return row;
    } catch (err) {
      console.error(`[${serviceName}::getById] Error:`, err);
      throw new Error("Failed to fetch engagement by ID");
    }
  }

  static async update({
    content_id,
    claps,
    likes,
  }: EngagementsModel.engagementsBody) {
    try {
      const [existing] = await db
        .update(engagementsTable)
        .set({ claps, likes })
        .where(eq(engagementsTable.content_id, content_id))
        .returning();

      if (!existing) {
        await db.insert(engagementsTable).values({
          content_id,
          likes,
          claps,
        });
      }

      return {
        id: existing?.id,
        content_id,
        claps,
        likes,
      };
    } catch (err) {
      console.error(`[${serviceName}::update] Error:`, err);
      throw new Error("Failed to update engagements");
    }
  }
}
