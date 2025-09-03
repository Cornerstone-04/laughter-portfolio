"use client";

import { ThemeContext } from "@/lib/theme-context";
import { useContext } from "react";

export const useTheme = () => useContext(ThemeContext);
