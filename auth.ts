import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

declare module "next-auth" {
  interface User {
    // NextAuth 기본 User의 id: string → number 로 재정의
    id: number;
    // (필요하다면 email, name, image 등도 재선언)
  }
  interface Session {
    user: User;
  }
}

async function getUser(handle: string) {
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

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ handle: z.string(), password: z.string() })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { handle, password } = parsedCredentials.data;
          const user = await getUser(handle);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }
        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
});
