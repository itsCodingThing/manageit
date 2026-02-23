"use client";

import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon } from "@/components/icons";
import { addSchoolAction } from "@/app/action";

export default function AddSchoolModal() {
	const [openDialog, setOpenDialog] = useState(false);
	const [state, action, isPending] = useActionState(addSchoolAction, {
		error: null,
		success: false,
	});

	return (
		<Dialog open={openDialog} onOpenChange={setOpenDialog}>
			<DialogTrigger asChild>
				<Button>
					<PlusIcon className="mr-2 h-4 w-4" />
					Add School
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>Add New School</DialogTitle>
					<DialogDescription>
						Create a new school with an admin account. The admin will receive
						login credentials.
					</DialogDescription>
				</DialogHeader>
				<form action={action}>
					<div className="grid gap-4 py-4">
						<div className="text-sm font-medium text-zinc-900">
							School Information
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div className="grid gap-2">
								<label htmlFor="schoolCode" className="text-sm font-medium">
									School Code *
								</label>
								<Input id="schoolCode" placeholder="SCH001" required />
							</div>
							<div className="grid gap-2">
								<label htmlFor="name" className="text-sm font-medium">
									School Name *
								</label>
								<Input id="name" placeholder="Lincoln High School" required />
							</div>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div className="grid gap-2">
								<label htmlFor="email" className="text-sm font-medium">
									Email *
								</label>
								<Input
									id="email"
									type="email"
									placeholder="school@example.com"
									required
								/>
							</div>
							<div className="grid gap-2">
								<label htmlFor="phone" className="text-sm font-medium">
									Phone *
								</label>
								<Input
									id="phone"
									type="tel"
									placeholder="+1 234 567 8900"
									required
								/>
							</div>
						</div>
						<div className="grid gap-2">
							<label htmlFor="address" className="text-sm font-medium">
								Address *
							</label>
							<Input id="address" placeholder="123 Main Street" required />
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div className="grid gap-2">
								<label htmlFor="city" className="text-sm font-medium">
									City *
								</label>
								<Input id="city" placeholder="New York" required />
							</div>
							<div className="grid gap-2">
								<label htmlFor="state" className="text-sm font-medium">
									State *
								</label>
								<Input id="state" placeholder="NY" required />
							</div>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div className="grid gap-2">
								<label htmlFor="country" className="text-sm font-medium">
									Country *
								</label>
								<Input id="country" placeholder="USA" required />
							</div>
							<div className="grid gap-2">
								<label htmlFor="postalCode" className="text-sm font-medium">
									Postal Code *
								</label>
								<Input id="postalCode" placeholder="10001" required />
							</div>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div className="grid gap-2">
								<label htmlFor="website" className="text-sm font-medium">
									Website
								</label>
								<Input id="website" placeholder="https://school.com" />
							</div>
							<div className="grid gap-2">
								<label htmlFor="board" className="text-sm font-medium">
									Board
								</label>
								<Input id="board" placeholder="State Board" />
							</div>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div className="grid gap-2">
								<label
									htmlFor="establishedYear"
									className="text-sm font-medium"
								>
									Established Year
								</label>
								<Input id="establishedYear" placeholder="2000" />
							</div>
							<div className="grid gap-2">
								<label htmlFor="maxStudents" className="text-sm font-medium">
									Max Students
								</label>
								<Input id="maxStudents" type="number" placeholder="1000" />
							</div>
						</div>
						<div className="grid gap-2">
							<label htmlFor="description" className="text-sm font-medium">
								Description
							</label>
							<Input id="description" placeholder="School description..." />
						</div>

						<div className="border-t pt-4 mt-2">
							<div className="text-sm font-medium text-zinc-900 mb-4">
								Admin Account
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div className="grid gap-2">
									<label htmlFor="adminName" className="text-sm font-medium">
										Admin Name *
									</label>
									<Input id="adminName" placeholder="John Doe" required />
								</div>
								<div className="grid gap-2">
									<label htmlFor="adminEmail" className="text-sm font-medium">
										Admin Email *
									</label>
									<Input
										id="adminEmail"
										type="email"
										placeholder="admin@school.com"
										required
									/>
								</div>
							</div>
							<div className="grid grid-cols-2 gap-4 mt-4">
								<div className="grid gap-2">
									<label htmlFor="adminPhone" className="text-sm font-medium">
										Admin Phone *
									</label>
									<Input
										id="adminPhone"
										type="tel"
										placeholder="+1 234 567 8900"
										required
									/>
								</div>
								<div className="grid gap-2">
									<label
										htmlFor="adminPassword"
										className="text-sm font-medium"
									>
										Password *
									</label>
									<Input
										id="adminPassword"
										type="password"
										placeholder="Min 6 characters"
										required
										minLength={6}
									/>
								</div>
							</div>
						</div>
						{state.error && (
							<p className="text-sm text-red-500">{state.error}</p>
						)}
					</div>
					<DialogFooter>
						<Button
							type="button"
							variant="outline"
							onClick={() => setOpenDialog(false)}
						>
							Cancel
						</Button>
						<Button type="submit" disabled={isPending}>
							{isPending ? "Creating..." : "Create School"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
