"use client";
// Deprecated
import { BuiltInProviderType } from "next-auth/providers/index";
import { LiteralUnion, signIn } from "next-auth/react";

type Props = {
  providers: Record<LiteralUnion<BuiltInProviderType, string>, any> | {};
  callbackUrl: string;
};

export default function SignInButton({ providers, callbackUrl }: Props) {
  return (
    <ul className="flex flex-col gap-4">
      {Object.values(providers).map(({ name, id }) => (
        <li key={name}>
          <button
            onClick={() => signIn(id, { callbackUrl }, { prompt: "login" })}
          >
            click here
          </button>
        </li>
      ))}
    </ul>
  );
}
