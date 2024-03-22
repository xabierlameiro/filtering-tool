import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "This is a test page",
  description: "This is a test page",
};

export default function TestLayout({
  children,
  ...props
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
