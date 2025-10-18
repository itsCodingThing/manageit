import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/prisma-generated/client";
import { Env } from "@/utils/env";

const pgAdapter = new PrismaPg({ connectionString: Env.DATABASE_URL });

export const prisma = new PrismaClient({
  adapter: pgAdapter,
});
