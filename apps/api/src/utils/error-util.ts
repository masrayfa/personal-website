import type { ErrorCode } from '../constants/error-codes';

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public code: ErrorCode,
    message: string,
    public details?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class ValidationError extends ApiError {
  constructor(message: string, details?: unknown) {
    super(400, 'VALIDATION_ERROR', message, details);
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string = 'Resource not found') {
    super(404, 'NOT_FOUND', message);
    this.name = 'NotFoundError';
  }
}

export class DatabaseError extends ApiError {
  constructor(
    message: string = 'Database operation failed',
    details?: unknown
  ) {
    super(500, 'DATABASE_ERROR', message, details);
    this.name = 'DatabaseError';
  }
}
