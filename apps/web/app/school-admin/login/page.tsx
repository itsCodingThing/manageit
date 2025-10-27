"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { login } from "@/app/school-admin/actions/auth";

export default function SchoolAdminLoginPage() {
  const [formState, formAction, isPending] = useActionState(login, {
    success: true,
    message: "",
    formInputs: { email: "", password: "" },
  });
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">EduAdmin</h1>
          <p className="text-muted-foreground">School Admin Portal</p>
        </div>

        <form
          action={formAction}
          className="bg-card border border-border rounded-lg p-8 shadow-lg"
        >
          <h2 className="text-2xl font-bold text-foreground mb-2">
            School Admin Login
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            Manage your school and users
          </p>

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
                required
                defaultValue={formState.formInputs?.email}
                name="email"
                type="email"
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

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
                required
                defaultValue={formState.formInputs?.password}
                name="password"
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

          <Button
            disabled={isPending}
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2 font-medium mb-4"
          >
            Login
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            <Link href="/login" className="text-primary hover:underline">
              Back to main login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
