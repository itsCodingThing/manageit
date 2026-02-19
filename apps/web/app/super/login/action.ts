import { createSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { z } from "zod";

const LoginFormSchema = z.object({
	email: z.email({ error: "Please enter a valid email." }).trim(),
	password: z
		.string()
		.min(8, { error: "Be at least 8 characters long" })
		.trim(),
});

type LoginFormInput = z.input<typeof LoginFormSchema>;
export type LoginFormState =
	| { ok: true; state: LoginFormInput }
	| { ok: false; error: LoginFormInput };

export async function login(
	state: LoginFormState,
	data: FormData,
): Promise<LoginFormState> {
		const result = await LoginFormSchema.safeParseAsync(Object.fromEntries(data.entries()));

  if (!result.success) {
		console.log("parsed error: ",result.error);
		return { ok: false, error: {email: "error", password: "error"} };
  }

    console.log("parsed payload: ", result.data)
    await createSession({token: "token", userType: "admin"})

    return redirect("/super");
}
