"use client";

import { SchoolAdminSidebar } from "@/components/school-admin/sidebar";
import { Button } from "@/components/ui/button";
import { Plus, Edit2, Trash2, Eye, Ban } from "lucide-react";
import { useState } from "react";

interface Teacher {
  id: string;
  name: string;
  email: string;
  subject: string;
  qualification: string;
  status: "active" | "inactive";
  joinDate: string;
}

const teachersData: Teacher[] = [
  {
    id: "1",
    name: "Dr. Robert Smith",
    email: "robert@school.com",
    subject: "Mathematics",
    qualification: "M.Sc Mathematics",
    status: "active",
    joinDate: "2023-06-15",
  },
  {
    id: "2",
    name: "Ms. Jennifer Lee",
    email: "jennifer@school.com",
    subject: "English",
    qualification: "M.A English",
    status: "active",
    joinDate: "2023-07-20",
  },
  {
    id: "3",
    name: "Mr. David Brown",
    email: "david@school.com",
    subject: "Science",
    qualification: "B.Sc Physics",
    status: "active",
    joinDate: "2023-08-10",
  },
  {
    id: "4",
    name: "Ms. Lisa Anderson",
    email: "lisa@school.com",
    subject: "History",
    qualification: "M.A History",
    status: "inactive",
    joinDate: "2023-05-05",
  },
];

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>(teachersData);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <SchoolAdminSidebar />

      <main className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-card border-b border-border p-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Manage Teachers
            </h1>
            <p className="text-muted-foreground mt-1">
              View and manage school teachers
            </p>
          </div>
          <Button
            onClick={() => setShowForm(!showForm)}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Plus size={20} />
            Add Teacher
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Add Teacher Form */}
          {showForm && (
            <div className="bg-card border border-border rounded-lg p-6 mb-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Add New Teacher
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter teacher name"
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
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="Enter subject"
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Qualification
                  </label>
                  <input
                    type="text"
                    placeholder="Enter qualification"
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Add Teacher
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

          {/* Teachers Table */}
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
                      Subject
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Qualification
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Join Date
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {teachers.map((teacher) => (
                    <tr
                      key={teacher.id}
                      className="border-b border-border hover:bg-muted/30 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-foreground font-medium">
                        {teacher.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {teacher.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {teacher.subject}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {teacher.qualification}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            teacher.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {teacher.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {teacher.joinDate}
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
