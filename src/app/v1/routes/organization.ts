import type { FastifyPluginAsync } from "fastify";

import { prisma } from "project/database/db";
import { parseAsync, zod } from "project/utils/validation";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "project/utils/server-response";
import { encryptPassword } from "project/utils/encrypt";

export const organizationRoutes: FastifyPluginAsync = async (fastify) => {
  /**
   * @route   GET "/api/v1/orgs"
   * @desc    Get all orgs
   */
  fastify.route({
    method: "GET",
    url: "/orgs",
    handler: async (_req, res) => {
      const orgs = await prisma.organization.findMany({
        select: {
          admins: true,
          details: true,
          name: true,
          code: true,
          email: true,
          type: true,
        },
      });
      return sendSuccessResponse({ response: res, data: orgs });
    },
  });

  /**
   * @route   POST "/api/v1/org"
   * @desc    Create org by admin
   */
  fastify.route({
    method: "POST",
    url: "/org",
    handler: async (req, res) => {
      const body = await parseAsync(
        zod.object({
          name: zod.string().min(1, "Please enter name"),
          email: zod.string().email("Please enter a valid email"),
          contact: zod.string().length(10, "Please enter a valid contact"),
          address: zod
            .string()
            .min(1, "Please enter a valid address")
            .optional(),
          image: zod.string().url().optional(),
          code: zod.string().min(3, "Code must be atleast 3 digit long"),
          type: zod.string().min(1, "Please enter a valid type"),
          password: zod.string().min(8, "Password must be 8 charactor long"),
        }),
        req.body
      );

      // check if school exists with email or code
      const school = await prisma.organization.findFirst({
        select: { id: true, name: true },
        where: { OR: [{ email: body.email }, { code: body.code }] },
      });
      if (school) {
        return sendErrorResponse({
          code: 400,
          msg: "Email or Code already register with us",
          response: res,
        });
      }

      // create school with given info
      const org = await prisma.organization.create({
        data: {
          name: body.name,
          email: body.email,
          contact: body.contact,
          code: body.code,
          type: body.type,
          admins: {
            create: {
              name: body.name,
              email: body.email,
              contact: body.contact,
            },
          },
          details: {
            create: {},
          },
        },
      });

      await prisma.authUser.create({
        data: {
          type: "school-admin",
          user_id: org.id,
          email: org.email,
          password: encryptPassword(body.password),
        },
      });

      return sendSuccessResponse({
        response: res,
        msg: "created successfully",
        data: org,
      });
    },
  });

  /**
   * @route   PUT "/api/v1/org"
   * @desc    Update org by admin
   */
  fastify.route({
    method: "PUT",
    url: "/org",
    handler: async (req, res) => {
      const body = await parseAsync(
        zod.object({
          id: zod.coerce.number(),
          name: zod.string().optional(),
          address: zod.string().optional(),
          email: zod.string().optional(),
          image: zod.string().optional(),
          contact: zod.string().optional(),
        }),
        req.body
      );
      const { id, ...update } = body;

      if (body.email || body.contact) {
        const exists = await prisma.organization.findFirst({
          where: {
            id: { not: id },
            OR: [{ email: body.email }, { contact: body.contact }],
          },
        });

        if (exists) {
          return sendErrorResponse({
            response: res,
            msg: "Email or Contact already exists",
          });
        }
      }

      await prisma.organization.update({
        where: { id: id },
        data: update,
      });

      return sendSuccessResponse({
        response: res,
        msg: "school details updated successfully",
      });
    },
  });

  /**
   * @route   DELETE "/api/v1/org/:orgId"
   * @desc    Remove org
   */
  fastify.route({
    method: "DELETE",
    url: "/org/:orgId",
    handler: async (req, res) => {
      const { orgId } = await parseAsync(
        zod.object({ orgId: zod.coerce.number() }),
        req.params
      );

      await prisma.$transaction(async (tx) => {
        await tx.organization.delete({ where: { id: orgId } });
      });

      return sendSuccessResponse({
        response: res,
        msg: "school removed successfully",
      });
    },
  });
};
