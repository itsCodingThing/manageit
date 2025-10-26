"use client";

import { Edit2, Trash2, Eye } from "lucide-react";
import { useState } from "react";

interface Admin {
  id: string;
  name: string;
  email: string;
  school: string;
  status: "active" | "inactive";
  joinDate: string;
}

const adminsData: Admin[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    school: "Central High School",
    status: "active",
    joinDate: "2024-01-15",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    school: "St. Mary Academy",
    status: "active",
    joinDate: "2024-02-20",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    school: "Lincoln High",
    status: "inactive",
    joinDate: "2024-01-10",
  },
  {
    id: "4",
    name: "Sarah Williams",
    email: "sarah@example.com",
    school: "Washington Academy",
    status: "active",
    joinDate: "2024-03-05",
  },
];

export default function AdminTable() {
  const [admins, setAdmins] = useState<Admin[]>(adminsData);

  return (
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
                School
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
            {admins.map((admin) => (
              <tr
                key={admin.id}
                className="border-b border-border hover:bg-muted/30 transition-colors"
              >
                <td className="px-6 py-4 text-sm text-foreground font-medium">
                  {admin.name}
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {admin.email}
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {admin.school}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      admin.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {admin.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {admin.joinDate}
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
                      <Edit2 size={16} className="text-muted-foreground" />
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
  );
}
