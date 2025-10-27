import { Edit2, Trash2, Eye } from "lucide-react";
import { getAdmins } from "@/app/super-admin/actions/admin";
import { formatDate } from "@/utils/date";

export default async function AdminTable() {
  const results = await getAdmins();
  if (!results) {
    return <span>no admins</span>;
  }

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
                Phone
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
            {results.map((admin) => (
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
                  {admin.email}
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
                  {formatDate(admin.createdAt)}
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
