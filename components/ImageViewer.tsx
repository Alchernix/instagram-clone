"use client";

import { ButtonHTMLAttributes, useEffect, useState } from "react";
import { PrevIcon, NextIcon } from "./Icons";
import Image from "next/image";

// 게시글 페이지, 게시글 생성 페이지에서 여러 이미지를 볼 수 있게 하는 컴포넌트

type ImageViewerProps = {
  images: string[];
  size: number;
};

export default function ImageViewer({ images, size }: ImageViewerProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [loaded, setLoaded] = useState<Boolean[]>([]);

  useEffect(() => {
    setLoaded(images.map(() => false));
  }, [images]);

  return (
    <div
      className={`w-full max-w-[${size}px] aspect-square overflow-hidden relative`}
    >
      {!loaded[currentImage] && (
        <div className="bg-(--loading) w-full h-full animate-pulse"></div>
      )}
      {images.length !== 0 && (
        <Image
          className={`w-full h-full object-cover ${
            loaded[currentImage] ? "" : "opacity-0"
          }`}
          src={images[currentImage]}
          alt="profile image"
          fill={true}
          onLoad={() =>
            setLoaded((prev) =>
              prev.map((flag, idx) => (idx === currentImage ? true : flag))
            )
          }
        ></Image>
      )}
      {images.length > 1 && (
        <>
          <Button
            classes="left-2 -rotate-90"
            onClick={() => setCurrentImage((prev) => prev - 1)}
            disabled={currentImage === 0}
          >
            <PrevIcon />
          </Button>
          <Button
            classes="right-2 rotate-90"
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
      className={`absolute shadow top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-(--foreground) text-(--background) cursor-pointer opacity-70 hover:bg-slate-200 disabled:opacity-0 ${classes}`}
    >
      {children}
    </button>
  );
}
