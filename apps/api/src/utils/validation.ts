import { ValidationError } from "@/utils/error";
import { z, ZodError } from "zod";

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
      const errMessages = error.issues.map(
        ({ message, path }) => `${path[0]} ${message.toLowerCase()}`,
      );

      throw new ValidationError({ data: errMessages, msg: "failed to parse" });
    }

    throw new ValidationError({
      msg: "something wrong with the zod parsing",
    });
  }
}
