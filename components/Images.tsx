import Image from "next/image";

type ProfileImgProps = {
  url: string;
  size: number;
};

export function ProfileImg({ url, size }: ProfileImgProps) {
  return (
    <div className={`w-[${size}px] aspect-square rounded-full relative`}>
      <Image
        className="w-full h-full object-cover"
        src={url}
        alt="profile image"
      ></Image>
    </div>
  );
}
