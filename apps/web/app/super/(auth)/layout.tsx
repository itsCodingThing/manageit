import Sidebar from "./sidebar";
import { AuthorizeSession } from "./authorize-session";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
    <AuthorizeSession>
      <Sidebar />
      {children}
    </AuthorizeSession>
	);
}
