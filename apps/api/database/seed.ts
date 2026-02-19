import { db } from "@/database/db";
import { AppType } from "@/app";
import { betterAuthApi } from "@/services/auth";
import { treaty } from "@elysiajs/eden";
import { adminTable } from "./schema";
import { faker } from "@faker-js/faker";

const app = treaty<AppType>("localhost:3000");

const admins = Array.from({ length: 100 }).map(async (_, i) => {
	const res = await betterAuthApi.signUpEmail({
		body: {
			name: `admin_${i}`,
			email: `admin${i}@test.com`,
			password: "admin123",
		},
	});

	await db.insert(adminTable).values({
		userId: res.user.id,
		name: res.user.name,
		email: res.user.email,
		phoneNumber: res.user.phoneNumber ?? "9876543210",
	});
});

const schools = async () => {
	const res = await betterAuthApi.signInEmail({
		body: {
			email: "admin1@test.com",
			password: "admin123",
		},
	});

	return Array.from({ length: 100 }).map(async (_, i) => {
		const mail = `school${i}@test.com`;
		const phone = faker.phone.number({ style: "international" });

		app.api.school.post(
			{
				schoolCode: i.toString(),
				name: mail,
				email: mail,
				phone: phone,
				address: faker.location.streetAddress(),
				adminEmail: mail,
				adminPassword: mail,
				adminPhone: phone,
				adminName: mail,
				city: faker.location.city(),
				country: faker.location.country(),
				state: faker.location.state(),
				postalCode: faker.location.zipCode(),
			},
			{
				headers: {
					authorization: `Bearer ${res.token}`,
				},
			},
		);
	});
};

console.log("seeding database");
await Promise.all(admins);
const s = await schools();
await Promise.all(s);
console.log("seeded database");
