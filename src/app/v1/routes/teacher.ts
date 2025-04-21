import type { FastifyPluginAsync } from "fastify";

import { prisma } from "project/database/db";
import { parseAsync, zod } from "project/utils/validation";
import { sendJsonResponse } from "project/utils/server-response";
import { ApiError } from "project/utils/error";

export const teacherRoutes: FastifyPluginAsync = async (fastify) => {
	/**
	 * @route GET "/api/v1/teacher"
	 * @desc  Get Teacher list
	 */
	fastify.route({
		method: "GET",
		url: "/teacher",
		handler: async (_req, res) => {
			return sendJsonResponse(res, {
				data: await prisma.teacher.findMany(),
			});
		},
	});

	/**
	 * @route GET "/api/v1/teacher/:teacherId"
	 * @desc  Get Teacher
	 */
	fastify.route({
		method: "GET",
		url: "/teacher/:teacherId",
		handler: async (req, res) => {
			const { teacherId } = await parseAsync(
				zod.object({ teacherId: zod.coerce.number() }),
				req.params,
			);

			return sendJsonResponse(res, {
				data: await prisma.teacher.findMany({ where: { id: teacherId } }),
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
				throw new ApiError({ msg: "unable to find org" });
			}

			const teacher = await prisma.teacher.findFirst({
				where: { OR: [{ email: body.email }, { contact: body.contact }] },
			});
			if (teacher) {
				throw new ApiError({ msg: "Email or Contact already exists" });
			}

			const newTeacher = await prisma.teacher.create({
				data: {
					school_id: body.schoolId,
					name: body.name,
					contact: body.contact,
					email: body.email,
				},
			});

			return sendJsonResponse(res, {
				msg: "teacher successfully created",
				data: { id: newTeacher.id },
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

			return sendJsonResponse(res, {
				msg: "teacher successfully created",
			});
		},
	});
};
