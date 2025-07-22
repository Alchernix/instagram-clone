"use client";
import Image from "next/image";
import { useState } from "react";

type ProfileImgProps = {
  url: string;
  size: number;
};

export function ProfileImg({ url, size }: ProfileImgProps) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div
      className={`w-[${size}px] max-w-[${size}px] aspect-square rounded-full overflow-hidden relative`}
    >
      {!loaded && (
        <div>
          <div className="bg-(--loading) absolute inset-0 animate-pulse"></div>
        </div>
      )}
      <Image
        className={`w-full h-full object-cover ${loaded ? "" : "opacity-0"}`}
        src={url}
        alt="profile image"
        width={size}
        height={size}
        onLoadingComplete={() => setLoaded(true)}
      ></Image>
    </div>
  );
}
