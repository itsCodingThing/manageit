import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	UsersIcon,
	MailIcon,
	ShieldIcon,
	UserCheckIcon,
} from "@/components/icons";
import AdminTable from "./admin-table";
import { Suspense } from "react";
import { Loader } from "@/components/loader";
import { getAdmins } from "@/lib/api";

export default async function AdminsPage() {
  
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
							<AdminTable adminsPromise={getAdmins()} />
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
