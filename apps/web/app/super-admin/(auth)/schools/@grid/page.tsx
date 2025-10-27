import { Edit2Icon, Trash2Icon, EyeIcon } from "@/components/icons";
import { getAllSchools } from "@/app/super-admin/actions/school";

export default async function SchoolGrid() {
  const result = await getAllSchools();

  if (!result) {
    return <span>no data</span>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {result.map((school) => (
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
                {school.address}
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
              <span className="text-muted-foreground">Code:</span>
              <span className="text-foreground font-medium">{school.code}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Admin:</span>
              <span className="text-foreground font-medium">23</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Students:</span>
              <span className="text-foreground font-medium">300</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Teachers:</span>
              <span className="text-foreground font-medium">40</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium">
              <EyeIcon size={16} />
              View
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors text-sm font-medium">
              <Edit2Icon size={16} />
              Edit
            </button>
            <button className="p-2 bg-destructive/10 text-destructive rounded-lg hover:bg-destructive/20 transition-colors">
              <Trash2Icon size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
