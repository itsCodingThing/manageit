"use client";

import { StudentSidebar } from "../../../components/student/sidebar";
import { Button } from "../../../components/ui/button";
import { Edit2, Mail, Phone, MapPin, Calendar } from "lucide-react";
import { useState } from "react";

export default function StudentProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <StudentSidebar />

      <main className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-card border-b border-border p-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
            <p className="text-muted-foreground mt-1">
              View and update your profile information
            </p>
          </div>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Edit2 size={20} />
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 max-w-4xl">
          {/* Profile Header */}
          <div className="bg-card border border-border rounded-lg p-8 mb-6">
            <div className="flex items-start gap-6 mb-6">
              <div className="w-24 h-24 bg-primary/10 rounded-lg flex items-center justify-center">
                <span className="text-4xl font-bold text-primary">AJ</span>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-foreground">
                  Alex Johnson
                </h2>
                <p className="text-muted-foreground mt-1">
                  Class 10-A | Roll No: 10-001
                </p>
                <div className="flex items-center gap-4 mt-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Active
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Enrolled since Jan 2024
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-card border border-border rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">
              Personal Information
            </h3>

            {isEditing ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Alex Johnson"
                      className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      defaultValue="alex@school.com"
                      className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      defaultValue="+1 (555) 123-4567"
                      className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      defaultValue="2008-05-15"
                      className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      defaultValue="123 Main Street, New York, NY"
                      className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Guardian Name
                    </label>
                    <input
                      type="text"
                      defaultValue="John Johnson"
                      className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Save Changes
                  </Button>
                  <Button
                    onClick={() => setIsEditing(false)}
                    className="bg-muted text-muted-foreground hover:bg-muted/80"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <Mail className="text-primary mt-1" size={20} />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="text-foreground font-medium">
                        alex@school.com
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="text-primary mt-1" size={20} />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="text-foreground font-medium">
                        +1 (555) 123-4567
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="text-primary mt-1" size={20} />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Date of Birth
                      </p>
                      <p className="text-foreground font-medium">
                        May 15, 2008
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="text-primary mt-1" size={20} />
                    <div>
                      <p className="text-sm text-muted-foreground">Address</p>
                      <p className="text-foreground font-medium">
                        123 Main Street, New York, NY
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Academic Information */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">
              Academic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">10</span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Class</p>
                  <p className="text-foreground font-medium">Class 10-A</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-bold text-secondary">001</span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Roll Number</p>
                  <p className="text-foreground font-medium">10-001</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-bold text-accent">3.8</span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Current GPA</p>
                  <p className="text-foreground font-medium">3.8 / 4.0</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-bold text-green-600">95%</span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Attendance</p>
                  <p className="text-foreground font-medium">95%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
