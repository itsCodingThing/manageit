import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	CreditCardIcon,
	SearchIcon,
	PlusIcon,
	Building2Icon,
	MoreVerticalIcon,
	FilterIcon,
	DollarSignIcon,
	CalendarIcon,
	TrendingUpIcon,
} from "@/components/icons";

export default function SubscriptionsPage() {
	return (
		<>
			<div className="mb-6 flex items-center justify-between">
				<div className="flex items-center gap-4">
					<div className="relative">
						<SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
						<Input
							placeholder="Search subscriptions..."
							className="w-80 pl-10"
						/>
					</div>
					<Button variant="outline" size="sm">
						<FilterIcon className="mr-2 h-4 w-4" />
						Filter
					</Button>
				</div>
				<Button>
					<PlusIcon className="mr-2 h-4 w-4" />
					New Plan
				</Button>
			</div>

			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
				<StatCard
					title="Monthly Revenue"
					value="$48.5K"
					change="+12.5%"
					icon={DollarSignIcon}
				/>
				<StatCard
					title="Active Subscriptions"
					value="142"
					change="+5"
					icon={CreditCardIcon}
				/>
				<StatCard
					title="Pending Renewal"
					value="18"
					change="Due this week"
					icon={CalendarIcon}
				/>
				<StatCard
					title="Avg. Revenue/School"
					value="$340"
					change="+$12"
					icon={TrendingUpIcon}
				/>
			</div>

			<div className="mt-8 grid gap-6 lg:grid-cols-3">
				<Card className="lg:col-span-2">
					<CardHeader className="flex flex-row items-center justify-between">
						<div>
							<CardTitle>Subscription Plans</CardTitle>
							<CardDescription>
								Overview of all subscription plans
							</CardDescription>
						</div>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<SubscriptionRow
								plan="Enterprise"
								schools={42}
								price="$599/mo"
								revenue="$25,158"
								status="Active"
							/>
							<SubscriptionRow
								plan="Professional"
								schools={68}
								price="$299/mo"
								revenue="$20,332"
								status="Active"
							/>
							<SubscriptionRow
								plan="Basic"
								schools={46}
								price="$99/mo"
								revenue="$4,554"
								status="Active"
							/>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Upcoming Renewals</CardTitle>
						<CardDescription>Subscriptions renewing this week</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<RenewalRow
								school="Lincoln High School"
								plan="Enterprise"
								date="Feb 21, 2026"
								amount="$599"
							/>
							<RenewalRow
								school="Riverside Academy"
								plan="Professional"
								date="Feb 23, 2026"
								amount="$299"
							/>
							<RenewalRow
								school="Oakridge International"
								plan="Enterprise"
								date="Feb 25, 2026"
								amount="$599"
							/>
						</div>
					</CardContent>
				</Card>
			</div>
		</>
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
				</div>
			</CardContent>
		</Card>
	);
}

function SubscriptionRow({
	plan,
	schools,
	price,
	revenue,
	status,
}: {
	plan: string;
	schools: number;
	price: string;
	revenue: string;
	status: string;
}) {
	return (
		<div className="flex items-center justify-between rounded-lg border border-zinc-100 p-4">
			<div className="flex items-center gap-4">
				<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100">
					<CreditCardIcon className="h-5 w-5 text-zinc-600" />
				</div>
				<div>
					<p className="font-medium text-zinc-900">{plan} Plan</p>
					<p className="text-sm text-zinc-500">{schools} schools</p>
				</div>
			</div>
			<div className="flex items-center gap-6">
				<div className="text-right">
					<p className="text-sm font-medium text-zinc-900">{price}</p>
					<p className="text-sm text-zinc-500">{revenue}/mo revenue</p>
				</div>
				<span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
					{status}
				</span>
				<Button variant="ghost" size="sm">
					<MoreVerticalIcon className="h-4 w-4" />
				</Button>
			</div>
		</div>
	);
}

function RenewalRow({
	school,
	plan,
	date,
	amount,
}: {
	school: string;
	plan: string;
	date: string;
	amount: string;
}) {
	return (
		<div className="flex items-center justify-between rounded-lg border border-zinc-100 p-4">
			<div className="flex items-center gap-4">
				<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100">
					<Building2Icon className="h-5 w-5 text-zinc-600" />
				</div>
				<div>
					<p className="font-medium text-zinc-900">{school}</p>
					<p className="text-sm text-zinc-500">{plan} Plan</p>
				</div>
			</div>
			<div className="text-right">
				<p className="text-sm font-medium text-zinc-900">{amount}</p>
				<p className="text-xs text-zinc-500">{date}</p>
			</div>
		</div>
	);
}
