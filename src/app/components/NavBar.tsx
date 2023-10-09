"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useUser } from "../context/userContext";

export default function FeedNavBar() {
  const [isSticky, setIsSticky] = useState(false);
  const { userId } = useUser();

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY || currentScrollY < 120) {
        setIsSticky(false);
      } else {
        setIsSticky(true);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navClass = isSticky ? "sticky top-0" : "";

  return (
    <header
      className={`bg-blue-400 rounded item-center justify-center ${navClass}`}
    >
      <nav className="z-50 p-5 rounded text-center">
        <div className="container justify-center">
          <div className="flex items-center justify-evenly px-20">
            {/* Navigation Links */}
            <ul className="flex space-x-16">
              <li>
                <Link href="/feed">
                  <span className="text-black hover:text-blue-600">Feed</span>
                </Link>
              </li>
              <div className="border-l-2 px-4"></div>
              <li>
                <Link href={`/profile/${userId}`}>
                  <span className="text-black hover:text-blue-600">
                    Profile
                  </span>
                </Link>
              </li>
              <div className="border-l-2 px-4"></div>
              <li>
                <Link href="/messages">
                  <span className="text-black hover:text-blue-600">
                    Messages
                  </span>
                </Link>
              </li>
              {/* Add more navigation links here */}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
