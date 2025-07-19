"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
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
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export type State = {
  errors?: {
    handle?: string[];
    name?: string[];
    password?: string[];
  };
  message?: string | null;
};

const FormSchema = z.object({
  handle: z
    .string()
    .trim()
    .nonempty({ message: "사용자 아이디를 입력해 주세요" }),
  name: z.string().trim().nonempty({ message: "사용자 이름을 입력해 주세요." }),
  password: z
    .string()
    .trim()
    .min(4, { message: "4자 이상의 비밀번호를 만드세요." }),
});

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
}
