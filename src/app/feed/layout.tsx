import type { Metadata } from "next";
import { Inter } from "next/font/google";
import FeedNavBar from "../components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Interactify",
  description: "A multiverse social media platform.",
};

export default function FeedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col mx-auto">
      <FeedNavBar />
      {children}
    </div>
    // <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#1f6892] to-[#678197]">
    //   {children}
    // </div>
  );
}
