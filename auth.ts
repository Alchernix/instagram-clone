import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import bcrypt from "bcrypt";
import { getUserByHandle } from "@/server/actions/user";

// declare module "next-auth" {
//   interface User {
//     // NextAuth 기본 User의 id: string → number 로 재정의
//     id: number;
//     // (필요하다면 email, name, image 등도 재선언)
//   }
// }

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ handle: z.string(), password: z.string() })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { handle, password } = parsedCredentials.data;
          const user = await getUserByHandle(handle);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
          const newUser = {
            ...user,
            id: user.id.toString(),
          }; // string으로 바꿔서 처리
          if (passwordsMatch) return newUser;
        }
        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
});
