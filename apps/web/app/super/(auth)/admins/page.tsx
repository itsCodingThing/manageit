import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	UsersIcon,
	MoreVerticalIcon,
	MailIcon,
	ShieldIcon,
	UserCheckIcon,
} from "@/components/icons";
import { AdminTable } from "./admin-table";
import { Suspense } from "react";
import { Loader } from "@/components/loader";

export default function AdminsPage() {
	return (
		<>
			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
				<StatCard title="Total Admins" value="342" icon={UsersIcon} />
				<StatCard title="Active Admins" value="328" icon={UserCheckIcon} />
				<StatCard title="Pending Invites" value="12" icon={MailIcon} />
				<StatCard title="Suspended" value="2" icon={ShieldIcon} />
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
						<Suspense fallback={<Loader />}>
							<AdminTable />
						</Suspense>
					</div>
				</CardContent>
			</Card>
		</>
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
						<MailIcon className="h-3 w-3" />
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
					<MoreVerticalIcon className="h-4 w-4" />
				</Button>
			</div>
		</div>
	);
}
