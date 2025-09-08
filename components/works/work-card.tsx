"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { WorkItem } from "./work-modal";

type Props = {
  item: WorkItem;
  onOpen: (item: WorkItem) => void;
  large?: boolean;
  priorityImage?: boolean;
};

export function WorkCard({ item, onOpen, large, priorityImage }: Props) {
  return (
    <div
      className={[
        "flex flex-col gap-4 md:gap-6 w-full",
        large ? "md:col-span-2" : "",
      ].join(" ")}
    >
      <div
        className="relative rounded-2xl w-full h-[400px] overflow-hidden group cursor-pointer"
        role="button"
        tabIndex={0}
        onClick={() => onOpen(item)}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onOpen(item)}
        aria-label={`Open details for ${item.title}`}
      >
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          className={[
            "object-cover transition-transform duration-500 ease-in-out group-hover:scale-105",
            large ? "object-top" : "",
          ].join(" ")}
          sizes={
            large
              ? "(min-width: 768px) 66vw, 100vw"
              : "(min-width: 768px) 33vw, 100vw"
          }
          priority={!!priorityImage}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="flex items-center justify-center gap-2.5 font-bold text-white shadow-md group-hover:text-white/80 transition">
            View More <ArrowRight className="inline size-[16px]" />
          </span>
        </div>
      </div>

      {/* Meta */}
      <div>
        <h1 className="flex gap-2 justify-start items-center mb-1">
          <span className="font-semibold text-xl sm:text-2xl md:text-[28px] leading-normal -tracking-[0.84px] text-[#2A2936]">
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
}
