import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { createJsonResponse } from "@/utils/response";
import { APIError as BetterAuthError } from "better-auth";
import { BaseError } from "@/utils/error";
import { DrizzleError, DrizzleQueryError } from "drizzle-orm";

import admin from "./admin";
import auth from "./auth";
import health from "./health";
import school from "./school";
import teacher from "./teacher";
import student from "./student";
import schoolAdmin from "./school-admin";
import subscription from "./subscription";

const app = new Elysia()
	.error({ BaseError })
	.onError(({ code, error, status }) => {
		console.error(
			"elysia error handler:-------------------------------------------------->",
		);
		console.error(error);

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

		if (error instanceof DrizzleError || error instanceof DrizzleQueryError) {
			return status(
				500,
				createJsonResponse({
					msg: "drizzle orm error check the logs",
				}),
			);
		}
	})
	.use(cors())
	.use([
		health,
		auth,
		admin,
		school,
		teacher,
		student,
		schoolAdmin,
		subscription,
	]);

export type AppType = typeof app;
export default app;
