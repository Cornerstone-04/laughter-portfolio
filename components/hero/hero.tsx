"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Gallery } from "./gallery";
import Link from "next/link";
import type { GalleryItem } from "@/sanity/lib/portfolio-data";

type Props = {
  headline?: string;
  intro?: string;
  ctaLabel?: string;
  ctaLink?: string;
  galleryItems?: GalleryItem[];
};

export default function Hero({
  headline = "LAUGHTER EPHRAIM",
  intro = "I am an AMVCA-nominated film editor with a passion to create stories. With 6 years in the film industry, I have developed a love for bringing stories to life with precision and creativity.",
  ctaLabel = "Get in touch",
  ctaLink = "/#contact-me",
  galleryItems,
}: Props) {
  return (
    <section id="home" className="mt-12 sm:mt-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-center text-center">
          <h1 className="xs:text-5xl mb-3 text-4xl leading-normal font-semibold tracking-normal uppercase sm:mb-4 sm:text-6xl sm:tracking-[-3.84px] md:text-8xl dark:text-white">
            {headline}
          </h1>

          <p className="mb-5 max-w-150 text-base leading-normal tracking-[-0.8px] text-[#454545] sm:mb-6 sm:text-lg md:text-xl dark:text-[#cacaca]">
            {intro}
          </p>

          <Button
            asChild
            variant="primary"
            className="h-12 w-full px-5 text-sm sm:h-14 sm:w-auto sm:px-6 sm:text-base"
            aria-label="Get in touch"
          >
            <Link
              href={ctaLink}
              className="flex items-center justify-center gap-2.5"
            >
              {ctaLabel} <ArrowRight className="size-4 sm:size-5" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="mt-8 sm:mt-10">
        <Gallery items={galleryItems} />
      </div>
    </section>
  );
}
