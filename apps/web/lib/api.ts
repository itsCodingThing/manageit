import ky from "ky";
import { verifySession } from "./session";

export interface ApiResponse<Data = unknown> {
	success: boolean;
	message: string;
	data: Data;
}

const api = ky.create({
	prefixUrl: "http://localhost:3000/api/",
	retry: 0,
	throwHttpErrors: false,
	hooks: {
		afterResponse: [
			async function jsonResponse(_req, _opt, res) {
				try {
					const result = await res.json<{ message: string; data: unknown }>();
					const json = {
						success: true,
						message: result.message,
						data: result.data,
					};

					if (!res.ok) {
						json.success = false;
					}

					return Response.json(json, { status: res.status });
				} catch (error) {
					return Response.json(
						{ success: false, message: error, data: "" },
						{ status: res.status },
					);
				}
			},
		],
	},
});

export const unsafeApi = api;
export const safeApi = api.extend({
	hooks: {
		beforeRequest: [
			async function checkAuthHeadher(request) {
				const session = await verifySession();

				if (!session.isAuth) {
					return Response.json(
						{ message: "need auth token", data: [] },
						{
							status: 500,
						},
					);
				}

				request.headers.set("Authorization", `Bearer ${session.session.token}`);
			},
		],
	},
});

// Auth Types
export interface AdminLoginPayload {
	email: string;
	password: string;
}

export interface StudentLoginPayload {
	loginMethod: "email" | "contact";
	type: "student" | "teacher";
	email?: string;
	password?: string;
	contact?: string;
}

export interface SignUpPayload {
	type: "student" | "teacher";
	email: string;
	password: string;
	name: string;
	phoneNumber: string;
	schoolCode: string;
}

