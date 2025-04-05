import type { FastifyPluginAsync } from "fastify";

import { adminRoutes } from "project/app/v1/routes/admin";
import { noAuth, publicRoute, testntrackAuth } from "project/middleware/auth";
import { authRoutes } from "./routes/auth";
import { fileStorageRoutes } from "./routes/file";
import { organizationRoutes } from "./routes/organization";
import { schoolAdminUserRoutes } from "./routes/school-admin/index.js";
import { studentRoutes } from "./routes/student/index.js";
import { teacherRoutes } from "./routes/teacher/index.js";

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
	 * School admin routes
	 */
	fastify.register(schoolAdminUserRoutes);

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
