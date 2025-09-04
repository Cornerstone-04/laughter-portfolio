"use client";

import works from "@/data/selected-works.json";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";

type WorkItem = {
  title: string;
  type: string;
  brands: string;
  year: string | number;
  imageUrl: string;
  link: string;
};

export function SelectedWorks() {
  return (
    <section id="works" className="w-full p-6 sm:p-8 md:p-16">
      <div className="w-full max-w-[1072px] mx-auto grid gap-y-10 md:gap-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6">
          <header className="flex flex-col gap-2 md:gap-1">
            <div className="flex flex-wrap items-end justify-start gap-2.5">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-[100%] -tracking-[3%]">
                Selected Works
              </h1>
              <h4 className="text-sm sm:text-base md:text-lg text-[#5A5874] leading-[100%] -tracking-[3%] font-medium px-2 pt-1 pb-1.5">
                2020 - 2025
              </h4>
            </div>
            <p className="w-full max-w-lg text-base md:text-lg text-[#454545] leading-normal -tracking-[.54px] font-medium">
              Get an inside look at the edits, stories, and moments that shaped
              each frame. Dive into my world of cinematic storytelling.
            </p>
          </header>

          <Button
            variant="secondary"
            className="h-12 sm:h-14 w-full sm:w-fit flex items-center justify-center gap-2 md:inline-flex"
          >
            See all works <ArrowRight />
          </Button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 md:gap-x-8 gap-y-10 md:gap-y-16">
          {(works as WorkItem[]).map((item, idx) => {
            const isSeries = idx === 0 || idx === 3 || idx === 4;

            return (
              <div
                key={`${item.title}-${idx}`}
                className={[
                  "flex flex-col gap-4 md:gap-6 w-full",
                  isSeries ? "md:col-span-2" : "",
                ].join(" ")}
              >
                <div className="relative rounded-2xl w-full h-[400px] overflow-hidden group">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className={[
                      "object-cover transition-transform duration-500 ease-in-out group-hover:scale-105",
                      isSeries ? "object-top" : "",
                    ].join(" ")}
                    sizes={
                      isSeries
                        ? "(min-width: 768px) 66vw, 100vw"
                        : "(min-width: 768px) 33vw, 100vw"
                    }
                    priority={idx < 2}
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                    <Link
                      href={item.link}
                      className="flex items-center justify-center gap-2.5 h-14 w-fit font-medium px-8 py-4 bg-le-purple text-white rounded-full shadow-lg hover:bg-le-purple/80 transition hover:scale-105"
                    >
                      Watch Trailer{" "}
                      <ArrowRight className="inline size-[18px]" />
                    </Link>
                  </div>
                </div>

                <div>
                  <h1 className="flex gap-2 justify-start items-end mb-1">
                    <span className="font-semibold text-2xl sm:text-[26px] md:text-[28px] leading-[100%] -tracking-[3%] text-[#2A2936]">
                      {item.title}
                    </span>
                    <Badge className="py-[3px] px-1.5 rounded-full bg-[#DFDFDF] text-xs sm:text-sm font-medium text-[#636363] leading-[100%] -tracking-[3%]">
                      {item.type}
                    </Badge>
                  </h1>
                  <h3 className="flex justify-between items-end text-sm sm:text-base md:text-lg text-[#454545] leading-[100%] -tracking-[3%] font-medium">
                    <span className="truncate">{item.brands}</span>
                    <span>{item.year}</span>
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Buttons */}
        <div className="mx-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full">
          <Button
            variant="primary"
            className="h-12 sm:h-14 w-full sm:w-fit px-6 sm:px-8 py-3 sm:py-4 text-base flex items-center justify-center gap-2"
          >
            <Link href="/#contact-me">Start new project</Link>
          </Button>
          <Button
            variant="secondary"
            className="h-12 sm:h-14 w-full sm:w-fit px-6 sm:px-8 py-3 sm:py-4 text-base flex items-center justify-center gap-2"
          >
            See all works <ArrowRight />
          </Button>
        </div>
      </div>
    </section>
  );
}
