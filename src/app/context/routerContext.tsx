"use client";
import { createContext, useContext } from "react";
import { useRouter } from "next/navigation";
import {
  RouterContextType,
  RouterProviderProps,
} from "@/interfaces/interfaces";

// Define the type for the router context

export const RouterContext = createContext<RouterContextType | undefined>(
  undefined
);

export function useRouterContext() {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error("useRouterContext must be used within a RouterProvider");
  }
  return context;
}

export function RouterProvider({ children }: RouterProviderProps) {
  const router = useRouter();
  return (
    <RouterContext.Provider value={{ router }}>
      {children}
    </RouterContext.Provider>
  );
}
