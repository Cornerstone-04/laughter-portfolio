"use client";

import { Button } from "@/components/ui/button";
import { Film, Home } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-80px)] w-full items-center justify-center p-6 sm:p-8 md:p-16 dark:bg-[#15151E]">
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-8 text-center">
        {/* Animated Film Strip Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative"
        >
          <motion.div
            animate={{
              rotate: [0, -5, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1,
              ease: "easeInOut",
            }}
          >
            <Film
              className="h-20 w-20 text-[#4F46E5] sm:h-24 sm:w-24 md:h-28 md:w-28 dark:text-[#6366F1]"
              strokeWidth={1.5}
            />
          </motion.div>

          {/* Decorative dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-2 -right-2 h-3 w-3 rounded-full bg-[#FF2626]"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="absolute -bottom-2 -left-2 h-3 w-3 rounded-full bg-[#9D98F5]"
          />
        </motion.div>

        {/* 404 Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col gap-4"
        >
          <h1 className="text-7xl font-semibold tracking-tight text-[#2A2936] sm:text-8xl md:text-9xl dark:text-white">
            404
          </h1>
          <div className="mx-auto h-1 w-24 rounded-full bg-linear-to-r from-[#4F46E5] to-[#9D98F5]" />
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col gap-3"
        >
          <h2 className="text-2xl font-semibold tracking-tight text-[#2A2936] sm:text-3xl md:text-4xl dark:text-white">
            Scene Not Found
          </h2>
          <p className="mx-auto max-w-md text-base leading-relaxed text-[#454545] sm:text-lg md:text-xl dark:text-[#cacaca]">
            Looks like this frame didn&apos;t make the final cut. Let&apos;s get
            you back on track.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-4 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:gap-4"
        >
          <Button
            asChild
            variant="primary"
            className="flex h-12 w-full items-center justify-center gap-2.5 px-6 py-3 text-base sm:h-14 sm:w-fit sm:px-8 sm:py-4"
          >
            <Link href="/">
              <Home className="h-5 w-5" />
              Back to Home
            </Link>
          </Button>

          <Button
            asChild
            variant="secondary"
            className="flex h-12 w-full items-center justify-center gap-2.5 px-6 py-3 text-base sm:h-14 sm:w-fit sm:px-8 sm:py-4"
          >
            <Link href="/works">
              <Film className="h-5 w-5" />
              View Works
            </Link>
          </Button>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="w-full border-t border-[#e5e5ea] pt-8 dark:border-[#303036]"
        >
          <p className="mb-4 text-sm text-[#706F7C]">
            Quick links you might be looking for:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <Link
              href="/#about-laughter"
              className="font-medium text-[#4F46E5] transition-colors hover:text-[#3730A3] dark:text-[#9D98F5] dark:hover:text-[#6366F1]"
            >
              About
            </Link>
            <span className="text-[#e5e5ea] dark:text-[#303036]">•</span>
            <Link
              href="/#selected-works"
              className="font-medium text-[#4F46E5] transition-colors hover:text-[#3730A3] dark:text-[#9D98F5] dark:hover:text-[#6366F1]"
            >
              Selected Works
            </Link>
            <span className="text-[#e5e5ea] dark:text-[#303036]">•</span>
            <Link
              href="/#testimonials"
              className="font-medium text-[#4F46E5] transition-colors hover:text-[#3730A3] dark:text-[#9D98F5] dark:hover:text-[#6366F1]"
            >
              Testimonials
            </Link>
            <span className="text-[#e5e5ea] dark:text-[#303036]">•</span>
            <Link
              href="/#contact-me"
              className="font-medium text-[#4F46E5] transition-colors hover:text-[#3730A3] dark:text-[#9D98F5] dark:hover:text-[#6366F1]"
            >
              Contact
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
