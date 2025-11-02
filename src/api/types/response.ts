export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  timestamp?: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T = any> extends ApiResponse<T> {
  pagination?: PaginationMeta;
}

export class ResponseBuilder {
  static success<T>(data: T, message?: string): ApiResponse<T> {
    return {
      success: true,
      message,
      timestamp: new Date().toISOString(),
      data,
    };
  }

  static error<E>(error: string, message?: string): ApiResponse<E> {
    return {
      success: false,
      error,
      message,
      timestamp: new Date().toISOString(),
    };
  }

  static paginated<T>(
    data: T[],
    pagination: PaginationMeta,
    message?: string,
  ): PaginatedResponse<T[]> {
    return {
      success: true,
      data,
      pagination,
      message,
      timestamp: new Date().toISOString(),
    };
  }
}
