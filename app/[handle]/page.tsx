// 각 유저의 게시글을 보여주는 페이지
// 로그인 안 된 상태에서도 볼 수 있어야 함
import Sidebar from "@/components/Sidebar";
import { ProfileImg } from "@/components/Images";
import { getUserRelatedDataByHandle } from "@/server/actions/user";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import Link from "next/link";
import { Posts, PostsSkeleton } from "@/components/posts/Posts";
import { Suspense } from "react";
import { Button, InfoItem, TapItem } from "@/components/user-page/UserPage";
import { PostsIcon, BookMarkIcon, LinkIcon } from "@/components/Icons";

export default async function Page({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const handle = (await params).handle;
  const user = await getUserRelatedDataByHandle(handle);
  if (!user) {
    notFound();
  }
  const session = await auth();
  const currentUserId = Number(session?.user?.id);
  const isMyAccount = !(!currentUserId || currentUserId !== user.id);

  return (
    <>
      <div className="grid grid-cols-[1fr_2fr] w-full max-w-3xl min-w-0 mx-auto py-10 px-5">
        <div className="justify-self-center w-[150px]">
          <ProfileImg url={user.profileImg} size={150} />
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex gap-2">
            <div className="font-bold text-base mr-3">{user.handle}</div>
            {!isMyAccount ? (
              <>
                <Button classes="bg-(--highlight-blue)">팔로우</Button>
                <Button classes="bg-(--border)">메시지 보내기</Button>
              </>
            ) : (
              <>
                <Link href="/accounts/edit">
                  <Button classes="bg-(--border)">프로필 편집</Button>
                </Link>
              </>
            )}
          </div>
          <ul className="flex gap-7">
            <InfoItem label="게시물" count={user._count.posts} />
            <InfoItem label="팔로우" count={0} />
            <InfoItem label="팔로워" count={0} />
          </ul>
          <div>
            <div className="font-bold">{user.name}</div>
            <div>{user.bio}</div>
            {user.website && (
              <div className="flex gap-1 items-center">
                <LinkIcon />
                <a className="font-bold hover:underline" href={user.website}>
                  {user.website}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex-1 w-full max-w-3xl min-w-0 mx-auto flex flex-col">
        <div className="border-b border-(--border) flex">
          <TapItem>
            <PostsIcon />
          </TapItem>
          {isMyAccount && (
            <TapItem>
              <BookMarkIcon />
            </TapItem>
          )}
        </div>
        <Suspense fallback={<PostsSkeleton />}>
          <Posts handle={handle} />
        </Suspense>
      </div>
    </>
  );
}
