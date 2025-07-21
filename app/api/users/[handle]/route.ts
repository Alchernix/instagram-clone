// app/api/users/[handle]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/server/db";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ handle: string }> }
) {
  const handle = (await params).handle;
  const user = await prisma.user.findUnique({
    where: { handle },
  });
  if (!user) {
    return NextResponse.error();
  }
  return NextResponse.json(user);
}
