import SignInButton from "./button";
import { Metadata } from "next";
// import { redirect } from "next/navigation";
import { auth } from "auth";

// Deprecated
type Props = {
  searchParams: {
    callbackUrl: string;
  };
};

export const metadata: Metadata = {
  title: "Signin",
  description: "Signin or Login to follow",
};

async function getProviders() {
  const res = await fetch(`http://localhost:3000/api/auth/providers`);

  if (!res.ok) {
    throw new Error("Failed to fetch providers");
  }

  return res.json();
}

export default async function SignInPage({
  searchParams: { callbackUrl },
}: Props) {
  // 서버 상에서 session에 대한 정보를 가져온다.
  const session = await auth();

  //   console.log("epa", session);
  //   if (session) {
  //     redirect("/");
  //   }

  const providers = (await getProviders()) || {};

  // providers를 이용해  버튼을 구성해야하는데,
  // 버튼은 클릭이벤트가 발생해야한다 . 즉  클라이언트 컴포넌트이기때문에
  // 따로 정의해주자.

  //   if (!providers) {
  //     return null;
  //   }

  return (
    <section className="flex flex-col items-center  mt-24">
      <SignInButton providers={providers} callbackUrl={callbackUrl ?? "/"} />
    </section>
  );
}
