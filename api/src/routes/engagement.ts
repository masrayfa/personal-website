import { Hono } from 'hono';
import { EngagementService } from '../services/engagement.service';
import { sValidator } from '@hono/standard-validator';
import { errorResponse, successResponse } from '../utils/response.util';
import {
  createEngagementSchema,
  updateEngagementSchema,
  idParamSchema,
  contentIdParamSchema,
} from '../validators/engagement.validator';
import type { IEngagement } from '../interfaces/engagement.interface';
import { DatabaseError, NotFoundError } from '../utils/error-util';

const engagement = new Hono();
const service = new EngagementService();

engagement.get('/', async (c) => {
  const data = await service.getAll();
  return successResponse<IEngagement[]>(
    c,
    data,
    'Engagements retrieved successfully'
  );
});

engagement.get('/:id', sValidator('param', idParamSchema), async (c) => {
  const { id } = c.req.valid('param');
  const data = await service.getById(id);
  return successResponse<IEngagement>(
    c,
    data,
    'Engagement retrieved successfully'
  );
});

engagement.get(
  '/content/:contentId',
  sValidator('param', contentIdParamSchema),
  async (c) => {
    try {
      const { contentId } = c.req.valid('param');
      const data = await service.getByContentId(contentId);

      return successResponse<IEngagement>(
        c,
        data,
        'Engagement retrieved successfully'
      );
    } catch (err) {
      if (err instanceof NotFoundError) {
        return errorResponse(c, '404', 'NOT_FOUND', err.message);
      }

      if (err instanceof DatabaseError) {
        return errorResponse(c, 'DATABASE_ERROR', err.message, err.details);
      }

      return errorResponse(
        c,
        '500',
        'INTERNAL_SERVER_ERROR',
        err instanceof Error ? err.message : 'Unexpected error'
      );
    }
  }
);

engagement.post('/', sValidator('json', createEngagementSchema), async (c) => {
  const body = c.req.valid('json');
  const data = await service.create(body);
  return successResponse<IEngagement>(
    c,
    data,
    'Engagement created successfully'
  );
});

engagement.patch(
  '/:id',
  sValidator('param', idParamSchema),
  sValidator('json', updateEngagementSchema),
  async (c) => {
    const { id } = c.req.valid('param');
    const body = c.req.valid('json');
    const data = await service.update(id, body);
    return successResponse<IEngagement>(
      c,
      data,
      'Engagement updated successfully'
    );
  }
);

engagement.delete('/:id', sValidator('param', idParamSchema), async (c) => {
  const { id } = c.req.valid('param');
  await service.delete(id);
  return successResponse(c, null, 'Engagement deleted successfully');
});

engagement.post('/:id/like', sValidator('param', idParamSchema), async (c) => {
  const { id } = c.req.valid('param');
  const data = await service.incrementLikes(id);
  return successResponse<IEngagement>(c, data, 'Like added successfully');
});

engagement.post('/:id/clap', sValidator('param', idParamSchema), async (c) => {
  const { id } = c.req.valid('param');
  const data = await service.incrementClaps(id);
  return successResponse<IEngagement>(c, data, 'Clap added successfully');
});

export default engagement;
