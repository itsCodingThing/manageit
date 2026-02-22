import { AuthorizeSession } from "./authorize-session";
import { SidebarProvider } from "@/components/ui/sidebar";
import NavSidebar from "./nav-sidebar";
import Header from "./header";

export default function SuperRootLayout({ children }: LayoutProps<"/super">) {
	return (
		<AuthorizeSession>
			<SidebarProvider>
				<NavSidebar />
				<main className="bg-amber-100 max-h-dvh max-w-dvw h-dvh w-dvw">
					<Header />
					{children}
				</main>
			</SidebarProvider>
		</AuthorizeSession>
	);
}
