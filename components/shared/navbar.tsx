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
  const [compact, setCompact] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const navItems = [
    { href: "/#home", label: "Home" },
    { href: "/#selected-works", label: "Works" },
    { href: "/#about-laughter", label: "About" },
    { href: "/#testimonials", label: "Testimonials" },
  ];

  useEffect(() => {
    const updateNavbar = () => {
      const openingSection = document.querySelector<HTMLElement>(
        "main section:first-of-type, main header:first-of-type",
      );
      const boundary = openingSection
        ? openingSection.offsetTop + openingSection.offsetHeight * 0.5
        : 160;

      setCompact(window.scrollY > Math.max(96, boundary));
    };

    updateNavbar();
    window.addEventListener("scroll", updateNavbar, { passive: true });
    window.addEventListener("resize", updateNavbar);

    return () => {
      window.removeEventListener("scroll", updateNavbar);
      window.removeEventListener("resize", updateNavbar);
    };
  }, []);

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
    <nav className="sticky top-0 z-50 w-full px-4 sm:px-8 lg:px-30">
      <div className="w-full py-4">
        <motion.div
          ref={mobileMenuRef}
          layout
          transition={{
            duration: shouldReduceMotion ? 0 : 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={`mx-auto flex items-center justify-between rounded-[41px] px-3 shadow-lg shadow-black/8 backdrop-blur-xl transition-[max-width,height,background-color,color,padding,box-shadow] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] dark:bg-[#1d1d1d] dark:shadow-black/30 ${
            compact
              ? "h-14 max-w-268 bg-white/92 shadow-xl shadow-black/12 dark:bg-[#1d1d1d]/92 dark:shadow-black/40"
              : "h-16 max-w-335 bg-white dark:bg-[#1d1d1d]"
          } ${shouldReduceMotion ? "transition-none" : ""}`}
        >
          {/* Left: Logo + Theme toggle */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/"
              className="text-base leading-none font-semibold tracking-[-0.02em] sm:text-lg dark:text-le-smoke"
              // optional: treat clicking logo as "Home"
              onClick={() => setActiveFromHref("/#home")}
            >
              EPHRAIM LAUGHTER
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden items-center justify-end gap-8 md:flex">
            <div className="flex items-center gap-3 font-medium text-[#534C57] dark:text-[#cacaca]">
              {navItems.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setActiveFromHref(href)}
                  className={`transition-all ease-linear ${
                    activeHash === href.replace("/", "")
                      ? "font-semibold text-le-purple"
                      : "text-[#534C57] hover:text-le-purple dark:text-[#cacaca]"
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
              className="h-11 text-sm font-medium"
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
          <div className="md:hidden">
            <button
              type="button"
              className="rounded-full p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-le-purple"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMobileMenuOpen((open) => !open)}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={mobileMenuOpen ? "close" : "open"}
                  initial={
                    shouldReduceMotion
                      ? false
                      : { opacity: 0, rotate: -45, scale: 0.85 }
                  }
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={
                    shouldReduceMotion
                      ? undefined
                      : { opacity: 0, rotate: 45, scale: 0.85 }
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
          </div>

          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                id="mobile-navigation"
                initial={
                  shouldReduceMotion
                    ? { opacity: 1 }
                    : {
                        opacity: 0,
                        transform: "translateY(-10px) scaleY(0.96)",
                      }
                }
                animate={{ opacity: 1, transform: "translateY(0) scaleY(1)" }}
                exit={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : {
                        opacity: 0,
                        transform: "translateY(-8px) scaleY(0.98)",
                      }
                }
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-[calc(100%+10px)] left-0 w-full origin-top overflow-hidden rounded-[28px] border border-black/5 bg-white p-2 shadow-xl shadow-black/10 md:hidden dark:border-white/10 dark:bg-[#1d1d1d] dark:shadow-black/30"
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
                        : { staggerChildren: 0.045, delayChildren: 0.05 },
                    },
                  }}
                >
                  {navItems.map(({ href, label }) => (
                    <motion.div
                      key={href}
                      variants={{
                        hidden: shouldReduceMotion
                          ? { opacity: 1 }
                          : { opacity: 0, y: -5 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                    >
                      <Link
                        href={href}
                        onClick={() => handleMobileLinkClick(href)}
                        className={`block rounded-2xl px-4 py-3 text-base font-medium transition-all ease-linear ${
                          activeHash === href.replace("/", "")
                            ? "bg-[#F0EEFF] text-le-purple dark:bg-white/10 dark:text-white"
                            : "text-[#534C57] hover:bg-[#F0EEFF] hover:text-le-purple dark:text-[#cacaca] dark:hover:bg-white/10 dark:hover:text-white"
                        }`}
                        aria-current={
                          activeHash === href.replace("/", "")
                            ? "page"
                            : undefined
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
                        : { opacity: 0, y: -5 },
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
        </motion.div>
      </div>
    </nav>
  );
}

export default Navbar;
