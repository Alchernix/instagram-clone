import { auth } from "@/auth";
import Sidebar from "@/components/Sidebar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const currentUserId = Number(session?.user?.id);
  return (
    <div className="h-full flex">
      {currentUserId && <Sidebar />}
      <div className="flex-1 flex flex-col overflow-auto">{children}</div>
    </div>
  );
}
