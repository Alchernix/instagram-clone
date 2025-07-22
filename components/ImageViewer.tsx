"use client";

import { ButtonHTMLAttributes, useState } from "react";
import { PrevIcon, NextIcon } from "./Icons";
import Image from "next/image";

// 게시글 페이지, 게시글 생성 페이지에서 여러 이미지를 볼 수 있게 하는 컴포넌트

type ImageViewerProps = {
  images: string[];
  size: number;
};

export default function ImageViewer({ images, size }: ImageViewerProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [loaded, setLoaded] = useState(images.map(() => false));

  return (
    <div
      className={`w-full max-w-[${size}px] aspect-square overflow-hidden relative`}
    >
      {images.length === 0 && (
        <div className="bg-slate-700 w-full h-full"></div>
      )}
      {images.length !== 0 && (
        <Image
          className={`w-full h-full object-cover ${
            loaded[currentImage] ? "animate-pulse" : ""
          }`}
          src={images[currentImage]}
          alt="profile image"
          fill={true}
          onLoadingComplete={() =>
            setLoaded((prev) =>
              prev.map((flag, idx) => (idx === currentImage ? true : flag))
            )
          }
        ></Image>
      )}
      {images.length > 1 && (
        <>
          <Button
            classes="left-0 -rotate-90"
            onClick={() => setCurrentImage((prev) => prev - 1)}
            disabled={currentImage === 0}
          >
            <PrevIcon />
          </Button>
          <Button
            classes="right-0 rotate-90"
            onClick={() => setCurrentImage((prev) => prev + 1)}
            disabled={currentImage === images.length - 1}
          >
            <NextIcon />
          </Button>
        </>
      )}
    </div>
  );
}

type ButtonProps = {
  children: React.ReactNode;
  classes: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ children, classes, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      type="button"
      className={`absolute shadow top-1/2 -translate-y-1/2 p-1 rounded-full bg-(--foreground) text-(--background) cursor-pointer disabled:opacity-70 disabled:cursor-default ${classes}`}
    >
      {children}
    </button>
  );
}
