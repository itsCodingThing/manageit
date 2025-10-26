"use client";

import { SchoolAdminSidebar } from "@/components/school-admin/sidebar";
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
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Users, BookOpen, ClipboardList, TrendingUp } from "lucide-react";

const studentTeacherData = [
  { month: "Jan", students: 120, teachers: 12 },
  { month: "Feb", students: 135, teachers: 13 },
  { month: "Mar", students: 150, teachers: 14 },
  { month: "Apr", students: 165, teachers: 15 },
  { month: "May", students: 180, teachers: 16 },
  { month: "Jun", students: 200, teachers: 18 },
];

const classDistribution = [
  { name: "Class 10", value: 45 },
  { name: "Class 11", value: 38 },
  { name: "Class 12", value: 42 },
  { name: "Class 9", value: 35 },
  { name: "Class 8", value: 40 },
];

const COLORS = [
  "var(--color-primary)",
  "var(--color-secondary)",
  "var(--color-accent)",
  "#8b5cf6",
  "#ec4899",
];

export default function SchoolAdminDashboard() {
  return (
    <div className="flex min-h-screen bg-background">
      <SchoolAdminSidebar />

      <main className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-card border-b border-border p-6">
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back, School Administrator
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <DashboardCard
              title="Total Students"
              value="200"
              description="Active students"
              icon={<BookOpen size={32} />}
              trend={{ value: 15, isPositive: true }}
            />
            <DashboardCard
              title="Total Teachers"
              value="18"
              description="Active teachers"
              icon={<Users size={32} />}
              trend={{ value: 5, isPositive: true }}
            />
            <DashboardCard
              title="Active Exams"
              value="12"
              description="Ongoing exams"
              icon={<ClipboardList size={32} />}
              trend={{ value: 3, isPositive: true }}
            />
            <DashboardCard
              title="Attendance Rate"
              value="94.5%"
              description="This month"
              icon={<TrendingUp size={32} />}
              trend={{ value: 2, isPositive: true }}
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Growth Chart */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Growth Trend
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={studentTeacherData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--color-border)"
                  />
                  <XAxis
                    dataKey="month"
                    stroke="var(--color-muted-foreground)"
                  />
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
                    dataKey="students"
                    fill="var(--color-primary)"
                    radius={[8, 8, 0, 0]}
                  />
                  <Bar
                    dataKey="teachers"
                    fill="var(--color-secondary)"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Class Distribution */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Class Distribution
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={classDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {classDistribution.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Students */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Recent Admissions
              </h2>
              <div className="space-y-3">
                {[
                  {
                    name: "Alex Johnson",
                    class: "Class 10",
                    date: "2 days ago",
                  },
                  {
                    name: "Sarah Williams",
                    class: "Class 9",
                    date: "5 days ago",
                  },
                  { name: "Mike Chen", class: "Class 11", date: "1 week ago" },
                  { name: "Emma Davis", class: "Class 12", date: "1 week ago" },
                ].map((student, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-3 border-b border-border last:border-0"
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {student.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {student.class}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {student.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Teachers */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Recent Hires
              </h2>
              <div className="space-y-3">
                {[
                  {
                    name: "Dr. Robert Smith",
                    subject: "Mathematics",
                    date: "1 week ago",
                  },
                  {
                    name: "Ms. Jennifer Lee",
                    subject: "English",
                    date: "2 weeks ago",
                  },
                  {
                    name: "Mr. David Brown",
                    subject: "Science",
                    date: "3 weeks ago",
                  },
                  {
                    name: "Ms. Lisa Anderson",
                    subject: "History",
                    date: "1 month ago",
                  },
                ].map((teacher, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-3 border-b border-border last:border-0"
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {teacher.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {teacher.subject}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {teacher.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
