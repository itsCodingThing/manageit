import Elysia from "elysia";
import { betterAuthApi } from "@/services/auth";
import { ApiError } from "@/utils/error";
import { zod } from "@/utils/validation";

export const authMiddleware = new Elysia({ name: "auth middleware" })
	.guard({
		headers: zod.object({ authorization: zod.string("required auth token") }),
	})
	.resolve(async ({ headers }) => {
		const session = await betterAuthApi.getSession({ headers });

		if (!session) {
			throw new ApiError({ msg: "invalid auth token" });
		}

		return {
			userId: session.user.id,
		};
	})
	.as("scoped");
