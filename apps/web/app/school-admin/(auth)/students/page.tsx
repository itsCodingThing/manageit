"use client";

import { SchoolAdminSidebar } from "@/components/school-admin/sidebar";
import { Button } from "@/components/ui/button";
import { Plus, Edit2, Trash2, Eye, Ban } from "lucide-react";
import { useState } from "react";

interface Student {
  id: string;
  name: string;
  email: string;
  class: string;
  rollNumber: string;
  status: "active" | "inactive";
  enrollDate: string;
}

const studentsData: Student[] = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex@school.com",
    class: "Class 10",
    rollNumber: "10-001",
    status: "active",
    enrollDate: "2024-01-15",
  },
  {
    id: "2",
    name: "Sarah Williams",
    email: "sarah@school.com",
    class: "Class 9",
    rollNumber: "9-045",
    status: "active",
    enrollDate: "2024-01-20",
  },
  {
    id: "3",
    name: "Mike Chen",
    email: "mike@school.com",
    class: "Class 11",
    rollNumber: "11-032",
    status: "active",
    enrollDate: "2024-02-10",
  },
  {
    id: "4",
    name: "Emma Davis",
    email: "emma@school.com",
    class: "Class 12",
    rollNumber: "12-018",
    status: "inactive",
    enrollDate: "2024-02-15",
  },
];

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>(studentsData);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <SchoolAdminSidebar />

      <main className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-card border-b border-border p-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Manage Students
            </h1>
            <p className="text-muted-foreground mt-1">
              View and manage school students
            </p>
          </div>
          <Button
            onClick={() => setShowForm(!showForm)}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Plus size={20} />
            Add Student
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Add Student Form */}
          {showForm && (
            <div className="bg-card border border-border rounded-lg p-6 mb-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Add New Student
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter student name"
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter email address"
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Class
                  </label>
                  <select className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>Select class</option>
                    <option>Class 8</option>
                    <option>Class 9</option>
                    <option>Class 10</option>
                    <option>Class 11</option>
                    <option>Class 12</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Roll Number
                  </label>
                  <input
                    type="text"
                    placeholder="Enter roll number"
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Add Student
                </Button>
                <Button
                  onClick={() => setShowForm(false)}
                  className="bg-muted text-muted-foreground hover:bg-muted/80"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* Students Table */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Class
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Roll Number
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Enroll Date
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr
                      key={student.id}
                      className="border-b border-border hover:bg-muted/30 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-foreground font-medium">
                        {student.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {student.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {student.class}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {student.rollNumber}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            student.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {student.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {student.enrollDate}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex items-center gap-2">
                          <button
                            className="p-2 hover:bg-muted rounded-lg transition-colors"
                            title="View"
                          >
                            <Eye size={16} className="text-muted-foreground" />
                          </button>
                          <button
                            className="p-2 hover:bg-muted rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit2
                              size={16}
                              className="text-muted-foreground"
                            />
                          </button>
                          <button
                            className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
                            title="Ban"
                          >
                            <Ban size={16} className="text-destructive" />
                          </button>
                          <button
                            className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={16} className="text-destructive" />
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
  );
}
