import { betterAuth } from "better-auth";
import { bearer, phoneNumber } from "better-auth/plugins";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/database/db.connection";

export const auth = betterAuth({
  user: {
    additionalFields: {
      type: {
        type: "string",
        required: true,
      },
    },
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
  emailAndPassword: {
    enabled: true,
  },
});

export const authAPI = auth.api;
