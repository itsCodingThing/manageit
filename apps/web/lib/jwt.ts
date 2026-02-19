import { type JWTPayload, SignJWT, jwtVerify } from "jose";
import { Env } from "./env";

const secretKey = Env.BETTER_AUTH_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export interface SessionPayload extends JWTPayload {
	userType: "admin" | "teacher" | "student" | "school-admin";
	token: string;
	expiresAt: Date;
}

export async function encrypt(payload: SessionPayload) {
	return new SignJWT(payload)
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime("7d")
		.sign(encodedKey);
}

export async function decrypt(session: string) {
	try {
		const { payload } = await jwtVerify(session, encodedKey, {
			algorithms: ["HS256"],
		});

		return payload as SessionPayload;
	} catch {
		return null;
	}
}
