"use client";
// 포스트 상세보기 화면
import type { User, Post, PostImage } from "@/app/generated/prisma";
import { ProfileImg } from "../Images";
import ImageViewer from "../ImageViewer";
import { OptionsIcon } from "../Icons";

type PostProps = {
  post: Post;
  images: PostImage[];
  author: User;
};

export default function Post({ post, images, author }: PostProps) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-3 pb-3">
        <div className="w-[40px]">
          <ProfileImg url={author.profileImg} size={40} />
        </div>
        <p className="font-bold">{author.handle}</p>
        <div className="rotate-90 cursor-pointer ml-auto">
          <OptionsIcon />
        </div>
      </div>
      <ImageViewer images={images.map((image) => image.url)} size={768} />
      <div>Icons</div>
      {post.content && (
        <pre className="font-[inherit] text-inherit">
          <span className="font-bold">{author.handle}</span> {post.content}
        </pre>
      )}
      <div>0시간 전</div>
      <textarea name="" placeholder="댓글 달기..."></textarea>
    </div>
  );
}
