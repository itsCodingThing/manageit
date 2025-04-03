import Fastify from "fastify";
import cors from "@fastify/cors";
import auth from "@fastify/auth";
import helmet from "@fastify/helmet";
import multipart from "@fastify/multipart";
import { logger } from "project/utils/logger";
import { routes } from "project/app/v1/index";
import { errorHandler, BaseError } from "../utils/error";

export function Server() {
	const fastify = Fastify({
		bodyLimit: 314572800,
		logger: logger,
	});

	fastify.register(multipart);
	fastify.register(helmet);
	fastify.register(cors);
	fastify.register(auth);

	/**
	 * App Routing Handler
	 */
	fastify.register(routes, { prefix: "api/v1" });

	/**
	 * App Error Handling
	 */
	fastify.setErrorHandler(async (error, req, res) => {
		if (
			process.env.NODE_ENV === "production" &&
			!(error instanceof BaseError)
		) {
			logger.info(error, "production level error logger");
		}

		if (!(error instanceof BaseError)) {
			// await sendErrorMail(error);
		}

		return await errorHandler(error, req, res);
	});

	return fastify;
}
