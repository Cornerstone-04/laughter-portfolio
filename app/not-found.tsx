"use client";

import { Button } from "@/components/ui/button";
import { Film, Home } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <main className="min-h-[calc(100vh-80px)] w-full flex items-center justify-center p-6 sm:p-8 md:p-16 dark:bg-[#15151E]">
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center text-center gap-8">
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
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 text-[#4F46E5] dark:text-[#6366F1]"
              strokeWidth={1.5}
            />
          </motion.div>

          {/* Decorative dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-2 -right-2 w-3 h-3 bg-[#FF2626] rounded-full"
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
            className="absolute -bottom-2 -left-2 w-3 h-3 bg-[#9D98F5] rounded-full"
          />
        </motion.div>

        {/* 404 Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col gap-4"
        >
          <h1 className="text-7xl sm:text-8xl md:text-9xl font-semibold tracking-tight text-[#2A2936] dark:text-white">
            404
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-[#4F46E5] to-[#9D98F5] rounded-full mx-auto" />
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col gap-3"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#2A2936] dark:text-white tracking-tight">
            Scene Not Found
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#454545] dark:text-[#cacaca] max-w-md mx-auto leading-relaxed">
            Looks like this frame didn&apos;t make the final cut. Let&apos;s get you back
            on track.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto mt-4"
        >
          <Button
            asChild
            variant="primary"
            className="h-12 sm:h-14 w-full sm:w-fit px-6 sm:px-8 py-3 sm:py-4 text-base flex items-center justify-center gap-2.5"
          >
            <Link href="/">
              <Home className="w-5 h-5" />
              Back to Home
            </Link>
          </Button>

          <Button
            asChild
            variant="secondary"
            className="h-12 sm:h-14 w-full sm:w-fit px-6 sm:px-8 py-3 sm:py-4 text-base flex items-center justify-center gap-2.5"
          >
            <Link href="/works">
              <Film className="w-5 h-5" />
              View Works
            </Link>
          </Button>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="pt-8 border-t border-[#e5e5ea] dark:border-[#303036] w-full"
        >
          <p className="text-sm text-[#706F7C] mb-4">
            Quick links you might be looking for:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <Link
              href="/#about-laughter"
              className="text-[#4F46E5] hover:text-[#3730A3] dark:text-[#9D98F5] dark:hover:text-[#6366F1] transition-colors font-medium"
            >
              About
            </Link>
            <span className="text-[#e5e5ea] dark:text-[#303036]">•</span>
            <Link
              href="/#selected-works"
              className="text-[#4F46E5] hover:text-[#3730A3] dark:text-[#9D98F5] dark:hover:text-[#6366F1] transition-colors font-medium"
            >
              Selected Works
            </Link>
            <span className="text-[#e5e5ea] dark:text-[#303036]">•</span>
            <Link
              href="/#testimonials"
              className="text-[#4F46E5] hover:text-[#3730A3] dark:text-[#9D98F5] dark:hover:text-[#6366F1] transition-colors font-medium"
            >
              Testimonials
            </Link>
            <span className="text-[#e5e5ea] dark:text-[#303036]">•</span>
            <Link
              href="/#contact-me"
              className="text-[#4F46E5] hover:text-[#3730A3] dark:text-[#9D98F5] dark:hover:text-[#6366F1] transition-colors font-medium"
            >
              Contact
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
