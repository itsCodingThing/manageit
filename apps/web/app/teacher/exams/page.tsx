"use client"

import { TeacherSidebar } from "../../../components/teacher/sidebar"
import { Button } from "../../../components/ui/button"
import { Plus, Eye, Edit2, Trash2, BarChart3 } from "lucide-react"
import { useState } from "react"

interface Exam {
  id: string
  name: string
  class: string
  date: string
  totalMarks: number
  duration: string
  submissions: number
  totalStudents: number
  status: "scheduled" | "ongoing" | "completed"
}

const examsData: Exam[] = [
  {
    id: "1",
    name: "Mathematics Quiz 1",
    class: "Class 10-A",
    date: "2024-04-15",
    totalMarks: 50,
    duration: "1 hour",
    submissions: 28,
    totalStudents: 30,
    status: "scheduled",
  },
  {
    id: "2",
    name: "Chapter Test - Algebra",
    class: "Class 10-A",
    date: "2024-04-10",
    totalMarks: 100,
    duration: "2 hours",
    submissions: 30,
    totalStudents: 30,
    status: "completed",
  },
  {
    id: "3",
    name: "Mid-Term Exam",
    class: "Class 10-A",
    date: "2024-04-05",
    totalMarks: 100,
    duration: "3 hours",
    submissions: 29,
    totalStudents: 30,
    status: "completed",
  },
]

export default function TeacherExamsPage() {
  const [exams, setExams] = useState<Exam[]>(examsData)
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="flex min-h-screen bg-background">
      <TeacherSidebar />

      <main className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-card border-b border-border p-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Exams</h1>
            <p className="text-muted-foreground mt-1">Create and manage your exams</p>
          </div>
          <Button
            onClick={() => setShowForm(!showForm)}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Plus size={20} />
            Create Exam
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Create Exam Form */}
          {showForm && (
            <div className="bg-card border border-border rounded-lg p-6 mb-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Create New Exam</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Exam Name</label>
                  <input
                    type="text"
                    placeholder="Enter exam name"
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Class</label>
                  <select className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>Select class</option>
                    <option>Class 10-A</option>
                    <option>Class 10-B</option>
                    <option>Class 11-A</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Total Marks</label>
                  <input
                    type="number"
                    placeholder="Enter total marks"
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Duration</label>
                  <input
                    type="text"
                    placeholder="e.g., 2 hours"
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Create Exam</Button>
                <Button onClick={() => setShowForm(false)} className="bg-muted text-muted-foreground hover:bg-muted/80">
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* Exams Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exams.map((exam) => (
              <div
                key={exam.id}
                className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{exam.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{exam.class}</p>
                  </div>
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
                </div>

                <div className="space-y-2 mb-4 pb-4 border-b border-border">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Date:</span>
                    <span className="text-foreground font-medium">{exam.date}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Marks:</span>
                    <span className="text-foreground font-medium">{exam.totalMarks}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="text-foreground font-medium">{exam.duration}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Submissions:</span>
                    <span className="text-foreground font-medium">
                      {exam.submissions}/{exam.totalStudents}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium">
                    <BarChart3 size={16} />
                    Results
                  </button>
                  <button className="p-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors">
                    <Eye size={16} />
                  </button>
                  <button className="p-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors">
                    <Edit2 size={16} />
                  </button>
                  <button className="p-2 bg-destructive/10 text-destructive rounded-lg hover:bg-destructive/20 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
