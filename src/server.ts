import "dotenv/config";
import chalk from "chalk";

import { Server } from "project/app/app";
import { prisma } from "project/database/db";
import config from "project/config/config";
import { createAppDataFolders } from "./utils/utils";

/**
 *  Create app data folders for storage
 */
createAppDataFolders();
console.log(chalk.bgYellowBright("App storage folders created 🚀"));

/**
 * Connect To DB
 */
await prisma.$connect();
console.log(chalk.bgMagentaBright("Connected to database 🚀"));

/**
 * Build Server
 */
const server = Server();

/**
 * Server Listen
 */
await server.listen({ port: config.server.port, host: config.server.host });

/**
 * Graceful Listen
 */
// const graceful = new Graceful({
//   servers: [server],
//   customHandlers: [
//     async () => {
//       await prisma.$disconnect();
//     },
//   ],
// });
// graceful.listen();

console.log(
	chalk.bgGreen(
		`Api running on: http://${config.server.host}:${config.server.port}`,
	),
);
