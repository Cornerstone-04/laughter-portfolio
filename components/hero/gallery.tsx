"use client";
import rawGallery from "@/data/gallery.json";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Play } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import type { GalleryItem } from "@/sanity/lib/portfolio-data";

type Props = {
  items?: GalleryItem[];
};

export const Gallery = ({ items }: Props) => {
  const galleryItems = items?.length ? items : (rawGallery as GalleryItem[]);

  // Start with the first item
  const [currentIndex, setCurrentIndex] = useState(0);

  // Autoplay controls
  const [autoplay, setAutoplay] = useState(true);
  const resumeTimerRef = useRef<number | null>(null);

  // Track direction for animations
  const dirRef = useRef<1 | -1>(1);

  const INTERVAL_MS = 2500;
  const RESUME_AFTER_MS = 3000;

  const total = galleryItems.length;

  const goToSlide = useCallback(
    (index: number) => {
      const next = (index + total) % total;
      // Determine direction
      dirRef.current =
        next > currentIndex || (currentIndex === total - 1 && next === 0)
          ? 1
          : -1;
      setCurrentIndex(next);
      pauseThenScheduleResume();
    },
    [currentIndex, total],
  );

  const goNext = useCallback(() => {
    dirRef.current = 1;
    setCurrentIndex((i) => (i + 1) % total);
    pauseThenScheduleResume();
  }, [total]);

  const goPrev = useCallback(() => {
    dirRef.current = -1;
    setCurrentIndex((i) => (i - 1 + total) % total);
    pauseThenScheduleResume();
  }, [total]);

  // Pause autoplay immediately, then schedule resume
  const pauseThenScheduleResume = () => {
    setAutoplay(false);
    if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = window.setTimeout(() => {
      setAutoplay(true);
    }, RESUME_AFTER_MS);
  };

  // Hover/focus pause/resume (desktop)
  const handleMouseEnter = () => setAutoplay(false);
  const handleMouseLeave = () => setAutoplay(true);
  const handleFocus = () => setAutoplay(false);
  const handleBlur = () => setAutoplay(true);

  // Autoplay effect
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Respect reduced motion
    const prefersReduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    if (!autoplay) return;

    const tick = () => {
      dirRef.current = 1; // Always go forward on autoplay
      setCurrentIndex((i) => (i + 1) % total);
    };

    const id = window.setInterval(tick, INTERVAL_MS);

    // Pause when tab is hidden
    const onVisibility = () => {
      if (document.hidden) {
        window.clearInterval(id);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [autoplay, total]);

  // Cleanup resume timer on unmount
  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    };
  }, []);

  const currentItem = galleryItems[currentIndex];
  const leftItem = galleryItems[(currentIndex - 1 + total) % total];
  const rightItem = galleryItems[(currentIndex + 1) % total];

  const renderMediaContent = (item: GalleryItem, isMain = false) => {
    const srcToUse = item.poster || item.thumbnail || item.src;

    if (item.type === "video") {
      return (
        <div className="group relative h-full w-full">
          <Image
            src={srcToUse}
            alt={item.alt}
            width={1600}
            height={900}
            className="h-full w-full object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 60vw, 33vw"
            priority={isMain}
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-[#FF2626]/60 shadow-lg transition-colors hover:bg-red-600">
              <Play className="ml-1 h-8 w-8 text-white" fill="currentColor" />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <Image
          src={isMain ? item.src : (item.thumbnail ?? item.src)}
          alt={item.alt}
          width={1600}
          height={900}
          className="aspect-video h-full w-full object-cover object-center"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 60vw, 60vw"
          priority={isMain}
        />
      );
    }
  };

  return (
    <div
      className="mx-auto flex flex-col items-center justify-center gap-4"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {/* Header */}
      <div className="flex flex-col items-center gap-3.5 text-center">
        <h2 className="text-lg leading-normal font-semibold tracking-[-0.36px] text-[#706F7C]">
          My Gallery
        </h2>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2">
          {galleryItems.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-1.5 w-4 cursor-pointer rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "w-8 bg-[#4F46E5]"
                  : index === currentIndex + 1 ||
                      (currentIndex === total - 1 && index === 0)
                    ? "bg-[#9D98F5]"
                    : "bg-[#DBD9FF]"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Gallery Slider */}
      <div className="relative flex h-96 items-center justify-center gap-12 overflow-hidden px-6 py-9 md:h-150 md:px-0">
        {/* Left Side Panel */}
        <div
          className="hidden h-11/12 w-1/6 transform cursor-pointer overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105 md:block md:-translate-x-6 lg:-translate-x-10"
          onClick={goPrev}
        >
          <AnimatePresence mode="wait" initial={false} custom={dirRef.current}>
            <motion.div
              key={`left-${leftItem.id}`}
              custom={dirRef.current}
              initial={{ opacity: 0, x: -15 * dirRef.current }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 * dirRef.current }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative h-full w-full"
            >
              {renderMediaContent(leftItem)}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Main Content */}
        <div className="h-full w-full overflow-hidden rounded-2xl md:w-3/5">
          <AnimatePresence mode="wait" initial={false} custom={dirRef.current}>
            <motion.div
              key={`main-${currentItem.id}`}
              custom={dirRef.current}
              initial={{ opacity: 0, x: 25 * dirRef.current }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 * dirRef.current }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative h-full w-full"
            >
              {renderMediaContent(currentItem, true)}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Side Panel */}
        <div
          className="hidden h-11/12 w-1/6 transform cursor-pointer overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105 md:block md:translate-x-6 lg:translate-x-10"
          onClick={goNext}
        >
          <AnimatePresence mode="wait" initial={false} custom={dirRef.current}>
            <motion.div
              key={`right-${rightItem.id}`}
              custom={dirRef.current}
              initial={{ opacity: 0, x: 15 * dirRef.current }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 * dirRef.current }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative h-full w-full"
            >
              {renderMediaContent(rightItem)}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="flex justify-center gap-4 md:hidden">
        <button
          onClick={goPrev}
          className="rounded-lg bg-gray-200 px-6 py-2 transition-colors hover:bg-gray-300"
          aria-label="Previous"
        >
          <ArrowLeft />
        </button>
        <button
          onClick={goNext}
          className="rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700"
          aria-label="Next"
        >
          <ArrowRight />
        </button>
      </div>
    </div>
  );
};
