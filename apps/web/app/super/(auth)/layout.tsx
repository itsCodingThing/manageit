import { AuthorizeSession } from "./authorize-session";
import { SidebarProvider } from "@/components/ui/sidebar";
import NavSidebar from "./nav-sidebar";
import Header from "./header";

export default function SuperRootLayout({ children }: LayoutProps<"/super">) {
	return (
		<AuthorizeSession>
			<SidebarProvider>
				<NavSidebar />
				<main className="bg-amber-100 w-full">
					<Header />
					<div className="p-8">{children}</div>
				</main>
			</SidebarProvider>
		</AuthorizeSession>
	);
}
