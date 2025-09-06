"use client";
/* eslint-disable @next/next/no-img-element */
import rawGallery from "@/data/gallery.json";
import React, { useState } from "react";
import { ArrowLeft, ArrowRight, Play } from "lucide-react";

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
  const [currentIndex, setCurrentIndex] = useState(1); // Start with the main video (index 1)

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };
  const currentItem = galleryItems[currentIndex];
  const leftItem =
    galleryItems[currentIndex - 1] || galleryItems[galleryItems.length - 1];
  const rightItem = galleryItems[currentIndex + 1] || galleryItems[0];

  const renderMediaContent = (item: GalleryItems, isMain = false) => {
    if (item.type === "video") {
      return (
        <div className="relative w-full h-full group">
          <img
            src={item.poster || item.thumbnail || item.src}
            alt={item.alt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-[#FF2626]/60 rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors cursor-pointer">
              <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <img
          src={isMain ? item.src : item.thumbnail ?? item.src}
          alt={item.alt}
          className="w-full h-full object-cover"
        />
      );
    }
  };

  return (
    <div className="mx-auto flex flex-col gap-4 items-center justify-center">
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
                    (currentIndex === galleryItems.length - 1 && index === 0)
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
          onClick={() =>
            goToSlide(
              currentIndex === 0 ? galleryItems.length - 1 : currentIndex - 1
            )
          }
        >
          <div className="w-full h-full relative">
            {renderMediaContent(leftItem)}
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-3/5 h-full rounded-2xl overflow-hidden">
          <div className="w-full h-full relative">
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
          onClick={() =>
            goToSlide(
              currentIndex === galleryItems.length - 1 ? 0 : currentIndex + 1
            )
          }
        >
          <div className="w-full h-full relative">
            {renderMediaContent(rightItem)}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="flex md:hidden justify-center gap-4">
        <button
          onClick={() =>
            goToSlide(
              currentIndex === 0 ? galleryItems.length - 1 : currentIndex - 1
            )
          }
          className="px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
        >
          <ArrowLeft />
        </button>
        <button
          onClick={() =>
            goToSlide(
              currentIndex === galleryItems.length - 1 ? 0 : currentIndex + 1
            )
          }
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <ArrowRight />
        </button>
      </div>
    </div>
  );
};
