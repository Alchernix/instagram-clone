"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { prisma } from "@/lib/prisma";
import { FormSchema } from "./schema";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "잘못된 비밀번호입니다. 다시 확인하세요.";
        default:
          return "서버 에러 - 다시 시도해주세요.";
      }
    }
    throw error;
  }
}

export type State = {
  value?: {
    handle?: string;
    name?: string;
    password?: string;
  };
  errors?: {
    handle?: string[];
    name?: string[];
    password?: string[];
  };
  message?: string;
};

export async function signUp(prevState: State, formData: FormData) {
  const validatedFields = FormSchema.safeParse({
    handle: formData.get("handle"),
    name: formData.get("name"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { handle, name, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existing = await prisma.user.findUnique({
    where: { handle },
  });
  if (existing) {
    return {
      errors: { handle: ["이미 사용 중인 아이디입니다."] },
    };
  }

  try {
    await prisma.user.create({
      data: {
        handle,
        name,
        password: hashedPassword,
      },
    });
  } catch (error) {
    console.error(error);
    return {
      message: "Database Error",
    };
  }
  await signIn("credentials", formData); // 회원가입이 완료되면 로그인
  redirect("/");

  return prevState; // 에러 방지용
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
