import { hono } from "@/app/hono-factory";
import { authAPI } from "@/services/auth";
import { ValidationError } from "@/utils/error";

// const NON_AUTH_URLS = ["/auth"];
// const authorized = !NON_AUTH_URLS.some((v) =>
//   ctx.req.url.toLowerCase().includes(v.toLowerCase()),
// );

export const authMiddleware = () =>
  hono.createMiddleware(async (ctx, next) => {
    const headers = ctx.req.header();
    // TODO: add headers check

    const session = await authAPI.getSession({ headers });

    if (!session) {
      throw new ValidationError({ msg: "invalid auth token" });
    }

    ctx.set("user", session.user);
    ctx.set("session", session.session);
    await next();
  });
