import "dotenv/config";
import path from "node:path";
import type { PrismaConfig } from "prisma";

export default {
  experimental: {
    studio: true,
  },
  schema: path.join("prisma", "schema"),
  migrations: {
    path: path.join("prisma", "migrations"),
  },
  typedSql: {
    path: path.join("prisma", "sql"),
  },
} satisfies PrismaConfig;
