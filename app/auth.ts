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
    providers: [
      Google,
      // Linkedin
    ],
    debug: false,
  };
});
