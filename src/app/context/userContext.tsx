"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { User, UserContextProps } from "@/interfaces/interfaces";

const UserContext = createContext<UserContextProps | undefined>(undefined);

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserContextProvider");
  }
  return context;
}

export function UserContextProvider({
  children,
  user,
}: {
  children: ReactNode;
  user: string | undefined;
}) {
  const [userId, setUserId] = useState<string>(user ? user : "");
  const router = useRouter();

  async function signIn(email: string, password: string) {
    try {
      const response = await axios.post("api/auth/login", {
        email,
        password,
      });

      if (response.status === 200) {
        setUserId(response.data.user);
        router.push("/feed");
        // Handle successful login (e.g., redirect to a dashboard)
      } else {
        console.error("Login failed:", response.data.error);
        // Handle login failure (e.g., display an error message)
      }
    } catch (error) {
      console.error("Authentication error:", error);
    }
  }

  function signOut() {
    setUserId("");
  }

  // async function getUserProfile(userID: string) {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:3000/api/profile/${userID}`
  //     );

  //     if (response.status === 200) {
  //       return response.data;
  //     } else {
  //       console.error("Profile failed:", response.data.error);
  //     }
  //   } catch (error) {
  //     console.error("Unhandled error:", error);
  //   }
  // }

  return (
    <UserContext.Provider value={{ userId, signIn, signOut }}>
      {children}
    </UserContext.Provider>
  );
}
