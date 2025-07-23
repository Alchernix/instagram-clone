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

  try {
    await prisma.comment.create({
      data: {
        authorId,
        content,
        postId,
      },
    });
  } catch (error) {
    console.error("Failed to create comment.");
    throw new Error("Failed to create comment.");
  }
  revalidatePath(`/posts/${postId}`);
  return { success: true };
}
