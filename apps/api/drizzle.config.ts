import { defineConfig, type Config } from "drizzle-kit";

const config = {
	out: "./drizzle",
	schema: "./database/schema",
	dialect: "postgresql",
	dbCredentials: {
		url: process.env.DATABASE_URL,
	},
} as Config;

export default defineConfig(config);
