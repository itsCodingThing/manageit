import { zod } from "@/utils/validation";

const schoolValidators = {
	createSchoolBody: zod.object({
		name: zod.string().min(1, "Please enter name"),
		email: zod.email("Please enter a valid email"),
		phoneNumber: zod.string().length(10, "Please enter a valid contact"),
		address: zod.string().min(1, "Please enter a valid address"),
		image: zod.string().default(""),
		code: zod.string().min(3, "Code must be atleast 3 digit long"),
		type: zod.string().min(1, "Please enter a valid type"),
		password: zod.string().min(8, "Password must be 8 charactor long"),
	}),
};

export default schoolValidators;
