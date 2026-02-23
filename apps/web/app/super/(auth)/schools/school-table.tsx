import { Button } from "@/components/ui/button";
import { getSchools } from "@/lib/api";
import { MoreVerticalIcon, MapPinIcon, SchoolIcon } from "@/components/icons";

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
					<SchoolIcon className="h-5 w-5 text-zinc-600" />
				</div>
				<div>
					<p className="font-medium text-zinc-900">{name}</p>
					<div className="flex items-center gap-2 text-sm text-zinc-500">
						<MapPinIcon className="h-3 w-3" />
						{location}
					</div>
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
export async function SchoolTable() {
	const res = await getSchools();

	if (!res.success) {
		return null;
	}

	return res.data.map((s) => {
		return (
			<SchoolRow
				key={s.id}
				name="Lincoln High School"
				location="New York, USA"
				students={1248}
				plan="Enterprise"
				status="Active"
			/>
		);
	});
}
