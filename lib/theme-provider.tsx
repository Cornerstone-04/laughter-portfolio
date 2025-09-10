"use client";

import { useState, type ReactNode } from "react";
import { ThemeContext } from "@/lib/theme-context";

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Initialize from the SSR-applied class on <html>.
  const [dark, setDark] = useState<boolean>(() => {
    if (typeof document === "undefined") return false; // SSR fallback
    return document.documentElement.classList.contains("dark");
  });

  const toggle = () => {
    const next = !dark;
    setDark(next);
    try {
      localStorage.setItem("dark-mode", String(next));
    } catch {}
    document.documentElement.classList.toggle("dark", next);
  };

  return (
    <ThemeContext.Provider value={{ dark, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
