import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";

interface IEngagement {
  id: number;
  contentId: number;
  claps: number;
  likes: number;
}

/**
 * Server function without params object
 * purpose: simple server function params
 */
const fetchDummy = createServerFn({ method: "GET" })
  .inputValidator((contentId: number) => contentId)
  .handler(async ({ data }) => {
    return fetch(`/api/engagements/content/${data}`);
  });

/**
 * Server function with params Object
 * purpose: enable to have multiple params with typesafety
 */
const fetchEngagements = createServerFn({ method: "GET" })
  .inputValidator(({ contentId }: Pick<IEngagement, "contentId">) => contentId)
  .handler(async ({ data }) => {
    return fetch(`/api/engagements/content/${data}`, {
      method: "GET",
    });
  });

export const engagementsQueryOptions = (contentId: number) =>
  queryOptions({
    queryKey: ["engagements", contentId],
    queryFn: () =>
      fetchEngagements({
        data: {
          contentId,
        },
      }),
  });
