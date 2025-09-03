"use client";

import { useEffect, useState, type ReactNode } from "react";
import { ThemeContext } from "@/lib/theme-context";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  // hydrate from localStorage, avoid mismatch
  useEffect(() => {
    const stored =
      typeof window !== "undefined" &&
      localStorage.getItem("dark-mode") === "true";
    setDark(stored);
    document.documentElement.classList.toggle("dark", stored);
    setMounted(true);
  }, []);

  const toggle = () => {
    setDark((prev) => {
      const next = !prev;
      if (typeof window !== "undefined") {
        localStorage.setItem("dark-mode", String(next));
        document.documentElement.classList.toggle("dark", next);
      }
      return next;
    });
  };

  // Prevent UI flash until theme is known
  if (!mounted) {
    return <div style={{ visibility: "hidden" }}>{children}</div>;
  }

  return (
    <ThemeContext.Provider value={{ dark, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
