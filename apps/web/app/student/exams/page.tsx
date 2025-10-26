"use client"

import { StudentSidebar } from "../../../components/student/sidebar"
import { Button } from "../../../components/ui/button"
import { Eye, Play, CheckCircle, Clock } from "lucide-react"
import { useState } from "react"

interface Exam {
  id: string
  name: string
  subject: string
  date: string
  totalMarks: number
  duration: string
  status: "pending" | "completed" | "ongoing"
  score?: number
  grade?: string
}

const examsData: Exam[] = [
  {
    id: "1",
    name: "Mathematics Quiz 1",
    subject: "Mathematics",
    date: "2024-04-15",
    totalMarks: 50,
    duration: "1 hour",
    status: "pending",
  },
  {
    id: "2",
    name: "Chapter Test - Algebra",
    subject: "Mathematics",
    date: "2024-04-10",
    totalMarks: 100,
    duration: "2 hours",
    status: "completed",
    score: 88,
    grade: "A",
  },
  {
    id: "3",
    name: "Mid-Term Exam",
    subject: "Mathematics",
    date: "2024-04-05",
    totalMarks: 100,
    duration: "3 hours",
    status: "completed",
    score: 92,
    grade: "A+",
  },
  {
    id: "4",
    name: "English Final",
    subject: "English",
    date: "2024-04-20",
    totalMarks: 80,
    duration: "2.5 hours",
    status: "pending",
  },
]

export default function StudentExamsPage() {
  const [exams, setExams] = useState<Exam[]>(examsData)

  return (
    <div className="flex min-h-screen bg-background">
      <StudentSidebar />

      <main className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-card border-b border-border p-6">
          <h1 className="text-3xl font-bold text-foreground">My Exams</h1>
          <p className="text-muted-foreground mt-1">View and take your exams</p>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Tabs */}
          <div className="flex gap-4 mb-6 border-b border-border">
            <button className="px-4 py-2 text-foreground font-medium border-b-2 border-primary">All Exams</button>
            <button className="px-4 py-2 text-muted-foreground font-medium hover:text-foreground">Pending</button>
            <button className="px-4 py-2 text-muted-foreground font-medium hover:text-foreground">Completed</button>
          </div>

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
                    <p className="text-sm text-muted-foreground mt-1">{exam.subject}</p>
                  </div>
                  {exam.status === "completed" ? (
                    <CheckCircle className="text-green-600" size={24} />
                  ) : exam.status === "ongoing" ? (
                    <Clock className="text-blue-600" size={24} />
                  ) : (
                    <Clock className="text-yellow-600" size={24} />
                  )}
                </div>

                <div className="space-y-2 mb-4 pb-4 border-b border-border">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Date:</span>
                    <span className="text-foreground font-medium">{exam.date}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Total Marks:</span>
                    <span className="text-foreground font-medium">{exam.totalMarks}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="text-foreground font-medium">{exam.duration}</span>
                  </div>
                </div>

                {exam.status === "completed" && exam.score ? (
                  <div className="mb-4 pb-4 border-b border-border">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Your Score:</span>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-primary">{exam.score}</span>
                        <span className="px-2 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800">
                          {exam.grade}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : null}

                <div className="flex items-center gap-2">
                  {exam.status === "pending" ? (
                    <>
                      <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
                        <Play size={16} />
                        Start Exam
                      </Button>
                      <button className="p-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors">
                        <Eye size={16} />
                      </button>
                    </>
                  ) : (
                    <>
                      <Button className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/90">
                        <Eye size={16} />
                        View Results
                      </Button>
                      <button className="p-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors">
                        <Eye size={16} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
