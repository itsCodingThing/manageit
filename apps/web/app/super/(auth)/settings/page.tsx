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
	ShieldIcon,
	MailIcon,
	DatabaseIcon,
	GlobeIcon,
	KeyIcon,
} from "@/components/icons";
import { ToggleLeftIcon, ToggleRightIcon } from "lucide-react";

export default function SettingsPage() {
	return (
		<>
			<div className="grid gap-6 lg:grid-cols-3">
				<Card>
					<CardHeader>
						<div className="flex items-center gap-2">
							<GlobeIcon className="h-5 w-5 text-zinc-600" />
							<CardTitle>General Settings</CardTitle>
						</div>
						<CardDescription>Configure platform-wide settings</CardDescription>
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
							<ShieldIcon className="h-5 w-5 text-zinc-600" />
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
							<MailIcon className="h-5 w-5 text-zinc-600" />
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
							<DatabaseIcon className="h-5 w-5 text-zinc-600" />
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
							<KeyIcon className="h-5 w-5 text-zinc-600" />
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
		</>
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
				<ToggleRightIcon className="h-6 w-6 text-green-600" />
			) : (
				<ToggleLeftIcon className="h-6 w-6 text-zinc-400" />
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
