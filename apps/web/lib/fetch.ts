import { createFetch } from "@better-fetch/fetch";
import { verifySession } from "./session";

console.log("backend url", process.env.BACKEND_URL);

const $fetch = createFetch({
  baseURL: process.env.BACKEND_URL,
  async onRequest(ctx) {
    // setup auth token in header
    const session = await verifySession();
    if (session.isAuth) {
      ctx.headers.set("Authorization", `Bearer ${session.token}`);
    }

    return ctx;
  },
});

export default $fetch;
