"use client";

import works from "@/data/selected-works.json";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { WorkModal, WorkItem } from "@/components/works/work-modal";
import { WorkCard } from "@/components/works/work-card";
import { InfoTooltip } from "../shared/info-tooltip";
import type { WorkContent } from "@/sanity/lib/portfolio-data";

type Props = {
  works?: WorkContent[];
};

const isWideByGridRhythm = (index: number) => {
  const slot = index % 4;
  return slot === 0 || slot === 3;
};

const shouldRenderWide = (item: WorkItem, index: number) => {
  if (item.featuredLayout === "wide") return true;
  if (item.featuredLayout === "standard") return false;
  return isWideByGridRhythm(index);
};

export function SelectedWorks({ works: cmsWorks }: Props) {
  const data = useMemo(
    () => (cmsWorks?.length ? cmsWorks : works) as WorkItem[],
    [cmsWorks],
  );
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
      <div className="mx-auto grid w-full max-w-268 gap-y-10 md:gap-y-16">
        {/* Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <header className="flex flex-col gap-2 md:gap-1">
            <div className="flex items-baseline justify-between gap-2.5 sm:justify-start">
              <h1 className="text-le-text text-3xl leading-normal font-semibold tracking-[-1.44px] sm:text-4xl md:text-5xl dark:text-white">
                Selected Works
              </h1>
              <p className="flex items-center justify-center px-2 pt-1 pb-1.5">
                <span className="text-sm leading-normal font-medium tracking-[-0.54px] text-[#5A5874] sm:text-base md:text-lg dark:text-[#999999]">
                  2022 - 2025
                </span>
              </p>
            </div>
            <p className="w-full max-w-lg text-base leading-normal font-medium tracking-[-0.54px] text-[#454545] md:text-lg dark:text-[#cacaca]">
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
            className="flex h-12 w-full items-center justify-center gap-2 sm:h-14 sm:w-fit md:inline-flex"
          >
            <Link href="/works">
              See all works <ArrowRight />
            </Link>
          </Button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-3 md:gap-x-8 md:gap-y-16">
          {data.map((item, idx) => (
            <WorkCard
              key={item._id ?? `${item.title}-${item.production}-${idx}`}
              item={item}
              onOpen={handleOpen}
              large={shouldRenderWide(item, idx)}
            />
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="mx-auto flex w-full flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
          <Button
            asChild
            variant="primary"
            className="flex h-12 w-full items-center justify-center gap-2 px-6 py-3 text-base sm:h-14 sm:w-fit sm:px-8 sm:py-4"
          >
            <Link href="/#contact-me">Start new project</Link>
          </Button>
        </div>

        <WorkModal open={open} onOpenChange={setOpen} item={current} />
      </div>
    </section>
  );
}
