import { verifySession } from "@/lib/session";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

export async function AuthorizeSession({ children }: { children: ReactNode }) {
	const session = await verifySession();
	if (!session.isAuth) {
		return redirect("/super/login");
	}

	return children;
}
