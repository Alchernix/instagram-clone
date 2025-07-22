"use client";
import { ProfileImg } from "@/components/Images";
import { Button } from "@/components/accounts/SignInForm";
import { Input } from "@/components/accounts/EditComponents";
import type { User } from "@/app/generated/prisma";
import { useState } from "react";
import { FormSchema } from "@/lib/user/schema";
import { useActionState, useRef } from "react";
import { CameraIcon } from "../Icons";
import { CldUploadWidget } from "next-cloudinary";

interface FormProps {
  currentUser: User;
  action: (prevState: {}, formData: FormData) => Promise<void>;
}

export default function Form({ currentUser, action }: FormProps) {
  const initialValue = {
    handle: currentUser.handle,
    name: currentUser.name,
    bio: currentUser.bio,
    website: currentUser.website,
  };
  const [enteredValues, setEnteredValues] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({
    handle: "",
    name: "",
    bio: "",
    website: "",
  });
  const [prevState, formAction, isPending] = useActionState<{}, FormData>(
    action,
    {}
  );

  async function handleBlur(field: "handle" | "name" | "website") {
    const schema = FormSchema.pick({ [field]: true });
    const payload = { [field]: enteredValues[field] };
    const result = schema.safeParse(payload);
    if (!result.success) {
      setErrors({
        ...errors,
        [field]: result.error.flatten().fieldErrors[field]?.[0] || "",
      });
      return;
    } else {
      setErrors({ ...errors, [field]: "" });
    }
    if (field === "handle" && enteredValues.handle !== initialValue.handle) {
      try {
        const res = await fetch(`/api/users/${enteredValues.handle}`);
        if (!res.ok) throw new Error("Not found");
        const user = await res.json();
        setErrors((e) => ({ ...e, handle: "이미 사용 중인 아이디입니다." }));
      } catch {
        setErrors((e) => ({ ...e, handle: "" }));
      }
    }
  }

  const hasErrors = Object.values(errors).some((msg) => Boolean(msg));
  const isSubmitDisabled = isPending || isEditing || hasErrors;

  const uploadRef = useRef<HTMLButtonElement | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState("");

  function handleSuccess(results: any) {
    setUploadedUrl(results.info.url);
  }

  return (
    <form
      action={formAction}
      className="flex flex-col gap-7 w-full self-center text-base"
    >
      <div className="relative w-[150px] self-center">
        <ProfileImg url={uploadedUrl || currentUser.profileImg} size={150} />
        <div
          className="absolute top-25 left-25 bg-(--foreground) rounded-full overflow-hidden cursor-pointer hover:bg-slate-200"
          // @ts-ignore
          onClick={() => uploadRef.current?.()}
        >
          <CameraIcon />
        </div>
        <CldUploadWidget
          uploadPreset="w38siez2"
          options={{
            cropping: true,
            multiple: false,
            croppingAspectRatio: 1,
            showSkipCropButton: false,
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
      <Input
        name="handle"
        type="text"
        label="아이디"
        value={enteredValues.handle}
        onChange={(e) => {
          setIsEditing(true);
          setEnteredValues({ ...enteredValues, handle: e.target.value });
        }}
        onBlur={() => {
          setIsEditing(false);
          handleBlur("handle");
        }}
        error={!isEditing ? errors.handle : ""}
      />
      <Input
        name="name"
        type="text"
        label="이름"
        value={enteredValues.name}
        onChange={(e) => {
          setIsEditing(true);
          setEnteredValues({ ...enteredValues, name: e.target.value });
        }}
        onBlur={() => {
          setIsEditing(false);
          handleBlur("name");
        }}
        error={!isEditing ? errors.name : ""}
      />
      <Input
        name="bio"
        type="textarea"
        label="소개"
        value={enteredValues.bio || ""}
        onChange={(e) => {
          setIsEditing(true);
          setEnteredValues({ ...enteredValues, bio: e.target.value });
        }}
        onBlur={() => {
          setIsEditing(false);
        }}
        error={!isEditing ? errors.bio : ""}
      />
      <Input
        name="website"
        type="text"
        label="웹사이트"
        value={enteredValues.website || ""}
        onChange={(e) => {
          setIsEditing(true);
          setEnteredValues({ ...enteredValues, website: e.target.value });
        }}
        onBlur={() => {
          setIsEditing(false);
          handleBlur("website");
        }}
        error={!isEditing ? errors.website : ""}
      />
      <input type="hidden" name="profileImg" value={uploadedUrl} />
      <Button disabled={isSubmitDisabled}>제출</Button>
    </form>
  );
}
