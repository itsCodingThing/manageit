"use server";

import backendAPI from "@/lib/backend-apis";
import { revalidatePath } from "next/cache";
import z from "zod";

export async function getAdmins() {
  const res = await backendAPI.admin.getAdmins();
  if (res.error) {
    console.log(res.error);
    return null;
  }

  return res.data.data;
}

const createAdminPayload = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  phoneNumber: z.string().length(10),
});
export async function createAdmin(state: any, formData: FormData) {
  const form = Object.fromEntries(formData.entries());
  const payload = createAdminPayload.safeParse(form);
  if (!payload.success) {
    console.log(payload.error.flatten());
    return null;
  }

  const res = await backendAPI.admin.createAdmin(payload.data);
  if (res.error) {
    console.log(res.error);
    return null;
  }

  revalidatePath("/super-admin/(auth)/admins");
  return res.data.data;
}
