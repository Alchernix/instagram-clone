"use client";
import { useState } from "react";
import Image from "next/image";

export default function PostCard({ url }: { url: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`w-full aspect-square overflow-hidden relative`}>
      {!loaded && (
        <div className="bg-(--loading) absolute inset-0 animate-pulse"></div>
      )}
      <Image
        className={`w-full h-full object-cover ${loaded ? "" : "opacity-0"}`}
        src={url}
        alt="img"
        fill={true}
        onLoadingComplete={() => setLoaded(true)}
      />
    </div>
  );
}
