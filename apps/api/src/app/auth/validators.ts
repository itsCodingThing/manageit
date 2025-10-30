import { zod } from "@/utils/validation";

const authValidators = {
	signUp: zod.object({
		type: zod.literal(["teacher", "student"]),
		email: zod.email(),
		password: zod.string().min(5),
		name: zod.string().default(() => new Date().toUTCString()),
		contact: zod.string().length(10),
	}),

	signIn: zod.discriminatedUnion("loginMethod", [
		zod.object({
			loginMethod: zod.literal("contact"),
			type: zod.literal(["teacher", "student"]),
			contact: zod.string().length(10),
		}),
		zod.object({
			loginMethod: zod.literal("password"),
			type: zod.literal(["teacher", "student"]),
			email: zod.email(),
			password: zod.string(),
		}),
	]),

	verifyOtp: zod.object({
		contact: zod.string(),
		otp: zod.string(),
	}),

	adminSignUp: zod.object({
		email: zod.email(),
		password: zod.string().min(5),
		name: zod.string().min(1),
		phoneNumber: zod.string().length(10),
	}),

	adminSignIn: zod.object({
		email: zod.email(),
		password: zod.string(),
	}),
};

export default authValidators;
