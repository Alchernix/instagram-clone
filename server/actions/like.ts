"use server";

import { Like } from "@/app/generated/prisma";
import { prisma } from "@/server/db";
import { revalidatePath } from "next/cache";

export async function createLike(formData: FormData) {
  // const data = Object.fromEntries(formData.entries());
  const userId = Number(formData.get("userId"));
  const targetUserId = Number(formData.get("targetUserId"));
  const postId = Number(formData.get("postId")) || null;
  const commentId = Number(formData.get("commentId")) || null;
  try {
    const like = await prisma.like.create({
      data: {
        userId,
        targetUserId,
        postId,
        commentId,
      },
    });
    return like.id;
  } catch (error) {
    console.error("Failed to create like.");
    throw new Error("Failed to create like.");
  }
}

export async function deleteLike(formData: FormData) {
  const id = Number(formData.get("likeId"));
  try {
    await prisma.like.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error("Failed to delete like.");
    throw new Error("Failed to delete like.");
  }
}
