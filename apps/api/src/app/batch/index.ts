import { validator } from "hono/validator";
import { prisma } from "@/database/db.connection";
import { createResponse } from "@/utils/response";
import { parseAsync, zod } from "@/utils/validation";
import { hono } from "@/app/hono-factory";

const batch = hono.createApp();

/**
 * @route GET "/api/batch"
 * @desc  get batches
 */
batch.get(
  "/",
  validator("query", async (value) => {
    const body = await parseAsync(
      zod.object({ schoolId: zod.string() }),
      value,
    );

    return body;
  }),
  async (ctx) => {
    const { schoolId } = ctx.req.valid("query");

    return ctx.json(
      createResponse({
        data: await prisma.teacher.findMany({ where: { schoolId: schoolId } }),
      }),
    );
  },
);

/**
 * @route POST "/api/batch"
 * @desc  create batches
 */
batch.post(
  "/",
  validator("json", async (value) => {
    const body = await parseAsync(
      zod.object({
        schoolId: zod.string(),
        name: zod.string(),
        image: zod.string().optional(),
      }),
      value,
    );

    return body;
  }),
  async (ctx) => {
    const body = ctx.req.valid("json");

    const batch = await prisma.batch.create({
      data: {
        schoolId: body.schoolId,
        name: body.name,
        image: body.image,
      },
    });

    return ctx.json(
      createResponse({
        data: batch.id,
      }),
    );
  },
);

/**
 * @route PUT "/api/batch/add-teachers"
 * @desc  add teachres in batch
 */
batch.put(
  "/add-teachers",
  validator("json", async (value) => {
    const body = await parseAsync(
      zod.object({
        schooldId: zod.string(),
        batchId: zod.string(),
        teachres: zod.array(zod.string()).min(1),
      }),
      value,
    );

    return body;
  }),
  async (ctx) => {
    const body = ctx.req.valid("json");

    await prisma.batch.update({
      where: { id: body.batchId },
      data: {
        teachers: {
          push: body.teachres,
        },
      },
    });

    await prisma.teacher.updateMany({
      where: { id: { in: body.teachres } },
      data: {
        batches: {
          push: body.batchId,
        },
      },
    });

    return ctx.json(
      createResponse({
        msg: "successfully added teachers",
      }),
    );
  },
);

/**
 * @route PUT "/api/batch/add-students"
 * @desc  add students in batch
 */
batch.put(
  "/add-students",
  validator("json", async (value) => {
    const body = await parseAsync(
      zod.object({
        schooldId: zod.string(),
        batchId: zod.string(),
        students: zod.array(zod.string()).min(1),
      }),
      value,
    );

    return body;
  }),
  async (ctx) => {
    const body = ctx.req.valid("json");

    await prisma.batch.update({
      where: { id: body.batchId },
      data: {
        students: body.students,
      },
    });

    return ctx.json(
      createResponse({
        msg: "successfully added students",
      }),
    );
  },
);

export type BatchApiType = typeof batch;
export default batch;
