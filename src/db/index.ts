import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

console.log("[db] VITE_DATABASE_URL:", process.env.VITE_DATABASE_URL ? "SET" : "UNDEFINED");

const sql = neon(process.env.VITE_DATABASE_URL!);
export const db = drizzle({ client: sql });
