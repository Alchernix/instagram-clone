"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import ImageViewer from "@/components/ImageViewer";
import { Button } from "@/components/user-page/UserPage";

export default function Page() {
  const router = useRouter();
  const uploadRef = useRef<() => void>(null);
  // const [isWidgetLoaded, setIsWidgetLoaded] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  // uploadRef.current가 할당된 다음에만 실행...
  // 도저히 open을 못시키겠어서 편법을...
  useEffect(() => {
    setTimeout(() => {
      uploadRef.current?.();
      // setIsWidgetLoaded(true);
    }, 1);
  }, [uploadRef]);

  function handleSuccess(results: any) {
    console.log(results.info.original_filename);
    console.log(results.info.created_at);
    setUploadedImages((prevImages) => [...prevImages, results.info.url]);
  }

  return (
    <>
      {/* <div
        className={`fixed inset-0 bg-amber-50 w-screen h-screen opacity-70 ${
          isWidgetLoaded ? "hidden" : "block"
        }`}
      ></div> */}
      <div className="flex flex-col h-full">
        <div className="font-bold text-lg pb-5">새 게시물</div>
        <CldUploadWidget
          uploadPreset="w38siez2"
          options={{ multiple: true, maxFiles: 10 }}
          onSuccess={handleSuccess}
          onAbort={() => router.back()}
        >
          {({ open }) => {
            uploadRef.current = open;
            return null;
          }}
        </CldUploadWidget>
        <form action="" className="flex-1 flex flex-col items-center gap-5">
          <div className={`w-full max-w-[400px] min-w-0`}>
            <ImageViewer images={uploadedImages} size={400} />
          </div>
          <textarea
            className="resize-none border border-(--border) w-full flex-1 rounded-md px-2 py-1"
            name="content"
            placeholder="캡션 추가..."
          ></textarea>
          <Button classes={"bg-(--highlight-blue) w-full"}>업로드</Button>
        </form>
      </div>
    </>
  );
}
