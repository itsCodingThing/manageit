"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { usePathname } from "next/navigation";
import {
  BarChart3Icon,
  UsersIcon,
  SchoolIcon,
  SettingsIcon,
  LogOutIcon,
  ArrowLeftFromLineIcon,
  ArrowRightFromLineIcon,
} from "@/components/icons";
import { logout } from "@/app/super-admin/actions/auth";
import { cn } from "@/utils/utils";

function NavLink(props: {
  name: string;
  href: string;
  isCollapsed?: boolean;
  icon?: React.ReactElement;
}) {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <Link
      href={props.href}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
        isActive(props.href)
          ? "bg-sidebar-primary text-sidebar-primary-foreground"
          : "text-sidebar-foreground hover:bg-sidebar-accent/10"
      }`}
    >
      {props.icon}
      {props.isCollapsed ? null : <span>{props.name}</span>}
    </Link>
  );
}

export function SuperAdminSidebar() {
  const [state, formAction, pending] = useActionState(logout, { message: "" });
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border h-screen flex flex-col",
        { "w-20": isCollapsed },
      )}
    >
      <div className="flex border-b border-sidebar-border">
        <div
          className={cn("p-6 border-r border-sidebar-border", {
            hidden: isCollapsed,
          })}
        >
          <h1 className="text-2xl font-bold text-sidebar-primary">EduAdmin</h1>
          <p className="text-xs text-sidebar-foreground/60 mt-1">
            Super Admin Panel
          </p>
        </div>
        <div
          className="flex-1 flex justify-center items-center"
          onClick={() => setIsCollapsed((prev) => !prev)}
        >
          {isCollapsed ? (
            <ArrowRightFromLineIcon className="cursor-pointer my-6" size={30} />
          ) : (
            <ArrowLeftFromLineIcon className="cursor-pointer" size={30} />
          )}
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <NavLink
          name="Dashboard"
          href="/super-admin/dashboard"
          icon={<BarChart3Icon size={20} />}
          isCollapsed={isCollapsed}
        />

        <NavLink
          name="Manage Admins"
          href="/super-admin/admins"
          icon={<UsersIcon size={20} />}
          isCollapsed={isCollapsed}
        />

        <NavLink
          name="Manage Schools"
          href="/super-admin/schools"
          icon={<SchoolIcon size={20} />}
          isCollapsed={isCollapsed}
        />

        <NavLink
          name="Settings"
          href="/super-admin/settings"
          icon={<SettingsIcon size={20} />}
          isCollapsed={isCollapsed}
        />
      </nav>

      <form action={formAction} className="p-4 border-t border-sidebar-border">
        <button
          disabled={pending}
          className="cursor-pointer flex items-center gap-3 px-4 py-3 rounded-lg w-full text-sidebar-foreground hover:bg-destructive/10 transition-colors"
        >
          <LogOutIcon size={20} />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </form>
    </aside>
  );
}
