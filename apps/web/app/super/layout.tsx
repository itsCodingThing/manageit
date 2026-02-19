import type { Metadata } from "next";
import Sidebar from "./sidebar";

export const metadata: Metadata = {
	title: "ManageIt - School Management System",
	description: "Streamline your school operations with ManageIt",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<Sidebar activePath="/super" />
				{children}
			</body>
		</html>
	);
}
