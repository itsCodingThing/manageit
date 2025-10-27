import { z } from "zod";
import $fetch from "@/lib/fetch";

const admin = {
  async getAdmins() {
    return await $fetch("/admin", {
      method: "GET",
      output: z.object({
        statusCode: z.number(),
        message: z.string(),
        data: z.array(
          z.object({
            id: z.string(),
            name: z.string(),
            email: z.string(),
            status: z.string(),
            createdAt: z.string(),
          }),
        ),
      }),
    });
  },

  async createAdmin(data: {
    email: string;
    password: string;
    name: string;
    phoneNumber: string;
  }) {
    return await $fetch("/auth/admin/sign-up", {
      method: "POST",
      body: data,
      output: z.object({
        statusCode: z.number(),
        message: z.string(),
        data: z.object({ token: z.string() }),
      }),
    });
  },
};

export default admin;
