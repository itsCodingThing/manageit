import type { FastifyPluginAsync } from "fastify";

import { prisma } from "project/database/db";
import { parseAsync, zod } from "project/utils/validation";
import {
	sendErrorResponse,
	sendSuccessResponse,
} from "project/utils/server-response";
import { encryptPassword } from "project/utils/encrypt";

export const adminRoutes: FastifyPluginAsync = async (fastify) => {
	/**
	 *  @route  GET "/api/v1/admin"
	 *  @desc   Get all admins
	 */
	fastify.route({
		method: "GET",
		url: "/admin",
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
	 *  @route  GET "/api/v1/admin/:adminId"
	 *  @desc   Get admin details
	 */
	fastify.route({
		method: "GET",
		url: "/admin/:adminId",
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
	 *  @rotue   POST "/api/v1/admin"
	 *  @desc    Create new user
	 */
	fastify.route({
		method: "POST",
		url: "/admin",
		handler: async (req, res) => {
			const body = await parseAsync(
				zod.object({
					name: zod.string().min(1, "please enter admin name"),
					email: zod.string().email("please enter a valid email"),
					password: zod.string().min(8, "password must be 8 charactor long"),
					contact: zod.string().length(10, "please enter valid contact number"),
				}),
				req.body,
			);

			// check if the admin user exists with this email
			const alreadyExistUser = await prisma.authUser.findFirst({
				where: { email: body.email },
			});
			if (alreadyExistUser) {
				return sendErrorResponse({
					msg: "Email already register with us",
					response: res,
				});
			}

			// create new admin user
			const user = await prisma.adminUser.create({
				data: {
					name: body.name,
					email: body.email,
					contact: body.contact,
				},
				select: {
					id: true,
					name: true,
					email: true,
				},
			});

			await prisma.authUser.create({
				data: {
					email: body.email,
					password: encryptPassword(body.password),
					type: "admin",
					user_id: user.id,
				},
			});

			return sendSuccessResponse({
				data: user,
				response: res,
			});
		},
	});

	/**
	 * @route   DELETE "/api/v1/admin/:adminId"
	 * @desc    Remove admin
	 */
	fastify.route({
		method: "DELETE",
		url: "/admin/:adminId",
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
