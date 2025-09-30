"use client";
import rawGallery from "@/data/gallery.json";
import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Play } from "lucide-react";
import Image from "next/image";

type GalleryItems = {
  id: number;
  type: "image" | "video";
  src: string;
  alt: string;
  thumbnail?: string;
  poster?: string;
};

export const Gallery = () => {
  const galleryItems = rawGallery as GalleryItems[];

  // Start with the main video (index 1)
  const [currentIndex, setCurrentIndex] = useState(0);

  // Autoplay controls
  const [autoplay, setAutoplay] = useState(true);
  const resumeTimerRef = useRef<number | null>(null);

  const INTERVAL_MS = 2500;
  const RESUME_AFTER_MS = 3000;

  const total = galleryItems.length;

  const goToSlide = (index: number) => {
    // Clamp to 0..total-1
    const next = (index + total) % total;
    setCurrentIndex(next);
    pauseThenScheduleResume();
  };

  const goNext = () => goToSlide(currentIndex + 1);
  const goPrev = () => goToSlide(currentIndex - 1);

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
  const leftItem = galleryItems[currentIndex - 1] || galleryItems[total - 1];
  const rightItem = galleryItems[currentIndex + 1] || galleryItems[0];

  const renderMediaContent = (item: GalleryItems, isMain = false) => {
    const srcToUse = item.poster || item.thumbnail || item.src;

    if (item.type === "video") {
      return (
        <div className="relative w-full h-full group">
          <Image
            src={srcToUse}
            alt={item.alt}
            // Intrinsic dimensions (any reasonable ratio works); Tailwind still controls box size
            width={1600}
            height={900}
            className="w-full h-full object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 60vw, 33vw"
            priority={isMain}
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-[#FF2626]/60 rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors cursor-pointer">
              <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <Image
          src={isMain ? item.src : item.thumbnail ?? item.src}
          alt={item.alt}
          width={1600}
          height={900}
          className="w-full h-full object-cover object-center aspect-video"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 60vw, 60vw"
          priority={isMain}
        />
      );
    }
  };

  return (
    <div
      className="mx-auto flex flex-col gap-4 items-center justify-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {/* Header */}
      <div className="text-center flex flex-col items-center gap-3.5">
        <h2 className="text-lg leading-normal -tracking-[0.36px] font-semibold text-[#706F7C]">
          My Gallery
        </h2>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2">
          {galleryItems.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-4 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
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
      <div className="relative flex items-center justify-center gap-12 h-96 md:h-[600px] px-6 md:px-0 py-9 overflow-hidden">
        {/* Left Side Panel */}
        <div
          className="
            hidden md:block
            w-1/6 h-11/12 rounded-2xl overflow-hidden shadow-lg cursor-pointer
            transform transition-transform duration-300 hover:scale-105
            md:-translate-x-6 lg:-translate-x-10
          "
          onClick={goPrev}
        >
          <div className="w-full h-full relative transition-opacity duration-500 ease-in-out">
            {renderMediaContent(leftItem)}
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-3/5 h-full rounded-2xl overflow-hidden">
          <div className="w-full h-full relative transition-opacity duration-500 ease-in-out">
            {renderMediaContent(currentItem, true)}
          </div>
        </div>

        {/* Right Side Panel */}
        <div
          className="
            hidden md:block
            w-1/6 h-11/12 rounded-2xl overflow-hidden shadow-lg cursor-pointer
            transform transition-transform duration-300 hover:scale-105
            md:translate-x-6 lg:translate-x-10
          "
          onClick={goNext}
        >
          <div className="w-full h-full relative transition-opacity duration-500 ease-in-out">
            {renderMediaContent(rightItem)}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="flex md:hidden justify-center gap-4">
        <button
          onClick={goPrev}
          className="px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
          aria-label="Previous"
        >
          <ArrowLeft />
        </button>
        <button
          onClick={goNext}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          aria-label="Next"
        >
          <ArrowRight />
        </button>
      </div>
    </div>
  );
};
