import { authMiddleware } from "@/middleware/auth";
import { Elysia } from "elysia";

const health = new Elysia({ prefix: "/api/health" })
	.use(authMiddleware)
	.get("/", async ({ status, userId }) => {
		return status(200, `healthy ok ${userId}`);
	});

export type HealthApiType = typeof health;
export default health;
