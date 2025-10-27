import { SaveIcon, Edit2Icon, UserIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";

const settings = {
  firstName: "John",
  lastName: "Administrator",
  email: "john.admin@schoolsystem.com",
  phone: "+1 (555) 123-4567",
  address: "123 Education Street",
};

export default function SuperAdminSettingsPage() {
  return (
    <div className="p-6 w-full flex justify-center items-center">
      <form className="bg-card border border-border rounded-lg p-6 space-y-6">
        <div className="flex items-center gap-4 pb-6 border-b border-border">
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
            <UserIcon size={40} className="text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              {settings.firstName} {settings.lastName}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              First Name
            </label>
            <input
              type="text"
              defaultValue={settings.firstName}
              className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Last Name
            </label>
            <input
              type="text"
              defaultValue={settings.lastName}
              className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Email Address
            </label>
            <input
              type="email"
              defaultValue={settings.email}
              className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              defaultValue={settings.phone}
              className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Street Address
          </label>
          <input
            type="text"
            defaultValue={settings.address}
            className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex gap-2">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            <SaveIcon size={20} />
            Save
          </Button>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Edit2Icon size={20} />
            Edit
          </Button>
        </div>
      </form>
    </div>
  );
}
