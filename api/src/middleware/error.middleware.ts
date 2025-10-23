import type { Context, Next } from 'hono';
import { errorResponse } from '../utils/response.util';
import { ErrorCodes } from '../constants/error-codes';
import { ApiError } from '../utils/error-util';

export const errorHandler = async (c: Context, next: Next) => {
  try {
    await next();
  } catch (err: unknown) {
    console.error('Error caught in middleware:', err);

    if (err instanceof ApiError) {
      return errorResponse(c, err.code, err.message, err.details);
    }

    // Handle unknown errors
    return errorResponse(
      c,
      ErrorCodes.INTERNAL_ERROR,
      'An unexpected error occurred',
      process.env.NODE_ENV === 'development'
        ? (err as Error).message
        : undefined
    );
  }
};
