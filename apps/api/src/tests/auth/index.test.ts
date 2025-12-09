import { describe, expect, test } from "bun:test";

import api from "@/app";
import { ValidationError } from "@/utils/error";
import { createErrorResponse } from "@/utils/response";

describe("auth routes test", () => {
	test("POST /sign-up body not given", async () => {
		const res = await api.request("/api/auth/sign-up", {
			method: "POST",
		});

		expect(res.status).toBe(400);
		expect(await res.json()).toMatchObject(
			createErrorResponse(new ValidationError({ msg: "failed to parse" })),
		);
	});

	test("POST /sign-up wrong user type", async () => {
		const res = await api.request("/api/auth/sign-up", {
			method: "POST",
			body: JSON.stringify({
				type: "admin",
				email: "testing@email.com",
				password: "asdfasfasf",
			}),
			headers: new Headers({ "Content-Type": "application/json" }),
		});

		expect(res.status).toBe(400);
		expect(await res.json()).toMatchObject(
			createErrorResponse(new ValidationError({ msg: "failed to parse" })),
		);
	});

	test("POST /sign-up one of the required field missing", async () => {
		const res = await api.request("/api/auth/sign-up", {
			method: "POST",
			body: JSON.stringify({
				type: "teacher",
				password: "asdfasfasf",
			}),
			headers: new Headers({ "Content-Type": "application/json" }),
		});
		const result = await res.json();

		expect(res.status).toBe(400);
		expect(result).toMatchObject(
			createErrorResponse(new ValidationError({ msg: "failed to parse" })),
		);
	});

	test("POST /sign-up password length", async () => {
		const res = await api.request("/api/auth/sign-up", {
			method: "POST",
			body: JSON.stringify({
				type: "teacher",
				email: "teacher@emailc.com",
				password: "asdf",
			}),
			headers: new Headers({ "Content-Type": "application/json" }),
		});
		const result = await res.json();

		expect(res.status).toBe(400);
		expect(result).toMatchObject(
			createErrorResponse(new ValidationError({ msg: "failed to parse" })),
		);
	});
});
