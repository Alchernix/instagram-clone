import type { DefaultSession, NextAuthConfig } from "next-auth";

// declare module "next-auth" {
//   interface Session extends DefaultSession {
//     user: DefaultSession["user"] & {
//       id: number;
//     };
//   }
// }

export const authConfig = {
  pages: {
    signIn: "/accounts/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnProtectedPage =
        nextUrl.pathname === "/" || nextUrl.pathname === "/accounts/edit";
      const isOnLoginPage =
        nextUrl.pathname === "/accounts/login" ||
        nextUrl.pathname === "/accounts/signup";
      if (isOnProtectedPage) {
        if (isLoggedIn) return true;
        return false; // 로그인 페이지로
      } else if (isOnLoginPage) {
        if (!isLoggedIn) return true;
        return Response.redirect(new URL("/", nextUrl));
      }
      return true;
    },
    async session({ session, token, user }) {
      session.user.id = token.sub || "";
      return session;
    },
    // async jwt({ token, user, account }) {
    //   if (user) {
    //     console.log(user);
    //   }
    //   return token;
    // },
  },
  providers: [],
} satisfies NextAuthConfig;
