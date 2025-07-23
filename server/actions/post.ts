"use server";

import { prisma } from "@/server/db";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export async function getPostsbyUserHandle(handle: string) {
  try {
    const result = await prisma.post.findMany({
      where: {
        author: {
          handle,
        },
      },
      include: {
        images: true,
      },
      orderBy: {
        id: "desc",
      },
    });
    return result;
  } catch (error) {
    console.error("Failed to get posts");
    throw new Error("Failed to get posts.");
  }
}

export async function getPostByPostId(id: number) {
  try {
    const result = await prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        images: true,
        author: true,
      },
    });
    return result;
  } catch (error) {
    console.error("Failed to get posts");
    throw new Error("Failed to get posts.");
  }
}

export async function createPostAction(prevState: {}, formData: FormData) {
  const session = await auth();
  const id = Number(session?.user?.id);
  const images =
    formData
      .get("images")
      ?.toString()
      .split(",")
      .map((image) => ({ url: image })) || [];
  const content = formData.get("content")?.toString() || "";

  try {
    await prisma.post.create({
      data: {
        authorId: id,
        content,
        images: {
          create: [...images],
        },
      },
    });
  } catch (error) {
    console.error("Failed to create post");
    throw new Error("Failed to create post.");
  }
  redirect("/");
}

export async function deletePostAction(formData: FormData) {
  const id = Number(formData.get("id"));
  const history = formData.get("history")?.toString();
  try {
    await prisma.post.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error("Failed to delete post");
    throw new Error("Failed to delete post.");
  }
  if (history) {
    redirect(history);
  }
}
