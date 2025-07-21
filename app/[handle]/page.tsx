// 각 유저의 게시글을 보여주는 페이지
// 로그인 안 된 상태에서도 볼 수 있어야 함
import Sidebar from "@/components/Sidebar";
import { ProfileImg } from "@/components/Images";
import { getUserByHandle } from "@/server/actions/user";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { Button, InfoItem } from "@/components/user-page/UserPage";

export default async function Page({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const handle = (await params).handle;
  const user = await getUserByHandle(handle);
  if (!user) {
    notFound();
  }
  const session = await auth();
  const currentUserId = Number(session?.user?.id);

  return (
    <div className="h-full flex">
      {currentUserId && <Sidebar />}
      <div className="flex-1 flex-col items-center">
        <div className="grid grid-cols-[1fr_2fr] max-w-3xl mx-auto py-10 px-5">
          <div className="justify-self-center">
            <ProfileImg url={user.profileImg} size={150} />
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex gap-2">
              <div className="font-bold text-base mr-3">{user.handle}</div>
              {!currentUserId || currentUserId !== user.id ? (
                <>
                  <Button classes="bg-(--highlight-blue)">팔로우</Button>
                  <Button classes="bg-(--border)">메시지 보내기</Button>
                </>
              ) : (
                <>
                  <Button classes="bg-(--border)">프로필 편집</Button>
                </>
              )}
            </div>
            <ul className="flex gap-7">
              <InfoItem label="게시물" count={0} />
              <InfoItem label="팔로우" count={0} />
              <InfoItem label="팔로워" count={0} />
            </ul>
            <div className="font-bold">{user.name}</div>
            <div>{user.bio}</div>
          </div>
        </div>
        <div className="flex-1">Test</div>
      </div>
    </div>
  );
}
