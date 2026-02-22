import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GraduationCapIcon } from "@/components/icons";

export default function LandingPage() {
	return (
		<div className="min-h-screen bg-white">
			{/* Navigation */}
			<nav className="border-b border-zinc-200 bg-white">
				<div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
					<div className="flex items-center gap-2">
						<GraduationCapIcon className="h-8 w-8 text-zinc-900" />
						<span className="text-xl font-bold text-zinc-900">ManageIt</span>
					</div>
					<div className="hidden items-center gap-8 md:flex">
						<a
							href="#features"
							className="text-sm font-medium text-zinc-600 hover:text-zinc-900"
						>
							Features
						</a>
						<a
							href="#about"
							className="text-sm font-medium text-zinc-600 hover:text-zinc-900"
						>
							About
						</a>
						<Link href="/login">
							<Button variant="outline" size="sm">
								Sign In
							</Button>
						</Link>
					</div>
				</div>
			</nav>

			{/* Hero Section */}
			<section className="relative overflow-hidden bg-zinc-50 py-24 sm:py-32">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="text-center">
						<h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-6xl">
							Manage Your School
							<br />
							<span className="text-zinc-600">With Ease</span>
						</h1>
						<p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-600">
							Streamline student enrollment, track attendance, manage grades,
							and handle all your school operations in one powerful platform.
						</p>
						<div className="mt-10 flex items-center justify-center gap-4">
							<Link href="/login">
								<Button size="lg">Get Started</Button>
							</Link>
							<a href="#features">
								<Button variant="outline" size="lg">
									Learn More
								</Button>
							</a>
						</div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section id="features" className="py-24">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="text-center">
						<h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
							Everything You Need
						</h2>
						<p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600">
							Powerful features designed to simplify school management
						</p>
					</div>

					<div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
						<FeatureCard
							title="Student Management"
							description="Easily enroll students, track their progress, and maintain comprehensive records."
						/>
						<FeatureCard
							title="Attendance Tracking"
							description="Mark and monitor attendance with intuitive daily tracking tools."
						/>
						<FeatureCard
							title="Grade Management"
							description="Record, calculate, and analyze student grades across all subjects."
						/>
						<FeatureCard
							title="Staff Directory"
							description="Manage teacher profiles, assignments, and schedules efficiently."
						/>
						<FeatureCard
							title="Communication"
							description="Keep parents and staff informed with built-in messaging tools."
						/>
						<FeatureCard
							title="Reports & Analytics"
							description="Generate detailed reports on student performance and school metrics."
						/>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="bg-zinc-900 py-24">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="text-center">
						<h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
							Ready to Transform Your School?
						</h2>
						<p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-300">
							Join thousands of schools already using ManageIt to streamline
							their operations.
						</p>
						<div className="mt-10">
							<Link href="/login">
								<Button
									size="lg"
									className="bg-white text-zinc-900 hover:bg-zinc-100"
								>
									Start Free Trial
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="border-t border-zinc-200 bg-white py-12">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
						<div className="flex items-center gap-2">
							<GraduationCap className="h-6 w-6 text-zinc-600" />
							<span className="text-lg font-semibold text-zinc-900">
								ManageIt
							</span>
						</div>
						<p className="text-sm text-zinc-500">
							2026 ManageIt. All rights reserved.
						</p>
					</div>
				</div>
			</footer>
		</div>
	);
}

function FeatureCard({
	title,
	description,
}: {
	title: string;
	description: string;
}) {
	return (
		<div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
			<h3 className="text-lg font-semibold text-zinc-900">{title}</h3>
			<p className="mt-2 text-zinc-600">{description}</p>
		</div>
	);
}
