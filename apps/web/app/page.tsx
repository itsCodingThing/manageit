import Link from "next/link";
import { Button } from "@/components/ui/button";
import { School, Users, BookOpen, LogIn } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Navigation */}
      <nav className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">EduAdmin</h1>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                <LogIn size={18} />
                Login
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-foreground mb-4">
            Comprehensive School Management System
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Manage schools, admins, teachers, and students all in one place
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Super Admin */}
          <div className="bg-card border border-border rounded-lg p-8 hover:shadow-lg transition-shadow">
            <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Users className="text-primary" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Super Admin
            </h3>
            <p className="text-muted-foreground mb-6">
              Manage all administrators and schools in the system
            </p>
            <Link href="/super-admin/dashboard">
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                Access Panel
              </Button>
            </Link>
          </div>

          {/* School Admin */}
          <div className="bg-card border border-border rounded-lg p-8 hover:shadow-lg transition-shadow">
            <div className="bg-secondary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <School className="text-secondary" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              School Admin
            </h3>
            <p className="text-muted-foreground mb-6">
              Manage teachers, students, exams, and batches
            </p>
            <Link href="/school-admin/login">
              <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
                Login
              </Button>
            </Link>
          </div>

          {/* Teacher & Student */}
          <div className="bg-card border border-border rounded-lg p-8 hover:shadow-lg transition-shadow">
            <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <BookOpen className="text-accent" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Teacher & Student
            </h3>
            <p className="text-muted-foreground mb-6">
              Access your profile, exams, and learning materials
            </p>
            <Link href="/login">
              <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                Login
              </Button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="bg-card border border-border rounded-lg p-12">
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
            Key Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Multi-Role System",
                desc: "Super Admin, School Admin, Teachers, and Students",
              },
              {
                title: "User Management",
                desc: "Create, view, update, and manage all users",
              },
              {
                title: "Exam Management",
                desc: "Create and manage exams with batches",
              },
              {
                title: "Student Tracking",
                desc: "Monitor student progress and performance",
              },
              {
                title: "Analytics Dashboard",
                desc: "Real-time insights and statistics",
              },
              {
                title: "Secure Authentication",
                desc: "Role-based access control and security",
              },
            ].map((feature, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
