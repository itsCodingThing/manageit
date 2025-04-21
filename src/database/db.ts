import mongoose from "mongoose";
import { PrismaClient } from "project/prisma-generated/client";
import { MongodbModels } from "./mongodb";

export const prisma = new PrismaClient();
export const mongodb = MongodbModels;

export async function connectDB() {
  await prisma.$connect();
  await mongoose.connect(process.env.MONGODB_DATABASE_URL ?? "", {
    dbName: "manageit",
  });
}

export async function disconnectDB() {
  await prisma.$disconnect();
  await mongoose.disconnect();
}
