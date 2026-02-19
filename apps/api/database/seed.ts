import {db} from "@/database/db";
import { AppType } from "@/app";
import { betterAuthApi } from "@/services/auth"
import { treaty } from "@elysiajs/eden";
import { adminTable } from "./schema";

const app = treaty<AppType>("localhost:3000");

const admins = Array.from({length: 100}).map(async (_,i) => {
  console.log("admin created: ", i);

  const res = await betterAuthApi.signUpEmail({
    body: {
      name: `admin_${i}`,
      email: `admin${i}@test.com`,
      password: "admin123"
    }
  });

  await db.insert(adminTable).values({
      userId: res.user.id,
      name: res.user.name,
      email: res.user.email,
      phoneNumber: res.user.phoneNumber ?? "9876543210"
    });
})

const schools = Array.from({length: 100}).map(async (_,i) => {
  const res = await betterAuthApi.signInEmail({body: {
    email: "admin1@test.com",
    password: "admin123"
  }});


})

await Promise.all(admins);
console.log("admins created")
