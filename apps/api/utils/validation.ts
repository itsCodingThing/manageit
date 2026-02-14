import { ZodError, z } from "zod";
import { ValidationError } from "./error";

export const zod = z;

export async function parseAsync<ZSchema extends z.ZodType>(
	schema: ZSchema,
	value: unknown,
) {
	try {
		const safeValues = await schema.parseAsync(value);
		return safeValues as z.output<ZSchema>;
	} catch (error) {
		if (error instanceof ZodError) {
			throw new ValidationError({
				data: z.flattenError(error).fieldErrors,
				msg: "failed to parse",
			});
		}

		throw new ValidationError({
			msg: "something wrong with the zod parsing",
		});
	}
}
