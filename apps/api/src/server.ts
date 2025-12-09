import api from "./app";
import { prisma } from "./database/db.connection";

await prisma.$connect();

export default {
  port: 8080,
  fetch: api.fetch,
};
