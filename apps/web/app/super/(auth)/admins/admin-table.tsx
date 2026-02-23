import { Input } from "@/components/ui/input";
import AddAdminModal from "./add-admin-modal";
import { Button } from "@/components/ui/button";
import { getAdmins } from "@/lib/api";
import {
	MoreVerticalIcon,
	MailIcon,
	SearchIcon,
	FilterIcon,
} from "@/components/icons";

function AdminRow({
	name,
	email,
	school,
	jobTitle,
	status,
}: {
	name: string;
	email: string;
	school: string;
	jobTitle: string;
	status: string;
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
				<Button variant="ghost" size="sm">
					<MoreVerticalIcon className="h-4 w-4" />
				</Button>
			</div>
		</div>
	);
}

export async function AdminTable() {
	const res = await getAdmins();

	if (!res.success) {
		return null;
	}

	return (
		<>
			<div className="mb-6 flex items-center justify-between">
				<div className="flex items-center gap-4">
					<div className="relative">
						<SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
						<Input placeholder="Search admins..." className="w-80 pl-10" />
					</div>
					<Button variant="outline" size="sm">
						<FilterIcon className="mr-2 h-4 w-4" />
						Filter
					</Button>
				</div>
				<AddAdminModal />
			</div>

			{res.data.map((admin) => (
				<AdminRow
					key={admin.id}
					name={admin.name}
					email={admin.email}
					school="Lincoln High School"
					jobTitle="Principal"
					status={admin.status === "active" ? "Active" : "Inactive"}
				/>
			))}
		</>
	);
}
