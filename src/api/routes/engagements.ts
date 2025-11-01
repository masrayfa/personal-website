import Elysia from "elysia";

const prefix = "engagements";

export const engagements = new Elysia({
  prefix,
}).get("/", () => {
  return [
    { id: 1, name: "Engagement One" },
    { id: 2, name: "Engagement Two" },
  ];
});
