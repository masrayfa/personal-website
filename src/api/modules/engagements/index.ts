import Elysia, { t } from "elysia";
import { ResponseBuilder } from "../../types/response";
import { EngagementsService } from "./service";
import { EngagementsModel } from "./model";

const pluginName = "engagements";

export const engagements = new Elysia({
  prefix: `/${pluginName}`,
  name: pluginName,
})
  .get("/", async () => {
    try {
      const response = await EngagementsService.getAll();

      console.log(`[${pluginName}::Plugin]-response: `, response);

      return ResponseBuilder.success(
        response,
        "Fetched engagements successfully",
      );
    } catch (err) {
      console.error(`[${pluginName} GET /] Error:`, err);
      return ResponseBuilder.error("Failed to fetch engagements");
    }
  })
  .get(
    "/:id",
    async ({ params }) => {
      const { id } = params;
      try {
        const response = await EngagementsService.getById(id);

        return ResponseBuilder.success(
          response,
          "Fetched engagement by id successfully",
        );
      } catch (err) {
        console.error(`[${pluginName} GET /] Error:`, err);
        return ResponseBuilder.error("Failed to fetch engagement id");
      }
    },
    {
      params: t.Object({
        id: t.Number(),
      }),
    },
  )
  .get(
    "/content/:contentId",
    async ({ params }) => {
      try {
        const response = await EngagementsService.getByContentId(
          params.contentId,
        );

        if (!response) {
          return ResponseBuilder.error("Engagement not found");
        }

        return ResponseBuilder.success(
          response,
          "Fetched engagement successfully",
        );
      } catch (err) {
        console.error(`[${pluginName} GET /:id] Error:`, err);
        return ResponseBuilder.error("Failed to fetch engagement");
      }
    },
    {
      params: t.Object({
        contentId: t.Number(),
      }),
    },
  )
  .patch(
    "/",
    async ({ body }) => {
      try {
        const response = await EngagementsService.update(body);

        return ResponseBuilder.success(
          response,
          "Engagements updated successfully",
        );
      } catch (err) {
        console.error(`[${pluginName} POST /] Error:`, err);
        return ResponseBuilder.error("Failed to update engagements");
      }
    },
    {
      body: EngagementsModel.engagementsBody,
    },
  );
