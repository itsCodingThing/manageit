"use server";

import { cookies } from "next/headers";
import { decrypt, encrypt, SessionPayload } from "./jwt";

export async function createSession(data: {
	token: string;
	userType: SessionPayload["userType"];
}) {
	const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
	const session = await encrypt({ ...data, expiresAt });
	const cookieStore = await cookies();

	cookieStore.set("session", session, {
		httpOnly: true,
		secure: true,
		expires: expiresAt,
		sameSite: "lax",
		path: "/",
	});
}

export async function verifySession(): Promise<
	{ isAuth: true; session: SessionPayload } | { isAuth: false; session: null }
> {
	try {
		const cookieStore = await cookies();
		const sessionCookie = cookieStore.get("session")?.value;
		if (!sessionCookie) {
			return { isAuth: false, session: null };
		}

		const session = await decrypt(sessionCookie);

		if (!session) {
			return { isAuth: false, session: null };
		}

		return { isAuth: true, session: session };
	} catch {
		return { isAuth: false, session: null };
	}
}

export async function updateSession() {
	const cookieStore = await cookies();
	const sessionCookie = cookieStore.get("session")?.value;
	if (!sessionCookie) {
		return;
	}

	const payload = await decrypt(sessionCookie);
	if (!payload) {
		return;
	}

	const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

	cookieStore.set("session", sessionCookie, {
		httpOnly: true,
		secure: true,
		expires: expires,
		sameSite: "lax",
		path: "/",
	});
}

export async function deleteSession() {
	const cookieStore = await cookies();
	cookieStore.delete("session");
}
