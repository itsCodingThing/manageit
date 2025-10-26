"use server";

import backendAPI from "@/lib/backend-apis";

export async function getAllSchools() {
  const res = await backendAPI.school.getAllSchools();
  if (res.error) {
    return null;
  }

  return res.data;
}
