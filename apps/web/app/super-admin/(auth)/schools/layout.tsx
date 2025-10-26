export default function Layout(props: LayoutProps<"/super-admin/schools">) {
  return (
    <>
      {props.children}
      <div className="p-6">{props.grid}</div>
    </>
  );
}
