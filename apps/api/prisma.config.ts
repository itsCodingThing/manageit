import "dotenv/config";
import path from "node:path";
import { env, defineConfig } from "prisma/config";

export default defineConfig({
  schema: path.join("prisma", "schema"),
  migrations: {
    path: path.join("prisma", "migrations"),
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
  typedSql: {
    path: path.join("prisma", "sql"),
  },
});
