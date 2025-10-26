import { Button } from "@/components/ui/button";

export default function AddSchoolForm() {
  return (
    <form className="bg-card border border-border rounded-lg p-6 mb-6">
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
        <Button className="bg-muted text-muted-foreground hover:bg-muted/80">
          Cancel
        </Button>
      </div>
    </form>
  );
}
