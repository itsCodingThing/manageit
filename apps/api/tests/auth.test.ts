import { describe, expect, test } from "bun:test";
import app from "../app";
import { getSchool, getTestCredentials } from "./seed";

const makeRequest = async (path: string, options: RequestInit = {}) => {
	return app.handle(new Request(`http://localhost${path}`, options));
};

describe("auth API tests", () => {
	describe("POST /api/auth/sign-up", () => {
		test("should reject invalid email", async () => {
			const school = await getSchool();
			const res = await makeRequest("/api/auth/sign-up", {
				method: "POST",
				body: JSON.stringify({
					type: "student",
					email: "invalid-email",
					password: "password123",
					name: "Test Student",
					phoneNumber: "1234567890",
					schoolCode: school.schoolCode,
				}),
				headers: { "Content-Type": "application/json" },
			});

			expect(res.status).toBe(422);
		});

		test("should reject short password", async () => {
			const school = await getSchool();
			const res = await makeRequest("/api/auth/sign-up", {
				method: "POST",
				body: JSON.stringify({
					type: "student",
					email: "test@example.com",
					password: "123",
					name: "Test Student",
					phoneNumber: "1234567890",
					schoolCode: school.schoolCode,
				}),
				headers: { "Content-Type": "application/json" },
			});

			expect(res.status).toBe(422);
		});

		test("should reject invalid contact length", async () => {
			const school = await getSchool();
			const res = await makeRequest("/api/auth/sign-up", {
				method: "POST",
				body: JSON.stringify({
					type: "student",
					email: "test@example.com",
					password: "password123",
					name: "Test Student",
					phoneNumber: "12345",
					schoolCode: school.schoolCode,
				}),
				headers: { "Content-Type": "application/json" },
			});

			expect(res.status).toBe(422);
		});

		test("should reject invalid user type", async () => {
			const school = await getSchool();
			const res = await makeRequest("/api/auth/sign-up", {
				method: "POST",
				body: JSON.stringify({
					type: "admin",
					email: "test@example.com",
					password: "password123",
					name: "Test Admin",
					phoneNumber: "1234567890",
					schoolCode: school.schoolCode,
				}),
				headers: { "Content-Type": "application/json" },
			});

			expect(res.status).toBe(422);
		});

		test("should reject empty name", async () => {
			const school = await getSchool();
			const res = await makeRequest("/api/auth/sign-up", {
				method: "POST",
				body: JSON.stringify({
					type: "student",
					email: "test@example.com",
					password: "password123",
					name: "",
					phoneNumber: "1234567890",
					schoolCode: school.schoolCode,
				}),
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

		test("should reject invalid school code", async () => {
			const res = await makeRequest("/api/auth/sign-up", {
				method: "POST",
				body: JSON.stringify({
					type: "student",
					email: "test@example.com",
					password: "password123",
					name: "Test Student",
					phoneNumber: "1234567890",
					schoolCode: "INVALIDCODE",
				}),
				headers: { "Content-Type": "application/json" },
			});

			expect(res.status).toBe(500);
		});

		test("should successfully sign up a student", async () => {
			const school = await getSchool();
			const res = await makeRequest("/api/auth/sign-up", {
				method: "POST",
				body: JSON.stringify({
					type: "student",
					email: "newstudent@test.com",
					password: "password123",
					name: "New Student",
					phoneNumber: "9876543210",
					schoolCode: school.schoolCode,
				}),
				headers: { "Content-Type": "application/json" },
			});

			expect(res.status).toBe(200);
			const body = (await res.json()) as { data: { token: string } };
			expect(body.data.token).toBeDefined();
		});

		test("should successfully sign up a teacher", async () => {
			const school = await getSchool();
			const res = await makeRequest("/api/auth/sign-up", {
				method: "POST",
				body: JSON.stringify({
					type: "teacher",
					email: "newteacher@test.com",
					password: "password123",
					name: "New Teacher",
					phoneNumber: "9876543211",
					schoolCode: school.schoolCode,
				}),
				headers: { "Content-Type": "application/json" },
			});

			expect(res.status).toBe(200);
			const body = (await res.json()) as { data: { token: string } };
			expect(body.data.token).toBeDefined();
		});
	});

	describe("POST /api/auth/sign-in", () => {
		test("should reject invalid email format", async () => {
			const res = await makeRequest("/api/auth/sign-in", {
				method: "POST",
				body: JSON.stringify({
					type: "student",
					loginMethod: "email",
					email: "invalid-email",
					password: "password123",
				}),
				headers: { "Content-Type": "application/json" },
			});

			expect(res.status).toBe(422);
		});

		test("should reject short password", async () => {
			const res = await makeRequest("/api/auth/sign-in", {
				method: "POST",
				body: JSON.stringify({
					type: "student",
					loginMethod: "email",
					email: "test@example.com",
					password: "123",
				}),
				headers: { "Content-Type": "application/json" },
			});

			expect(res.status).toBe(422);
		});

		test("should reject invalid contact length", async () => {
			const res = await makeRequest("/api/auth/sign-in", {
				method: "POST",
				body: JSON.stringify({
					type: "teacher",
					loginMethod: "contact",
					contact: "12345",
				}),
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
				body: JSON.stringify({
					type: "student",
					loginMethod: "sms",
					email: "test@example.com",
					password: "password123",
				}),
				headers: { "Content-Type": "application/json" },
			});

			expect(res.status).toBe(422);
		});

		test("should reject invalid credentials", async () => {
			const res = await makeRequest("/api/auth/sign-in", {
				method: "POST",
				body: JSON.stringify({
					type: "student",
					loginMethod: "email",
					email: "nonexistent@test.com",
					password: "wrongpassword",
				}),
				headers: { "Content-Type": "application/json" },
			});

			expect(res.status).toBe(500);
		});

		test("should successfully sign in a seeded student with email", async () => {
			const credentials = await getTestCredentials();
			const studentEmail = credentials.studentEmails[0];

			const res = await makeRequest("/api/auth/sign-in", {
				method: "POST",
				body: JSON.stringify({
					type: "student",
					loginMethod: "email",
					email: studentEmail,
					password: credentials.studentPassword,
				}),
				headers: { "Content-Type": "application/json" },
			});

			expect(res.status).toBe(200);
			const body = (await res.json()) as { data: { token: string } };
			expect(body.data.token).toBeDefined();
		});

		test("should successfully sign in a seeded teacher with email", async () => {
			const credentials = await getTestCredentials();
			const teacherEmail = credentials.teacherEmails[0];

			const res = await makeRequest("/api/auth/sign-in", {
				method: "POST",
				body: JSON.stringify({
					type: "teacher",
					loginMethod: "email",
					email: teacherEmail,
					password: credentials.teacherPassword,
				}),
				headers: { "Content-Type": "application/json" },
			});

			expect(res.status).toBe(200);
			const body = (await res.json()) as { data: { token: string } };
			expect(body.data.token).toBeDefined();
		});
	});

	describe("POST /api/auth/admin/sign-in", () => {
		test("should reject invalid email", async () => {
			const res = await makeRequest("/api/auth/admin/sign-in", {
				method: "POST",
				body: JSON.stringify({
					email: "invalid-email",
					password: "adminpassword",
				}),
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

		test("should reject invalid admin credentials", async () => {
			const res = await makeRequest("/api/auth/admin/sign-in", {
				method: "POST",
				body: JSON.stringify({
					email: "nonexistent@test.com",
					password: "wrongpassword",
				}),
				headers: { "Content-Type": "application/json" },
			});

			expect(res.status).toBe(500);
		});

		test("should successfully sign in a seeded admin", async () => {
			const credentials = await getTestCredentials();

			const res = await makeRequest("/api/auth/admin/sign-in", {
				method: "POST",
				body: JSON.stringify({
					email: credentials.adminEmail,
					password: credentials.adminPassword,
				}),
				headers: { "Content-Type": "application/json" },
			});

			expect(res.status).toBe(200);
			const body = (await res.json()) as { data: { token: string } };
			expect(body.data.token).toBeDefined();
		});
	});
});
