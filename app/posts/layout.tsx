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
      <div className="flex-1 overflow-auto">
        <div className="w-full max-w-xl min-w-0 mx-auto py-10 px-5">
          {children}
        </div>
      </div>
    </div>
  );
}
