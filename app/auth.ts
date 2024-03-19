import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
//import Linkedin from "next-auth/providers/linkedin"
import { sql } from "@vercel/postgres";

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
    events: {
      signIn: async ({ user, account }) => {
        try {
          // check if user exists
          const { rows } =
            await sql`SELECT * FROM users WHERE email = ${user.email}`;
          if (!rows.length) {
            // create user if not exists
            await sql`INSERT INTO users
            (id, name, email, image, provider, create_at)
            VALUES (${user.id}, ${user.name}, ${user.email}, ${user.image}, ${account?.provider}, ${new Date().toISOString()})`;
          }
        } catch (error) {
          console.log(error);
        }
      },
    },
  };
});
