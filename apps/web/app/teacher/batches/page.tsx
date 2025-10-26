"use client"

import { TeacherSidebar } from "../../../components/teacher/sidebar"
import { Button } from "../../../components/ui/button"
import { Plus, Eye, Edit2, Trash2, Users } from "lucide-react"
import { useState } from "react"

interface Batch {
  id: string
  name: string
  class: string
  students: number
  subject: string
  createdDate: string
}

const batchesData: Batch[] = [
  {
    id: "1",
    name: "Class 10-A Mathematics",
    class: "Class 10-A",
    students: 30,
    subject: "Mathematics",
    createdDate: "2024-01-10",
  },
  {
    id: "2",
    name: "Class 10-B Mathematics",
    class: "Class 10-B",
    students: 28,
    subject: "Mathematics",
    createdDate: "2024-01-15",
  },
  {
    id: "3",
    name: "Class 11-A Mathematics",
    class: "Class 11-A",
    students: 32,
    subject: "Mathematics",
    createdDate: "2024-01-20",
  },
]

export default function TeacherBatchesPage() {
  const [batches, setBatches] = useState<Batch[]>(batchesData)
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="flex min-h-screen bg-background">
      <TeacherSidebar />

      <main className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-card border-b border-border p-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Batches</h1>
            <p className="text-muted-foreground mt-1">Manage your class batches</p>
          </div>
          <Button
            onClick={() => setShowForm(!showForm)}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Plus size={20} />
            Create Batch
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Create Batch Form */}
          {showForm && (
            <div className="bg-card border border-border rounded-lg p-6 mb-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Create New Batch</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Batch Name</label>
                  <input
                    type="text"
                    placeholder="Enter batch name"
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
                  <label className="block text-sm font-medium text-foreground mb-2">Subject</label>
                  <input
                    type="text"
                    placeholder="Enter subject"
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Create Batch</Button>
                <Button onClick={() => setShowForm(false)} className="bg-muted text-muted-foreground hover:bg-muted/80">
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
                <h3 className="text-lg font-semibold text-foreground mb-2">{batch.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{batch.subject}</p>

                <div className="space-y-2 mb-4 pb-4 border-b border-border">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Class:</span>
                    <span className="text-foreground font-medium">{batch.class}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Students:</span>
                    <span className="text-foreground font-medium">{batch.students}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Created:</span>
                    <span className="text-foreground font-medium">{batch.createdDate}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium">
                    <Users size={16} />
                    Students
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
