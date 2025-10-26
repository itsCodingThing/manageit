"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<
    "super-admin" | "school-admin" | "teacher" | "student"
  >("student");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">EduAdmin</h1>
          <p className="text-muted-foreground">School Management System</p>
        </div>

        {/* Login Card */}
        <div className="bg-card border border-border rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-foreground mb-6">Login</h2>

          {/* Role Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-foreground mb-3">
              Select Your Role
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: "super-admin", label: "Super Admin" },
                { value: "school-admin", label: "School Admin" },
                { value: "teacher", label: "Teacher" },
                { value: "student", label: "Student" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setRole(option.value as any)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    role === option.value
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-foreground mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-3 text-muted-foreground"
                size={20}
              />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-foreground mb-2">
              Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-3 text-muted-foreground"
                size={20}
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full pl-10 pr-10 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-border"
              />
              <span className="text-sm text-muted-foreground">Remember me</span>
            </label>
            <Link
              href="/forgot-password"
              className="text-sm text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Login Button */}
          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2 font-medium mb-4">
            Login
          </Button>

          {/* Signup Link */}
          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-primary hover:underline font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 bg-card border border-border rounded-lg p-4">
          <p className="text-xs font-semibold text-foreground mb-2">
            Demo Credentials:
          </p>
          <div className="space-y-1 text-xs text-muted-foreground">
            <p>Super Admin: admin@school.com / password123</p>
            <p>School Admin: schooladmin@school.com / password123</p>
            <p>Teacher: teacher@school.com / password123</p>
            <p>Student: student@school.com / password123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
