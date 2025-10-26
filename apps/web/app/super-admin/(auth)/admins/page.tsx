"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import AddAdminForm from "./add-admin";
import AdminTable from "./admin-table";

export default function AdminsPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <div className="bg-card border-b border-border p-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Manage Admins</h1>
          <p className="text-muted-foreground mt-1">
            View and manage school administrators
          </p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus size={20} />
          Add Admin
        </Button>
      </div>

      <div className="p-6">
        {showForm && <AddAdminForm />}
        <AdminTable />
      </div>
    </>
  );
}
