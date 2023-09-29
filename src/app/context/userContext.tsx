"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { UserContextProps } from "@/interfaces/interfaces";

const UserContext = createContext<UserContextProps | undefined>(undefined);

export function useUser() {
  const context = useContext(UserContext);
  console.log("Context: ", context);
  if (!context) {
    throw new Error("useUser must be used within a UserContextProvider");
  }
  return context;
}

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState<string>("");
  const router = useRouter();

  async function signIn(email: string, password: string) {
    try {
      const response = await axios.post("api/auth/login", {
        email,
        password,
      });

      if (response.status === 200) {
        console.log("Login successful in context:", response.data.user.id);
        setUserId(response.data.user.id);
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

  return (
    <UserContext.Provider value={{ userId, signIn, signOut }}>
      {children}
    </UserContext.Provider>
  );
}
