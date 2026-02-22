"use client";

import { useState } from "react";
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
import { createAdmin } from "@/lib/api";
import { PlusIcon } from "@/components/icons";

interface AddAdminModalProps {
	children?: React.ReactNode;
}

export function AddAdminModal({ children }: AddAdminModalProps) {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phoneNumber: "",
		password: "",
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			const res = await createAdmin({
				name: formData.name,
				email: formData.email,
				phoneNumber: formData.phoneNumber,
				password: formData.password,
				status: "active",
			});

			if (res.success) {
				setOpen(false);
				setFormData({ name: "", email: "", phoneNumber: "", password: "" });
				window.location.reload();
			} else {
				setError(res.message || "Failed to create admin");
			}
		} catch (_err) {
			setError("An error occurred while creating admin");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				{children || (
					<Button>
						<PlusIcon className="mr-2 h-4 w-4" />
						Add Admin
					</Button>
				)}
			</DialogTrigger>
			<DialogContent className="sm:max-w-[500px]">
				<DialogHeader>
					<DialogTitle>Add New Admin</DialogTitle>
					<DialogDescription>
						Create a new school administrator account. They will receive login
						credentials via email.
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit}>
					<div className="grid gap-4 py-4">
						<div className="grid gap-2">
							<label htmlFor="name" className="text-sm font-medium">
								Full Name
							</label>
							<Input
								id="name"
								placeholder="John Doe"
								value={formData.name}
								onChange={(e) =>
									setFormData({ ...formData, name: e.target.value })
								}
								required
							/>
						</div>
						<div className="grid gap-2">
							<label htmlFor="email" className="text-sm font-medium">
								Email
							</label>
							<Input
								id="email"
								type="email"
								placeholder="admin@school.com"
								value={formData.email}
								onChange={(e) =>
									setFormData({ ...formData, email: e.target.value })
								}
								required
							/>
						</div>
						<div className="grid gap-2">
							<label htmlFor="phone" className="text-sm font-medium">
								Phone Number
							</label>
							<Input
								id="phone"
								type="tel"
								placeholder="+1 234 567 8900"
								value={formData.phoneNumber}
								onChange={(e) =>
									setFormData({ ...formData, phoneNumber: e.target.value })
								}
								required
							/>
						</div>
						<div className="grid gap-2">
							<label htmlFor="password" className="text-sm font-medium">
								Temporary Password
							</label>
							<Input
								id="password"
								type="password"
								placeholder="Enter temporary password"
								value={formData.password}
								onChange={(e) =>
									setFormData({ ...formData, password: e.target.value })
								}
								required
								minLength={6}
							/>
						</div>
						{error && <p className="text-sm text-red-500">{error}</p>}
					</div>
					<DialogFooter>
						<Button
							type="button"
							variant="outline"
							onClick={() => setOpen(false)}
						>
							Cancel
						</Button>
						<Button type="submit" disabled={loading}>
							{loading ? "Creating..." : "Create Admin"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
