import type { Context } from 'hono';
import type { ApiResponse, ApiErrorResponse } from '../types/response.types';
import { StatusCode } from 'hono/utils/http-status';

export const successResponse = <T>(
  c: Context,
  data: T,
  message?: string,
  statusCode: StatusCode = 200,
  meta?: Record<string, unknown>
) => {
  const response: ApiResponse<T> = {
    success: true,
    data,
    ...(message && { message }),
    ...(meta && { meta }),
  };

  return c.json(response);
};

export const errorResponse = (
  c: Context,
  code: string,
  message: string,
  details?: unknown
) => {
  const response: ApiErrorResponse = {
    success: false,
    error: {
      code,
      message,
    },
  };

  if (details !== undefined) {
    response.error.details = details;
  }

  return c.json(response);
};
