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
	Bell,
	Shield,
	Mail,
	Database,
	Globe,
	Key,
	ToggleLeft,
	ToggleRight,
} from "lucide-react";

export default function SettingsPage() {
	return (
		<div className="min-h-screen bg-zinc-50">
			<div className="ml-64">
				<header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-zinc-200 bg-white px-8">
					<h1 className="text-xl font-semibold text-zinc-900">Settings</h1>
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
					<div className="grid gap-6 lg:grid-cols-3">
						<Card>
							<CardHeader>
								<div className="flex items-center gap-2">
									<Globe className="h-5 w-5 text-zinc-600" />
									<CardTitle>General Settings</CardTitle>
								</div>
								<CardDescription>
									Configure platform-wide settings
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<SettingItem
									label="Platform Name"
									description="The name displayed across the platform"
								>
									<Input defaultValue="ManageIt" className="w-48" />
								</SettingItem>
								<SettingItem
									label="Support Email"
									description="Contact email for support inquiries"
								>
									<Input defaultValue="support@manageit.com" className="w-64" />
								</SettingItem>
								<SettingItem
									label="Default Timezone"
									description="Default timezone for all users"
								>
									<Input defaultValue="UTC-5 (Eastern Time)" className="w-48" />
								</SettingItem>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<div className="flex items-center gap-2">
									<Shield className="h-5 w-5 text-zinc-600" />
									<CardTitle>Security</CardTitle>
								</div>
								<CardDescription>
									Manage security and authentication settings
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<ToggleSetting
									label="Two-Factor Authentication"
									description="Require 2FA for all admin accounts"
									enabled={true}
								/>
								<ToggleSetting
									label="Session Timeout"
									description="Auto-logout after 30 minutes of inactivity"
									enabled={true}
								/>
								<ToggleSetting
									label="IP Whitelist"
									description="Restrict access to specific IP addresses"
									enabled={false}
								/>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<div className="flex items-center gap-2">
									<Mail className="h-5 w-5 text-zinc-600" />
									<CardTitle>Notifications</CardTitle>
								</div>
								<CardDescription>
									Configure email and push notifications
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<ToggleSetting
									label="New School Registrations"
									description="Get notified when a new school signs up"
									enabled={true}
								/>
								<ToggleSetting
									label="Failed Payments"
									description="Alert on subscription payment failures"
									enabled={true}
								/>
								<ToggleSetting
									label="System Alerts"
									description="Receive system health notifications"
									enabled={true}
								/>
							</CardContent>
						</Card>
					</div>

					<div className="mt-8 grid gap-6 lg:grid-cols-2">
						<Card>
							<CardHeader>
								<div className="flex items-center gap-2">
									<Database className="h-5 w-5 text-zinc-600" />
									<CardTitle>System Health</CardTitle>
								</div>
								<CardDescription>
									Monitor system performance and status
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<HealthItem
									name="API Status"
									status="Operational"
									statusColor="text-green-600"
								/>
								<HealthItem
									name="Database"
									status="Operational"
									statusColor="text-green-600"
								/>
								<HealthItem
									name="Storage"
									status="98% Available"
									statusColor="text-green-600"
								/>
								<HealthItem
									name="Email Service"
									status="Degraded"
									statusColor="text-yellow-600"
								/>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<div className="flex items-center gap-2">
									<Key className="h-5 w-5 text-zinc-600" />
									<CardTitle>API Keys</CardTitle>
								</div>
								<CardDescription>Manage API access credentials</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="rounded-lg border border-zinc-200 p-4">
									<div className="flex items-center justify-between">
										<div>
											<p className="font-medium text-zinc-900">
												Production API Key
											</p>
											<p className="text-sm text-zinc-500">
												sk_live_•••••••••••••••••••••••••
											</p>
										</div>
										<Button variant="outline" size="sm">
											Regenerate
										</Button>
									</div>
								</div>
								<div className="rounded-lg border border-zinc-200 p-4">
									<div className="flex items-center justify-between">
										<div>
											<p className="font-medium text-zinc-900">
												Development API Key
											</p>
											<p className="text-sm text-zinc-500">
												sk_test_•••••••••••••••••••••••••
											</p>
										</div>
										<Button variant="outline" size="sm">
											Regenerate
										</Button>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					<div className="mt-8 flex justify-end gap-4">
						<Button variant="outline">Cancel</Button>
						<Button>Save Changes</Button>
					</div>
				</main>
			</div>
		</div>
	);
}

function SettingItem({
	label,
	description,
	children,
}: {
	label: string;
	description: string;
	children: React.ReactNode;
}) {
	return (
		<div className="flex items-center justify-between">
			<div>
				<p className="font-medium text-zinc-900">{label}</p>
				<p className="text-sm text-zinc-500">{description}</p>
			</div>
			{children}
		</div>
	);
}

function ToggleSetting({
	label,
	description,
	enabled,
}: {
	label: string;
	description: string;
	enabled: boolean;
}) {
	return (
		<div className="flex items-center justify-between">
			<div>
				<p className="font-medium text-zinc-900">{label}</p>
				<p className="text-sm text-zinc-500">{description}</p>
			</div>
			{enabled ? (
				<ToggleRight className="h-6 w-6 text-green-600" />
			) : (
				<ToggleLeft className="h-6 w-6 text-zinc-400" />
			)}
		</div>
	);
}

function HealthItem({
	name,
	status,
	statusColor,
}: {
	name: string;
	status: string;
	statusColor: string;
}) {
	return (
		<div className="flex items-center justify-between">
			<span className="text-sm text-zinc-700">{name}</span>
			<span className={`text-sm font-medium ${statusColor}`}>{status}</span>
		</div>
	);
}
