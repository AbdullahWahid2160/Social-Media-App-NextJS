import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Interactify",
  description: "A multiverse social media platform.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#1f6892] to-[#678197]">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
