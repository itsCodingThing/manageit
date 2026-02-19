import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Building2,
	Users,
	GraduationCap,
	School,
	TrendingUp,
	Bell,
	Plus,
	CreditCard,
	Settings,
} from "lucide-react";

export default function SuperAdminDashboard() {
	return (
		<div className="min-h-screen bg-zinc-50">
			{/* Main Content */}
			<div className="ml-64">
				{/* Header */}
				<header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-zinc-200 bg-white px-8">
					<h1 className="text-xl font-semibold text-zinc-900">
						Super Admin Dashboard
					</h1>
					<div className="flex items-center gap-4">
						<button
							type="button"
							className="relative rounded-lg p-2 text-zinc-600 hover:bg-zinc-100"
						>
							<Bell className="h-5 w-5" />
							<span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
						</button>
						<div className="flex items-center gap-3">
							<div className="h-8 w-8 rounded-full bg-zinc-800" />
							<div className="hidden sm:block">
								<p className="text-sm font-medium text-zinc-900">
									Super Administrator
								</p>
								<p className="text-xs text-zinc-500">superadmin@manageit.com</p>
							</div>
						</div>
					</div>
				</header>

				{/* Dashboard Content */}
				<main className="p-8">
					{/* Stats Grid */}
					<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
						<StatCard
							title="Total Schools"
							value="156"
							change="+12"
							icon={Building2}
						/>
						<StatCard
							title="School Admins"
							value="342"
							change="+8"
							icon={Users}
						/>
						<StatCard
							title="Total Students"
							value="48.5K"
							change="+2.3K"
							icon={GraduationCap}
						/>
						<StatCard
							title="Active Plans"
							value="142"
							change="+5"
							icon={CreditCard}
						/>
					</div>

					{/* Recent Schools & Quick Actions */}
					<div className="mt-8 grid gap-6 lg:grid-cols-3">
						{/* Recent Schools */}
						<Card className="lg:col-span-2">
							<CardHeader className="flex flex-row items-center justify-between">
								<div>
									<CardTitle>Recently Added Schools</CardTitle>
									<CardDescription>
										New schools that joined the platform
									</CardDescription>
								</div>
								<Button variant="outline" size="sm">
									View All
								</Button>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<SchoolRow
										name="Lincoln High School"
										location="New York, USA"
										students={1248}
										plan="Enterprise"
										status="Active"
									/>
									<SchoolRow
										name="Riverside Academy"
										location="Los Angeles, USA"
										students={856}
										plan="Professional"
										status="Active"
									/>
									<SchoolRow
										name="Maple Elementary"
										location="Chicago, USA"
										students={432}
										plan="Basic"
										status="Pending"
									/>
									<SchoolRow
										name="Oakridge International"
										location="Houston, USA"
										students={2156}
										plan="Enterprise"
										status="Active"
									/>
								</div>
							</CardContent>
						</Card>

						{/* Quick Actions */}
						<Card>
							<CardHeader>
								<CardTitle>Quick Actions</CardTitle>
								<CardDescription>Common super admin tasks</CardDescription>
							</CardHeader>
							<CardContent className="space-y-2">
								<Button variant="outline" className="w-full justify-start">
									<Plus className="mr-2 h-4 w-4" />
									Add New School
								</Button>
								<Button variant="outline" className="w-full justify-start">
									<Users className="mr-2 h-4 w-4" />
									Create School Admin
								</Button>
								<Button variant="outline" className="w-full justify-start">
									<CreditCard className="mr-2 h-4 w-4" />
									Manage Subscriptions
								</Button>
								<Button variant="outline" className="w-full justify-start">
									<TrendingUp className="mr-2 h-4 w-4" />
									View Analytics
								</Button>
								<Button variant="outline" className="w-full justify-start">
									<Settings className="mr-2 h-4 w-4" />
									System Settings
								</Button>
							</CardContent>
						</Card>
					</div>

					{/* System Overview */}
					<div className="mt-8 grid gap-6 lg:grid-cols-3">
						<Card>
							<CardHeader>
								<CardTitle>Subscription Overview</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<SubscriptionBar
										plan="Enterprise"
										count={42}
										total={156}
										color="bg-zinc-900"
									/>
									<SubscriptionBar
										plan="Professional"
										count={68}
										total={156}
										color="bg-zinc-600"
									/>
									<SubscriptionBar
										plan="Basic"
										count={46}
										total={156}
										color="bg-zinc-400"
									/>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Recent Activity</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<ActivityItem
										action="New school registered"
										detail="Lincoln High School joined the platform"
										time="2 hours ago"
									/>
									<ActivityItem
										action="Subscription upgraded"
										detail="Riverside Academy upgraded to Enterprise"
										time="4 hours ago"
									/>
									<ActivityItem
										action="Admin created"
										detail="New admin added for Maple Elementary"
										time="Yesterday"
									/>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>System Health</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<HealthItem
										name="API Status"
										status="Operational"
										statusColor="text-green-600"
									/>
									<HealthItem
										name="Database"
										status="Operational"
										statusColor="text-green-600"
									/>
									<HealthItem
										name="Storage"
										status="98% Available"
										statusColor="text-green-600"
									/>
									<HealthItem
										name="Email Service"
										status="Degraded"
										statusColor="text-yellow-600"
									/>
								</div>
							</CardContent>
						</Card>
					</div>
				</main>
			</div>
		</div>
	);
}

