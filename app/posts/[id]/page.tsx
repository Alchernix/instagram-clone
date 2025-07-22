import { getPostByPostId } from "@/server/actions/post";
import Post from "@/components/posts/Post";
import { notFound } from "next/navigation";

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
  return <Post post={post!} images={post?.images!} author={post?.author!} />;
}
