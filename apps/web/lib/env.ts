import { z } from "zod";

const EnvSchema = z.object({
	DATABASE_URL: z.string("required DATABASE_URL"),
	BETTER_AUTH_SECRET: z.string("required BETTER_AUTH_SECRET"),
	BETTER_AUTH_URL: z.string("required BETTER_AUTH_URL"),
});

export const Env = await EnvSchema.parseAsync(process.env);
