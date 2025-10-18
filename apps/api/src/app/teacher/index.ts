import { validator } from "hono/validator";
import { prisma } from "@/database/db.connection";
import { createResponse } from "@/utils/response";
import { parseAsync, zod } from "@/utils/validation";
import { hono } from "@/app/hono-factory";

const teacher = hono.createApp();

/**
 * @route GET "/api/teacher"
 * @desc  get teachers
 */
teacher.get(
  "/",
  validator("query", async (value) => {
    const { schoolId } = await parseAsync(
      zod.object({ schoolId: zod.string() }),
      value,
    );

    return schoolId;
  }),
  async (ctx) => {
    const schoolId = ctx.req.valid("query");

    return ctx.json(
      createResponse({
        data: await prisma.teacher.findMany({ where: { schoolId: schoolId } }),
      }),
    );
  },
);

/**
 * @route POST "/api/teacher"
 * @desc  create teacher
 */
teacher.post(
  "/",
  validator("json", async (value) => {
    const body = await parseAsync(
      zod.object({
        schoolId: zod.string(),
        name: zod.string(),
        email: zod.string(),
        phoneNumber: zod.string(),
      }),
      value,
    );

    return body;
  }),
  async (ctx) => {
    const body = ctx.req.valid("json");

    const school = await prisma.school.findFirst({
      where: { id: body.schoolId },
    });
    if (!school) {
      return ctx.json(
        createResponse({ msg: "unable to find school", code: 500 }),
        500,
      );
    }

    const teacher = await prisma.teacher.findFirst({
      where: { OR: [{ email: body.email }, { phoneNumber: body.phoneNumber }] },
    });
    if (teacher) {
      return ctx.json(
        createResponse({ msg: "Email or Contact already exists", code: 500 }),
        500,
      );
    }

    await prisma.teacher.create({ data: { ...body, isSchoolAdmin: false } });

    return ctx.json(
      createResponse({
        msg: "teacher successfully created",
      }),
    );
  },
);

export type TeacherApiType = typeof teacher;
export default teacher;
