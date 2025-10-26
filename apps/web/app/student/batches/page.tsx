"use client";

import { StudentSidebar } from "../../../components/student/sidebar";
import { Users, BookOpen, Calendar, User } from "lucide-react";

interface Batch {
  id: string;
  name: string;
  class: string;
  subject: string;
  teacher: string;
  students: number;
  enrolledDate: string;
}

const batchesData: Batch[] = [
  {
    id: "1",
    name: "Class 10-A Mathematics",
    class: "Class 10-A",
    subject: "Mathematics",
    teacher: "Dr. Robert Smith",
    students: 30,
    enrolledDate: "2024-01-10",
  },
  {
    id: "2",
    name: "Class 10-A English",
    class: "Class 10-A",
    subject: "English",
    teacher: "Ms. Jennifer Lee",
    students: 30,
    enrolledDate: "2024-01-10",
  },
  {
    id: "3",
    name: "Class 10-A Science",
    class: "Class 10-A",
    subject: "Science",
    teacher: "Mr. David Brown",
    students: 30,
    enrolledDate: "2024-01-10",
  },
];

export default function StudentBatchesPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <StudentSidebar />

      <main className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-card border-b border-border p-6">
          <h1 className="text-3xl font-bold text-foreground">My Batches</h1>
          <p className="text-muted-foreground mt-1">
            View your enrolled batches and classes
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Batches Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {batchesData.map((batch) => (
              <div
                key={batch.id}
                className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    {batch.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {batch.subject}
                  </p>
                </div>

                <div className="space-y-3 mb-6 pb-6 border-b border-border">
                  <div className="flex items-center gap-3">
                    <User className="text-primary" size={18} />
                    <div>
                      <p className="text-xs text-muted-foreground">Teacher</p>
                      <p className="text-sm font-medium text-foreground">
                        {batch.teacher}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Users className="text-secondary" size={18} />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Total Students
                      </p>
                      <p className="text-sm font-medium text-foreground">
                        {batch.students}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Calendar className="text-accent" size={18} />
                    <div>
                      <p className="text-xs text-muted-foreground">Enrolled</p>
                      <p className="text-sm font-medium text-foreground">
                        {batch.enrolledDate}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <BookOpen className="text-primary" size={18} />
                    <div>
                      <p className="text-xs text-muted-foreground">Class</p>
                      <p className="text-sm font-medium text-foreground">
                        {batch.class}
                      </p>
                    </div>
                  </div>
                </div>

                <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm">
                  View Batch Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
