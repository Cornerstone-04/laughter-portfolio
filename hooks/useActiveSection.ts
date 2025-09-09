"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";

export function useActiveSection(defaultHash = "#home") {
  const pathname = usePathname();
  const [activeHash, setActiveHash] = useState<string>(defaultHash);

  const readHash = useCallback(() => {
    if (typeof window === "undefined") return;
    const h = window.location.hash || defaultHash;
    setActiveHash(h);
  }, [defaultHash]);

  // On mount & whenever pathname changes (e.g., from /works -> /)
  useEffect(() => {
    readHash();
  }, [pathname, readHash]);

  // Respond to in-page hash changes (back/forward, hash-only nav)
  useEffect(() => {
    const onHash = () => readHash();
    window.addEventListener("hashchange", onHash);
    window.addEventListener("popstate", onHash);
    return () => {
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener("popstate", onHash);
    };
  }, [readHash]);

  // Call this when clicking a link so UI updates immediately
  const setActiveFromHref = useCallback((href: string) => {
    // normalize "/#about" -> "#about"
    const hash = href.startsWith("/#") ? href.slice(1) : href;
    setActiveHash(hash);
  }, []);

  return { activeHash, setActiveFromHref };
}