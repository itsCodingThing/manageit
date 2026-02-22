"use client";

import Link from "next/link";
import {
	HomeIcon,
	Building2Icon,
	UsersIcon,
	CreditCardIcon,
	TrendingUpIcon,
	SettingsIcon,
	LogOutIcon,
	ShieldIcon,
} from "@/components/icons";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/app/action";

interface SidebarLinkProps {
	href: string;
	icon: React.ElementType;
	label: string;
	active?: boolean;
}

function SidebarLink({
	href,
	icon: Icon,
	label,
	active = false,
}: SidebarLinkProps) {
	return (
		<Link
			href={href}
			className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
				active
					? "bg-zinc-100 text-zinc-900"
					: "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
			}`}
		>
			<Icon className="h-5 w-5" />
			{label}
		</Link>
	);
}

export default function Sidebar() {
	const pathname = usePathname();

	const navItems = [
		{ href: "/super", icon: HomeIcon, label: "Dashboard" },
		{ href: "/super/admins", icon: UsersIcon, label: "Admins" },
		{ href: "/super/schools", icon: Building2Icon, label: "Schools" },
		{
			href: "/super/subscriptions",
			icon: CreditCardIcon,
			label: "Subscriptions",
		},
		{ href: "/super/analytics", icon: TrendingUpIcon, label: "Analytics" },
		{ href: "/super/settings", icon: SettingsIcon, label: "Settings" },
	];

	return (
		<aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-zinc-200 bg-white">
			<div className="flex h-16 items-center gap-2 border-b border-zinc-200 px-6">
				<ShieldIcon className="h-8 w-8 text-zinc-900" />
				<span className="text-xl font-bold text-zinc-900">Super Admin</span>
			</div>

			<nav className="space-y-1 p-4">
				{navItems.map((item) => (
					<SidebarLink
						key={item.href}
						href={item.href}
						icon={item.icon}
						label={item.label}
						active={pathname === item.href}
					/>
				))}
			</nav>

			<form
				action={logoutAction}
				className="absolute bottom-0 left-0 right-0 border-t border-zinc-200 p-4"
			>
				<Button className="w-full rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50">
					<LogOutIcon className="h-5 w-5" />
					Sign Out
				</Button>
			</form>
		</aside>
	);
}
