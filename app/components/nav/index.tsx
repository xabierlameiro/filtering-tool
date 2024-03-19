import Link from "next/link";
import { auth, signIn, signOut } from "../../auth";
import Image from "next/image";

function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button type="submit">Sign Out</button>
    </form>
  );
}

function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn();
      }}
    >
      <button type="submit">Sign In</button>
    </form>
  );
}

const NavBar = async () => {
  const session = await auth();
  return (
    <nav>
      {session ? (
        <>
          <Link href="/">Home</Link>
          <Link href="/dashboard">Dashboard</Link>
          {session.user?.image && (
            <Image
              src={session.user.image}
              alt="user image"
              width="50"
              height="50"
            />
          )}
          <SignOut />
        </>
      ) : (
        <SignIn />
      )}
    </nav>
  );
};

export default NavBar;
