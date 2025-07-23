"use server";
import { prisma } from "@/server/db";
import { revalidatePath } from "next/cache";
import type { Comment } from "@/app/generated/prisma";

export async function createCommentAction(
  prevState: { success: boolean },
  formData: FormData
) {
  const content = formData.get("content")?.toString()!;
  const authorId = Number(formData.get("author")?.toString())!;
  const postId = Number(formData.get("postId")?.toString());
  const parentId = formData.get("parentId")
    ? Number(formData.get("parentId")?.toString())
    : null;

  try {
    await prisma.comment.create({
      data: {
        authorId,
        content,
        postId,
        parentId,
      },
    });
  } catch (error) {
    console.error("Failed to create comment.");
    throw new Error("Failed to create comment.");
  }
  revalidatePath(`/posts/${postId}`);
  return { success: true };
}
