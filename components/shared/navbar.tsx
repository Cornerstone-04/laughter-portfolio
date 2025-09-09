"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

export function Navbar() {
  return (
    <nav className="w-full px-4 sm:px-8 lg:px-[120px] sticky top-0 z-50">
      <div className="w-full py-4">
        <div className="flex justify-between items-center px-3 py-2 bg-white dark:bg-[#1d1d1d] rounded-[41px]">
          {/* Left: Logo + Theme toggle */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/"
              className="font-semibold text-base sm:text-lg leading-none dark:text-le-smoke -tracking-[0.02em]"
            >
              EPHRAIM LAUGHTER
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex gap-8 items-center justify-end">
            <div className="flex gap-3 items-center font-medium text-[#534C57] dark:text-[#cacaca]">
              <Link
                href="/#home"
                className="hover:text-le-purple transition-all ease-linear"
              >
                Home
              </Link>
              <Link
                href="/#selected-works"
                className="hover:text-le-purple transition-all ease-linear"
              >
                Works
              </Link>
              <Link
                href="/#about-laughter"
                className="hover:text-le-purple transition-all ease-linear"
              >
                About
              </Link>
              <Link
                href="/#testimonials"
                className="hover:text-le-purple active:text-le-purple transition-all ease-linear"
              >
                Testimonials
              </Link>
            </div>
            <Button variant="primary" className="h-11 font-medium text-sm">
              <Link href="/#contact-me">Contact Me</Link>
            </Button>
          </div>

          {/* Mobile menu (shadcn Sheet) */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button
                  className="p-2 rounded-lg focus:outline-none"
                  aria-label="Open menu"
                >
                  <Menu size={22} className="dark:text-le-smoke" />
                </button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-full pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] p-4 flex justify-center items-center flex-col dark:bg-[#131316]"
                aria-label="Mobile navigation"
              >
                <nav className="mt-4 w-full flex flex-col items-center text-3xl gap-8">
                  <SheetClose asChild>
                    <Link
                      href="/#home"
                      className="block text-[#534C57] dark:text-[#cacaca] hover:text-le-purple transition-all ease-linear"
                    >
                      Home
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/#selected-works"
                      className="block text-[#534C57] dark:text-[#cacaca] hover:text-le-purple transition-all ease-linear"
                    >
                      Works
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/#about-laughter"
                      className="block text-[#534C57] dark:text-[#cacaca] hover:text-le-purple transition-all ease-linear"
                    >
                      About
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/#testimonials"
                      className="block text-[#534C57] dark:text-[#cacaca] hover:text-le-purple transition-all ease-linear"
                    >
                      Testimonials
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button
                      asChild
                      variant="primary"
                      className="w-full h-fit! font-medium text-2xl"
                    >
                      <Link href="/#contact-me">Contact Me</Link>
                    </Button>
                  </SheetClose>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
