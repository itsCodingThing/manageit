import { beforeAll, afterAll } from "bun:test";
import { seedDatabase, cleanDatabase } from "./seed";

beforeAll(async () => {
	await seedDatabase();
});

afterAll(async () => {
	await cleanDatabase();
});
