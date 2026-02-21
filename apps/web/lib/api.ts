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
					const json = { success: true, message: result.message, data: result };

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

export async function login(payload: { email: string; password: string }) {
	try {
		return await unsafeApi
			.post("auth/admin/sign-in", { json: payload })
			.json<ApiResponse<{ token: string }>>();
	} catch (error) {
		return {
			success: false,
			message: "unknown error",
			data: "",
		} satisfies ApiResponse<string>;
	}
}

export interface Admin {
	id: string;
	name: string;
	email: string;
	createdAt: string;
}
