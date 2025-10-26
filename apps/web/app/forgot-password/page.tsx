"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Mail, ArrowLeft } from "lucide-react"

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<"email" | "code" | "reset">("email")

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">EduAdmin</h1>
          <p className="text-muted-foreground">School Management System</p>
        </div>

        {/* Reset Card */}
        <div className="bg-card border border-border rounded-lg p-8 shadow-lg">
          {step === "email" && (
            <>
              <h2 className="text-2xl font-bold text-foreground mb-2">Reset Password</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Enter your email address and we'll send you a code to reset your password.
              </p>

              <div className="mb-6">
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

              <Button
                onClick={() => setStep("code")}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2 font-medium mb-4"
              >
                Send Reset Code
              </Button>
            </>
          )}

          {step === "code" && (
            <>
              <h2 className="text-2xl font-bold text-foreground mb-2">Verify Code</h2>
              <p className="text-sm text-muted-foreground mb-6">
                We've sent a verification code to your email. Enter it below.
              </p>

              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">Verification Code</label>
                <input
                  type="text"
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-center text-2xl tracking-widest"
                />
              </div>

              <Button
                onClick={() => setStep("reset")}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2 font-medium mb-4"
              >
                Verify Code
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Didn't receive code? <button className="text-primary hover:underline">Resend</button>
              </p>
            </>
          )}

          {step === "reset" && (
            <>
              <h2 className="text-2xl font-bold text-foreground mb-2">Create New Password</h2>
              <p className="text-sm text-muted-foreground mb-6">Enter your new password below.</p>

              <div className="mb-4">
                <label className="block text-sm font-medium text-foreground mb-2">New Password</label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2 font-medium mb-4">
                Reset Password
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                <Link href="/login" className="text-primary hover:underline">
                  Back to login
                </Link>
              </p>
            </>
          )}

          {/* Back Link */}
          <Link
            href="/login"
            className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground mt-4"
          >
            <ArrowLeft size={16} />
            Back to login
          </Link>
        </div>
      </div>
    </div>
  )
}
