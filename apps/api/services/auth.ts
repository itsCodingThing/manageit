import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { bearer, phoneNumber, admin } from "better-auth/plugins";
import { db } from "@/database/db";
import * as authSchema from "@/database/schema/auth";

const auth = betterAuth({
	logger: {
		disabled: true,
	},
	emailAndPassword: {
		enabled: true,
	},
	plugins: [
		bearer(),
		admin(),
		phoneNumber({
			sendOTP: ({ phoneNumber, code }) => {
				console.log(`phoneNumber: ${phoneNumber}`);
				console.log(`otp: ${code}`);
			},
		}),
	],
	database: drizzleAdapter(db, {
		provider: "pg",
		schema: authSchema,
	}),
});

export const betterAuthApi = auth.api;
export default auth;
