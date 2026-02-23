"use client";

import { use, useState } from "react";
import { Input } from "@/components/ui/input";
import AddAdminModal from "./add-admin-modal";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { getAdmins } from "@/lib/api";
import {
	MoreVerticalIcon,
	MailIcon,
	SearchIcon,
	FilterIcon,
	ChevronDownIcon,
	ArrowUpDownIcon,
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

interface AdminTableProps {
	adminsPromise: ReturnType<typeof getAdmins>;
}

interface FilterState {
	search: string;
	status: "all" | "active" | "inactive";
	sortField: "name" | "email" | "school" | "status";
	sortOrder: "asc" | "desc";
}

const defaultFilters: FilterState = {
	search: "",
	status: "all",
	sortField: "name",
	sortOrder: "asc",
};

export default function AdminTable({ adminsPromise }: AdminTableProps) {
	const res = use(adminsPromise);
	const [filters, setFilters] = useState<FilterState>(defaultFilters);

	if (!res.success) {
		return null;
	}

	const admins = res.data;

	const filteredData = admins
		.filter((admin) => {
			const matchesSearch =
				admin.name.toLowerCase().includes(filters.search.toLowerCase()) ||
				admin.email.toLowerCase().includes(filters.search.toLowerCase());
			const matchesStatus =
				filters.status === "all" || admin.status === filters.status;
			return matchesSearch && matchesStatus;
		})
		.sort((a, b) => {
			let aVal: string;
			let bVal: string;
			switch (filters.sortField) {
				case "name":
					aVal = a.name;
					bVal = b.name;
					break;
				case "email":
					aVal = a.email;
					bVal = b.email;
					break;
				case "school":
					aVal = "Lincoln High School";
					bVal = "Lincoln High School";
					break;
				case "status":
					aVal = a.status!;
					bVal = b.status!;
					break;
				default:
					return 0;
			}
			const cmp = aVal.localeCompare(bVal);
			return filters.sortOrder === "asc" ? cmp : -cmp;
		});

	const hasActiveFilters =
		filters.search ||
		filters.status !== "all" ||
		filters.sortField !== "name" ||
		filters.sortOrder !== "asc";

	const clearFilters = () => setFilters(defaultFilters);

	const toggleSort = (field: FilterState["sortField"]) => {
		if (filters.sortField === field) {
			setFilters((prev) => ({
				...prev,
				sortOrder: prev.sortOrder === "asc" ? "desc" : "asc",
			}));
		} else {
			setFilters((prev) => ({
				...prev,
				sortField: field,
				sortOrder: "asc",
			}));
		}
	};

	return (
		<>
			<div className="mb-6 flex items-center justify-between">
				<div className="flex items-center gap-4">
					<div className="relative">
						<SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
						<Input
							placeholder="Search admins..."
							className="w-80 pl-10"
							value={filters.search}
							onChange={(e) =>
								setFilters((prev) => ({ ...prev, search: e.target.value }))
							}
						/>
					</div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant={hasActiveFilters ? "default" : "outline"}
								size="sm"
							>
								<FilterIcon className="mr-2 h-4 w-4" />
								Filters
								<ChevronDownIcon className="ml-2 h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="start" className="w-56">
							<DropdownMenuLabel>Filter & Sort</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuLabel className="text-xs font-normal text-zinc-500">
								Status
							</DropdownMenuLabel>
							<DropdownMenuItem
								onClick={() =>
									setFilters((prev) => ({ ...prev, status: "all" }))
								}
								className={filters.status === "all" ? "bg-accent" : ""}
							>
								All
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() =>
									setFilters((prev) => ({ ...prev, status: "active" }))
								}
								className={filters.status === "active" ? "bg-accent" : ""}
							>
								Active
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() =>
									setFilters((prev) => ({ ...prev, status: "inactive" }))
								}
								className={filters.status === "inactive" ? "bg-accent" : ""}
							>
								Inactive
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuLabel className="text-xs font-normal text-zinc-500">
								Sort By
							</DropdownMenuLabel>
							<DropdownMenuItem
								onClick={() => toggleSort("name")}
								className={filters.sortField === "name" ? "bg-accent" : ""}
							>
								Name{" "}
								{filters.sortField === "name" &&
									(filters.sortOrder === "asc" ? "↑" : "↓")}
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => toggleSort("email")}
								className={filters.sortField === "email" ? "bg-accent" : ""}
							>
								Email{" "}
								{filters.sortField === "email" &&
									(filters.sortOrder === "asc" ? "↑" : "↓")}
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => toggleSort("school")}
								className={filters.sortField === "school" ? "bg-accent" : ""}
							>
								School{" "}
								{filters.sortField === "school" &&
									(filters.sortOrder === "asc" ? "↑" : "↓")}
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => toggleSort("status")}
								className={filters.sortField === "status" ? "bg-accent" : ""}
							>
								Status{" "}
								{filters.sortField === "status" &&
									(filters.sortOrder === "asc" ? "↑" : "↓")}
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={clearFilters}>
								<ArrowUpDownIcon className="mr-2 h-4 w-4" />
								Clear Filters
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
				<AddAdminModal />
			</div>

			{filteredData.map((admin) => (
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
