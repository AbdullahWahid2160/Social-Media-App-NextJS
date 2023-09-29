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
    <div className="flex flex-col mx-auto mt-0">
      <FeedNavBar />
      {children}
    </div>
  );
}
