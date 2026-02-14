import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { APIError as BetterAuthError } from "better-auth";
import { createJsonResponse } from "@/utils/response";
import { BaseError } from "@/utils/error";

import admin from "./admin";
import auth from "./auth";
import health from "./health";
import school from "./school";
import teacher from "./teacher";
import student from "./student";

const app = new Elysia()
	.error({ BaseError })
	.onError(({ code, error, status }) => {
		if (code === "VALIDATION") {
			return createJsonResponse({
				msg: error.messageValue?.message,
				data: error.all,
			});
		}

		if (error instanceof BetterAuthError) {
			return status(
				500,
				createJsonResponse({
					msg: error.message,
				}),
			);
		}
	})
	.use(cors())
	.use(health)
	.use(auth)
	.use(admin)
	.use(school)
	.use(teacher)
	.use(student);

export type AppType = typeof app;
export default app;
