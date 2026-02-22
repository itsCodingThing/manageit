"use client";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
	useSidebar,
} from "@/components/ui/sidebar";
import { useState } from "react";
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
	MenuIcon,
	XIcon,
} from "@/components/icons";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/app/action";
import { cn } from "@/lib/utils";

interface SidebarLinkProps {
	href: string;
	icon: React.ElementType;
	label: string;
	active?: boolean;
	collapsed?: boolean;
}

export const navs = [
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
] as const;

function SidebarLink({
	href,
	icon: Icon,
	label,
	active = false,
	collapsed = false,
}: SidebarLinkProps) {
	return (
		<Link
			href={href}
			className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
				active
					? "bg-zinc-100 text-zinc-900"
					: "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
			} ${collapsed ? "justify-center px-2" : ""}`}
		>
			<Icon className="h-5 w-5 shrink-0" />
			{!collapsed && <span className="truncate">{label}</span>}
		</Link>
	);
}

export default function NavSidebar() {
	const pathname = usePathname();
	const sidebar = useSidebar();

	return (
		<Sidebar collapsible="icon" className="border-r border-zinc-200 bg-white">
			<SidebarHeader className="border-b border-zinc-200 px-4 h-16">
				<div className="flex items-center justify-between h-full">
					{sidebar.state === "expanded" && (
						<div className="flex items-center gap-2">
							<ShieldIcon className="h-8 w-8 text-zinc-900" />
							<span className="text-xl font-bold text-zinc-900">
								Super Admin
							</span>
						</div>
					)}
					<Button
						variant="ghost"
						size="icon-xs"
						onClick={() => sidebar.toggleSidebar()}
					>
						{sidebar.state === "collapsed" ? (
							<MenuIcon className="h-4 w-4" />
						) : (
							<XIcon className="h-4 w-4" />
						)}
					</Button>
				</div>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<nav className="space-y-1 p-2">
						{navs.map((item) => (
							<SidebarLink
								key={item.href}
								href={item.href}
								icon={item.icon}
								label={item.label}
								active={pathname === item.href}
								collapsed={sidebar.state === "collapsed"}
							/>
						))}
					</nav>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter className="border-t border-zinc-200 px-4">
				<form
					action={logoutAction}
					className={cn(
						"flex-1 flex flex-col justify-end",
						sidebar.state === "collapsed" && "items-center",
					)}
				>
					<Button
						variant="ghost"
						className={cn(
							"w-full text-red-600 hover:bg-red-50",
							sidebar.state === "collapsed" ? "px-2" : "px-3",
						)}
					>
						<LogOutIcon className="h-5 w-5 shrink-0" />
						{sidebar.state !== "collapsed" && (
							<span className="ml-3">Sign Out</span>
						)}
					</Button>
				</form>
			</SidebarFooter>
		</Sidebar>
	);
}
