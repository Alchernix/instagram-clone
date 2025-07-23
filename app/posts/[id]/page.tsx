import { getPostByPostId } from "@/server/actions/post";
import Post from "@/components/posts/Post";
import { notFound } from "next/navigation";
import { deletePostAction } from "@/server/actions/post";
import { createCommentAction } from "@/server/actions/comment";
import { CommentForm, Comments } from "@/components/comments/CommentSection";
import { auth } from "@/auth";

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
  const session = await auth();
  const currentUserId = Number(session?.user?.id);
  return (
    <div className="flex flex-col">
      <Post
        currentUserId={currentUserId}
        post={post!}
        images={post?.images!}
        author={post?.author!}
        actions={{ deletePostAction }}
      />
      {currentUserId && (
        <CommentForm
          currentUserId={currentUserId}
          postId={postId}
          action={createCommentAction}
        />
      )}
      {!currentUserId && (
        <p>
          댓글을 남기려면 <span className="font-bold">로그인</span>
        </p>
      )}
      <Comments comments={post?.comments!} />
    </div>
  );
}
