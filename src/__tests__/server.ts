import supertest from "supertest";
import { Server } from "../app/app.ts";

const server = supertest(Server().server);

test("Should register new user", async () => {
	const response = await server.get("/api/v1/sentry-debug").expect(500);

	expect(response.body).toMatchObject({ statusCode: 500 });
});
