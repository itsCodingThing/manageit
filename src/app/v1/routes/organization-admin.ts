import type { FastifyPluginAsync } from "fastify";

import { prisma } from "project/database/db";
import { parseAsync, zod } from "project/utils/validation";
import { sendJsonResponse } from "project/utils/server-response";
import { ApiError } from "project/utils/error";

export const organizationAdminRoutes: FastifyPluginAsync = async (fastify) => {
  /**
   *  @route  GET "/api/v1/org-admins"
   *  @desc   Get all admins
   */
  fastify.route({
    method: "GET",
    url: "/org-admins",
    handler: async (_req, res) => {
      const org = await prisma.organizationAdmin.findMany();
      if (!org.length) {
        throw new ApiError({
          msg: "No organization admin available",
        });
      }

      return sendJsonResponse(res, {
        data: org,
      });
    },
  });

  /**
   *  @route  POST "/api/v1/org-admin"
   *  @desc   create org admin
   */
  fastify.route({
    method: "POST",
    url: "/org-admin",
    handler: async (req, res) => {
      const body = await parseAsync(
        zod.object({
          organizationId: zod.number(),
          name: zod.string(),
          email: zod.string(),
          contact: zod.string(),
        }),
        req.body,
      );

      const org = await prisma.organizationAdmin.create({
        data: {
          organizationId: body.organizationId,
          name: body.name,
          contact: body.contact,
          email: body.email,
        },
      });

      return sendJsonResponse(res, {
        data: org,
      });
    },
  });

  /**
   *  @route  GET "/api/v1/org-admin/:adminId"
   *  @desc   Get org admin details
   */
  fastify.route({
    method: "GET",
    url: "/org-admin/:adminId",
    handler: async (req, res) => {
      const { adminId } = await parseAsync(
        zod.object({ adminId: zod.coerce.number() }),
        req.params,
      );

      const details = await prisma.organizationAdmin.findFirst({
        where: { id: adminId },
        select: { name: true, id: true, contact: true, email: true },
      });

      if (!details) {
        throw new ApiError({
          msg: "Thers is no organization admin registered with this id",
        });
      }

      return sendJsonResponse(res, {
        data: details,
      });
    },
  });

  /**
   * @route   DELETE "/api/v1/org-admin/:adminId"
   * @desc    Remove org admin
   */
  fastify.route({
    method: "DELETE",
    url: "/org-admin/:adminId",
    handler: async (req, res) => {
      const { adminId } = await parseAsync(
        zod.object({ adminId: zod.coerce.number() }),
        req.params,
      );
      await prisma.adminUser.delete({ where: { id: adminId } });

      return sendJsonResponse(res, {
        data: "admin deleted successfully",
      });
    },
  });
};
