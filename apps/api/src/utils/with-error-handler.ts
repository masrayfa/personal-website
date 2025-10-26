import type { Context } from 'hono';
import { errorResponse } from './response.util';
import { NotFoundError, DatabaseError } from './error-util';

export const withErrorHandler =
  (handler: (c: Context) => Promise<Response>) =>
  async (c: Context): Promise<Response> => {
    try {
      return await handler(c);
    } catch (err) {
      console.error('[withErrorHandler]', err);

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
  };
