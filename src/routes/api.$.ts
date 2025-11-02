import { Elysia } from "elysia";
import { treaty } from "@elysiajs/eden";
import { fromTypes, openapi } from "@elysiajs/openapi";

import { createFileRoute } from "@tanstack/react-router";
import { createIsomorphicFn } from "@tanstack/react-start";
import { engagements } from "@/api/modules";
import { responseHelpersPlugin } from "@/api/plugins/response";

const app = new Elysia({
  name: "personal-website-api",
  aot: false,
  prefix: "/api",
})
  .use(
    openapi({
      references: fromTypes(),
    }),
  )
  .use(responseHelpersPlugin)
  .use(engagements);

const handle = async ({ request }: { request: Request }) => {
  try {
    console.log(`[api] ${request.method} ${request.url}`);
    try {
      const clone = request.clone();
      const txt = await clone.text();
      if (txt) console.log("[api] request body:", txt);
    } catch (e) {
      console.warn("[api] couldn't read request body for debug:", e);
    }

    const res = await app.fetch(request);

    console.log(`[api] upstream status: ${res.status}`);

    return res;
  } catch (err: any) {
    console.error("[api] Elysia threw:", err);
    const body = `Elysia error: ${err?.message ?? String(err)}\n\n${err?.stack ?? ""}`;
    return new Response(body, {
      status: 500,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
};

export const Route = createFileRoute("/api/$")({
  server: {
    handlers: {
      GET: handle,
      POST: handle,
      PATCH: handle,
      DELETE: handle,
      PUT: handle,
    },
  },
});

export const api = createIsomorphicFn()
  .server(() => treaty(handle as unknown as any))
  .client(() => treaty<typeof app>("http://localhost:3000"));
