import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Admin, ApiResponse, safeApi } from "@/lib/api";
import {
	Users,
	Bell,
	Search,
	Plus,
	MoreVertical,
	Mail,
	Shield,
	UserCheck,
	Filter,
} from "lucide-react";

export default async function AdminsPage() {
	const res = await safeApi.get("admin/").json<ApiResponse<Admin[]>>();
	console.log(res.message);

	return (
		<div className="min-h-screen bg-zinc-50">
			<div className="ml-64">
				<header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-zinc-200 bg-white px-8">
					<h1 className="text-xl font-semibold text-zinc-900">School Admins</h1>
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

				<main className="p-8">
					<div className="mb-6 flex items-center justify-between">
						<div className="flex items-center gap-4">
							<div className="relative">
								<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
								<Input placeholder="Search admins..." className="w-80 pl-10" />
							</div>
							<Button variant="outline" size="sm">
								<Filter className="mr-2 h-4 w-4" />
								Filter
							</Button>
						</div>
						<Button>
							<Plus className="mr-2 h-4 w-4" />
							Add Admin
						</Button>
					</div>

					<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
						<StatCard title="Total Admins" value="342" icon={Users} />
						<StatCard title="Active Admins" value="328" icon={UserCheck} />
						<StatCard title="Pending Invites" value="12" icon={Mail} />
						<StatCard title="Suspended" value="2" icon={Shield} />
					</div>

					<Card className="mt-8">
						<CardHeader className="flex flex-row items-center justify-between">
							<div>
								<CardTitle>All Admins</CardTitle>
								<CardDescription>
									Manage all school administrators across the platform
								</CardDescription>
							</div>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{res.data.map((admin) => {
									return (
										<AdminRow
											key={admin.id}
											name={admin.name}
											email={admin.email}
											school="Lincoln High School"
											jobTitle="Principal"
											status="Active"
											lastActive="2 hours ago"
										/>
									);
								})}
							</div>
						</CardContent>
					</Card>
				</main>
			</div>
		</div>
	);
}

function StatCard({
	title,
	value,
	icon: Icon,
}: {
	title: string;
	value: string;
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
			</CardContent>
		</Card>
	);
}

function AdminRow({
	name,
	email,
	school,
	jobTitle,
	status,
	lastActive,
}: {
	name: string;
	email: string;
	school: string;
	jobTitle: string;
	status: string;
	lastActive: string;
}) {
	return (
		<div className="flex items-center justify-between rounded-lg border border-zinc-100 p-4">
			<div className="flex items-center gap-4">
				<div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-200">
					<span className="text-sm font-medium text-zinc-700">
						{name
							.split(" ")
							.map((n) => n[0])
							.join("")}
					</span>
				</div>
				<div>
					<p className="font-medium text-zinc-900">{name}</p>
					<div className="flex items-center gap-2 text-sm text-zinc-500">
						<Mail className="h-3 w-3" />
						{email}
					</div>
				</div>
			</div>
			<div className="flex items-center gap-6">
				<div className="text-right">
					<p className="text-sm font-medium text-zinc-900">{school}</p>
					<p className="text-sm text-zinc-500">{jobTitle}</p>
				</div>
				<div className="text-right">
					<span
						className={`rounded-full px-3 py-1 text-xs font-medium ${
							status === "Active"
								? "bg-green-100 text-green-700"
								: status === "Pending"
									? "bg-yellow-100 text-yellow-700"
									: "bg-red-100 text-red-700"
						}`}
					>
						{status}
					</span>
					<p className="mt-1 text-xs text-zinc-400">{lastActive}</p>
				</div>
				<Button variant="ghost" size="sm">
					<MoreVertical className="h-4 w-4" />
				</Button>
			</div>
		</div>
	);
}
