import { validator } from "hono/validator";
import { prisma } from "@/database/db.connection";
import { parseAsync, zod } from "@/utils/validation";
import { createResponse } from "@/utils/response";
import { hono } from "@/app/hono-factory";
import { authAPI } from "@/services/auth";
import schoolValidators from "./validators";
import { ApiError } from "@/utils/error";

const school = hono.createApp();

/**
 * @route   GET "/api/school"
 * @desc    list school
 */
school.get("/", async (ctx) => {
	return ctx.json(createResponse({ data: await prisma.school.findMany() }));
});

/**
 * @route   POST "/api/school"
 * @desc    create school
 */
school.post(
	"/",
	validator(
		"json",
		async (value) => await parseAsync(schoolValidators.createSchoolBody, value),
	),
	async (ctx) => {
		const body = ctx.req.valid("json");

		// check if school exists with email or code
		let [school, teacher] = await Promise.all([
			prisma.school.findFirst({
				select: { id: true, name: true },
				where: { OR: [{ email: body.email }, { code: body.code }] },
			}),
			prisma.user.findFirst({
				select: { id: true, name: true },
				where: {
					OR: [{ email: body.email }, { phoneNumber: body.phoneNumber }],
				},
			}),
		]);

		if (school) {
			throw new ApiError({
				msg: "Email or Code already register with us",
			});
		}

		if (teacher) {
			throw new ApiError({
				msg: "Email or Phone number already register with us",
			});
		}

		prisma.$transaction(async (tx) => {
			school = await tx.school.create({
				data: {
					name: body.name,
					email: body.email,
					phoneNumber: body.phoneNumber,
					code: body.code,
					type: body.type,
					schoolAdmins: [],
					schoolDetails: {
						create: {},
					},
				},
			});

			teacher = await tx.teacher.create({
				data: {
					schoolId: school.id,
					name: body.name,
					email: body.email,
					phoneNumber: body.phoneNumber,
					isSchoolAdmin: true,
				},
			});

			await tx.school.update({
				where: { id: school.id },
				data: {
					schoolAdmins: { push: teacher.id },
				},
			});

			await authAPI.signUpEmail({
				body: {
					type: "teacher",
					name: body.name,
					email: body.email,
					password: body.password,
					phoneNumber: body.phoneNumber,
				},
			});
		});

		return ctx.json(
			createResponse({
				data: "created successfully",
			}),
		);
	},
);

/**
 * @route   PUT "/api/school"
 * @desc    update school
 */
school.put("/", async (ctx) => {
	const body = await parseAsync(
		zod.object({
			id: zod.string(),
			name: zod.string().optional(),
			address: zod.string().optional(),
			image: zod.string().optional(),
		}),
		await ctx.req.json(),
	);
	const { id, ...update } = body;

	await prisma.school.update({
		where: { id: id },
		data: update,
	});

	return ctx.json(
		createResponse({
			msg: "school details updated successfully",
		}),
	);
});

/**
 * @route   DELETE "/api/v1/school/:schoolId"
 * @desc    Remove school by admin
 */
school.delete("/:schoolId", async (ctx) => {
	return ctx.json(createResponse({ msg: "school removed successfully" }));
});

export type SchoolApiType = typeof school;
export default school;
