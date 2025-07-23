import { getPostByPostId } from "@/server/actions/post";
import EditPostPage from "@/components/posts/EditPostPage";
import { notFound } from "next/navigation";
import { updatePostAction } from "@/server/actions/post";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const postId = Number(id);
  const post = await getPostByPostId(postId);
  if (!postId) {
    notFound();
  }
  return (
    <EditPostPage
      post={post!}
      images={post?.images!}
      author={post?.author!}
      action={updatePostAction}
    />
  );
}
