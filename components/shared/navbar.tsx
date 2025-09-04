"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full px-4 sm:px-8 lg:px-[120px] sticky top-0 z-50">
      <div className="w-full py-4">
        <div className="flex justify-between items-center px-3 py-2 bg-white dark:bg-[#1d1d1d] rounded-[41px]">
          {/* Left: Logo + Theme toggle */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="#home"
              className="font-semibold text-base sm:text-lg leading-none dark:text-le-smoke -tracking-[0.02em]"
            >
              EPHRAIM LAUGHTER
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex gap-8 items-center justify-end">
            <div className="flex gap-3 items-center font-medium text-[#534C57] dark:text-[#cacaca]">
              <Link href="/#home">Home</Link>
              <Link href="/#works">Works</Link>
              <Link href="/#about">About</Link>
              <Link href="/#testimonials">Testimonials</Link>
            </div>
            <Button variant="primary" className="h-11 font-medium text-sm">
              <Link href="/#contact-me">Contact Me</Link>
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div
            id="mobile-menu"
            className="mt-2 md:hidden bg-white dark:bg-[#1d1d1d] rounded-xl shadow-lg p-4 space-y-4"
          >
            <Link
              href="/"
              className="block text-[#534C57] dark:text-[#cacaca]"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/#works"
              className="block text-[#534C57] dark:text-[#cacaca]"
              onClick={() => setMenuOpen(false)}
            >
              Works
            </Link>
            <Link
              href="/about"
              className="block text-[#534C57] dark:text-[#cacaca]"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/#testimonials"
              className="block text-[#534C57] dark:text-[#cacaca]"
              onClick={() => setMenuOpen(false)}
            >
              Testimonials
            </Link>
            <Button
              variant="primary"
              className="w-full h-11 font-medium text-sm"
              onClick={() => setMenuOpen(false)}
            >
              Contact Me
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
