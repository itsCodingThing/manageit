"use server";

import { z } from "zod";
import backendAPI from "@/lib/backend-apis";
import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().length(5),
});

type LoginFormInput = z.input<typeof loginSchema>;
export async function login(
  state: any,
  formData: FormData,
): Promise<
  | { success: true; message: string; formInputs?: LoginFormInput }
  | { success: false; errors: string; formInputs?: LoginFormInput }
> {
  const data = Object.fromEntries(formData.entries()) as LoginFormInput;
  const validatedFields = loginSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: "error",
      formInputs: data,
    };
  }

  try {
    console.log(validatedFields.data);
    // const res = await backendAPI.auth.login(validatedFields.data);
    // await createSession({ token: res.data.token, userType: "admin" });

    return {
      success: true,
      message: "success",
      formInputs: data,
    };
  } catch {
    return {
      success: false,
      errors: "error",
      formInputs: data,
    };
  }
}

export async function logout(initialState: any, formData: FormData) {
  await deleteSession();
  return redirect("/super-admin/login");
}
