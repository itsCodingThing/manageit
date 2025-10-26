"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, User, ClipboardList, BookOpen, LogOut } from "lucide-react"

export function StudentSidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <aside className="w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="text-2xl font-bold text-sidebar-primary">EduAdmin</h1>
        <p className="text-xs text-sidebar-foreground/60 mt-1">Student Portal</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <Link
          href="/student/dashboard"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            isActive("/student/dashboard")
              ? "bg-sidebar-primary text-sidebar-primary-foreground"
              : "text-sidebar-foreground hover:bg-sidebar-accent/10"
          }`}
        >
          <BarChart3 size={20} />
          <span>Dashboard</span>
        </Link>

        <Link
          href="/student/profile"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            isActive("/student/profile")
              ? "bg-sidebar-primary text-sidebar-primary-foreground"
              : "text-sidebar-foreground hover:bg-sidebar-accent/10"
          }`}
        >
          <User size={20} />
          <span>My Profile</span>
        </Link>

        <Link
          href="/student/exams"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            isActive("/student/exams")
              ? "bg-sidebar-primary text-sidebar-primary-foreground"
              : "text-sidebar-foreground hover:bg-sidebar-accent/10"
          }`}
        >
          <ClipboardList size={20} />
          <span>My Exams</span>
        </Link>

        <Link
          href="/student/batches"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            isActive("/student/batches")
              ? "bg-sidebar-primary text-sidebar-primary-foreground"
              : "text-sidebar-foreground hover:bg-sidebar-accent/10"
          }`}
        >
          <BookOpen size={20} />
          <span>My Batches</span>
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
