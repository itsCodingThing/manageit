import "dotenv/config";
import { except } from "hono/combine";
import { cors } from "hono/cors";
import { logger as honoLogger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";

import { hono } from "./hono-factory";
import { authMiddleware } from "@/middleware/auth";
import { createErrorResponse } from "@/utils/error";
import auth from "./auth";
import admin from "./admin";
import school from "./school";
// import schoolAdmin from "./school-admin";
import teacher from "./teacher";
import exam from "./exam";
// import student from "./student";

const api = hono.createApp().basePath("/api");

api.use(secureHeaders());
api.use(honoLogger());
api.use(cors());

// custom middleware setup
api.use(except("/api/auth/*", authMiddleware()));

// routes setup
api.route("/auth", auth);
api.route("/admin", admin);
api.route("/school", school);
// api.route("/", schoolAdmin);
api.route("/teacher", teacher);
// api.route("/", student);
api.route("/exam", exam);

// common error handler
api.onError((error, ctx) => {
  const resposne = createErrorResponse(error);
  // @ts-ignore
  // http status code type error beacuse of hono it doen't support number type
  return ctx.json(resposne, resposne.statusCode);
});

export default api;
