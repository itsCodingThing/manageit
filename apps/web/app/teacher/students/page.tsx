"use client"

import { TeacherSidebar } from "../../../components/teacher/sidebar"
import { Eye, Edit2, Ban, Mail } from "lucide-react"
import { useState } from "react"

interface Student {
  id: string
  name: string
  email: string
  class: string
  rollNumber: string
  performance: string
  attendance: number
  status: "active" | "inactive"
}

const studentsData: Student[] = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex@school.com",
    class: "Class 10-A",
    rollNumber: "10-001",
    performance: "Excellent",
    attendance: 95,
    status: "active",
  },
  {
    id: "2",
    name: "Sarah Williams",
    email: "sarah@school.com",
    class: "Class 10-A",
    rollNumber: "10-002",
    performance: "Good",
    attendance: 92,
    status: "active",
  },
  {
    id: "3",
    name: "Mike Chen",
    email: "mike@school.com",
    class: "Class 10-A",
    rollNumber: "10-003",
    performance: "Average",
    attendance: 88,
    status: "active",
  },
  {
    id: "4",
    name: "Emma Davis",
    email: "emma@school.com",
    class: "Class 10-A",
    rollNumber: "10-004",
    performance: "Excellent",
    attendance: 98,
    status: "active",
  },
]

export default function TeacherStudentsPage() {
  const [students, setStudents] = useState<Student[]>(studentsData)
  const [selectedClass, setSelectedClass] = useState("all")

  return (
    <div className="flex min-h-screen bg-background">
      <TeacherSidebar />

      <main className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-card border-b border-border p-6">
          <h1 className="text-3xl font-bold text-foreground">My Students</h1>
          <p className="text-muted-foreground mt-1">View and manage your students</p>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Filter */}
          <div className="mb-6 flex items-center gap-4">
            <label className="text-sm font-medium text-foreground">Filter by Class:</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Classes</option>
              <option value="10-a">Class 10-A</option>
              <option value="10-b">Class 10-B</option>
              <option value="11-a">Class 11-A</option>
            </select>
          </div>

          {/* Students Table */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Class</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Roll No.</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Performance</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Attendance</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4 text-sm text-foreground font-medium">{student.name}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{student.email}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{student.class}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{student.rollNumber}</td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            student.performance === "Excellent"
                              ? "bg-green-100 text-green-800"
                              : student.performance === "Good"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {student.performance}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground font-medium">{student.attendance}%</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {student.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-muted rounded-lg transition-colors" title="View Profile">
                            <Eye size={16} className="text-muted-foreground" />
                          </button>
                          <button className="p-2 hover:bg-muted rounded-lg transition-colors" title="Edit">
                            <Edit2 size={16} className="text-muted-foreground" />
                          </button>
                          <button className="p-2 hover:bg-destructive/10 rounded-lg transition-colors" title="Ban">
                            <Ban size={16} className="text-destructive" />
                          </button>
                          <button className="p-2 hover:bg-muted rounded-lg transition-colors" title="Send Email">
                            <Mail size={16} className="text-muted-foreground" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
