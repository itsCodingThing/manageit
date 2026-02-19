import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Sidebar from "./sidebar";
import { AuthorizeSession } from "./authorize-session";

export const metadata: Metadata = {
	title: "ManageIt - School Management System",
	description: "Streamline your school operations with ManageIt",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
        <AuthorizeSession>
          <Sidebar />
          {children}
        </AuthorizeSession>
			</body>
		</html>
	);
}
