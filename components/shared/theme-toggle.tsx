"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";

export const ThemeToggle = () => {
  const { dark, toggle } = useTheme();

  return (
    <Button
      size="icon"
      className="size-11 bg-le-smoke rounded-full text-le-text hover:bg-le-smoke/80"
      onClick={toggle}
      aria-label="Toggle dark mode"
      aria-pressed={dark}
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {dark ? (
        <Moon className="size-[18px]" />
      ) : (
        <Sun className="size-[18px]" />
      )}
    </Button>
  );
};
