import type { FastifyReply, FastifyRequest } from "fastify";

import { verifyJWT } from "project/utils/jwt";
import { sendErrorResponse } from "project/utils/server-response";
import { parseAsync, zod } from "project/utils/validation";

const publicRoutes = [
  "/api/v1/auth/app",
  "/api/v1/auth/login",
  "/api/v1/auth/register",
  "/api/v1/auth/verify",
  "/api/v1/role/list",
  "/api/v1/file",
  "/public/data",
  "/api/v1/app",
  "/api/v1/code",
];

export async function noAuth(_req: FastifyRequest, res: FastifyReply) {
  return sendErrorResponse({
    response: res,
    msg: "Invalid authorization",
    code: 403,
  });
}

export async function publicRoute(req: FastifyRequest) {
  const NON_AUTH_URLS = publicRoutes;

  // check for exceptional routes
  if (NON_AUTH_URLS.some((v) => req.url.toLowerCase().includes(v.toLocaleLowerCase()))) {
    return;
  }

  throw new Error("Public routes error");
}

export async function testntrackAuth(req: FastifyRequest) {
  const { authorization } = await parseAsync(
    zod.object({
      authorization: zod.string(),
    }),
    req.headers
  );

  try {
    const token = authorization.split(" ")[1];
    if (!token) {
      throw new Error("Auth Error");
    }

    const payload = verifyJWT(token);
    req.payload = payload;
    return;
  } catch (error) {
    throw new Error("Auth Error");
  }
}
