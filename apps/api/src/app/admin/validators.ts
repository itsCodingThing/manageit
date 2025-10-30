import { zod } from "@/utils/validation";

const adminValidators = {
  getAdminsQuery: zod.object({
    page: zod.coerce.number().min(1).default(1),
    count: zod.coerce.number().min(1).default(10),
  }),

  getAdminDetailsParams: zod.object({ adminId: zod.string() }),

  createAdminBody: zod.object({
    name: zod.string().min(1),
    email: zod.email(),
    password: zod.string().min(8),
    phoneNumber: zod.string().length(10),
  }),
};

export default adminValidators;
