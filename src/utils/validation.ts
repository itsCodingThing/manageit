import { z, ZodError } from "zod";
import { ValidationError } from "project/utils/error";

export const zod = z;
export async function parseAsync<TSchema extends z.ZodTypeAny>(
	schema: TSchema,
	value: unknown,
) {
	try {
		const safeValues = await schema.parseAsync(value);
		return safeValues as z.infer<TSchema>;
	} catch (error) {
		if (error instanceof ZodError) {
			const errMessages = error.issues.map(({ message }) => message);
			throw new ValidationError({ data: errMessages });
		}

		throw new ValidationError({ data: error });
	}
}
