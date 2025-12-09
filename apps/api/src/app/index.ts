import { except } from "hono/combine";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";
import type { ContentfulStatusCode } from "hono/utils/http-status";

import { hono } from "./hono-factory";
import { authMiddleware } from "@/middleware/auth";
import { createErrorResponse } from "@/utils/response";
import { Routes } from "./routes";

const api = hono.createApp().basePath("/api");

api.use(secureHeaders());
api.use(logger());
api.use(cors());

// auth middleware
api.use(except(["/api/auth/*", "/api/public/*"], authMiddleware()));

// routes setup
Routes.forEach(({ basePath, router }) => {
  api.route(basePath, router);
});

// common error handler
api.onError((error, ctx) => {
  const resposne = createErrorResponse(error);

  return ctx.json(resposne, resposne.statusCode as ContentfulStatusCode);
});

export default api;
