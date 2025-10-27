"use server";

import { z } from "zod";
import backendAPI from "@/lib/backend-apis";
import { revalidatePath } from "next/cache";

export async function getAllSchools() {
  const res = await backendAPI.school.getAllSchools();
  if (res.error) {
    return null;
  }

  return res.data.data;
}

const createSchoolPayload = z.object({
  name: z.string(),
  email: z.string().email(),
  phoneNumber: z.string().length(10),
  address: z.string(),
  code: z.string(),
  password: z.string(),
});
export async function createSchool(state: any, formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  const payload = createSchoolPayload.safeParse(data);
  if (!payload.success) {
    console.log(payload.error.flatten());
    return state;
  }

  console.log(payload);
  const res = await backendAPI.school.createSchool({
    ...payload.data,
    type: "school",
  });
  if (res.error) {
    console.log(res.error);
  }

  revalidatePath("/super-admin/(auth)/schools");
  return state;
}
