"use client"

import { StudentSidebar } from "../../../components/student/sidebar"
import { DashboardCard } from "../../../components/super-admin/dashboard-card"
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
} from "recharts"
import { TrendingUp, BookOpen, ClipboardList, Award } from "lucide-react"

const performanceData = [
  { exam: "Quiz 1", score: 75, average: 70 },
  { exam: "Quiz 2", score: 82, average: 75 },
  { exam: "Mid-Term", score: 88, average: 80 },
  { exam: "Final", score: 92, average: 85 },
]

const attendanceData = [
  { week: "Week 1", present: 5, absent: 0 },
  { week: "Week 2", present: 5, absent: 0 },
  { week: "Week 3", present: 4, absent: 1 },
  { week: "Week 4", present: 5, absent: 0 },
]

export default function StudentDashboard() {
  return (
    <div className="flex min-h-screen bg-background">
      <StudentSidebar />

      <main className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-card border-b border-border p-6">
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back, Alex Johnson</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <DashboardCard
              title="Current GPA"
              value="3.8"
              description="Out of 4.0"
              icon={<Award size={32} />}
              trend={{ value: 5, isPositive: true }}
            />
            <DashboardCard
              title="Avg Score"
              value="84%"
              description="All exams"
              icon={<TrendingUp size={32} />}
              trend={{ value: 8, isPositive: true }}
            />
            <DashboardCard
              title="Attendance"
              value="95%"
              description="This month"
              icon={<BookOpen size={32} />}
              trend={{ value: 2, isPositive: true }}
            />
            <DashboardCard
              title="Pending Exams"
              value="3"
              description="Upcoming"
              icon={<ClipboardList size={32} />}
              trend={{ value: 1, isPositive: false }}
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance Chart */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Your Performance</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="exam" stroke="var(--color-muted-foreground)" />
                  <YAxis stroke="var(--color-muted-foreground)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="score" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="average" fill="var(--color-secondary)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Attendance Chart */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Weekly Attendance</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="week" stroke="var(--color-muted-foreground)" />
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
              <h2 className="text-lg font-semibold text-foreground mb-4">Upcoming Exams</h2>
              <div className="space-y-3">
                {[
                  { name: "Mathematics Quiz", date: "2024-04-15", subject: "Mathematics" },
                  { name: "English Test", date: "2024-04-18", subject: "English" },
                  { name: "Science Exam", date: "2024-04-25", subject: "Science" },
                ].map((exam, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-3 border-b border-border last:border-0"
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground">{exam.name}</p>
                      <p className="text-xs text-muted-foreground">{exam.subject}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{exam.date}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Grades */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Recent Grades</h2>
              <div className="space-y-3">
                {[
                  { exam: "Mid-Term Exam", score: 88, grade: "A" },
                  { exam: "Chapter Test 3", score: 82, grade: "A" },
                  { exam: "Quiz 2", score: 92, grade: "A+" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-3 border-b border-border last:border-0"
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.exam}</p>
                      <p className="text-xs text-muted-foreground">Score: {item.score}%</p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800">
                      {item.grade}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
