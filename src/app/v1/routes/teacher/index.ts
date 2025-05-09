import type { FastifyPluginAsync } from "fastify";

import { prisma } from "project/database/db";
import { parseAsync, zod } from "project/utils/validation";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "project/utils/server-response";

export const teacherRoutes: FastifyPluginAsync = async (fastify) => {
  /**
   * @route GET "/api/v1/teacher"
   * @desc  Get Teacher list
   */
  fastify.route({
    method: "GET",
    url: "/teacher",
    handler: async (req, res) => {
      const { schoolId } = await parseAsync(
        zod.object({ schoolId: zod.coerce.number() }),
        req.query,
      );

      return sendSuccessResponse({
        data: await prisma.teacher.findMany({ where: { school_id: schoolId } }),
        response: res,
      });
    },
  });

  /**
   * @route POST "/api/v1/teacher"
   * @desc  create teacher
   */
  fastify.route({
    method: "POST",
    url: "/teacher",
    handler: async (req, res) => {
      const body = await parseAsync(
        zod.object({
          schoolId: zod.coerce.number(),
          name: zod.string(),
          email: zod.string(),
          contact: zod.string(),
        }),
        req.body,
      );

      const school = await prisma.organization.findFirst({
        where: { id: body.schoolId },
      });
      if (!school) {
        return sendErrorResponse({
          response: res,
          msg: "unable to find school",
        });
      }

      const teacher = await prisma.teacher.findFirst({
        where: { OR: [{ email: body.email }, { contact: body.contact }] },
      });
      if (teacher) {
        return sendErrorResponse({
          response: res,
          msg: "Email or Contact already exists",
        });
      }

      await prisma.teacher.create({ data: body });

      return sendSuccessResponse({
        response: res,
        msg: "teacher successfully created",
      });
    },
  });

  /**
   * @route DELETE "/api/v1/teacher/:teacherId"
   * @desc  remove teacher
   */
  fastify.route({
    method: "DELETE",
    url: "/teacher/:teacherId",
    handler: async (req, res) => {
      const params = await parseAsync(
        zod.object({
          teacherId: zod.coerce.number(),
        }),
        req.params,
      );

      await prisma.teacher.delete({ where: { id: params.teacherId } });
      return sendSuccessResponse({
        response: res,
        msg: "teacher successfully created",
      });
    },
  });
};
