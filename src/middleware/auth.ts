import type { FastifyReply, FastifyRequest } from "fastify";

import { getToken, verifyJWT } from "project/services/jwt";
import { ApiError, ValidationError } from "project/utils/error";
import { sendJsonResponse } from "project/utils/server-response";
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
  return sendJsonResponse(res, {
    msg: "Invalid authorization",
    code: 403,
  });
}

export async function publicRoute(req: FastifyRequest) {
  const NON_AUTH_URLS = publicRoutes;

  // check for exceptional routes
  if (
    NON_AUTH_URLS.some((v) =>
      req.url.toLowerCase().includes(v.toLocaleLowerCase()),
    )
  ) {
    return;
  }

  throw new ApiError({ msg: "Public routes error" });
}

export async function testntrackAuth(req: FastifyRequest) {
  const { authorization } = await parseAsync(
    zod.object({
      authorization: zod.string().min(1),
    }),
    req.headers,
  );

  const opaqueToken = authorization.split(" ")[1];
  if (!opaqueToken) {
    throw new ValidationError({ msg: "need auth token" });
  }

  const token = await getToken(opaqueToken);
  if (!token) {
    throw new ValidationError({ msg: "invalid token" });
  }

  try {
    const payload = verifyJWT(token);
    req.payload = payload;

    return;
  } catch (error) {
    throw new ValidationError({ msg: "invalid token" });
  }
}
