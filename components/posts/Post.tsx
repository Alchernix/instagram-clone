"use client";
// 포스트 상세보기 화면
import type { User, Post, PostImage } from "@/app/generated/prisma";
import { ProfileImg } from "../Images";
import ImageViewer from "../ImageViewer";
import {
  OptionsIcon,
  HeartIcon,
  CommentIcon,
  DirectIcon,
  BookMarkIcon,
} from "../Icons";
import { formatTime } from "@/lib/formatters";
import Link from "next/link";
import { useState } from "react";
import Modal from "../Modal";
import { ListItem } from "../Modal";

type PostProps = {
  currentUserId: Number;
  post: Post;
  images: PostImage[];
  author: User;
  actions: {
    deletePostAction: (formData: FormData) => Promise<void>;
  };
};

export default function Post({
  currentUserId,
  post,
  images,
  author,
  actions,
}: PostProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex items-center gap-3 pb-3">
        <div className="w-[40px]">
          <Link href={`/${author.handle}`}>
            <ProfileImg url={author.profileImg} size={40} />
          </Link>
        </div>
        <div>
          <Link href={`/${author.handle}`}>
            <p className="font-bold">{author.handle}</p>
          </Link>
          <p className="text-(--light-text)">{formatTime(post.createdAt)}</p>
        </div>
        {currentUserId === author.id && (
          <div className="rotate-90 cursor-pointer ml-auto">
            <div onClick={() => setIsModalOpen(true)}>
              <OptionsIcon />
            </div>
            <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <ul className="divide-y divide-slate-500">
                <form action={actions.deletePostAction}>
                  <input type="hidden" name="id" value={post.id} />
                  <input
                    type="hidden"
                    name="history"
                    value={`/${author.handle}`}
                  />
                  <ListItem classes="text-red-500">삭제</ListItem>
                </form>
                <div>
                  <Link href={`/posts/${post.id}/edit`} className="">
                    <ListItem>수정</ListItem>
                  </Link>
                </div>

                <ListItem onClick={() => setIsModalOpen(false)}>취소</ListItem>
              </ul>
            </Modal>
          </div>
        )}
      </div>
      <ImageViewer images={images.map((image) => image.url)} size={768} />
      <div className="flex py-3 gap-4">
        <IconContainer icon={<HeartIcon />} count={0} />
        <IconContainer icon={<CommentIcon />} count={post.comments.length} />
        <IconContainer icon={<DirectIcon />} count={0} />
        <IconContainer icon={<BookMarkIcon />} classes="ml-auto" />
      </div>
      {post.content && (
        <pre className="font-[inherit] text-inherit pb-2">
          <span className="font-bold">{author.handle}</span> {post.content}
        </pre>
      )}
    </>
  );
}

type IconContainerProps = {
  icon: React.ReactNode;
  classes?: string;
  count?: number | null;
};

function IconContainer({
  icon,
  classes = "",
  count = null,
}: IconContainerProps) {
  return (
    <button
      className={`flex gap-1.5 items-center cursor-pointer hover:opacity-50 ${classes}`}
    >
      {icon}
      {typeof count === "number" && <p className="font-bold">{count}</p>}
    </button>
  );
}
