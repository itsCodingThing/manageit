import { describe, expect, test } from "bun:test";
import app from "../app";

const makeRequest = async (path: string, options: RequestInit = {}) => {
	return app.handle(new Request(`http://localhost${path}`, options));
};

describe("auth API tests", () => {
	describe("POST /api/auth/sign-up", () => {
		const validPayload = {
			type: "student",
			email: "test@example.com",
			password: "password123",
			name: "Test Student",
			contact: "1234567890",
			schoolCode: "A",
		};

		test("should reject invalid email", async () => {
			const res = await makeRequest("/api/auth/sign-up", {
				method: "POST",
				body: JSON.stringify({ ...validPayload, email: "invalid-email" }),
				headers: { "Content-Type": "application/json" },
			});

			expect(res.status).toBe(422);
		});

		test("should reject short password", async () => {
			const res = await makeRequest("/api/auth/sign-up", {
				method: "POST",
				body: JSON.stringify({ ...validPayload, password: "123" }),
				headers: { "Content-Type": "application/json" },
			});

			expect(res.status).toBe(422);
		});

		test("should reject invalid contact length", async () => {
			const res = await makeRequest("/api/auth/sign-up", {
				method: "POST",
				body: JSON.stringify({ ...validPayload, contact: "12345" }),
				headers: { "Content-Type": "application/json" },
			});

			expect(res.status).toBe(422);
		});

		test("should reject invalid user type", async () => {
			const res = await makeRequest("/api/auth/sign-up", {
				method: "POST",
				body: JSON.stringify({ ...validPayload, type: "admin" }),
				headers: { "Content-Type": "application/json" },
			});

			expect(res.status).toBe(422);
		});

		test("should reject empty name", async () => {
			const res = await makeRequest("/api/auth/sign-up", {
				method: "POST",
				body: JSON.stringify({ ...validPayload, name: "" }),
				headers: { "Content-Type": "application/json" },
			});

			expect(res.status).toBe(422);
		});

		test("should reject missing required fields", async () => {
			const res = await makeRequest("/api/auth/sign-up", {
				method: "POST",
				body: JSON.stringify({ email: "test@example.com" }),
				headers: { "Content-Type": "application/json" },
			});

			expect(res.status).toBe(422);
		});
	});

	describe("POST /api/auth/sign-in", () => {
		const validEmailPayload = {
			type: "student",
			loginMethod: "email",
			email: "test@example.com",
			password: "password123",
		};

		const validContactPayload = {
			type: "teacher",
			loginMethod: "contact",
			contact: "1234567890",
		};

		test("should reject invalid email format", async () => {
			const res = await makeRequest("/api/auth/sign-in", {
				method: "POST",
				body: JSON.stringify({ ...validEmailPayload, email: "invalid-email" }),
				headers: { "Content-Type": "application/json" },
			});

			expect(res.status).toBe(422);
		});

		test("should reject short password", async () => {
			const res = await makeRequest("/api/auth/sign-in", {
				method: "POST",
				body: JSON.stringify({ ...validEmailPayload, password: "123" }),
				headers: { "Content-Type": "application/json" },
			});

			expect(res.status).toBe(422);
		});

		test("should reject invalid contact length", async () => {
			const res = await makeRequest("/api/auth/sign-in", {
				method: "POST",
				body: JSON.stringify({ ...validContactPayload, contact: "12345" }),
				headers: { "Content-Type": "application/json" },
			});

			expect(res.status).toBe(422);
		});

		test("should reject missing loginMethod", async () => {
			const res = await makeRequest("/api/auth/sign-in", {
				method: "POST",
				body: JSON.stringify({
					type: "student",
					email: "test@example.com",
					password: "password123",
				}),
				headers: { "Content-Type": "application/json" },
			});

			expect(res.status).toBe(422);
		});

		test("should reject invalid loginMethod value", async () => {
			const res = await makeRequest("/api/auth/sign-in", {
				method: "POST",
				body: JSON.stringify({ ...validEmailPayload, loginMethod: "sms" }),
				headers: { "Content-Type": "application/json" },
			});

			expect(res.status).toBe(422);
		});
	});

	describe("POST /api/auth/admin/sign-in", () => {
		const validPayload = {
			email: "admin@example.com",
			password: "adminpassword",
		};

		test("should reject invalid email", async () => {
			const res = await makeRequest("/api/auth/admin/sign-in", {
				method: "POST",
				body: JSON.stringify({ ...validPayload, email: "invalid-email" }),
				headers: { "Content-Type": "application/json" },
			});

			expect(res.status).toBe(422);
		});

		test("should reject missing email", async () => {
			const res = await makeRequest("/api/auth/admin/sign-in", {
				method: "POST",
				body: JSON.stringify({ password: "adminpassword" }),
				headers: { "Content-Type": "application/json" },
			});

			expect(res.status).toBe(422);
		});

		test("should reject missing password", async () => {
			const res = await makeRequest("/api/auth/admin/sign-in", {
				method: "POST",
				body: JSON.stringify({ email: "admin@example.com" }),
				headers: { "Content-Type": "application/json" },
			});

			expect(res.status).toBe(422);
		});

		test("should reject empty body", async () => {
			const res = await makeRequest("/api/auth/admin/sign-in", {
				method: "POST",
				body: JSON.stringify({}),
				headers: { "Content-Type": "application/json" },
			});

			expect(res.status).toBe(422);
		});
	});
});
