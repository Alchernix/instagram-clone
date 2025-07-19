import Sidebar from "@/components/accounts/Sidebar";

export default function Page() {
  return (
    <div className="h-full flex">
      <Sidebar />
      <div className="flex-1">Hello World</div>
    </div>
  );
}
