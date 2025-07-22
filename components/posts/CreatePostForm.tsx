"use client";
import { CldUploadWidget } from "next-cloudinary";
import { useRef } from "react";
import { PlusIcon } from "../Icons";
import ListItem from "../SidebarListItem";

// 사이드바의 "만들기" 버튼
// 사이드바의 "만들기" 버튼
export default function CreatePostButton() {
  const uploadRef = useRef<HTMLButtonElement | null>(null);

  // "만들기" 탭에서 이미지 업로드했을 때 쓰는 함수
  function handleSuccess(results: any) {
    console.log(results.info);
  }

  return (
    <div>
      <ListItem
        icon={<PlusIcon />}
        label="만들기"
        // @ts-ignore
        onClick={() => uploadRef.current?.()}
      />
      <CldUploadWidget
        uploadPreset="w38siez2"
        options={{
          multiple: true,
          maxFiles: 10,
        }}
        onSuccess={(results) => handleSuccess(results)}
      >
        {({ open }) => {
          // @ts-ignore
          uploadRef.current = open;
          return null;
        }}
      </CldUploadWidget>
    </div>
  );
}
