"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCapIcon, LoaderCircleIcon } from "lucide-react";
import { useActionState } from "react";
import { login } from "./action";

export default function SuperLoginPage() {
	const [state, action, isPending] = useActionState(login, {
		ok: true,
		state: { email: "", password: "" },
	});

	return (
		<div className="min-h-screen bg-zinc-50">
			{/* Header */}
			<nav className="border-b border-zinc-200 bg-white">
				<div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
					<Link href="/" className="flex items-center gap-2">
						<GraduationCapIcon className="h-8 w-8 text-zinc-900" />
						<span className="text-xl font-bold text-zinc-900">ManageIt</span>
					</Link>
				</div>
			</nav>

			{/* Login Form */}
			<div className="mx-auto max-w-md px-4 pt-20 sm:px-6 lg:px-8">
				<Card>
					<CardHeader className="space-y-1">
						<CardTitle className="text-2xl font-bold text-center">
							Sign In
						</CardTitle>
						<CardDescription className="text-center">
							Enter your credentials to access your account
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<form className="space-y-4" action={action}>
							<div className="space-y-2">
								<Label htmlFor="email">Email</Label>
								<Input
									name="email"
									id="email"
									type="email"
									placeholder="admin@school.edu"
									required
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="password">Password</Label>
								<Input
									name="password"
									id="password"
									type="password"
									placeholder="********"
									required
								/>
							</div>
							<Button type="submit" className="w-full" disabled={isPending}>
                {isPending && (
                <LoaderCircleIcon className="animate-spin" />
                )}
								Sign In
							</Button>
						</form>

						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-zinc-200" />
							</div>
							<div className="relative flex justify-center text-xs uppercase">
								<span className="bg-white px-2 text-zinc-500">
									Or continue with
								</span>
							</div>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<Button variant="outline" className="w-full">
								Google
							</Button>
							<Button variant="outline" className="w-full">
								GitHub
							</Button>
						</div>
					</CardContent>
				</Card>

				<p className="mt-4 text-center text-sm text-zinc-600">
					Don&apos;t have an account?{" "}
					<Link href="#" className="font-medium text-zinc-900 hover:underline">
						Contact your administrator
					</Link>
				</p>
			</div>
		</div>
	);
}
