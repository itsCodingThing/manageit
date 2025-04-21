import auth from "@fastify/auth";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import multipart from "@fastify/multipart";
import Fastify from "fastify";

import { routes } from "project/app/v1/index";
import { errorHandler } from "project/utils/error";
import { logger } from "project/utils/logger";

export function Server() {
	const fastify = Fastify({
		bodyLimit: 314572800,
		loggerInstance: logger,
	});

	fastify.register(multipart);
	fastify.register(helmet);
	fastify.register(cors);
	fastify.register(auth);

	fastify.route({
		method: "GET",
		url: "/ping",
		handler: (_, res) => res.send("pong"),
	});

	/**
	 * App Routing Handler
	 */
	fastify.register(routes, { prefix: "api/v1" });

	/**
	 * App Error Handling
	 */
	fastify.setErrorHandler(async (error, req, res) => {
		return await errorHandler(error, req, res);
	});

	return fastify;
}
