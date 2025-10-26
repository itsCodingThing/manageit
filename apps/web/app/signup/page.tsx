"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Mail, Lock, User, Eye, EyeOff, BookOpen } from "lucide-react"

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [role, setRole] = useState<"teacher" | "student">("student")

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">EduAdmin</h1>
          <p className="text-muted-foreground">School Management System</p>
        </div>

        {/* Signup Card */}
        <div className="bg-card border border-border rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-foreground mb-6">Create Account</h2>

          {/* Role Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-foreground mb-3">Register As</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: "student", label: "Student" },
                { value: "teacher", label: "Teacher" },
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

          {/* Full Name Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-muted-foreground" size={20} />
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-muted-foreground" size={20} />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* School/Class Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-foreground mb-2">
              {role === "student" ? "Select Your School" : "Select Your School"}
            </label>
            <div className="relative">
              <BookOpen className="absolute left-3 top-3 text-muted-foreground" size={20} />
              <select className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                <option>Select school</option>
                <option>Central High School</option>
                <option>St. Mary Academy</option>
                <option>Lincoln High</option>
              </select>
            </div>
          </div>

          {/* Class Selection (for students) */}
          {role === "student" && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-foreground mb-2">Select Your Class</label>
              <select className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                <option>Select class</option>
                <option>Class 8</option>
                <option>Class 9</option>
                <option>Class 10</option>
                <option>Class 11</option>
                <option>Class 12</option>
              </select>
            </div>
          )}

          {/* Subject Selection (for teachers) */}
          {role === "teacher" && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-foreground mb-2">Subject</label>
              <select className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                <option>Select subject</option>
                <option>Mathematics</option>
                <option>English</option>
                <option>Science</option>
                <option>History</option>
                <option>Geography</option>
              </select>
            </div>
          )}

          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-foreground mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-muted-foreground" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
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

          {/* Terms & Conditions */}
          <label className="flex items-start gap-2 mb-6 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded border-border mt-1" />
            <span className="text-xs text-muted-foreground">
              I agree to the{" "}
              <Link href="#" className="text-primary hover:underline">
                Terms & Conditions
              </Link>{" "}
              and{" "}
              <Link href="#" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </span>
          </label>

          {/* Signup Button */}
          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2 font-medium mb-4">
            Create Account
          </Button>

          {/* Login Link */}
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
