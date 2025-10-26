"use server";

import { z } from "zod";
import backendAPI from "@/lib/backend-apis";
import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";

const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export async function login(initialState: any, formData: FormData) {
  const validatedFields = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const res = await backendAPI.auth.login(validatedFields.data);
    await createSession(res.data.token);

    return {
      message: "success",
    };
  } catch {
    return {
      errors: "error",
    };
  }
}

export async function logout(initialState: any, formData: FormData) {
  await deleteSession();
  return redirect("/super-admin/login");
}
