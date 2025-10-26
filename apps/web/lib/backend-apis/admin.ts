import { z } from "zod";
import $fetch from "@/lib/fetch";

const admin = {
  async createAdmin(data: { email: string; password: string }) {
    const res = await $fetch("/auth/admin/sign-in", {
      throw: true,
      method: "POST",
      body: data,
      output: z.object({
        statusCode: z.number(),
        message: z.string(),
        data: z.object({ token: z.string() }),
      }),
    });

    return res;
  },
};

export default admin;
