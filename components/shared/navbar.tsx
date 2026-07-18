"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { useActiveSection } from "@/hooks/useActiveSection";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

export function Navbar() {
  const { activeHash, setActiveFromHref } = useActiveSection("#home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const navItems = [
    { href: "/#home", label: "Home" },
    { href: "/#selected-works", label: "Works" },
    { href: "/#about-laughter", label: "About" },
    { href: "/#testimonials", label: "Testimonials" },
  ];

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!mobileMenuRef.current?.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const handleMobileLinkClick = (href: string) => {
    setActiveFromHref(href);
    setMobileMenuOpen(false);
  };

  return (
    // max-w-7xl mx-auto
    <nav className="w-full px-4 sm:px-8 lg:px-30 sticky top-0 z-50">
      <div className="w-full py-4">
        <div className="flex justify-between items-center px-3 py-2 bg-white dark:bg-[#1d1d1d] rounded-[41px]">
          {/* Left: Logo + Theme toggle */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/"
              className="font-semibold text-base sm:text-lg leading-none dark:text-le-smoke tracking-[-0.02em]"
              // optional: treat clicking logo as "Home"
              onClick={() => setActiveFromHref("/#home")}
            >
              EPHRAIM LAUGHTER
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex gap-8 items-center justify-end">
            <div className="flex gap-3 items-center font-medium text-[#534C57] dark:text-[#cacaca]">
              {navItems.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setActiveFromHref(href)}
                  className={`transition-all ease-linear ${
                    activeHash === href.replace("/", "")
                      ? "text-le-purple font-semibold"
                      : "text-[#534C57] dark:text-[#cacaca] hover:text-le-purple"
                  }`}
                  aria-current={
                    activeHash === href.replace("/", "") ? "page" : undefined
                  }
                >
                  {label}
                </Link>
              ))}
            </div>
            <Button
              variant="primary"
              className="h-11 font-medium text-sm"
              asChild
            >
              <Link
                href="/#contact-me"
                onClick={() => setActiveFromHref("/#contact-me")}
              >
                Contact Me
              </Link>
            </Button>
          </div>

          {/* Mobile menu */}
          <div className="relative md:hidden" ref={mobileMenuRef}>
            <button
              type="button"
              className="p-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-le-purple"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMobileMenuOpen((open) => !open)}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={mobileMenuOpen ? "close" : "open"}
                  initial={
                    shouldReduceMotion ? false : { opacity: 0, rotate: -45, scale: 0.85 }
                  }
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={
                    shouldReduceMotion ? undefined : { opacity: 0, rotate: 45, scale: 0.85 }
                  }
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="flex"
                >
                  {mobileMenuOpen ? (
                    <X size={22} className="dark:text-le-smoke" />
                  ) : (
                    <Menu size={22} className="dark:text-le-smoke" />
                  )}
                </motion.span>
              </AnimatePresence>
            </button>

            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  id="mobile-navigation"
                  initial={
                    shouldReduceMotion
                      ? { opacity: 1 }
                      : { opacity: 0, y: -8, scale: 0.96 }
                  }
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={
                    shouldReduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: -6, scale: 0.98 }
                  }
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute right-0 top-[calc(100%+12px)] w-[min(17rem,calc(100vw-2rem))] origin-top-right overflow-hidden rounded-2xl border border-black/5 bg-white p-2 shadow-xl shadow-black/10 dark:border-white/10 dark:bg-[#1d1d1d] dark:shadow-black/30"
                >
                  <motion.nav
                    className="flex flex-col gap-1"
                    aria-label="Mobile navigation"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={{
                      hidden: {},
                      visible: {
                        transition: shouldReduceMotion
                          ? { staggerChildren: 0 }
                          : { staggerChildren: 0.045, delayChildren: 0.04 },
                      },
                    }}
                  >
                    {navItems.map(({ href, label }) => (
                      <motion.div
                        key={href}
                        variants={{
                          hidden: shouldReduceMotion
                            ? { opacity: 1 }
                            : { opacity: 0, y: -4 },
                          visible: { opacity: 1, y: 0 },
                        }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                      >
                        <Link
                          href={href}
                          onClick={() => handleMobileLinkClick(href)}
                          className={`block rounded-xl px-4 py-3 text-base font-medium transition-all ease-linear ${
                            activeHash === href.replace("/", "")
                              ? "bg-[#F0EEFF] text-le-purple dark:bg-white/10 dark:text-white"
                              : "text-[#534C57] hover:bg-[#F0EEFF] hover:text-le-purple dark:text-[#cacaca] dark:hover:bg-white/10 dark:hover:text-white"
                          }`}
                          aria-current={
                            activeHash === href.replace("/", "") ? "page" : undefined
                          }
                        >
                          {label}
                        </Link>
                      </motion.div>
                    ))}

                    <motion.div
                      variants={{
                        hidden: shouldReduceMotion
                          ? { opacity: 1 }
                          : { opacity: 0, y: -4 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                    >
                      <Button
                        asChild
                        variant="primary"
                        className="mt-1 h-12 w-full justify-center font-medium"
                      >
                        <Link
                          href="/#contact-me"
                          onClick={() => handleMobileLinkClick("/#contact-me")}
                        >
                          Contact Me
                        </Link>
                      </Button>
                    </motion.div>
                  </motion.nav>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
