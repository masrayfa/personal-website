// Model define the data structure and validation for the request and response
import { t } from "elysia";

export namespace EngagementsModel {
  export const engagementsBody = t.Object({
    content_id: t.Number(),
    likes: t.Number(),
    claps: t.Number(),
  });

  export type engagementsBody = typeof engagementsBody.static;

  export const engagementsResponse = t.Object({
    id: t.Number(),
    content_id: t.Number(),
    likes: t.Number(),
    claps: t.Number(),
  });

  export type engagementsResponse = typeof engagementsResponse.static;

  export const engagementsInvalid = t.Literal("Invalid engagements");
  export type engagementsInvalid = typeof engagementsInvalid.static;
}
