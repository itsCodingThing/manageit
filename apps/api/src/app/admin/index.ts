import { hono } from "@/app/hono-factory";
import { prisma } from "@/database/db.connection";
import { parseAsync, zod } from "@/utils/validation";
import { createResponse } from "@/utils/response";
import Messages from "@/constants/messages";
import { validator } from "hono/validator";
import { ApiError } from "@/utils/error";

const admin = hono.createApp();

/**
 *  @route  GET "/api/admin"
 *  @desc   Get all admins
 */
admin.get(
	"/",
	validator("query", async (value) => {
		return await parseAsync(
			zod.object({
				page: zod.coerce.number().min(1).default(1),
				count: zod.coerce.number().min(1).default(10),
			}),
			value,
		);
	}),
	async (ctx) => {
		const query = ctx.req.valid("query");

		// this type of pagination is not scalable at large datasets (use cursor based pagination)
		let skip = 0;
		if (query.page > 1) {
			skip = query.page * query.count;
		}

		const results = await prisma.admin.findMany({
			select: {
				name: true,
				id: true,
				email: true,
				createdAt: true,
				status: true,
			},
			skip: skip,
			take: query.count,
			orderBy: {
				createdAt: "desc",
			},
		});

		return ctx.json(
			createResponse({
				msg: Messages.SUCCESS.RECORDS_FETCHED.message,
				data: results,
			}),
		);
	},
);

/**
 *  @route  GET "/api/admin/:adminId"
 *  @desc   Get admin details
 */
admin.get(
	"/:adminId",
	validator("param", async (value) => {
		return await parseAsync(zod.object({ adminId: zod.string() }), value);
	}),
	async (ctx) => {
		const { adminId } = ctx.req.valid("param");

		const result = await prisma.admin.findFirst({
			where: { id: adminId },
			select: {
				name: true,
				id: true,
				email: true,
				status: true,
			},
		});

		if (!result) {
			throw new ApiError({ msg: Messages.ERROR.RECORD_NOT_FOUND.message });
		}

		return ctx.json(
			createResponse({
				msg: Messages.SUCCESS.RECORD_FETCHED.message,
				data: result,
			}),
		);
	},
);

/**
 *  @rotue   POST "/api/admin"
 *  @desc    Create new admin
 */
admin.post(
	"/",
	validator("json", async (value) => {
		return await parseAsync(
			zod.object({
				name: zod.string().min(1),
				email: zod.email(),
				password: zod.string().min(8),
				phoneNumber: zod.string().length(10),
			}),
			value,
		);
	}),
	async (ctx) => {
		const body = ctx.req.valid("json");

		// check if the admin user exists with this email
		const alreadyExistUser = await prisma.admin.findFirst({
			where: { email: body.email },
		});
		if (alreadyExistUser) {
			throw new ApiError({
				msg: "Email already register with us",
			});
		}

		// create new admin user
		const user = await prisma.admin.create({
			data: {
				...body,
			},
			select: {
				id: true,
				name: true,
				email: true,
			},
		});

		return ctx.json(
			createResponse({
				data: user,
			}),
		);
	},
);

/**
 *  @rotue   PUT "/api/admin"
 *  @desc    update user
 */
admin.put("/", async (ctx) => {
	const { adminId, ...body } = await parseAsync(
		zod.object({
			adminId: zod.string(),
			name: zod.string().min(1, "please enter admin name").optional(),
			email: zod.email("please enter a valid email").optional(),
		}),
		await ctx.req.json(),
	);

	// check if the user exists with this email
	if (body.email) {
		const alreadyExistUser = await prisma.admin.findFirst({
			where: { email: body.email, id: { not: adminId } },
		});
		if (alreadyExistUser) {
			const code = 500;
			ctx.status(code);
			return ctx.json(
				createResponse({ code, msg: "Email already register with us" }),
			);
		}
	}

	// create new admin user
	const user = await prisma.admin.update({
		where: {
			id: adminId,
		},
		data: body,
	});

	return ctx.json(
		createResponse({
			data: user,
		}),
	);
});

/**
 * @route   DELETE "/api/admin/:adminId"
 * @desc    Remove admin
 */
admin.delete("/:adminId", async (ctx) => {
	const { adminId } = await parseAsync(
		zod.object({ adminId: zod.string() }),
		ctx.req.param(),
	);
	await prisma.admin.delete({ where: { id: adminId } });

	return ctx.json(createResponse({ data: "admin deleted successfully" }));
});

export type AdminApiType = typeof admin;
export default admin;
