"use server";

import { prisma } from "@/server/db";
import type { User } from "@/app/generated/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function getUserByHandle(handle: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { handle },
    });
    return user;
  } catch (error) {
    console.error("Failed to fetch user");
    throw new Error("Failed to fetch user.");
  }
}

export async function getUserById(id: number) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user;
  } catch (error) {
    console.error("Failed to fetch user");
    throw new Error("Failed to fetch user.");
  }
}

export async function updateUser(id: number, data: User) {
  try {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data,
    });
    return user;
  } catch (error) {
    console.error("Failed to update user");
    throw new Error("Failed to update user.");
  }
}

export async function updateUserAction(prevState: {}, formData: FormData) {
  const session = await auth();
  const id = Number(session?.user?.id);
  const handle = formData.get("handle")?.toString()!;
  const name = formData.get("name")?.toString()!;
  const bio = formData.get("bio")?.toString() || "";
  const website = formData.get("website")?.toString() || "";
  const profileImg = formData.get("profileImg")?.toString() || "";
  console.log(profileImg);

  const user = await getUserById(id);
  const newUser = {
    ...user,
    id,
    handle,
    name,
    bio,
    website,
  } as User;

  if (profileImg) {
    newUser.profileImg = profileImg;
  }

  await updateUser(Number(id), newUser);
  redirect(`/${handle}`);
}
