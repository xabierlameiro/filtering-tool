import type { Metadata } from "next";
import NavBar from "../_components/nav";

export const metadata: Metadata = {
  title: "This is a new candidate page",
  description: "This is a new candidate page",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}