function StatCard({
	title,
	value,
	change,
	icon: Icon,
}: {
	title: string;
	value: string;
	change: string;
	icon: React.ElementType;
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
					<span className="text-sm font-medium text-green-600">{change}</span>
					<span className="ml-2 text-sm text-zinc-500">this month</span>
				</div>
			</CardContent>
		</Card>
	);
}

function SchoolRow({
	name,
	location,
	students,
	plan,
	status,
}: {
	name: string;
	location: string;
	students: number;
	plan: string;
	status: string;
}) {
	return (
		<div className="flex items-center justify-between rounded-lg border border-zinc-100 p-4">
			<div className="flex items-center gap-4">
				<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100">
					<School className="h-5 w-5 text-zinc-600" />
				</div>
				<div>
					<p className="font-medium text-zinc-900">{name}</p>
					<p className="text-sm text-zinc-500">{location}</p>
				</div>
			</div>
			<div className="flex items-center gap-6">
				<div className="text-right">
					<p className="text-sm font-medium text-zinc-900">
						{students.toLocaleString()} students
					</p>
					<p className="text-sm text-zinc-500">{plan} Plan</p>
				</div>
				<span
					className={`rounded-full px-3 py-1 text-xs font-medium ${
						status === "Active"
							? "bg-green-100 text-green-700"
							: "bg-yellow-100 text-yellow-700"
					}`}
				>
					{status}
				</span>
			</div>
		</div>
	);
}

function SubscriptionBar({
	plan,
	count,
	total,
	color,
}: {
	plan: string;
	count: number;
	total: number;
	color: string;
}) {
	const percentage = (count / total) * 100;
	return (
		<div>
			<div className="mb-2 flex items-center justify-between">
				<span className="text-sm font-medium text-zinc-700">{plan}</span>
				<span className="text-sm text-zinc-500">
					{count} schools ({percentage.toFixed(1)}%)
				</span>
			</div>
			<div className="h-2 w-full rounded-full bg-zinc-100">
				<div
					className={`h-2 rounded-full ${color}`}
					style={{ width: `${percentage}%` }}
				/>
			</div>
		</div>
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
			<div className="mt-2 h-2 w-2 rounded-full bg-zinc-400" />
			<div className="flex-1">
				<p className="text-sm font-medium text-zinc-900">{action}</p>
				<p className="text-sm text-zinc-600">{detail}</p>
			</div>
			<span className="text-xs text-zinc-500">{time}</span>
		</div>
	);
}

function HealthItem({
	name,
	status,
	statusColor,
}: {
	name: string;
	status: string;
	statusColor: string;
}) {
	return (
		<div className="flex items-center justify-between">
			<span className="text-sm text-zinc-700">{name}</span>
			<span className={`text-sm font-medium ${statusColor}`}>{status}</span>
		</div>
	);
}
