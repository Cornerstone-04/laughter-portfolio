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
        "flex w-full flex-col gap-4 md:gap-6",
        large ? "md:col-span-2" : "",
      ].join(" ")}
    >
      <div
        className="group relative h-100 w-full cursor-pointer overflow-hidden rounded-2xl"
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
            item.title === "To Kill a Monkey" && "object-center!",
          ].join(" ")}
          sizes={
            large
              ? "(min-width: 768px) 66vw, 100vw"
              : "(min-width: 768px) 33vw, 100vw"
          }
          priority={!!priorityImage}
        />

        {/* Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="flex items-center justify-center gap-2.5 font-bold text-white shadow-md transition group-hover:text-white/80">
            View More <ArrowRight className="inline size-4" />
          </span>
        </div>
      </div>

      {/* Meta */}
      <div>
        <h1 className="mb-1 flex items-center justify-start gap-2 dark:items-baseline">
          <span className="text-xl leading-normal font-semibold tracking-[-0.84px] text-[#2A2936] capitalize! sm:text-2xl md:text-[28px] dark:text-white">
            {item.title}
          </span>
          <Badge className="rounded-full bg-[#DFDFDF] px-1.5 py-0.75 text-xs leading-[100%] font-medium tracking-[-3%] text-[#636363] sm:text-sm dark:bg-transparent dark:text-[#999999]">
            {item.type}
          </Badge>
        </h1>
        <h3 className="flex items-end justify-between text-sm leading-[100%] font-medium tracking-[-3%] text-[#454545] sm:text-base md:text-lg dark:text-[#CACACA]">
          <span className="truncate">{item.production}</span>
          <span>{item.year}</span>
        </h3>
      </div>
    </div>
  );
}
