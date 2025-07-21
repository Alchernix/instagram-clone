import { prisma } from "@/server/db";

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
