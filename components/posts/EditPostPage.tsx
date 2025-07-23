"use client";
import ImageViewer from "@/components/ImageViewer";
import { Button } from "@/components/user-page/UserPage";
import { useActionState } from "react";
import { Post, PostImage, User } from "@/app/generated/prisma";

type CreatePostPageProps = {
  post: Post;
  images: PostImage[];
  author: User;
  action: (prevState: {}, formData: FormData) => Promise<void>;
};

export default function EditPostPage({
  post,
  images,
  author,
  action,
}: CreatePostPageProps) {
  const imageUrls = images.map((image) => image.url);
  const [prevState, formAction, isPending] = useActionState<{}, FormData>(
    action,
    {}
  );

  return (
    <>
      <div className="flex flex-col h-full">
        <div className="font-bold text-lg pb-5">정보 수정</div>
        <form
          action={formAction}
          className="flex-1 flex flex-col items-center gap-5"
        >
          <div className={`w-full max-w-[576px] min-w-0`}>
            <ImageViewer images={imageUrls} size={576} />
          </div>
          <textarea
            className="resize-none border border-(--border) w-full flex-1 rounded-md px-2 py-1"
            name="content"
            placeholder="캡션 추가..."
            defaultValue={post.content || ""}
          ></textarea>
          <input type="hidden" name="id" value={post.id} />
          <Button disabled={isPending} classes={"bg-(--highlight-blue) w-full"}>
            완료
          </Button>
        </form>
      </div>
    </>
  );
}
