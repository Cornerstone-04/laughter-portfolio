"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";
import { useTheme } from "@/hooks/useTheme";

export function ThemeToggle() {
  const { dark, toggle } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <Button
      size="icon"
      className="size-11 rounded-full bg-le-smoke text-le-text hover:bg-le-smoke/80"
      onClick={toggle}
      // Avoid hydration warnings on attributes that change after mount
      suppressHydrationWarning
      aria-label="Toggle dark mode"
      aria-pressed={mounted ? dark : undefined}
      title={
        mounted
          ? dark
            ? "Switch to light mode"
            : "Switch to dark mode"
          : "Toggle theme"
      }
    >
      {mounted ? (
        dark ? (
          <Sun className="size-4.5" />
        ) : (
          <Moon className="size-4.5" />
        )
      ) : (
        // SSR-safe placeholder to preserve button size & layout
        <span className="block h-4.5 w-4.5" aria-hidden />
      )}
    </Button>
  );
}
