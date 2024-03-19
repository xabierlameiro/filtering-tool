import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
//import Linkedin from "next-auth/providers/linkedin"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth((req) => {
  if (req) {
    //  console.log(req)
  }
  return {
    theme: {
      logo: "https://next-auth.js.org/img/logo/logo-sm.png",
    },
    providers: [Google],
    debug: false,
    callbacks: {
      authorized({ auth, request: { nextUrl } }: any) {
        console.log("auth user", auth?.user);
        const isLoggedIn = !!auth?.user;
        const isOnDashboard = nextUrl.pathname.startsWith("/");
        if (isOnDashboard) {
          if (isLoggedIn) return true;
          return false; // Redirect unauthenticated users to login page
        } else if (isLoggedIn) {
          return Response.redirect(new URL("/dashboard", nextUrl));
        }
        return true;
      },
    },
  };
});
