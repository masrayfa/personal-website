import { eq } from 'drizzle-orm';
import { db } from '../db/drizzle';
import { engagementTable } from '../db/schema/engagement';
import type {
  IEngagement,
  IEngagementCreate,
  IEngagementUpdate,
} from '../interfaces/engagement.interface';
import { DatabaseError, NotFoundError } from '../utils/error-util';

export class EngagementService {
  async getAll(): Promise<IEngagement[]> {
    try {
      const engagements = await db.select().from(engagementTable);

      if (!engagements) throw new Error('Engagements not found');

      return engagements;
    } catch (error) {
      throw new DatabaseError('Failed to fetch engagements', error);
    }
  }

  async getById(id: number): Promise<IEngagement> {
    try {
      const [engagement] = await db
        .select()
        .from(engagementTable)
        .where(eq(engagementTable.id, id));

      if (!engagement) {
        throw new NotFoundError(`Engagement with ID ${id} not found`);
      }

      return engagement;
    } catch (error) {
      if (error instanceof NotFoundError) throw error;
      throw new DatabaseError('Failed to fetch engagement', error);
    }
  }

  async getByContentId(
    contentId: number
  ): Promise<IEngagement | NotFoundError> {
    try {
      const [engagement] = await db
        .select()
        .from(engagementTable)
        .where(eq(engagementTable.contentId, contentId));

      if (!engagement) {
        throw new NotFoundError(
          `Engagement for content ID ${contentId} not found`
        );
      }

      return engagement;
    } catch (error) {
      if (error instanceof NotFoundError) throw error;
      throw new DatabaseError(
        'Failed to fetch engagement by content ID',
        error
      );
    }
  }

  async create(data: IEngagementCreate): Promise<IEngagement> {
    try {
      const [engagement] = await db
        .insert(engagementTable)
        .values(data)
        .returning();

      return engagement;
    } catch (error) {
      throw new DatabaseError('Failed to create engagement', error);
    }
  }

  async update(id: number, data: IEngagementUpdate): Promise<IEngagement> {
    try {
      const [updated] = await db
        .update(engagementTable)
        .set(data)
        .where(eq(engagementTable.id, id))
        .returning();

      if (!updated) {
        throw new NotFoundError(`Engagement with ID ${id} not found`);
      }

      return updated;
    } catch (error) {
      if (error instanceof NotFoundError) throw error;
      throw new DatabaseError('Failed to update engagement', error);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const [deleted] = await db
        .delete(engagementTable)
        .where(eq(engagementTable.id, id))
        .returning();

      if (!deleted) {
        throw new NotFoundError(`Engagement with ID ${id} not found`);
      }
    } catch (error) {
      if (error instanceof NotFoundError) throw error;
      throw new DatabaseError('Failed to delete engagement', error);
    }
  }

  async incrementLikes(id: number): Promise<IEngagement> {
    try {
      const engagement = await this.getById(id);

      if (!engagement.likes) throw new Error('Likes are not found');

      return await this.update(id, { likes: engagement.likes + 1 });
    } catch (error) {
      if (error instanceof NotFoundError) throw error;
      throw new DatabaseError('Failed to increment likes', error);
    }
  }

  async incrementClaps(id: number): Promise<IEngagement> {
    try {
      const engagement = await this.getById(id);

      if (!engagement.claps) throw new Error('Claps are not found');

      return await this.update(id, { claps: engagement.claps + 1 });
    } catch (error) {
      if (error instanceof NotFoundError) throw error;
      throw new DatabaseError('Failed to increment claps', error);
    }
  }
}
