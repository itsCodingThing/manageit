"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Users, BookOpen, ClipboardList, Settings, LogOut } from "lucide-react"

export function SchoolAdminSidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <aside className="w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="text-2xl font-bold text-sidebar-primary">EduAdmin</h1>
        <p className="text-xs text-sidebar-foreground/60 mt-1">School Admin Panel</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <Link
          href="/school-admin/dashboard"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            isActive("/school-admin/dashboard")
              ? "bg-sidebar-primary text-sidebar-primary-foreground"
              : "text-sidebar-foreground hover:bg-sidebar-accent/10"
          }`}
        >
          <BarChart3 size={20} />
          <span>Dashboard</span>
        </Link>

        <Link
          href="/school-admin/teachers"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            isActive("/school-admin/teachers")
              ? "bg-sidebar-primary text-sidebar-primary-foreground"
              : "text-sidebar-foreground hover:bg-sidebar-accent/10"
          }`}
        >
          <Users size={20} />
          <span>Teachers</span>
        </Link>

        <Link
          href="/school-admin/students"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            isActive("/school-admin/students")
              ? "bg-sidebar-primary text-sidebar-primary-foreground"
              : "text-sidebar-foreground hover:bg-sidebar-accent/10"
          }`}
        >
          <BookOpen size={20} />
          <span>Students</span>
        </Link>

        <Link
          href="/school-admin/exams"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            isActive("/school-admin/exams")
              ? "bg-sidebar-primary text-sidebar-primary-foreground"
              : "text-sidebar-foreground hover:bg-sidebar-accent/10"
          }`}
        >
          <ClipboardList size={20} />
          <span>Exams & Batches</span>
        </Link>

        <Link
          href="/school-admin/settings"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            isActive("/school-admin/settings")
              ? "bg-sidebar-primary text-sidebar-primary-foreground"
              : "text-sidebar-foreground hover:bg-sidebar-accent/10"
          }`}
        >
          <Settings size={20} />
          <span>Settings</span>
        </Link>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-sidebar-border">
        <button className="flex items-center gap-3 px-4 py-3 rounded-lg w-full text-sidebar-foreground hover:bg-destructive/10 transition-colors">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}
