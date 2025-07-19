import type { NextAuthConfig } from "next-auth";

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
  },
  providers: [],
} satisfies NextAuthConfig;
