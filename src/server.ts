import "dotenv/config";
import chalk from "chalk";

import { Server } from "project/app/app";
import { connectDB } from "project/database/db";
import config from "project/config/config";
import { createAppDataFolders } from "./utils/utils";
import { connectRedis } from "./services/redis";

/**
 *  Create app data folders for storage
 */
createAppDataFolders();
console.log(chalk.bgYellowBright("App storage folders created 🚀"));

/**
 * Connect To DB
 */
await connectDB();
console.log(chalk.bgMagentaBright("Connected to database 🚀"));

/**
 * Connect To Redis
 */
await connectRedis();
console.log(chalk.bgBlueBright("Connected to redis 🚀"));

/**
 * Build Server
 */
const server = Server();

/**
 * Server Listen
 */
await server.listen({ port: config.server.port, host: config.server.host });

console.log(
	chalk.bgGreen(
		`Api running on: http://${config.server.host}:${config.server.port}`,
	),
);
