export default function SettingsLayout(
  props: LayoutProps<"/super-admin/settings">,
) {
  return (
    <>
      <div className="bg-card border-b border-border p-6">
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage system configuration and preferences
        </p>
      </div>
      {props.children}
    </>
  );
}
