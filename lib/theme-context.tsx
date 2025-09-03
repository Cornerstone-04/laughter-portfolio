"use client";

import { createContext } from "react";

export type ThemeContextType = {
  dark: boolean;
  toggle: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  dark: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggle: () => {},
});
