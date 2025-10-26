"use client";

import { SchoolAdminSidebar } from "@/components/school-admin/sidebar";
import { Button } from "@/components/ui/button";
import { Plus, Edit2, Trash2, Eye } from "lucide-react";
import { useState } from "react";

interface Exam {
  id: string;
  name: string;
  subject: string;
  class: string;
  date: string;
  totalMarks: number;
  duration: string;
  status: "scheduled" | "ongoing" | "completed";
}

interface Batch {
  id: string;
  name: string;
  class: string;
  students: number;
  createdDate: string;
}

const examsData: Exam[] = [
  {
    id: "1",
    name: "Mathematics Mid-Term",
    subject: "Mathematics",
    class: "Class 10",
    date: "2024-04-15",
    totalMarks: 100,
    duration: "3 hours",
    status: "scheduled",
  },
  {
    id: "2",
    name: "English Final",
    subject: "English",
    class: "Class 9",
    date: "2024-04-10",
    totalMarks: 80,
    duration: "2.5 hours",
    status: "ongoing",
  },
  {
    id: "3",
    name: "Science Quiz",
    subject: "Science",
    class: "Class 11",
    date: "2024-04-05",
    totalMarks: 50,
    duration: "1 hour",
    status: "completed",
  },
];

const batchesData: Batch[] = [
  {
    id: "1",
    name: "Batch A - 2024",
    class: "Class 10",
    students: 45,
    createdDate: "2024-01-10",
  },
  {
    id: "2",
    name: "Batch B - 2024",
    class: "Class 9",
    students: 38,
    createdDate: "2024-01-15",
  },
  {
    id: "3",
    name: "Batch C - 2024",
    class: "Class 11",
    students: 42,
    createdDate: "2024-01-20",
  },
];

export default function ExamsPage() {
  const [exams, setExams] = useState<Exam[]>(examsData);
  const [batches, setBatches] = useState<Batch[]>(batchesData);
  const [showExamForm, setShowExamForm] = useState(false);
  const [showBatchForm, setShowBatchForm] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <SchoolAdminSidebar />

      <main className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-card border-b border-border p-6">
          <h1 className="text-3xl font-bold text-foreground">
            Exams & Batches
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage exams and student batches
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Exams Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-foreground">Exams</h2>
              <Button
                onClick={() => setShowExamForm(!showExamForm)}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Plus size={20} />
                Create Exam
              </Button>
            </div>

            {/* Create Exam Form */}
            {showExamForm && (
              <div className="bg-card border border-border rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Create New Exam
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Exam Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter exam name"
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
                      Class
                    </label>
                    <select className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                      <option>Select class</option>
                      <option>Class 8</option>
                      <option>Class 9</option>
                      <option>Class 10</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Total Marks
                    </label>
                    <input
                      type="number"
                      placeholder="Enter total marks"
                      className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Duration
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., 3 hours"
                      className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Create Exam
                  </Button>
                  <Button
                    onClick={() => setShowExamForm(false)}
                    className="bg-muted text-muted-foreground hover:bg-muted/80"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {/* Exams Table */}
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                        Exam Name
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                        Subject
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                        Class
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                        Marks
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                        Duration
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {exams.map((exam) => (
                      <tr
                        key={exam.id}
                        className="border-b border-border hover:bg-muted/30 transition-colors"
                      >
                        <td className="px-6 py-4 text-sm text-foreground font-medium">
                          {exam.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">
                          {exam.subject}
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">
                          {exam.class}
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">
                          {exam.date}
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">
                          {exam.totalMarks}
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">
                          {exam.duration}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              exam.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : exam.status === "ongoing"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {exam.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <div className="flex items-center gap-2">
                            <button
                              className="p-2 hover:bg-muted rounded-lg transition-colors"
                              title="View"
                            >
                              <Eye
                                size={16}
                                className="text-muted-foreground"
                              />
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

          {/* Batches Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-foreground">Batches</h2>
              <Button
                onClick={() => setShowBatchForm(!showBatchForm)}
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
              >
                <Plus size={20} />
                Create Batch
              </Button>
            </div>

            {/* Create Batch Form */}
            {showBatchForm && (
              <div className="bg-card border border-border rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Create New Batch
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Batch Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter batch name"
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
                    </select>
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                    Create Batch
                  </Button>
                  <Button
                    onClick={() => setShowBatchForm(false)}
                    className="bg-muted text-muted-foreground hover:bg-muted/80"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {/* Batches Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {batches.map((batch) => (
                <div
                  key={batch.id}
                  className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {batch.name}
                  </h3>
                  <div className="space-y-2 mb-4 pb-4 border-b border-border">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Class:</span>
                      <span className="text-foreground font-medium">
                        {batch.class}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Students:</span>
                      <span className="text-foreground font-medium">
                        {batch.students}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Created:</span>
                      <span className="text-foreground font-medium">
                        {batch.createdDate}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors text-sm font-medium">
                      <Eye size={16} />
                      View
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors text-sm font-medium">
                      <Edit2 size={16} />
                      Edit
                    </button>
                    <button className="p-2 bg-destructive/10 text-destructive rounded-lg hover:bg-destructive/20 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
