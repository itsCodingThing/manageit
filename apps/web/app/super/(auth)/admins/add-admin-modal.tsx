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
import { addAdminAction } from "@/app/action";

export default function AddAdminModal() {
	const [openDialog, setOpenDialog] = useState(false);
	const [state, action, isPending] = useActionState(addAdminAction, {
		error: null,
		state: {
			name: "",
			email: "",
			phoneNumber: "",
			password: "",
		},
	});

	return (
		<Dialog open={openDialog} onOpenChange={setOpenDialog}>
			<DialogTrigger asChild>
				<Button>
					<PlusIcon className="mr-2 h-4 w-4" />
					Add Admin
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[500px]">
				<DialogHeader>
					<DialogTitle>Add New Admin</DialogTitle>
					<DialogDescription>
						Create a new school administrator account. They will receive login
						credentials via email.
					</DialogDescription>
				</DialogHeader>
				<form action={action}>
					<div className="grid gap-4 py-4">
						<div className="grid gap-2">
							<label htmlFor="name" className="text-sm font-medium">
								Full Name
							</label>
							<Input
								name="name"
								id="name"
								defaultValue={state.state.name}
								placeholder="John Doe"
								required
							/>
						</div>
						<div className="grid gap-2">
							<label htmlFor="email" className="text-sm font-medium">
								Email
							</label>
							<Input
								name="email"
								id="email"
								type="email"
								defaultValue={state.state.email}
								placeholder="admin@school.com"
								required
							/>
						</div>
						<div className="grid gap-2">
							<label htmlFor="phone" className="text-sm font-medium">
								Phone Number
							</label>
							<Input
								name="phoneNumber"
								id="phone"
								type="tel"
								defaultValue={state.state.phoneNumber}
								placeholder="+1 234 567 8900"
								required
							/>
						</div>
						<div className="grid gap-2">
							<label htmlFor="password" className="text-sm font-medium">
								Temporary Password
							</label>
							<Input
								name="password"
								id="password"
								type="password"
								defaultValue={state.state.password}
								placeholder="Enter temporary password"
								required
								minLength={6}
							/>
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
							{isPending ? "Creating..." : "Create Admin"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
