"use server";

import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { z } from "zod";
import { adminSignIn, createAdmin, createSchool } from "@/lib/api";
import { revalidatePath } from "next/cache";

const LoginFormSchema = z.object({
	email: z.email({ error: "Please enter a valid email." }).trim(),
	password: z
		.string()
		.min(8, { error: "Be at least 8 characters long" })
		.trim(),
});

type LoginFormInput = z.input<typeof LoginFormSchema>;
export type LoginFormState = { error: string | null; state: LoginFormInput };

export async function loginAction(
	state: LoginFormState,
	data: FormData,
): Promise<LoginFormState> {
	const result = await LoginFormSchema.safeParseAsync(
		Object.fromEntries(data.entries()),
	);
	if (!result.success) {
		return {
			state: state.state,
			error: Object.values(z.flattenError(result.error).fieldErrors).join(","),
		};
	}

	const res = await adminSignIn(result.data);
	if (!res.success) {
		return { state: state.state, error: res.message };
	}

	await createSession({ token: res.data.token, userType: "admin" });
	return redirect("/super");
}

export async function logoutAction() {
	await deleteSession();
}

const AddAdminSchema = z.object({
	name: z.string("name is required").min(1, "name should not be empty"),
	email: z.email("email is required"),
	phoneNumber: z
		.string("phoneNumber is required")
		.min(10, "phoneNumber should not be empty"),
	password: z
		.string("password is required")
		.min(1, "password should not be empty"),
});

export type AddAdminFormState = {
	error: string | null;
	state: z.input<typeof AddAdminSchema>;
};

export async function addAdminAction(
	state: AddAdminFormState,
	data: FormData,
): Promise<AddAdminFormState> {
	const payload = Object.fromEntries(
		data.entries(),
	) as AddAdminFormState["state"];

	const result = await AddAdminSchema.safeParseAsync(payload);
	if (!result.success) {
		return {
			error: Object.values(z.flattenError(result.error).fieldErrors).join(","),
			state: state.state,
		};
	}

	const res = await createAdmin({
		...result.data,
		status: "active",
	});

	if (!res.success) {
		return { error: res.message, state: payload };
	}

	revalidatePath("/super/admin");
	return { error: null, state: state.state };
}

const AddSchoolSchema = z.object({
	schoolCode: z
		.string("schoolCode is required")
		.min(1, "schoolCode should not be empty"),
	name: z.string("name is required").min(1, "name should not be empty"),
	email: z.email("email is required"),
	phone: z.string("phone is required").min(10, "phone should not be empty"),
	address: z
		.string("address is required")
		.min(1, "address should not be empty"),
	city: z.string("city is required").min(1, "city should not be empty"),
	state: z.string("state is required").min(1, "state should not be empty"),
	country: z
		.string("country is required")
		.min(1, "country should not be empty"),
	postalCode: z
		.string("postalCode is required")
		.min(1, "postalCode should not be empty"),
	website: z.string().optional(),
	description: z.string().optional(),
	establishedYear: z.string().optional(),
	board: z.string().optional(),
	maxStudents: z.string().optional(),
	maxTeachers: z.string().optional(),
	adminName: z
		.string("adminName is required")
		.min(1, "adminName should not be empty"),
	adminEmail: z.email("adminEmail is required"),
	adminPassword: z
		.string("adminPassword is required")
		.min(6, "adminPassword should be at least 6 characters"),
	adminPhone: z
		.string("adminPhone is required")
		.min(10, "adminPhone should not be empty"),
});

export type AddSchoolFormState = {
	error: string | null;
	success: boolean;
};

export async function addSchoolAction(
	_state: AddSchoolFormState,
	data: FormData,
): Promise<AddSchoolFormState> {
	const result = await AddSchoolSchema.safeParseAsync(
		Object.fromEntries(data.entries()),
	);
	if (!result.success) {
		return {
			error: Object.values(z.flattenError(result.error).fieldErrors).join(","),
			success: false,
		};
	}

	const res = await createSchool({
		...result.data,
		status: "active",
	});

	if (!res.success) {
		return { error: res.message, success: false };
	}

	return { error: null, success: true };
}
