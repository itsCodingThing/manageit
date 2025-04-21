import type { FastifyPluginAsync } from "fastify";

import { prisma } from "project/database/db";
import { sendSuccessResponse } from "project/utils/server-response";

export const examRoutes: FastifyPluginAsync = async (fastify) => {
	/**
	 *  @route  GET "/api/v1/exam"
	 *  @desc   Get all exam
	 */
	fastify.route({
		method: "GET",
		url: "/exam",
		handler: async (_req, res) => {
			return sendSuccessResponse({
				data: await prisma.adminUser.findMany({
					select: { name: true, id: true, contact: true, email: true },
				}),
				response: res,
			});
		},
	});

	/**
	 *  @route  POST "/api/v1/exam"
	 *  @desc   create exam
	 */
	fastify.route({
		method: "POST",
		url: "/exam",
		handler: async (_req, res) => {
			return sendSuccessResponse({
				data: await prisma.adminUser.findMany({
					select: { name: true, id: true, contact: true, email: true },
				}),
				response: res,
			});
		},
	});
};
