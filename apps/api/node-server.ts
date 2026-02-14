import { node } from "@elysiajs/node";
import api from "./app";
import { Elysia } from "elysia";

const server = new Elysia({ adapter: node() }).use(api);

server.listen(3000);
