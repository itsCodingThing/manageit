import Sidebar from "./sidebar";
import { AuthorizeSession } from "./authorize-session";
import Header from "./header";

export default function SuperRootLayout({ children }: LayoutProps<"/super">) {
	return (
		<AuthorizeSession>
			<main className="flex max-h-dvh max-w-dvw h-dvh w-dvw overflow-y-hidden bg-amber-100">
				<Sidebar />
				<div className="bg-zinc-50 overflow-y-auto">
					<Header />
					{children}
				</div>
			</main>
		</AuthorizeSession>
	);
}
