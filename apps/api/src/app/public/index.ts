import { hono } from "@/app/hono-factory";

const pub = hono.createApp();

pub.get("/ping", (ctx) => ctx.text("pong"));

export type PublicApiType = typeof pub;
export default pub;
