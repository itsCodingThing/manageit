import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	TrendingUpIcon,
	BellIcon,
	UsersIcon,
	Building2Icon,
} from "@/components/icons";

export default function AnalyticsPage() {
	return (
		<div className="min-h-screen bg-zinc-50">
			<div className="ml-64">
				<header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-zinc-200 bg-white px-8">
					<h1 className="text-xl font-semibold text-zinc-900">Analytics</h1>
					<div className="flex items-center gap-4">
						<button
							type="button"
							className="relative rounded-lg p-2 text-zinc-600 hover:bg-zinc-100"
						>
							<BellIcon className="h-5 w-5" />
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

				<main className="p-8">
					<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
						<StatCard
							title="Total Revenue"
							value="$582K"
							change="+15.3%"
							trend="up"
							icon={TrendingUpIcon}
						/>
						<StatCard
							title="New Schools"
							value="23"
							change="+8.2%"
							trend="up"
							icon={Building2Icon}
						/>
						<StatCard
							title="Active Users"
							value="48.5K"
							change="-2.1%"
							trend="down"
							icon={UsersIcon}
						/>
						<StatCard
							title="Churn Rate"
							value="2.4%"
							change="-0.5%"
							trend="up"
							icon={GraduationCap}
						/>
					</div>

					<div className="mt-8 grid gap-6 lg:grid-cols-3">
						<Card className="lg:col-span-2">
							<CardHeader>
								<CardTitle>Revenue Growth</CardTitle>
								<CardDescription>
									Monthly revenue over the past year
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="flex h-64 items-end justify-between gap-2">
									{[
										{ month: "Mar", height: 35 },
										{ month: "Apr", height: 42 },
										{ month: "May", height: 38 },
										{ month: "Jun", height: 45 },
										{ month: "Jul", height: 52 },
										{ month: "Aug", height: 48 },
										{ month: "Sep", height: 55 },
										{ month: "Oct", height: 62 },
										{ month: "Nov", height: 58 },
										{ month: "Dec", height: 65 },
										{ month: "Jan", height: 72 },
										{ month: "Feb", height: 78 },
									].map((data) => (
										<div
											key={data.month}
											className="flex-1 rounded-t bg-zinc-200 hover:bg-zinc-300 transition-colors"
											style={{ height: `${data.height}%` }}
										/>
									))}
								</div>
								<div className="mt-4 flex justify-between text-sm text-zinc-500">
									<span>Mar</span>
									<span>Apr</span>
									<span>May</span>
									<span>Jun</span>
									<span>Jul</span>
									<span>Aug</span>
									<span>Sep</span>
									<span>Oct</span>
									<span>Nov</span>
									<span>Dec</span>
									<span>Jan</span>
									<span>Feb</span>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>School Growth</CardTitle>
								<CardDescription>New schools per month</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<GrowthItem month="February" count={23} previous={18} />
									<GrowthItem month="January" count={18} previous={15} />
									<GrowthItem month="December" count={15} previous={22} />
									<GrowthItem month="November" count={22} previous={19} />
									<GrowthItem month="October" count={19} previous={17} />
								</div>
							</CardContent>
						</Card>
					</div>

					<div className="mt-8 grid gap-6 lg:grid-cols-2">
						<Card>
							<CardHeader>
								<CardTitle>Plan Distribution</CardTitle>
								<CardDescription>Subscription plan breakdown</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<PlanBar
										plan="Enterprise"
										count={42}
										total={156}
										color="bg-zinc-900"
									/>
									<PlanBar
										plan="Professional"
										count={68}
										total={156}
										color="bg-zinc-600"
									/>
									<PlanBar
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
								<CardTitle>Top Performing Schools</CardTitle>
								<CardDescription>
									Schools with highest engagement
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<TopSchoolRow
										name="Oakridge International"
										students={2156}
										engagement="94%"
										rank={1}
									/>
									<TopSchoolRow
										name="Lincoln High School"
										students={1248}
										engagement="91%"
										rank={2}
									/>
									<TopSchoolRow
										name="Northwood Academy"
										students={943}
										engagement="89%"
										rank={3}
									/>
									<TopSchoolRow
										name="Riverside Academy"
										students={856}
										engagement="87%"
										rank={4}
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
	trend,
	icon: Icon,
}: {
	title: string;
	value: string;
	change: string;
	trend: "up" | "down";
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
					{trend === "up" ? (
						<ArrowUpRight className="mr-1 h-4 w-4 text-green-600" />
					) : (
						<ArrowDownRight className="mr-1 h-4 w-4 text-red-600" />
					)}
					<span
						className={`text-sm font-medium ${
							trend === "up" ? "text-green-600" : "text-red-600"
						}`}
					>
						{change}
					</span>
					<span className="ml-2 text-sm text-zinc-500">vs last month</span>
				</div>
			</CardContent>
		</Card>
	);
}

function GrowthItem({
	month,
	count,
	previous,
}: {
	month: string;
	count: number;
	previous: number;
}) {
	const growth = ((count - previous) / previous) * 100;
	return (
		<div className="flex items-center justify-between">
			<span className="text-sm font-medium text-zinc-700">{month}</span>
			<div className="flex items-center gap-4">
				<span className="text-sm font-medium text-zinc-900">
					{count} schools
				</span>
				<span
					className={`text-xs ${
						growth >= 0 ? "text-green-600" : "text-red-600"
					}`}
				>
					{growth >= 0 ? "+" : ""}
					{growth.toFixed(1)}%
				</span>
			</div>
		</div>
	);
}

function PlanBar({
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

function TopSchoolRow({
	name,
	students,
	engagement,
	rank,
}: {
	name: string;
	students: number;
	engagement: string;
	rank: number;
}) {
	return (
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-4">
				<div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100">
					<span className="text-sm font-medium text-zinc-700">#{rank}</span>
				</div>
				<div>
					<p className="font-medium text-zinc-900">{name}</p>
					<p className="text-sm text-zinc-500">
						{students.toLocaleString()} students
					</p>
				</div>
			</div>
			<div className="text-right">
				<span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
					{engagement}
				</span>
			</div>
		</div>
	);
}
