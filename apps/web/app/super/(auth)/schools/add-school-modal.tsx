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
import { createSchool } from "@/lib/api";
import { PlusIcon } from "@/components/icons";

export function AddSchoolModal() {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [formData, setFormData] = useState({
		schoolCode: "",
		name: "",
		email: "",
		phone: "",
		address: "",
		city: "",
		state: "",
		country: "",
		postalCode: "",
		website: "",
		description: "",
		establishedYear: "",
		board: "",
		maxStudents: "",
		maxTeachers: "",
		adminName: "",
		adminEmail: "",
		adminPassword: "",
		adminPhone: "",
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			const res = await createSchool({
				schoolCode: formData.schoolCode,
				name: formData.name,
				email: formData.email,
				phone: formData.phone,
				address: formData.address,
				city: formData.city,
				state: formData.state,
				country: formData.country,
				postalCode: formData.postalCode,
				website: formData.website || undefined,
				description: formData.description || undefined,
				establishedYear: formData.establishedYear || undefined,
				board: formData.board || undefined,
				maxStudents: formData.maxStudents || undefined,
				maxTeachers: formData.maxTeachers || undefined,
				adminName: formData.adminName,
				adminEmail: formData.adminEmail,
				adminPassword: formData.adminPassword,
				adminPhone: formData.adminPhone,
				status: "active",
			});

			if (res.success) {
				setOpen(false);
				setFormData({
					schoolCode: "",
					name: "",
					email: "",
					phone: "",
					address: "",
					city: "",
					state: "",
					country: "",
					postalCode: "",
					website: "",
					description: "",
					establishedYear: "",
					board: "",
					maxStudents: "",
					maxTeachers: "",
					adminName: "",
					adminEmail: "",
					adminPassword: "",
					adminPhone: "",
				});
				window.location.reload();
			} else {
				setError(res.message || "Failed to create school");
			}
		} catch (_err) {
			setError("An error occurred while creating school");
		} finally {
			setLoading(false);
		}
	};

	const handleChange = (field: string, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
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
				<form onSubmit={handleSubmit}>
					<div className="grid gap-4 py-4">
						<div className="text-sm font-medium text-zinc-900">
							School Information
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div className="grid gap-2">
								<label htmlFor="schoolCode" className="text-sm font-medium">
									School Code *
								</label>
								<Input
									id="schoolCode"
									placeholder="SCH001"
									value={formData.schoolCode}
									onChange={(e) => handleChange("schoolCode", e.target.value)}
									required
								/>
							</div>
							<div className="grid gap-2">
								<label htmlFor="name" className="text-sm font-medium">
									School Name *
								</label>
								<Input
									id="name"
									placeholder="Lincoln High School"
									value={formData.name}
									onChange={(e) => handleChange("name", e.target.value)}
									required
								/>
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
									value={formData.email}
									onChange={(e) => handleChange("email", e.target.value)}
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
									value={formData.phone}
									onChange={(e) => handleChange("phone", e.target.value)}
									required
								/>
							</div>
						</div>
						<div className="grid gap-2">
							<label htmlFor="address" className="text-sm font-medium">
								Address *
							</label>
							<Input
								id="address"
								placeholder="123 Main Street"
								value={formData.address}
								onChange={(e) => handleChange("address", e.target.value)}
								required
							/>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div className="grid gap-2">
								<label htmlFor="city" className="text-sm font-medium">
									City *
								</label>
								<Input
									id="city"
									placeholder="New York"
									value={formData.city}
									onChange={(e) => handleChange("city", e.target.value)}
									required
								/>
							</div>
							<div className="grid gap-2">
								<label htmlFor="state" className="text-sm font-medium">
									State *
								</label>
								<Input
									id="state"
									placeholder="NY"
									value={formData.state}
									onChange={(e) => handleChange("state", e.target.value)}
									required
								/>
							</div>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div className="grid gap-2">
								<label htmlFor="country" className="text-sm font-medium">
									Country *
								</label>
								<Input
									id="country"
									placeholder="USA"
									value={formData.country}
									onChange={(e) => handleChange("country", e.target.value)}
									required
								/>
							</div>
							<div className="grid gap-2">
								<label htmlFor="postalCode" className="text-sm font-medium">
									Postal Code *
								</label>
								<Input
									id="postalCode"
									placeholder="10001"
									value={formData.postalCode}
									onChange={(e) => handleChange("postalCode", e.target.value)}
									required
								/>
							</div>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div className="grid gap-2">
								<label htmlFor="website" className="text-sm font-medium">
									Website
								</label>
								<Input
									id="website"
									placeholder="https://school.com"
									value={formData.website}
									onChange={(e) => handleChange("website", e.target.value)}
								/>
							</div>
							<div className="grid gap-2">
								<label htmlFor="board" className="text-sm font-medium">
									Board
								</label>
								<Input
									id="board"
									placeholder="State Board"
									value={formData.board}
									onChange={(e) => handleChange("board", e.target.value)}
								/>
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
								<Input
									id="establishedYear"
									placeholder="2000"
									value={formData.establishedYear}
									onChange={(e) =>
										handleChange("establishedYear", e.target.value)
									}
								/>
							</div>
							<div className="grid gap-2">
								<label htmlFor="maxStudents" className="text-sm font-medium">
									Max Students
								</label>
								<Input
									id="maxStudents"
									type="number"
									placeholder="1000"
									value={formData.maxStudents}
									onChange={(e) => handleChange("maxStudents", e.target.value)}
								/>
							</div>
						</div>
						<div className="grid gap-2">
							<label htmlFor="description" className="text-sm font-medium">
								Description
							</label>
							<Input
								id="description"
								placeholder="School description..."
								value={formData.description}
								onChange={(e) => handleChange("description", e.target.value)}
							/>
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
									<Input
										id="adminName"
										placeholder="John Doe"
										value={formData.adminName}
										onChange={(e) => handleChange("adminName", e.target.value)}
										required
									/>
								</div>
								<div className="grid gap-2">
									<label htmlFor="adminEmail" className="text-sm font-medium">
										Admin Email *
									</label>
									<Input
										id="adminEmail"
										type="email"
										placeholder="admin@school.com"
										value={formData.adminEmail}
										onChange={(e) => handleChange("adminEmail", e.target.value)}
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
										value={formData.adminPhone}
										onChange={(e) => handleChange("adminPhone", e.target.value)}
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
										value={formData.adminPassword}
										onChange={(e) =>
											handleChange("adminPassword", e.target.value)
										}
										required
										minLength={6}
									/>
								</div>
							</div>
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
							{loading ? "Creating..." : "Create School"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
