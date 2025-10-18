import { validator } from "hono/validator";
import { prisma } from "@/database/db.connection";
import { parseAsync, zod } from "@/utils/validation";
import { createResponse } from "@/utils/response";
import { hono } from "@/app/hono-factory";
import { authAPI } from "@/services/auth";

const school = hono.createApp();

/**
 * @route   GET "/api/school"
 * @desc    list school by admin
 */
school.get("/", async (ctx) => {
  return ctx.json(createResponse({ data: await prisma.school.findMany() }));
});

/**
 * @route   POST "/api/school"
 * @desc    create school by admin
 */
school.post(
  "/",
  validator("json", async (value) => {
    const body = await parseAsync(
      zod.object({
        name: zod.string().min(1, "Please enter name"),
        email: zod.email("Please enter a valid email"),
        phoneNumber: zod.string().length(10, "Please enter a valid contact"),
        address: zod.string().min(1, "Please enter a valid address"),
        image: zod.string().default(""),
        code: zod.string().min(3, "Code must be atleast 3 digit long"),
        type: zod.string().min(1, "Please enter a valid type"),
        password: zod.string().min(8, "Password must be 8 charactor long"),
      }),
      value,
    );

    return body;
  }),
  async (ctx) => {
    const body = ctx.req.valid("json");

    // check if school exists with email or code
    let school = await prisma.school.findFirst({
      select: { id: true, name: true },
      where: { OR: [{ email: body.email }, { code: body.code }] },
    });
    if (school) {
      return ctx.json(
        createResponse({
          code: 400,
          msg: "Email or Code already register with us",
        }),
        400,
      );
    }

    let teacher = await prisma.user.findFirst({
      select: { id: true, name: true },
      where: { OR: [{ email: body.email }, { phoneNumber: body.phoneNumber }] },
    });
    if (teacher) {
      return ctx.json(
        createResponse({
          code: 400,
          msg: "Email or Phone number already register with us",
        }),
        400,
      );
    }

    // create school with given info
    school = await prisma.school.create({
      data: {
        name: body.name,
        email: body.email,
        phoneNumber: body.phoneNumber,
        code: body.code,
        type: body.type,
        schoolAdmins: [],
        schoolDetails: {
          create: {},
        },
      },
    });

    teacher = await prisma.teacher.create({
      data: {
        schoolId: school.id,
        name: body.name,
        email: body.email,
        phoneNumber: body.phoneNumber,
        isSchoolAdmin: true,
      },
    });

    await authAPI.signUpEmail({
      body: {
        type: "teacher",
        name: body.name,
        email: body.email,
        password: body.password,
        phoneNumber: body.phoneNumber,
      },
    });

    return ctx.json(
      createResponse({
        data: "created successfully",
      }),
    );
  },
);

/**
 * @route   PUT "/api/school"
 * @desc    update school by admin
 */
school.put("/", async (ctx) => {
  const body = await parseAsync(
    zod.object({
      id: zod.string(),
      name: zod.string().optional(),
      address: zod.string().optional(),
      email: zod.string().optional(),
      image: zod.string().optional(),
      phoneNumber: zod.string().optional(),
    }),
    await ctx.req.json(),
  );
  const { id, ...update } = body;

  if (body.email || body.phoneNumber) {
    const exists = await prisma.school.findFirst({
      where: {
        id: { not: id },
        OR: [{ email: body.email }, { phoneNumber: body.phoneNumber }],
      },
    });

    if (exists) {
      return ctx.json(
        createResponse({ msg: "Email or Contact already exists" }),
        400,
      );
    }
  }

  await prisma.school.update({
    where: { id: id },
    data: update,
  });

  return ctx.json(
    createResponse({
      msg: "school details updated successfully",
    }),
  );
});

/**
 * @route   DELETE "/api/v1/school/:schoolId"
 * @desc    Remove school by admin
 */
school.delete("/:schoolId", async (ctx) => {
  return ctx.json(createResponse({ msg: "school removed successfully" }));
});

export type SchoolApiType = typeof school;
export default school;
