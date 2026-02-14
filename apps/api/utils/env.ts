import { zod } from "./validation";

export const Env = await zod.parseAsync(
	zod.object({
		DATABASE_URL: zod.string("required DATABASE_URL"),
		BETTER_AUTH_SECRET: zod.string("required BETTER_AUTH_SECRET"),
		BETTER_AUTH_URL: zod.string("required BETTER_AUTH_URL"),
	}),
	process.env,
);
