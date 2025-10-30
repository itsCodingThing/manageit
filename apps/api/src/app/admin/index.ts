import { hono } from "@/app/hono-factory";
import { prisma } from "@/database/db.connection";
import { parseAsync, zod } from "@/utils/validation";
import { createResponse } from "@/utils/response";
import Messages from "@/constants/messages";
import { validator } from "hono/validator";
import adminValidators from "./validators";
import { ApiError } from "@/utils/error";

const admin = hono.createApp();

/**
 *  @route  GET "/api/admin"
 *  @desc   Get all admins
 */
admin.get(
  "/",
  validator(
    "query",
    async (value) => await parseAsync(adminValidators.getAdminsQuery, value),
  ),
  async (ctx) => {
    const query = ctx.req.valid("query");

    // this type of pagination is not scalable at large datasets (use cursor based pagination)
    let skip = 0;
    if (query.page > 1) {
      skip = query.page * query.count;
    }

    const results = await prisma.admin.findMany({
      select: {
        name: true,
        id: true,
        email: true,
        createdAt: true,
        status: true,
      },
      skip: skip,
      take: query.count,
      orderBy: {
        createdAt: "desc",
      },
    });

    return ctx.json(
      createResponse({
        msg: Messages.SUCCESS.RECORDS_FETCHED.message,
        data: results,
      }),
    );
  },
);

/**
 *  @route  GET "/api/admin/:adminId"
 *  @desc   Get admin details
 */
admin.get(
  "/:adminId",
  validator(
    "param",
    async (value) =>
      await parseAsync(adminValidators.getAdminDetailsParams, value),
  ),
  async (ctx) => {
    const { adminId } = ctx.req.valid("param");

    return ctx.json(
      createResponse({
        msg: Messages.SUCCESS.RECORD_FETCHED.message,
        data: await prisma.admin.findFirst({
          where: { id: adminId },
          select: {
            name: true,
            id: true,
            email: true,
            status: true,
          },
        }),
      }),
    );
  },
);

/**
 *  @rotue   POST "/api/admin"
 *  @desc    Create new admin
 */
admin.post(
  "/",
  validator(
    "json",
    async (value) => await parseAsync(adminValidators.createAdminBody, value),
  ),
  async (ctx) => {
    const body = ctx.req.valid("json");

    // check if the admin user exists with this email
    const alreadyExistUser = await prisma.admin.findFirst({
      where: { email: body.email },
    });
    if (alreadyExistUser) {
      throw new ApiError({
        msg: "Email already register with us",
      });
    }

    // create new admin user
    const user = await prisma.admin.create({
      data: {
        ...body,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return ctx.json(
      createResponse({
        data: user,
      }),
    );
  },
);

/**
 *  @rotue   PUT "/api/admin"
 *  @desc    update user
 */
admin.put("/", async (ctx) => {
  const { adminId, ...body } = await parseAsync(
    zod.object({
      adminId: zod.string(),
      name: zod.string().min(1, "please enter admin name").optional(),
      email: zod.email("please enter a valid email").optional(),
    }),
    await ctx.req.json(),
  );

  // check if the user exists with this email
  if (body.email) {
    const alreadyExistUser = await prisma.admin.findFirst({
      where: { email: body.email, id: { not: adminId } },
    });
    if (alreadyExistUser) {
      const code = 500;
      ctx.status(code);
      return ctx.json(
        createResponse({ code, msg: "Email already register with us" }),
      );
    }
  }

  // create new admin user
  const user = await prisma.admin.update({
    where: {
      id: adminId,
    },
    data: body,
  });

  return ctx.json(
    createResponse({
      data: user,
    }),
  );
});

/**
 * @route   DELETE "/api/admin/:adminId"
 * @desc    Remove admin
 */
admin.delete("/:adminId", async (ctx) => {
  const { adminId } = await parseAsync(
    zod.object({ adminId: zod.string() }),
    ctx.req.param(),
  );
  await prisma.admin.delete({ where: { id: adminId } });

  return ctx.json(createResponse({ data: "admin deleted successfully" }));
});

export type AdminApiType = typeof admin;
export default admin;
