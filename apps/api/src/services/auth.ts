import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { bearer, phoneNumber } from "better-auth/plugins";
import { prisma } from "@/database/db.connection";

const auth = betterAuth({
	emailAndPassword: {
		enabled: true,
	},
	plugins: [
		bearer(),
		phoneNumber({
			sendOTP: ({ phoneNumber, code }) => {
				console.log(`phoneNumber: ${phoneNumber}`);
				console.log(`otp: ${code}`);
			},
		}),
	],
	database: prismaAdapter(prisma, {
		provider: "postgresql",
	}),
});

export const betterAuthApi = auth.api;
export default auth;
