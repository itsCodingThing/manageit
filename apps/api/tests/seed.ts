import { faker } from "@faker-js/faker";
import { db } from "@/database/db";
import { user, account, session } from "@/database/schema/auth";
import { adminTable } from "@/database/schema/admin";
import { schoolTable, type School } from "@/database/schema/school";
import { studentTable, type Student } from "@/database/schema/student";
import { teacherTable, type Teacher } from "@/database/schema/teacher";
import { batchTable, type Batch } from "@/database/schema/batch";
import { betterAuthApi } from "@/services/auth";

const TEST_PASSWORD = "password123";

const TEST_ADMIN_USER = {
	name: faker.person.fullName(),
	email: faker.internet.email().toLowerCase(),
	password: TEST_PASSWORD,
};

const TEST_SCHOOL = {
	schoolCode: faker.string.alphanumeric(8).toUpperCase(),
	name: faker.company.name(),
	email: faker.internet.email().toLowerCase(),
	phone: faker.phone.number(),
	address: faker.location.streetAddress(),
	city: faker.location.city(),
	state: faker.location.state(),
	country: faker.location.country(),
	postalCode: faker.location.zipCode(),
	status: "active" as const,
};

const TEST_TEACHERS = Array.from({ length: 2 }, () => ({
	name: faker.person.fullName(),
	email: faker.internet.email().toLowerCase(),
	password: TEST_PASSWORD,
}));

const TEST_STUDENTS = Array.from({ length: 3 }, () => ({
	name: faker.person.fullName(),
	email: faker.internet.email().toLowerCase(),
	password: TEST_PASSWORD,
}));

const TEST_BATCHES = Array.from({ length: 2 }, (_, i) => ({
	name: `Batch ${new Date().getFullYear()}${i > 0 ? ` - ${faker.lorem.word()}` : ""}`,
	status: "active" as const,
}));

export async function getTestCredentials() {
	return {
		adminEmail: TEST_ADMIN_USER.email,
		adminPassword: TEST_ADMIN_USER.password,
		teacherEmails: TEST_TEACHERS.map((t) => t.email),
		teacherPassword: TEST_PASSWORD,
		studentEmails: TEST_STUDENTS.map((s) => s.email),
		studentPassword: TEST_PASSWORD,
	};
}

export async function getAdminUser(): Promise<{
	id: string;
	email: string;
	name: string;
}> {
	const adminUser = await db.query.user.findFirst({
		where: (u, { eq }) => eq(u.email, TEST_ADMIN_USER.email),
	});
	return { id: adminUser!.id, email: adminUser!.email, name: adminUser!.name };
}

export async function getSchool(): Promise<School> {
	return (await db.query.schoolTable.findFirst({
		where: (s, { eq }) => eq(s.schoolCode, TEST_SCHOOL.schoolCode),
	}))!;
}

export async function getTeachers(): Promise<Teacher[]> {
	const school = await getSchool();
	return await db.query.teacherTable.findMany({
		where: (t, { eq }) => eq(t.schoolId, school.id),
	});
}

export async function getStudents(): Promise<Student[]> {
	const school = await getSchool();
	return await db.query.studentTable.findMany({
		where: (s, { eq }) => eq(s.schoolId, school.id),
	});
}

export async function getBatches(): Promise<Batch[]> {
	const school = await getSchool();
	return await db.query.batchTable.findMany({
		where: (b, { eq }) => eq(b.schoolId, school.id),
	});
}

export async function seedDatabase(): Promise<void> {
	// Create admin user
	await betterAuthApi.signUpEmail({
		body: TEST_ADMIN_USER,
	});

	const adminUser = (await db.query.user.findFirst({
		where: (u, { eq }) => eq(u.email, TEST_ADMIN_USER.email),
	}))!;

	await db.insert(adminTable).values({
		userId: adminUser.id,
		name: adminUser.name,
		email: adminUser.email,
		phoneNumber: adminUser.phoneNumber ?? faker.phone.number(),
		status: "active",
	});

	// Create school
	await db.insert(schoolTable).values(TEST_SCHOOL);
	const school = (await db.query.schoolTable.findFirst({
		where: (s, { eq }) => eq(s.schoolCode, TEST_SCHOOL.schoolCode),
	}))!;

	// Create teachers
	for (const teacherData of TEST_TEACHERS) {
		const teacherUser = await betterAuthApi.signUpEmail({
			body: teacherData,
		});

		await db.insert(teacherTable).values({
			userId: teacherUser.user.id,
			schoolId: school.id,
			name: teacherUser.user.name,
			email: teacherUser.user.email,
			phoneNumber: teacherUser.user.phoneNumber ?? faker.phone.number(),
			roles: ["teacher"],
			status: "active",
		});
	}

	// Create students
	for (const studentData of TEST_STUDENTS) {
		const studentUser = await betterAuthApi.signUpEmail({
			body: studentData,
		});

		await db.insert(studentTable).values({
			userId: studentUser.user.id,
			schoolId: school.id,
			name: studentUser.user.name,
			email: studentUser.user.email,
			phoneNumber: studentUser.user.phoneNumber ?? faker.phone.number(),
			status: "active",
		});
	}

	// Create batches
	const teachers = await db.query.teacherTable.findMany({
		where: (t, { eq }) => eq(t.schoolId, school.id),
	});
	const students = await db.query.studentTable.findMany({
		where: (s, { eq }) => eq(s.schoolId, school.id),
	});

	const batchCount = TEST_BATCHES.length;
	for (let i = 0; i < batchCount; i++) {
		const teacherIndex = i % teachers.length;
		const studentStartIndex = i * Math.floor(students.length / batchCount);
		const studentEndIndex =
			i === batchCount - 1
				? students.length
				: (i + 1) * Math.floor(students.length / batchCount);

		const teacher = teachers[teacherIndex]!;

		await db.insert(batchTable).values({
			schoolId: school.id,
			name: TEST_BATCHES[i]?.name ?? `Batch ${i + 1}`,
			status: TEST_BATCHES[i]?.status ?? "active",
			teacherIds: [teacher.id],
			studentIds: students
				.slice(studentStartIndex, studentEndIndex)
				.map((s) => s.id),
		});
	}
}

export async function cleanDatabase(): Promise<void> {
	await db.delete(batchTable);
	await db.delete(studentTable);
	await db.delete(teacherTable);
	await db.delete(adminTable);
	await db.delete(schoolTable);
	await db.delete(session);
	await db.delete(account);
	await db.delete(user);
}
