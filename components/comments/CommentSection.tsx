"use client";

import { Comment } from "@/app/generated/prisma";
import { useActionState, useEffect, useState } from "react";

type CommentFormProps = {
  currentUserId: number;
  postId: number;
  action: (
    prevState: { success: boolean },
    formData: FormData
  ) => Promise<{ success: boolean }>;
};

export function CommentForm({
  currentUserId,
  postId,
  action,
}: CommentFormProps) {
  const [content, setContent] = useState("");
  const [prevState, formAction, isPending] = useActionState<
    { success: boolean },
    FormData
  >(action, { success: false });

  useEffect(() => {
    if (prevState.success) {
      setContent("");
    }
  }, [prevState]);

  return (
    <form action={formAction} className="flex w-full">
      <textarea
        name="content"
        placeholder="댓글 달기..."
        rows={1}
        className="resize-none focus:outline-hidden flex-1 py-1"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <input type="hidden" name="author" value={currentUserId} />
      <input type="hidden" name="postId" value={postId} />
      <button
        disabled={!content || isPending}
        className="font-bold cursor-pointer px-2 disabled:hidden"
      >
        게시
      </button>
    </form>
  );
}

type CommentsProps = {
  comments: Comment[];
};

export function Comments({ comments }: CommentsProps) {
  return (
    <section>
      {comments.map((comment) => {
        return <div key={comment.id}>{comment.content}</div>;
      })}
    </section>
  );
}
