"use client";

import { Comment } from "@/app/generated/prisma";
import type { CommentsWithInfo } from "@/server/actions/post";
import { useActionState, useEffect, useState } from "react";
import { ProfileImg } from "../Images";
import { formatTime } from "@/lib/formatters";
import Link from "next/link";

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
    <form action={formAction} className="flex w-full mb-2">
      <input
        name="content"
        placeholder="댓글 달기..."
        className="focus:outline-hidden flex-1 py-1"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></input>
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
  comments: CommentsWithInfo[];
};

export function Comments({ comments }: CommentsProps) {
  return (
    <section className="flex flex-col gap-5">
      {comments.map((comment) => {
        return (
          <div key={comment.id} className="flex gap-2">
            <div className="w-[40px]">
              <Link href={`/${comment.author.handle}`}>
                <ProfileImg url={comment.author.profileImg} size={40} />
              </Link>
            </div>
            <div>
              <div className="flex gap-2">
                <Link href={`/${comment.author.handle}`}>
                  <div className="font-bold">{comment.author.handle}</div>
                </Link>
                <div className="text-(--light-text)">
                  {formatTime(comment.createdAt)}
                </div>
              </div>
              <div>{comment.content}</div>
              <button className="text-(--light-text)">답글 달기</button>
            </div>
          </div>
        );
      })}
    </section>
  );
}
