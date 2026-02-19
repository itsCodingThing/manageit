import Link from "next/link";
import {
	Home,
	Building2,
	Users,
	CreditCard,
	TrendingUp,
	Settings,
	LogOut,
	Shield,
} from "lucide-react";

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

interface SidebarProps {
	activePath: string;
}

export default function Sidebar({ activePath }: SidebarProps) {
	const navItems = [
		{ href: "/super", icon: Home, label: "Dashboard" },
		{ href: "/super/schools", icon: Building2, label: "Schools" },
		{ href: "/super/admins", icon: Users, label: "Admins" },
		{
			href: "/super/subscriptions",
			icon: CreditCard,
			label: "Subscriptions",
		},
		{ href: "/super/analytics", icon: TrendingUp, label: "Analytics" },
		{ href: "/super/settings", icon: Settings, label: "Settings" },
	];

	return (
		<aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-zinc-200 bg-white">
			<div className="flex h-16 items-center gap-2 border-b border-zinc-200 px-6">
				<Shield className="h-8 w-8 text-zinc-900" />
				<span className="text-xl font-bold text-zinc-900">Super Admin</span>
			</div>

			<nav className="space-y-1 p-4">
				{navItems.map((item) => (
					<SidebarLink
						key={item.href}
						href={item.href}
						icon={item.icon}
						label={item.label}
						active={activePath === item.href}
					/>
				))}
			</nav>

			<div className="absolute bottom-0 left-0 right-0 border-t border-zinc-200 p-4">
				<SidebarLink
					href="/super/settings"
					icon={Settings}
					label="System Settings"
					active={activePath === "/super/admin/settings"}
				/>
				<Link
					href="/"
					className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
				>
					<LogOut className="h-5 w-5" />
					Sign Out
				</Link>
			</div>
		</aside>
	);
}
