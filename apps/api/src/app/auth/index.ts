import { validator } from "hono/validator";
import { createResponse } from "@/utils/response";
import { parseAsync, zod } from "@/utils/validation";
import { authAPI } from "@/services/auth";
import { hono } from "@/app/hono-factory";
import { prisma } from "@/database/db.connection";

const auth = hono.createApp();

/**
 * @rotue   POST "/api/auth/sign-up"
 * @desc    register student/teacher
 */
auth.post(
  "/sign-up",
  validator("json", async (value) => {
    const body = await parseAsync(
      zod.object({
        type: zod.literal(["teacher", "student"]),
        email: zod.email(),
        password: zod.string().min(5),
        name: zod.string().default(() => new Date().toUTCString()),
        contact: zod.string().length(10),
      }),
      value,
    );

    return body;
  }),
  async (ctx) => {
    const body = ctx.req.valid("json");

    const authenticate = await authAPI.signUpEmail({
      body: {
        type: body.type,
        name: body.name,
        email: body.email,
        password: body.password,
        phoneNumber: body.contact,
      },
    });

    return ctx.json(
      createResponse({
        data: { token: authenticate.token },
      }),
    );
  },
);

/**
 * @rotue   POST "/api/auth/sign-in
 * @desc    login student/teacher
 */
auth.post(
  "/sign-in",
  validator("json", async (value) => {
    const body = await parseAsync(
      zod.discriminatedUnion("loginMethod", [
        zod.object({
          loginMethod: zod.literal("contact"),
          type: zod.literal(["teacher", "student"]),
          contact: zod.string().length(10),
        }),
        zod.object({
          loginMethod: zod.literal("password"),
          type: zod.literal(["teacher", "student"]),
          email: zod.email(),
          password: zod.string(),
        }),
      ]),
      value,
    );

    return body;
  }),
  async (ctx) => {
    const body = ctx.req.valid("json");

    if (body.loginMethod === "password") {
      const user = await authAPI.signInEmail({
        body: {
          email: body.email,
          password: body.password,
        },
      });

      return ctx.json(
        createResponse({
          data: { token: user.token, user: user.user },
        }),
      );
    }

    if (body.loginMethod === "contact") {
      await authAPI.sendPhoneNumberOTP({ body: { phoneNumber: body.contact } });

      return ctx.json(
        createResponse({
          msg: "otp send successfully",
        }),
      );
    }
  },
);

/**
 * @rotue   POST "/api/auth/verify-otp
 * @desc    verify otp student/teacher
 */
auth.post(
  "/verify-otp",
  validator("json", async (value) => {
    const body = await parseAsync(
      zod.object({
        contact: zod.string(),
        otp: zod.string(),
      }),
      value,
    );

    return body;
  }),
  async (ctx) => {
    const body = ctx.req.valid("json");

    const data = await authAPI.verifyPhoneNumber({
      body: {
        phoneNumber: body.contact,
        code: body.otp,
      },
    });

    if (!data.status) {
      return ctx.json(
        createResponse({
          msg: "invalid otp",
          code: 401,
        }),
        401,
      );
    }

    return ctx.json(
      createResponse({
        data: { token: data.token, user: data.user },
      }),
    );
  },
);

/**
 * @rotue   POST "/api/auth/admin/sign-up"
 * @desc    register admin
 */
auth.post(
  "/admin/sign-up",
  validator("json", async (value) => {
    const body = await parseAsync(
      zod.object({
        email: zod.email(),
        password: zod.string().min(5),
        name: zod.string().min(1),
        phoneNumber: zod.string().length(10),
      }),
      value,
    );

    return body;
  }),
  async (ctx) => {
    const body = ctx.req.valid("json");

    const authenticate = await authAPI.signUpEmail({
      body: {
        type: "admin",
        name: body.name,
        email: body.email,
        password: body.password,
        phoneNumber: body.phoneNumber,
      },
    });

    await prisma.admin.create({
      data: {
        name: body.name,
        email: body.email,
        phoneNumber: body.phoneNumber,
      },
    });

    return ctx.json(
      createResponse({
        data: { token: authenticate.token },
      }),
    );
  },
);

/**
 * @rotue   POST "/api/auth/admin/sign-in"
 * @desc    login admin
 */
auth.post(
  "/admin/sign-in",
  validator("json", async (value) => {
    const body = await parseAsync(
      zod.object({
        email: zod.email(),
        password: zod.string(),
      }),
      value,
    );

    return body;
  }),
  async (ctx) => {
    const body = ctx.req.valid("json");

    const authenticate = await authAPI.signInEmail({
      body: {
        email: body.email,
        password: body.password,
      },
    });

    return ctx.json(
      createResponse({
        data: { token: authenticate.token },
      }),
    );
  },
);

export type AuthApiType = typeof auth;
export default auth;
