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
	Building2,
	Users,
	Bell,
	Search,
	Plus,
	GraduationCap,
	School,
	Filter,
} from "lucide-react";
import { SchoolTable } from "./school-table";

export default function SchoolsPage() {
	return (
		<div className="min-h-screen bg-zinc-50">
			<div className="ml-64">
				<header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-zinc-200 bg-white px-8">
					<h1 className="text-xl font-semibold text-zinc-900">Schools</h1>
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
								<Input placeholder="Search schools..." className="w-80 pl-10" />
							</div>
							<Button variant="outline" size="sm">
								<Filter className="mr-2 h-4 w-4" />
								Filter
							</Button>
						</div>
						<Button>
							<Plus className="mr-2 h-4 w-4" />
							Add School
						</Button>
					</div>

					<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
						<StatCard title="Total Schools" value="156" icon={Building2} />
						<StatCard title="Active Schools" value="142" icon={School} />
						<StatCard title="Pending Approval" value="8" icon={GraduationCap} />
						<StatCard title="Suspended" value="6" icon={Users} />
					</div>

					<Card className="mt-8">
						<CardHeader className="flex flex-row items-center justify-between">
							<div>
								<CardTitle>All Schools</CardTitle>
								<CardDescription>
									Manage and monitor all registered schools
								</CardDescription>
							</div>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
                  <SchoolTable/>
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
