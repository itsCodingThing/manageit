"use server";

import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { z } from "zod";
import { adminSignIn } from "@/lib/api";

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
