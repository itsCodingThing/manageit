import { Hono } from "hono";

import { prisma } from "@/database/db.connection";
import { parseAsync, zod } from "@/utils/validation";
import { createResponse } from "@/utils/response";

const admin = new Hono();

/**
 *  @route  GET "/api/admin"
 *  @desc   Get all admins
 */
admin.get("/", async (ctx) => {
  const query = await parseAsync(
    zod.object({
      page: zod.coerce
        .number()
        .min(1, "page can not be less then 1")
        .default(1),
      count: zod.coerce
        .number()
        .min(1, "count can not be less then 1")
        .default(10),
    }),
    ctx.req.query(),
  );

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
      data: results,
    }),
  );
});

/**
 *  @route  GET "/api/admin/:adminId"
 *  @desc   Get admin details
 */
admin.get("/:adminId", async (ctx) => {
  const { adminId } = await parseAsync(
    zod.object({ adminId: zod.string() }),
    ctx.req.param(),
  );

  return ctx.json(
    createResponse({
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
});

/**
 *  @rotue   POST "/api/admin"
 *  @desc    Create new admin
 */
admin.post("/", async (ctx) => {
  const body = await parseAsync(
    zod.object({
      name: zod.string().min(1, "please enter admin name"),
      email: zod.email("please enter a valid email"),
      password: zod.string().min(8, "password must be 8 charactor long"),
      phoneNumber: zod.string().length(10, "please enter valid contact number"),
    }),
    await ctx.req.json(),
  );

  // check if the admin user exists with this email
  const alreadyExistUser = await prisma.admin.findFirst({
    where: { email: body.email },
  });
  if (alreadyExistUser) {
    const code = 500;
    ctx.status(code);

    return ctx.json(
      createResponse({ code, msg: "Email already register with us" }),
    );
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
});

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
