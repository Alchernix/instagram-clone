import { signOut } from "@/auth";

export default function Sidebar() {
  return (
    <aside className="h-full w-[200px] bg-blue-200">
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
      >
        <button>로그아웃</button>
      </form>
    </aside>
  );
}
