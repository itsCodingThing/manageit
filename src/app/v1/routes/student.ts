import type { FastifyPluginAsync } from "fastify";

import { parseAsync, zod } from "project/utils/validation";
import { prisma } from "project/database/db";
import { sendJsonResponse } from "project/utils/server-response";

export const studentRoutes: FastifyPluginAsync = async (fastify) => {
	/**
	 * @route GET "/student/:studentId"
	 * @desc  Get student details
	 */
	fastify.route({
		method: "GET",
		url: "/student/:studentId",
		handler: async (req, res) => {
			const params = await parseAsync(
				zod.object({ stduentId: zod.coerce.number() }),
				req.params,
			);
			const student = await prisma.student.findFirst({
				where: { id: params.stduentId },
			});

			return sendJsonResponse(res, { data: student });
		},
	});

	/**
	 * @rotue   GET "/api/v1/student"
	 * @desc    get all students in school
	 */
	fastify.route({
		method: "GET",
		url: "/student",
		handler: async (_req, res) => {
			return sendJsonResponse(res, {
				data: await prisma.student.findMany({}),
			});
		},
	});

	/**
	 * @rotue   POST "/api/v1/student"
	 * @desc    create student
	 */
	fastify.route({
		method: "POST",
		url: "/student",
		handler: async (req, res) => {
			const body = await parseAsync(
				zod.object({
					schoolId: zod.coerce.number(),
					name: zod.string(),
					contact: zod.string(),
					email: zod.string(),
					address: zod.string(),
				}),
				req.body,
			);

			const newStudent = await prisma.student.create({
				data: {
					school_id: body.schoolId,
					name: body.name,
					contact: body.contact,
					email: body.email,
					address: body.address,
				},
			});

			return sendJsonResponse(res, {
				msg: "student added successfully",
				data: { id: newStudent.id },
			});
		},
	});

	/**
	 * @rotue   PUT "/api/v1/student"
	 * @desc    Update student profile
	 */
	fastify.route({
		method: "PUT",
		url: "/student",
		handler: async (req, res) => {
			const { studentId, ...update } = await parseAsync(
				zod.object({
					studentId: zod.coerce.number(),
					name: zod.string(),
					dob: zod.string(),
					email: zod.string(),
					contact: zod.string(),
					address: zod.string(),
					image: zod.string(),
				}),
				req.body,
			);

			await prisma.student.update({ where: { id: studentId }, data: update });

			return sendJsonResponse(res, {
				msg: "student profile update successfull",
			});
		},
	});

	/**
	 * @rotue   DELETE "/api/v1/student/:studentId"
	 * @desc    Remove student
	 */
	fastify.route({
		method: "DELETE",
		url: "/student/:studentId",
		handler: async (req, res) => {
			const params = await parseAsync(
				zod.object({ studentId: zod.coerce.number() }),
				req.params,
			);
			await prisma.student.delete({ where: { id: params.studentId } });

			return sendJsonResponse(res, { msg: "deleted successfully" });
		},
	});
};
