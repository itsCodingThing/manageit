"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Save, Bell, Lock, Building2, Users } from "lucide-react";

export default function SchoolAdminSettingsPage() {
  const [activeTab, setActiveTab] = useState("school");
  const [settings, setSettings] = useState({
    schoolName: "Central High School",
    schoolCode: "CHS-001",
    principalEmail: "principal@centralhigh.edu",
    contactPhone: "+1 (555) 123-4567",
    address: "123 Education Lane, New York, NY",
    academicYear: "2024-2025",
    emailNotifications: true,
    studentAlerts: true,
    parentNotifications: true,
    passwordPolicy: "strong",
    sessionTimeout: "30 minutes",
    dataBackup: true,
  });

  const tabs = [
    { id: "school", label: "School Info", icon: <Building2 size={20} /> },
    { id: "notifications", label: "Notifications", icon: <Bell size={20} /> },
    { id: "security", label: "Security", icon: <Lock size={20} /> },
    { id: "users", label: "User Management", icon: <Users size={20} /> },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 bg-card border-r border-border p-6 hidden md:block">
        <h2 className="text-xl font-bold text-foreground mb-8">School Admin</h2>
        <nav className="space-y-2">
          <a
            href="/school-admin/dashboard"
            className="block px-4 py-2 text-muted-foreground hover:text-foreground rounded-lg"
          >
            Dashboard
          </a>
          <a
            href="/school-admin/teachers"
            className="block px-4 py-2 text-muted-foreground hover:text-foreground rounded-lg"
          >
            Teachers
          </a>
          <a
            href="/school-admin/students"
            className="block px-4 py-2 text-muted-foreground hover:text-foreground rounded-lg"
          >
            Students
          </a>
          <a
            href="/school-admin/exams"
            className="block px-4 py-2 text-muted-foreground hover:text-foreground rounded-lg"
          >
            Exams & Batches
          </a>
          <a
            href="/school-admin/settings"
            className="block px-4 py-2 text-primary font-medium rounded-lg bg-primary/10"
          >
            Settings
          </a>
        </nav>
      </div>

      <main className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-card border-b border-border p-6">
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage school configuration and preferences
          </p>
        </div>

        {/* Content */}
        <div className="p-6 max-w-4xl">
          {/* Tabs */}
          <div className="flex gap-2 mb-6 border-b border-border overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* School Info */}
          {activeTab === "school" && (
            <div className="bg-card border border-border rounded-lg p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    School Name
                  </label>
                  <input
                    type="text"
                    value={settings.schoolName}
                    onChange={(e) =>
                      setSettings({ ...settings, schoolName: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    School Code
                  </label>
                  <input
                    type="text"
                    value={settings.schoolCode}
                    disabled
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Address
                </label>
                <textarea
                  value={settings.address}
                  onChange={(e) =>
                    setSettings({ ...settings, address: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Principal Email
                  </label>
                  <input
                    type="email"
                    value={settings.principalEmail}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        principalEmail: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    value={settings.contactPhone}
                    onChange={(e) =>
                      setSettings({ ...settings, contactPhone: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Academic Year
                </label>
                <input
                  type="text"
                  value={settings.academicYear}
                  onChange={(e) =>
                    setSettings({ ...settings, academicYear: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Save size={20} />
                Save Changes
              </Button>
            </div>
          )}

          {/* Notifications */}
          {activeTab === "notifications" && (
            <div className="bg-card border border-border rounded-lg p-6 space-y-6">
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <p className="font-medium text-foreground">
                    Email Notifications
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Receive system notifications via email
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      emailNotifications: e.target.checked,
                    })
                  }
                  className="w-5 h-5 cursor-pointer"
                />
              </div>
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <p className="font-medium text-foreground">Student Alerts</p>
                  <p className="text-sm text-muted-foreground">
                    Get alerts about student activities
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.studentAlerts}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      studentAlerts: e.target.checked,
                    })
                  }
                  className="w-5 h-5 cursor-pointer"
                />
              </div>
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <p className="font-medium text-foreground">
                    Parent Notifications
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Send notifications to parents
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.parentNotifications}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      parentNotifications: e.target.checked,
                    })
                  }
                  className="w-5 h-5 cursor-pointer"
                />
              </div>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Save size={20} />
                Save Changes
              </Button>
            </div>
          )}

          {/* Security */}
          {activeTab === "security" && (
            <div className="bg-card border border-border rounded-lg p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Password Policy
                </label>
                <select className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Weak</option>
                  <option>Medium</option>
                  <option>Strong</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Session Timeout
                </label>
                <select className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>15 minutes</option>
                  <option>30 minutes</option>
                  <option>1 hour</option>
                </select>
              </div>
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <p className="font-medium text-foreground">
                    Automatic Data Backup
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Enable daily automatic backups
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.dataBackup}
                  onChange={(e) =>
                    setSettings({ ...settings, dataBackup: e.target.checked })
                  }
                  className="w-5 h-5 cursor-pointer"
                />
              </div>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Save size={20} />
                Save Changes
              </Button>
            </div>
          )}

          {/* User Management */}
          {activeTab === "users" && (
            <div className="bg-card border border-border rounded-lg p-6 space-y-6">
              <div className="space-y-4">
                <div className="p-4 border border-border rounded-lg">
                  <p className="font-medium text-foreground mb-2">
                    Teacher Account Creation
                  </p>
                  <p className="text-sm text-muted-foreground mb-3">
                    Allow teachers to create their own accounts
                  </p>
                  <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                    Enable Self-Registration
                  </Button>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <p className="font-medium text-foreground mb-2">
                    Student Account Creation
                  </p>
                  <p className="text-sm text-muted-foreground mb-3">
                    Allow students to create their own accounts
                  </p>
                  <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                    Enable Self-Registration
                  </Button>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <p className="font-medium text-foreground mb-2">
                    Bulk User Import
                  </p>
                  <p className="text-sm text-muted-foreground mb-3">
                    Import users from CSV file
                  </p>
                  <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                    Upload CSV
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
