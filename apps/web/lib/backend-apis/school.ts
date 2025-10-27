import { z } from "zod";
import $fetch from "@/lib/fetch";

interface School {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  type: "school";
  code: string;
  image: string;
  status: "pending" | "active";
  createdAt: string;
}

interface CreateSchoolPayload {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  code: string;
  type: "school";
  password: string;
}

const school = {
  async createSchool(data: CreateSchoolPayload) {
    return await $fetch("/school", {
      method: "POST",
      body: data,
      output: z.object({
        statusCode: z.number(),
        message: z.string(),
        data: z.string(),
      }),
    });
  },

  async getAllSchools() {
    return await $fetch("/school", {
      method: "GET",
      output: z.object({
        statusCode: z.number(),
        message: z.string(),
        data: z.array(
          z.object({
            id: z.string(),
            name: z.string(),
            email: z.string(),
            phoneNumber: z.string(),
            address: z.string(),
            type: z.string(),
            code: z.string(),
            image: z.string(),
            status: z.string(),
            createdAt: z.string(),
          }),
        ),
      }),
    });
  },
};

export default school;
