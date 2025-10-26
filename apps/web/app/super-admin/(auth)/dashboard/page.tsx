"use client";

import { DashboardCard } from "@/components/super-admin/dashboard-card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { Users, School, UserCheck, TrendingUp } from "lucide-react";

const dashboardData = [
  { month: "Jan", admins: 12, schools: 45 },
  { month: "Feb", admins: 15, schools: 52 },
  { month: "Mar", admins: 18, schools: 58 },
  { month: "Apr", admins: 22, schools: 65 },
  { month: "May", admins: 25, schools: 72 },
  { month: "Jun", admins: 28, schools: 80 },
];

const adminActivityData = [
  { date: "Mon", active: 18, inactive: 4 },
  { date: "Tue", active: 20, inactive: 3 },
  { date: "Wed", active: 19, inactive: 5 },
  { date: "Thu", active: 22, inactive: 2 },
  { date: "Fri", active: 21, inactive: 3 },
  { date: "Sat", active: 15, inactive: 8 },
  { date: "Sun", active: 12, inactive: 10 },
];

export default function SuperAdminDashboard() {
  return (
    <>
      <div className="bg-card border-b border-border p-6">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back, Super Admin</p>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardCard
            title="Total Admins"
            value="28"
            description="Active administrators"
            icon={<Users size={32} />}
            trend={{ value: 12, isPositive: true }}
          />
          <DashboardCard
            title="Total Schools"
            value="80"
            description="Registered schools"
            icon={<School size={32} />}
            trend={{ value: 8, isPositive: true }}
          />
          <DashboardCard
            title="Active Users"
            value="2,450"
            description="Teachers & Students"
            icon={<UserCheck size={32} />}
            trend={{ value: 5, isPositive: true }}
          />
          <DashboardCard
            title="System Health"
            value="99.8%"
            description="Uptime this month"
            icon={<TrendingUp size={32} />}
            trend={{ value: 0.2, isPositive: false }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Growth Trend
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dashboardData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--color-border)"
                />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar
                  dataKey="admins"
                  fill="var(--color-primary)"
                  radius={[8, 8, 0, 0]}
                />
                <Bar
                  dataKey="schools"
                  fill="var(--color-secondary)"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Admin Activity
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={adminActivityData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--color-border)"
                />
                <XAxis dataKey="date" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="active"
                  stroke="var(--color-primary)"
                  strokeWidth={2}
                  dot={{ fill: "var(--color-primary)" }}
                />
                <Line
                  type="monotone"
                  dataKey="inactive"
                  stroke="var(--color-destructive)"
                  strokeWidth={2}
                  dot={{ fill: "var(--color-destructive)" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Recent Activity
          </h2>
          <div className="space-y-3">
            {[
              {
                action: "New school registered",
                school: "St. Mary Academy",
                time: "2 hours ago",
              },
              {
                action: "Admin account created",
                school: "Admin - John Doe",
                time: "4 hours ago",
              },
              {
                action: "School updated",
                school: "Central High School",
                time: "1 day ago",
              },
              {
                action: "Admin deactivated",
                school: "Admin - Jane Smith",
                time: "2 days ago",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between py-3 border-b border-border last:border-0"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {item.action}
                  </p>
                  <p className="text-xs text-muted-foreground">{item.school}</p>
                </div>
                <span className="text-xs text-muted-foreground">
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
