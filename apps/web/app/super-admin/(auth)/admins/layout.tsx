export default function Layout(props: LayoutProps<"/super-admin/admins">) {
  return (
    <>
      {props.children}
      <div className="p-6">{props.table}</div>
    </>
  );
}
