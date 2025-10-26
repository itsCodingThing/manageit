"use client";

import { TeacherSidebar } from "../../../components/teacher/sidebar";
import { DashboardCard } from "../../../components/super-admin/dashboard-card";
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
import { Users, ClipboardList, TrendingUp, BookOpen } from "lucide-react";

const studentPerformanceData = [
  { exam: "Quiz 1", average: 75, highest: 95, lowest: 55 },
  { exam: "Quiz 2", average: 78, highest: 98, lowest: 58 },
  { exam: "Mid-Term", average: 82, highest: 100, lowest: 65 },
  { exam: "Final", average: 85, highest: 99, lowest: 70 },
];

const attendanceData = [
  { week: "Week 1", present: 28, absent: 2 },
  { week: "Week 2", present: 29, absent: 1 },
  { week: "Week 3", present: 27, absent: 3 },
  { week: "Week 4", present: 30, absent: 0 },
];

export default function TeacherDashboard() {
  return (
    <div className="flex min-h-screen bg-background">
      <TeacherSidebar />

      <main className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-card border-b border-border p-6">
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back, Dr. Robert Smith
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <DashboardCard
              title="Total Students"
              value="30"
              description="In your classes"
              icon={<Users size={32} />}
              trend={{ value: 5, isPositive: true }}
            />
            <DashboardCard
              title="Active Exams"
              value="4"
              description="Ongoing exams"
              icon={<ClipboardList size={32} />}
              trend={{ value: 2, isPositive: true }}
            />
            <DashboardCard
              title="Avg Performance"
              value="82%"
              description="Class average"
              icon={<TrendingUp size={32} />}
              trend={{ value: 8, isPositive: true }}
            />
            <DashboardCard
              title="Attendance"
              value="96.7%"
              description="This month"
              icon={<BookOpen size={32} />}
              trend={{ value: 3, isPositive: true }}
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Student Performance */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Student Performance Trend
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={studentPerformanceData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--color-border)"
                  />
                  <XAxis
                    dataKey="exam"
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
                    dataKey="average"
                    fill="var(--color-primary)"
                    radius={[8, 8, 0, 0]}
                  />
                  <Bar
                    dataKey="highest"
                    fill="var(--color-secondary)"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Attendance Chart */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Weekly Attendance
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={attendanceData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--color-border)"
                  />
                  <XAxis
                    dataKey="week"
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
                  <Line
                    type="monotone"
                    dataKey="present"
                    stroke="var(--color-primary)"
                    strokeWidth={2}
                    dot={{ fill: "var(--color-primary)" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="absent"
                    stroke="var(--color-destructive)"
                    strokeWidth={2}
                    dot={{ fill: "var(--color-destructive)" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Upcoming Exams */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Upcoming Exams
              </h2>
              <div className="space-y-3">
                {[
                  {
                    name: "Mathematics Quiz",
                    date: "2024-04-15",
                    students: 30,
                  },
                  { name: "Chapter Test", date: "2024-04-18", students: 30 },
                  { name: "Mid-Term Exam", date: "2024-04-25", students: 30 },
                ].map((exam, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-3 border-b border-border last:border-0"
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {exam.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {exam.students} students
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {exam.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Class Overview */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Class Overview
              </h2>
              <div className="space-y-3">
                {[
                  {
                    class: "Class 10 - A",
                    students: 30,
                    subject: "Mathematics",
                  },
                  {
                    class: "Class 10 - B",
                    students: 28,
                    subject: "Mathematics",
                  },
                  {
                    class: "Class 11 - A",
                    students: 32,
                    subject: "Mathematics",
                  },
                ].map((cls, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-3 border-b border-border last:border-0"
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {cls.class}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {cls.subject}
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-primary">
                      {cls.students} students
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
