"use client";
import type { RefObject } from "react";
import { Comment } from "@/app/generated/prisma";
import type { CommentsWithInfo } from "@/server/actions/post";
import { useActionState, useEffect, useState, useRef } from "react";
import { ProfileImg } from "../Images";
import { formatTime } from "@/lib/formatters";
import Link from "next/link";

type CommentSectionProps = {
  comments: CommentsWithInfo[];
  currentUserId: number;
  postId: number;
  actions: {
    createCommentAction: (
      prevState: { success: boolean },
      formData: FormData
    ) => Promise<{ success: boolean }>;
  };
};

export function CommentSection({
  currentUserId,
  postId,
  actions,
  comments,
}: CommentSectionProps) {
  const [mentioned, setMentioned] = useState("");
  const commentForm = useRef<HTMLInputElement | null>(null);

  function handleReply(handle: string) {
    setMentioned(handle);
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (e.target !== commentForm.current) {
        setMentioned("");
      }
    }
    if (mentioned) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mentioned]);

  return (
    <div>
      {currentUserId && (
        <CommentForm
          ref={commentForm}
          currentUserId={currentUserId}
          postId={postId}
          action={actions.createCommentAction}
          mentioned={mentioned}
        />
      )}
      {!currentUserId && (
        <p>
          댓글을 남기려면 <span className="font-bold">로그인</span>
        </p>
      )}
      <Comments comments={comments} onReply={handleReply} />
    </div>
  );
}

type CommentFormProps = {
  ref: RefObject<HTMLInputElement | null>;
  currentUserId: number;
  postId: number;
  mentioned: string;
  action: (
    prevState: { success: boolean },
    formData: FormData
  ) => Promise<{ success: boolean }>;
};

export function CommentForm({
  ref,
  currentUserId,
  postId,
  mentioned,
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
        ref={ref}
        name="content"
        placeholder={
          mentioned ? `${mentioned}님에게 남기는 답글` : "댓글 달기..."
        }
        className="focus:outline-hidden flex-1 py-1"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></input>
      <input type="hidden" name="author" value={currentUserId} />
      <input type="hidden" name="postId" value={postId} />
      <input type="hidden" name="" />
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
  onReply: (handle: string) => void;
};

export function Comments({ comments, onReply }: CommentsProps) {
  return (
    <section className="flex flex-col gap-5 max-h-100 overflow-auto [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
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
              <button
                onClick={() => onReply(comment.author.handle)}
                className="text-(--light-text)"
              >
                답글 달기
              </button>
            </div>
          </div>
        );
      })}
    </section>
  );
}
