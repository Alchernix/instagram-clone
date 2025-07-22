import { getPostsbyUserHandle } from "@/server/actions/post";
import { CameraWithCircleIcon } from "../Icons";
import Post from "./PostCard";
import Link from "next/link";

export async function Posts({ handle }: { handle: string }) {
  const posts = await getPostsbyUserHandle(handle);
  return (
    <>
      {posts.length !== 0 && (
        <Container>
          {posts.map((post) => (
            <Link key={post.id} href={`/posts/${post.id}`}>
              <Post url={post.images[0].url} />
            </Link>
          ))}
        </Container>
      )}
      {posts.length === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center gap-7">
          <CameraWithCircleIcon />
          <p className="font-bold text-2xl">게시물 없음</p>
        </div>
      )}
    </>
  );
}

export function PostsSkeleton() {
  return (
    <Container>
      <div className="bg-(--loading) aspect-square"></div>
      <div className="bg-(--loading) aspect-square"></div>
      <div className="bg-(--loading) aspect-square"></div>
    </Container>
  );
}

function Container({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-3 h-full gap-1">{children}</div>;
}
