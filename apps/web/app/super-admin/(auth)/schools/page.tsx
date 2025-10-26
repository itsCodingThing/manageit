"use client";

import { SuperAdminSidebar } from "@/components/super-admin/sidebar";
import { Button } from "@/components/ui/button";
import { Plus, Edit2, Trash2, Eye } from "lucide-react";
import { useState } from "react";

interface School {
  id: string;
  name: string;
  location: string;
  admin: string;
  students: number;
  teachers: number;
  status: "active" | "inactive";
  registeredDate: string;
}

const schoolsData: School[] = [
  {
    id: "1",
    name: "Central High School",
    location: "New York, NY",
    admin: "John Doe",
    students: 450,
    teachers: 35,
    status: "active",
    registeredDate: "2024-01-15",
  },
  {
    id: "2",
    name: "St. Mary Academy",
    location: "Boston, MA",
    admin: "Jane Smith",
    students: 320,
    teachers: 28,
    status: "active",
    registeredDate: "2024-02-20",
  },
  {
    id: "3",
    name: "Lincoln High",
    location: "Chicago, IL",
    admin: "Mike Johnson",
    students: 380,
    teachers: 32,
    status: "active",
    registeredDate: "2024-01-10",
  },
  {
    id: "4",
    name: "Washington Academy",
    location: "DC, Washington",
    admin: "Sarah Williams",
    students: 290,
    teachers: 24,
    status: "inactive",
    registeredDate: "2024-03-05",
  },
];

export default function SchoolsPage() {
  const [schools, setSchools] = useState<School[]>(schoolsData);
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      {/* Header */}
      <div className="bg-card border-b border-border p-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Manage Schools</h1>
          <p className="text-muted-foreground mt-1">
            View and manage registered schools
          </p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus size={20} />
          Add School
        </Button>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Add School Form */}
        {showForm && (
          <div className="bg-card border border-border rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Register New School
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  School Name
                </label>
                <input
                  type="text"
                  placeholder="Enter school name"
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="Enter location"
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Admin Email
                </label>
                <input
                  type="email"
                  placeholder="Enter admin email"
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Register School
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

        {/* Schools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schools.map((school) => (
            <div
              key={school.id}
              className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {school.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {school.location}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    school.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {school.status}
                </span>
              </div>

              <div className="space-y-2 mb-4 pb-4 border-b border-border">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Admin:</span>
                  <span className="text-foreground font-medium">
                    {school.admin}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Students:</span>
                  <span className="text-foreground font-medium">
                    {school.students}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Teachers:</span>
                  <span className="text-foreground font-medium">
                    {school.teachers}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium">
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
    </>
  );
}
