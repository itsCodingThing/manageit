import { zod } from "./validation";

export const Env = await zod.parseAsync(
  zod.object({ DATABASE_URL: zod.string() }),
  process.env,
);
