import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema, IdParamsSchema } from "stoker/openapi/schemas";

import {
  insertEngagementsSchema,
  patchEngagementsSchema,
  selectEngagementsSchema,
} from "@/db/schema/engagements";
import { notFoundSchema } from "@/lib/constants";

const tags = ["Engagements"];
const prefix = "engagements";

export const list = createRoute({
  path: `/${prefix}`,
  method: "get",
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(selectEngagementsSchema),
      "The list of engagements",
    ),
  },
});

export const create = createRoute({
  path: `${prefix}`,
  method: "post",
  request: {
    body: jsonContentRequired(
      insertEngagementsSchema,
      "The engagement to create",
    ),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectEngagementsSchema,
      "The created engagement",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(insertEngagementsSchema),
      "The validation error(s)",
    ),
  },
});

export const getOne = createRoute({
  path: `/${prefix}/{id}`,
  method: "get",
  request: {
    params: IdParamsSchema,
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectEngagementsSchema,
      "The requested engagement",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "Engagement not found",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      "Invalid id error",
    ),
  },
});

export const patch = createRoute({
  path: `/${prefix}/{id}`,
  method: "patch",
  request: {
    params: IdParamsSchema,
    body: jsonContentRequired(patchEngagementsSchema, "The task updates"),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectEngagementsSchema,
      "The updated engagement",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "Engagement not found",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(patchEngagementsSchema).or(
        createErrorSchema(IdParamsSchema),
      ),
      "The validation error(s)",
    ),
  },
});

export const remove = createRoute({
  path: `/${prefix}/{id}`,
  method: "delete",
  request: {
    params: IdParamsSchema,
  },
  tags,
  responses: {
    [HttpStatusCodes.NO_CONTENT]: {
      description: "Engagement deleted",
    },
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "Engagement not found",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      "Invalid id error",
    ),
  },
});

export type ListRoute = typeof list;
export type CreateRoute = typeof create;
export type RemoveRoute = typeof remove;
export type PatchRoute = typeof patch;
export type GetOneRoute = typeof getOne;
