import type { FastifyPluginAsync } from "fastify";

import { prisma } from "project/database/db";
import { parseAsync, zod } from "project/utils/validation";
import {
	sendErrorResponse,
	sendSuccessResponse,
} from "project/utils/server-response";
import logger from "project/utils/logger";

export const schoolAdminUserRoutes: FastifyPluginAsync = async (fastify) => {
	/**
	 *  @route  GET "/api/v1/school-admins?schoolId"
	 *  @desc   Get all admins
	 */
	fastify.route({
		method: "GET",
		url: "/school-admins",
		handler: async (req, res) => {
			const query = await parseAsync(
				zod.object({
					schoolId: zod.coerce.number(),
				}),
				req.query,
			);
			logger.info(query, "get school admin query params");

			const school = await prisma.organization.findFirst({
				where: { id: query.schoolId },
			});
			if (!school) {
				return sendErrorResponse({
					msg: "Thers is no school registered with this id",
					response: res,
				});
			}

			return sendSuccessResponse({
				data: await prisma.organizationAdmin.findMany({
					where: { organizationId: school.id },
					select: { name: true, id: true, contact: true, email: true },
					orderBy: { name: "asc" },
				}),
				response: res,
			});
		},
	});

	/**
	 *  @route  GET "/api/v1/admin/:adminId"
	 *  @desc   Get admin details
	 */
	fastify.route({
		method: "GET",
		url: "/school-admin/:adminId",
		handler: async (req, res) => {
			const { adminId } = await parseAsync(
				zod.object({ adminId: zod.coerce.number() }),
				req.params,
			);

			return sendSuccessResponse({
				data: await prisma.adminUser.findFirst({
					where: { id: adminId },
					select: { name: true, id: true, contact: true, email: true },
				}),
				response: res,
			});
		},
	});

	/**
	 * @route   DELETE "/api/v1/admin/user/remove/:id"
	 * @desc    Remove admin
	 */
	fastify.route({
		method: "DELETE",
		url: "/school-admin/:adminId/remove",
		handler: async (req, res) => {
			const { adminId } = await parseAsync(
				zod.object({ adminId: zod.coerce.number() }),
				req.params,
			);
			await prisma.adminUser.delete({ where: { id: adminId } });

			return sendSuccessResponse({
				data: "admin deleted successfully",
				response: res,
			});
		},
	});
};
