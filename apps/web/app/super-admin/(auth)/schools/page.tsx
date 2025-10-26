"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@/components/icons";
import AddSchoolForm from "./add-school-form";

export default function SchoolsPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
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
          <PlusIcon size={20} />
          Add School
        </Button>
      </div>

      {showForm && (
        <div className="p-6">
          <AddSchoolForm />
        </div>
      )}
    </>
  );
}
