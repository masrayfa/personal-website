// Cloudflare's Vite plugin runs server code inside a Workers runtime
// emulation (workerd/Miniflare). That sandbox does NOT inherit the host
// process's environment variables (e.g. Railway's dashboard variables) —
// it only reads vars from wrangler.json's `vars` or from a `.dev.vars`
// file. This script bridges the gap: it copies the relevant variables
// from process.env (set by Railway) into `.dev.vars` before `vite` starts,
// so the Workers sandbox can see them as `process.env.X` at runtime.

import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

// Add any other keys your app needs inside the Workers runtime here.
const KEYS = ["VITE_DATABASE_URL", "VITE_DATABASE_URL_POOLER"];

const lines = KEYS.filter((key) => process.env[key] !== undefined).map(
  (key) => `${key}=${process.env[key]}`,
);

if (lines.length === 0) {
  console.warn(
    "[write-dev-vars] None of the expected variables were found in process.env:",
    KEYS.join(", "),
  );
} else {
  const outPath = resolve(process.cwd(), ".dev.vars");
  writeFileSync(outPath, lines.join("\n") + "\n");
  console.log(
    `[write-dev-vars] Wrote ${lines.length} var(s) to ${outPath}:`,
    lines.map((l) => l.split("=")[0]).join(", "),
  );
}
