import { validator } from "hono/validator";
import { createResponse } from "@/utils/response";
import { hono } from "@/app/hono-factory";
import { parseAsync, zod } from "@/utils/validation";
import { prisma } from "@/database/db.connection";

const exam = hono.createApp();

/**
 * @rotue   GET "/api/exam"
 * @desc    get exams
 */
exam.get(
  "/",
  validator("query", async (value) => {
    const body = parseAsync(zod.object({ schoolId: zod.string() }), value);

    return body;
  }),
  async (ctx) => {
    const body = ctx.req.valid("query");

    const data = await prisma.exam.findMany({
      where: { schooldId: body.schoolId },
    });

    return ctx.json(createResponse({ data }));
  },
);

/**
 * @rotue   POST "/api/exam"
 * @desc    create exam
 */
exam.post(
  "/exam",
  validator("json", async (value) => {
    const body = await parseAsync(
      zod.object({
        schoolId: zod.string(),
        teacherId: zod.string(),
        name: zod.string(),
        students: zod.array(zod.string()).min(1),
      }),
      value,
    );

    return body;
  }),
  async (ctx) => {
    const body = ctx.req.valid("json");

    const exam = await prisma.exam.create({
      data: {
        schooldId: body.schoolId,
        teacherId: body.teacherId,
        name: body.name,
      },
    });

    //
    // TODO: need scheduling for exams
    //

    await prisma.teacherExamDetails.update({
      where: { id: body.teacherId },
      data: { activeExams: { push: exam.id } },
    });

    await prisma.studentExamDetails.updateMany({
      where: { id: { in: body.students } },
      data: {
        activeExams: { push: exam.id },
      },
    });

    return ctx.json(createResponse({ msg: "student added successfully" }));
  },
);

export type ExamApiType = typeof exam;
export default exam;
