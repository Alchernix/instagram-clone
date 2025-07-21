// 유저 에딧 페이지
// 로그인 안 된 유저는 접속X
import Sidebar from "@/components/Sidebar";
import { getUserById } from "@/server/actions/user";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import Form from "@/components/accounts/EditProfileForm";
import { updateUserAction } from "@/server/actions/user";

export default async function Page() {
  const session = await auth();
  const currentUserId = Number(session?.user?.id);
  const currentUser = await getUserById(currentUserId);

  if (!currentUser) {
    // 타입에러 방지용
    notFound();
  }

  return (
    <div className="h-full flex">
      {currentUserId && <Sidebar />}
      <div className="flex-1 w-full overflow-auto">
        <div className="flex flex-col gap-10 w-full max-w-3xl min-w-0 mx-auto py-10 px-5">
          <div className="font-bold text-lg">프로필 편집</div>
          <Form currentUser={currentUser} action={updateUserAction} />
        </div>
      </div>
    </div>
  );
}
