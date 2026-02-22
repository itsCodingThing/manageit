import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	GraduationCapIcon,
	UsersIcon,
	UserCheckIcon,
	BookOpenIcon,
	CalendarIcon,
	TrendingUpIcon,
	BellIcon,
	SettingsIcon,
	LogOutIcon,
	HomeIcon,
} from "@/components/icons";

export default async function AdminDashboard() {
	return (
		<div className="min-h-screen bg-zinc-50">
			{/* Sidebar */}
			<aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-zinc-200 bg-white">
				<div className="flex h-16 items-center gap-2 border-b border-zinc-200 px-6">
					<GraduationCapIcon className="h-8 w-8 text-zinc-900" />
					<span className="text-xl font-bold text-zinc-900">ManageIt</span>
				</div>

				<nav className="space-y-1 p-4">
					<SidebarLink href="/admin" icon={HomeIcon} label="Dashboard" active />
					<SidebarLink href="#" icon={UsersIcon} label="Students" />
					<SidebarLink href="#" icon={UserCheckIcon} label="Teachers" />
					<SidebarLink href="#" icon={BookOpenIcon} label="Classes" />
					<SidebarLink href="#" icon={CalendarIcon} label="Attendance" />
					<SidebarLink href="#" icon={TrendingUpIcon} label="Reports" />
				</nav>

				<div className="absolute bottom-0 left-0 right-0 border-t border-zinc-200 p-4">
					<SidebarLink href="#" icon={SettingsIcon} label="Settings" />
					<Link
						href="/"
						className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
					>
						<LogOutIcon className="h-5 w-5" />
						Sign Out
					</Link>
				</div>
			</aside>

			{/* Main Content */}
			<div className="ml-64">
				{/* Header */}
				<header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-zinc-200 bg-white px-8">
					<h1 className="text-xl font-semibold text-zinc-900">
						Admin Dashboard
					</h1>
					<div className="flex items-center gap-4">
						<button
							type="button"
							className="relative rounded-lg p-2 text-zinc-600 hover:bg-zinc-100"
						>
							<BellIcon className="h-5 w-5" />
							<span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
						</button>
						<div className="flex items-center gap-3">
							<div className="h-8 w-8 rounded-full bg-zinc-200" />
							<div className="hidden sm:block">
								<p className="text-sm font-medium text-zinc-900">Admin User</p>
								<p className="text-xs text-zinc-500">admin@school.edu</p>
							</div>
						</div>
					</div>
				</header>

				{/* Dashboard Content */}
				<main className="p-8">
					{/* Stats Grid */}
					<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
						<StatCard
							title="Total Students"
							value="1,248"
							change="+5.2%"
							icon={Users}
						/>
						<StatCard
							title="Total Teachers"
							value="64"
							change="+2.1%"
							icon={UserCheck}
						/>
						<StatCard
							title="Active Classes"
							value="32"
							change="0%"
							icon={BookOpen}
						/>
						<StatCard
							title="Attendance Today"
							value="94.2%"
							change="-1.3%"
							icon={Calendar}
							negative
						/>
					</div>

					{/* Recent Activity & Quick Actions */}
					<div className="mt-8 grid gap-6 lg:grid-cols-3">
						{/* Recent Activity */}
						<Card className="lg:col-span-2">
							<CardHeader>
								<CardTitle>Recent Activity</CardTitle>
								<CardDescription>
									Latest actions across the school
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<ActivityItem
										action="New student enrolled"
										detail="John Smith joined Grade 10-A"
										time="2 hours ago"
									/>
									<ActivityItem
										action="Grade updated"
										detail="Mathematics midterm grades published"
										time="4 hours ago"
									/>
									<ActivityItem
										action="New teacher added"
										detail="Sarah Johnson joined as Science teacher"
										time="Yesterday"
									/>
									<ActivityItem
										action="Attendance report generated"
										detail="Weekly attendance report is ready"
										time="Yesterday"
									/>
								</div>
							</CardContent>
						</Card>

						{/* Quick Actions */}
						<Card>
							<CardHeader>
								<CardTitle>Quick Actions</CardTitle>
								<CardDescription>Common admin tasks</CardDescription>
							</CardHeader>
							<CardContent className="space-y-2">
								<Button variant="outline" className="w-full justify-start">
									<Users className="mr-2 h-4 w-4" />
									Add New Student
								</Button>
								<Button variant="outline" className="w-full justify-start">
									<UserCheck className="mr-2 h-4 w-4" />
									Add New Teacher
								</Button>
								<Button variant="outline" className="w-full justify-start">
									<BookOpen className="mr-2 h-4 w-4" />
									Create Class
								</Button>
								<Button variant="outline" className="w-full justify-start">
									<Calendar className="mr-2 h-4 w-4" />
									Mark Attendance
								</Button>
								<Button variant="outline" className="w-full justify-start">
									<TrendingUp className="mr-2 h-4 w-4" />
									Generate Report
								</Button>
							</CardContent>
						</Card>
					</div>
				</main>
			</div>
		</div>
	);
}

function SidebarLink({
	href,
	icon: Icon,
	label,
	active = false,
}: {
	href: string;
	icon: React.ElementType;
	label: string;
	active?: boolean;
}) {
	return (
		<Link
			href={href}
			className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
				active
					? "bg-zinc-100 text-zinc-900"
					: "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
			}`}
		>
			<Icon className="h-5 w-5" />
			{label}
		</Link>
	);
}

function StatCard({
	title,
	value,
	change,
	icon: Icon,
	negative = false,
}: {
	title: string;
	value: string;
	change: string;
	icon: React.ElementType;
	negative?: boolean;
}) {
	return (
		<Card>
			<CardContent className="p-6">
				<div className="flex items-center justify-between">
					<div>
						<p className="text-sm font-medium text-zinc-600">{title}</p>
						<p className="mt-2 text-3xl font-bold text-zinc-900">{value}</p>
					</div>
					<div className="rounded-lg bg-zinc-100 p-3">
						<Icon className="h-6 w-6 text-zinc-600" />
					</div>
				</div>
				<div className="mt-4 flex items-center">
					<span
						className={`text-sm font-medium ${
							negative ? "text-red-600" : "text-green-600"
						}`}
					>
						{change}
					</span>
					<span className="ml-2 text-sm text-zinc-500">from last month</span>
				</div>
			</CardContent>
		</Card>
	);
}

function ActivityItem({
	action,
	detail,
	time,
}: {
	action: string;
	detail: string;
	time: string;
}) {
	return (
		<div className="flex items-start gap-4">
			<div className="h-2 w-2 rounded-full bg-zinc-400 mt-2" />
			<div className="flex-1">
				<p className="text-sm font-medium text-zinc-900">{action}</p>
				<p className="text-sm text-zinc-600">{detail}</p>
			</div>
			<span className="text-xs text-zinc-500">{time}</span>
		</div>
	);
}
