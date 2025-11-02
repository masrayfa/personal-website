import { Elysia } from "elysia";
import {
  ApiResponse,
  PaginatedResponse,
  ResponseBuilder,
  type PaginationMeta,
} from "../types/response";

/**
 * Response Plugin with Decorator
 * Adds ResponseBuilder to decorator for direct access
 */
export const responsePlugin = new Elysia({ name: "response" }).decorate({
  ResponseBuilder: ResponseBuilder,
});

/**
 * Response Helpers Plugin
 * Adds response helper functions directly to context
 * This is the main plugin you should use in your routes
 */
// export const responseHelpersPlugin = new Elysia({
//   name: "response-helpers",
// }).derive(() => ({
//   success: <T>(data: T, message?: string) =>
//     ResponseBuilder.success(data, message),

//   error: (error: string, message?: string) =>
//     ResponseBuilder.error(error, message),

//   paginated: <T>(data: T[], pagination: PaginationMeta, message?: string) =>
//     ResponseBuilder.paginated(data, pagination, message),
// }));

export const responseHelpersPlugin = new Elysia({
  name: "response-helpers",
}).derive(() => ({
  success: <T = any>(data: T, message?: string): ApiResponse<T> =>
    ResponseBuilder.success(data, message),

  failed: <E = any>(errorMsg: string, message?: string): ApiResponse<E> =>
    ResponseBuilder.error(errorMsg, message),

  paginated: <T = any>(
    data: T[],
    pagination: PaginationMeta,
    message?: string,
  ): PaginatedResponse<T[]> =>
    ResponseBuilder.paginated(data, pagination, message),
}));
