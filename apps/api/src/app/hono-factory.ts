import { createFactory } from "hono/factory";
import type { auth } from "project/services/auth";

type Env = {
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
};

export const hono = createFactory<Env>();
