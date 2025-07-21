"use client";
import { ProfileImg } from "@/components/Images";
import { Button } from "@/components/accounts/SignInForm";
import { Input } from "@/components/accounts/EditComponents";
import type { User } from "@/app/generated/prisma";

export default function Form({ currentUser }: { currentUser: User }) {
  return (
    <form className="flex flex-col gap-7 w-full self-center">
      <div className="w-[150px] self-center">
        <ProfileImg url={currentUser.profileImg} size={150} />
      </div>
      <Input name="id" type="text" label="아이디" />
      <Input name="name" type="text" label="이름" />
      <Input name="bio" type="textarea" label="소개" />
      <Input name="website" type="text" label="웹사이트" />
      <Button>제출</Button>
    </form>
  );
}