// Admin Types
export interface Admin {
	id: string;
	name: string;
	email: string;
	phoneNumber?: string;
	status?: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface CreateAdminPayload {
	name: string;
	email: string;
	password: string;
	phoneNumber: string;
	status?: "active" | "inactive";
}

export interface UpdateAdminPayload {
	name?: string;
	email?: string;
	phoneNumber?: string;
	status?: "active" | "inactive" | "pending";
}

// Student Types
export interface Student {
	id: string;
	userId: string;
	schoolId: string;
	name: string;
	dob?: string;
	email: string;
	phoneNumber: string;
	image?: string;
	address?: string;
	batchIds?: string[];
	status?: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface CreateStudentPayload {
	schoolId: string;
	name: string;
	email: string;
	phoneNumber: string;
	password: string;
	dob?: string;
	image?: string;
	address?: string;
	batchIds?: string[];
	status?: "active" | "inactive" | "pending";
}

export interface UpdateStudentPayload {
	name?: string;
	email?: string;
	phoneNumber?: string;
	dob?: string;
	image?: string;
	address?: string;
	batchIds?: string[];
	status?: "active" | "inactive" | "pending";
}

// Teacher Types
export interface Teacher {
	id: string;
	userId: string;
	schoolId: string;
	name: string;
	dob?: string;
	email: string;
	phoneNumber: string;
	image?: string;
	address?: string;
	roles?: string[];
	batchIds?: string[];
	status?: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface CreateTeacherPayload {
	schoolId: string;
	name: string;
	email: string;
	phoneNumber: string;
	password: string;
	image?: string;
	address?: string;
	roles?: ("teacher" | "school_admin")[];
	status?: "active" | "inactive" | "pending";
}

export interface UpdateTeacherPayload {
	name?: string;
	email?: string;
	phoneNumber?: string;
	image?: string;
	address?: string;
	roles?: ("teacher" | "admin" | "principal" | "master_admin")[];
	status?: "active" | "inactive" | "pending";
}

// School Types
export interface School {
	id: string;
	schoolCode: string;
	name: string;
	email: string;
	phone: string;
	address: string;
	city: string;
	state: string;
	country: string;
	postalCode: string;
	logo?: string;
	website?: string;
	description?: string;
	establishedYear?: string;
	board?: string;
	status?: string;
	maxStudents?: string;
	currentStudents?: string;
	maxTeachers?: string;
	currentTeachers?: string;
	accreditation?: string;
	facilities?: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface CreateSchoolPayload {
	schoolCode: string;
	name: string;
	email: string;
	phone: string;
	address: string;
	city: string;
	state: string;
	country: string;
	postalCode: string;
	logo?: string;
	website?: string;
	description?: string;
	establishedYear?: string;
	board?: string;
	status?: "active" | "inactive";
	maxStudents?: string;
	maxTeachers?: string;
	accreditation?: string;
	facilities?: string;
	adminName: string;
	adminEmail: string;
	adminPassword: string;
	adminPhone: string;
}

export interface UpdateSchoolPayload {
	schoolCode?: string;
	name?: string;
	email?: string;
	phone?: string;
	address?: string;
	city?: string;
	state?: string;
	country?: string;
	postalCode?: string;
	logo?: string;
	website?: string;
	description?: string;
	establishedYear?: string;
	board?: string;
	status?: "active" | "inactive";
	maxStudents?: string;
	maxTeachers?: string;
	accreditation?: string;
	facilities?: string;
}

// School Admin Types
export interface SchoolAdmin {
	id: string;
	userId: string;
	schoolId: string;
	name: string;
	dob?: string;
	email: string;
	phoneNumber: string;
	image?: string;
	address?: string;
	roles?: string[];
	batchIds?: string[];
	status?: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface CreateSchoolAdminPayload {
	schoolId: string;
	name: string;
	email: string;
	phoneNumber: string;
	password: string;
	dob?: string;
	image?: string;
	address?: string;
	role?: "admin" | "master_admin" | "principal";
	status?: "active" | "inactive" | "pending";
}

export interface UpdateSchoolAdminPayload {
	name?: string;
	email?: string;
	phoneNumber?: string;
	dob?: string;
	image?: string;
	address?: string;
	roles?: ("teacher" | "admin" | "principal" | "master_admin")[];
	status?: "active" | "inactive" | "pending";
}

// Auth API
export async function adminSignIn(payload: AdminLoginPayload) {
	return await unsafeApi
		.post("auth/admin/sign-in", { json: payload })
		.json<ApiResponse<{ token: string }>>();
}

export async function signIn(payload: StudentLoginPayload) {
	return await unsafeApi
		.post("auth/sign-in", { json: payload })
		.json<ApiResponse<{ token: string }>>();
}

export async function signUp(payload: SignUpPayload) {
	return await unsafeApi
		.post("auth/sign-up", { json: payload })
		.json<ApiResponse<{ token: string }>>();
}

// Admin API
export async function getAdmins() {
	return await safeApi.get("admin").json<ApiResponse<Admin[]>>();
}

export async function getAdmin(id: string) {
	return await safeApi.get(`admin/${id}`).json<ApiResponse<Admin>>();
}

export async function createAdmin(payload: CreateAdminPayload) {
	return await safeApi
		.post("admin", { json: payload })
		.json<ApiResponse<Admin>>();
}

export async function updateAdmin(id: string, payload: UpdateAdminPayload) {
	return await safeApi
		.put(`admin/${id}`, { json: payload })
		.json<ApiResponse<Admin>>();
}

export async function deleteAdmin(id: string) {
	return await safeApi
		.delete(`admin/${id}`)
		.json<ApiResponse<{ message: string }>>();
}

// Student API
export async function getStudents() {
	return await safeApi.get("student").json<ApiResponse<Student[]>>();
}

export async function getStudent(id: string) {
	return await safeApi.get(`student/${id}`).json<ApiResponse<Student>>();
}

export async function createStudent(payload: CreateStudentPayload) {
	return await safeApi
		.post("student", { json: payload })
		.json<ApiResponse<Student>>();
}

export async function updateStudent(id: string, payload: UpdateStudentPayload) {
	return await safeApi
		.put(`student/${id}`, { json: payload })
		.json<ApiResponse<Student>>();
}

export async function deleteStudent(id: string) {
	return await safeApi
		.delete(`student/${id}`)
		.json<ApiResponse<{ message: string }>>();
}

// Teacher API
export async function getTeachers() {
	return await safeApi.get("teacher").json<ApiResponse<Teacher[]>>();
}

export async function getTeacher(id: string) {
	return await safeApi.get(`teacher/${id}`).json<ApiResponse<Teacher>>();
}

export async function createTeacher(payload: CreateTeacherPayload) {
	return await safeApi
		.post("teacher", { json: payload })
		.json<ApiResponse<Teacher>>();
}

export async function updateTeacher(id: string, payload: UpdateTeacherPayload) {
	return await safeApi
		.put(`teacher/${id}`, { json: payload })
		.json<ApiResponse<Teacher>>();
}

export async function deleteTeacher(id: string) {
	return await safeApi
		.delete(`teacher/${id}`)
		.json<ApiResponse<{ message: string }>>();
}

// School API
export async function getSchools() {
	return await safeApi.get("school").json<ApiResponse<School[]>>();
}

export async function getSchool(id: string) {
	return await safeApi.get(`school/${id}`).json<ApiResponse<School>>();
}

export async function createSchool(payload: CreateSchoolPayload) {
	return await safeApi
		.post("school", { json: payload })
		.json<ApiResponse<School>>();
}

export async function updateSchool(id: string, payload: UpdateSchoolPayload) {
	return await safeApi
		.put(`school/${id}`, { json: payload })
		.json<ApiResponse<School>>();
}

export async function deleteSchool(id: string) {
	return await safeApi
		.delete(`school/${id}`)
		.json<ApiResponse<{ message: string }>>();
}

// School Admin API
export async function getSchoolAdmins(schoolId?: string) {
	const params = schoolId ? { schoolId } : {};
	return await safeApi
		.get("school-admin", { searchParams: params })
		.json<ApiResponse<SchoolAdmin[]>>();
}

export async function getSchoolAdmin(id: string) {
	return await safeApi
		.get(`school-admin/${id}`)
		.json<ApiResponse<SchoolAdmin>>();
}

export async function createSchoolAdmin(payload: CreateSchoolAdminPayload) {
	return await safeApi
		.post("school-admin", { json: payload })
		.json<ApiResponse<SchoolAdmin>>();
}

export async function updateSchoolAdmin(
	id: string,
	payload: UpdateSchoolAdminPayload,
) {
	return await safeApi
		.put(`school-admin/${id}`, { json: payload })
		.json<ApiResponse<SchoolAdmin>>();
}

export async function deleteSchoolAdmin(id: string) {
	return await safeApi
		.delete(`school-admin/${id}`)
		.json<ApiResponse<{ message: string }>>();
}
