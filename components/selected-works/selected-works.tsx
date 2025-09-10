"use client";

import works from "@/data/selected-works.json";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { WorkModal, WorkItem } from "@/components/works/work-modal";
import { WorkCard } from "@/components/works/work-card";
import { InfoTooltip } from "../shared/info-tooltip";

export function SelectedWorks() {
  const data = useMemo(() => works as WorkItem[], []);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<WorkItem | null>(null);

  const handleOpen = (item: WorkItem) => {
    setCurrent(item);
    setOpen(true);
  };

  return (
    <section
      id="selected-works"
      className="w-full p-6 sm:p-8 md:p-16 dark:bg-[#15151E]"
    >
      <div className="w-full max-w-[1072px] mx-auto grid gap-y-10 md:gap-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6">
          <header className="flex flex-col gap-2 md:gap-1">
            <div className="flex items-baseline justify-between sm:justify-start gap-2.5">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-normal -tracking-[1.44px] text-le-text dark:text-white">
                Selected Works
              </h1>
              <p className="pt-1 pb-1.5 px-2 flex justify-center items-center">
                <span className="text-sm sm:text-base md:text-lg text-[#5A5874] leading-normal -tracking-[0.54px] font-medium dark:text-[#999999]">
                  2022 - 2025
                </span>
              </p>
            </div>
            <p className="w-full max-w-lg text-base md:text-lg text-[#454545] dark:text-[#cacaca] leading-normal -tracking-[.54px] font-medium">
              Get an inside look at the edits, stories, and moments that shaped
              each frame. Dive into my world of cinematic storytelling.
              <InfoTooltip
                className="ml-2 dark:text-[#cacaca]"
                message="Click any card to view details and preview."
              />
            </p>
          </header>

          <Button
            asChild
            variant="secondary"
            className="h-12 sm:h-14 w-full sm:w-fit flex items-center justify-center gap-2 md:inline-flex"
          >
            <Link href="/works">
              See all works <ArrowRight />
            </Link>
          </Button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 md:gap-x-8 gap-y-10 md:gap-y-16">
          {data.map((item, idx) => {
            const isSeries = idx === 0 || idx === 3 || idx === 4;
            return (
              <WorkCard
                key={`${item.title}-${idx}`}
                item={item}
                onOpen={handleOpen}
                large={isSeries}
              />
            );
          })}
        </div>

        {/* CTA Buttons */}
        <div className="mx-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full">
          <Button
            asChild
            variant="primary"
            className="h-12 sm:h-14 w-full sm:w-fit px-6 sm:px-8 py-3 sm:py-4 text-base flex items-center justify-center gap-2"
          >
            <Link href="/#contact-me">Start new project</Link>
          </Button>
        </div>

        <WorkModal open={open} onOpenChange={setOpen} item={current} />
      </div>
    </section>
  );
}
