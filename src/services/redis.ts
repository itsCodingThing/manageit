import { createClient } from "redis";

export const redisClient = createClient();

export async function connectRedis() {
	await redisClient.connect();
}
