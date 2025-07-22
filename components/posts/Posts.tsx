import { getPostsbyUserHandle } from "@/server/actions/post";
import { CameraWithCircleIcon } from "../Icons";
import Post from "./Post";

export async function Posts({ handle }: { handle: string }) {
  const posts = await getPostsbyUserHandle(handle);
  console.log(posts);
  return (
    <>
      <Container>
        {posts.map((post) => (
          <Post key={post.id} url={post.images[0].url} />
        ))}
      </Container>
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
