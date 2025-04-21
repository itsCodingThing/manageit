import type { FastifyPluginAsync } from "fastify";

import { adminRoutes } from "project/app/v1/routes/admin";
import { noAuth, publicRoute, testntrackAuth } from "project/middleware/auth";
import { authRoutes } from "./routes/auth";
import { fileStorageRoutes } from "./routes/file";
import { organizationRoutes } from "./routes/organization";
import { organizationAdminRoutes } from "./routes/organization-admin";
import { studentRoutes } from "./routes/student";
import { teacherRoutes } from "./routes/teacher";

export const routes: FastifyPluginAsync = async (fastify) => {
	/**
	 * App request decorator
	 */
	fastify.decorateRequest("payload", null);

	/**
	 * App prehandler hook
	 */
	fastify.addHook(
		"preHandler",
		fastify.auth([publicRoute, testntrackAuth, noAuth]),
	);

	/**
	 * Auth routes
	 */
	fastify.register(authRoutes);

	/**
	 * Admin routes
	 */
	fastify.register(adminRoutes);

	/**
	 * School routes
	 */
	fastify.register(organizationRoutes);

	/**
	 * Organization admin routes
	 */
	fastify.register(organizationAdminRoutes);

	/**
	 * Teacher routes
	 */
	fastify.register(teacherRoutes);

	/**
	 * Student routes
	 */
	fastify.register(studentRoutes);

	/**
	 * File storage routes
	 */
	fastify.register(fileStorageRoutes);
};
