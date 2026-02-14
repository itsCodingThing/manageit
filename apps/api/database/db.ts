import { drizzle } from "drizzle-orm/node-postgres";
import { Env } from "@/utils/env";
import * as schema from "./schema";

export const db = drizzle(Env.DATABASE_URL, { schema });
