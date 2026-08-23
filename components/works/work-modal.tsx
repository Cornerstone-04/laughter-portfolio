"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogClose,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, X } from "lucide-react";

export type WorkItem = {
  _id?: string;
  title: string;
  type: string;
  production: string;
  year: string | number;
  imageUrl: string;
  link: string;
  featuredLayout?: "auto" | "standard" | "wide" | null;
  role?: string;
  previewTitle?: string;
  synopsis?: string;
  /** Optional, if you want per-item copy; falls back to a default */
  // process?: string;
};

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  item: WorkItem | null;
};

export function WorkModal({ open, onOpenChange, item }: Props) {
  if (!item) return null;

  // const defaultProcess =
  //   "I am an AMVCA-nominated film editor with a passion to create stories. With 6+ years in the film industry, I’ve developed a love for bringing stories to life with precision and creativity.";

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal>
      <DialogOverlay className="bg-[#131316]/80 backdrop-blur-sm" />

      <DialogTitle className="hidden">Portfolio Details</DialogTitle>
      <DialogContent
        showCloseButton={false}
        className="max-h-[90vh] w-full overflow-auto rounded-2xl border-0 bg-white p-6 font-inter-tight sm:max-w-none! md:w-300! md:p-16 dark:bg-[#131316]"
      >
        {/* Close */}
        <div className="sticky top-4 z-20 flex justify-end md:top-12">
          <DialogClose
            className="inline-flex w-fit cursor-pointer items-center justify-center rounded-full bg-black/60 p-1 transition hover:bg-black/70 md:bg-transparent! dark:bg-white/20 dark:hover:bg-white/30"
            aria-label="Close"
          >
            <X className="size-6 text-[#2A2936] dark:text-white" />
          </DialogClose>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* LEFT: Poster */}
          <div className="relative h-95 w-full max-w-130 overflow-hidden rounded-2xl md:h-full">
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          {/* RIGHT: Content */}
          <div className="flex flex-col gap-8 overflow-y-auto md:justify-between">
            {/* Title + Type badge */}
            <div className="flex items-center gap-2 dark:items-baseline">
              <h2 className="text-[28px] font-semibold text-[#2A2936] dark:text-white">
                {item.title}
              </h2>
              <Badge className="rounded-full bg-[#DFDFDF] px-1.5 py-0.75 text-[#636363] dark:bg-transparent dark:text-[#999999]">
                {item.type}
              </Badge>
            </div>

            {/* Synopsis */}
            {item.synopsis && (
              <section className="flex flex-col gap-4">
                <h3 className="text-xl font-medium tracking-[-0.8px] text-[#17161D] dark:text-white">
                  Synopsis
                </h3>
                <p className="text-base leading-normal tracking-[-0.64px] text-[#454545] dark:text-[#CACACA]">
                  {item.synopsis}
                </p>
              </section>
            )}

            {/* My Process */}
            {/* <section>
              <h3 className="text-lg font-semibold mb-1 text-[#2A2936] dark:text-white">
                My Process
              </h3>
              <p className="text-sm leading-relaxed text-[#454545] dark:text-[#CACACA]">
                {item.process ?? defaultProcess}
              </p>
            </section> */}

            {/* Details */}
            <section className="flex flex-col gap-4">
              <h3 className="text-xl leading-normal font-medium tracking-[-0.8px] text-[#17161D] dark:text-white">
                Details
              </h3>

              <div className="overflow-hidden rounded-2xl bg-[#E6E6E6] p-4 text-base dark:bg-[#1b1b1f]">
                <dl className="divide-y divide-[#CCCCCC] dark:divide-gray-700">
                  {item.role && (
                    <div className="flex items-center justify-between pb-4">
                      <dt className="font-medium tracking-[-0.64px] text-[#666666] dark:text-[#cacaca]">
                        Role:
                      </dt>
                      <dd className="text-[#2A2936] dark:text-white">
                        {item.role}
                      </dd>
                    </div>
                  )}

                  <div className="flex items-center justify-between py-4">
                    <dt className="font-medium tracking-[-0.64px] text-[#666666] dark:text-[#cacaca]">
                      Production:
                    </dt>
                    <dd className="max-w-65 text-right text-[#2A2936] dark:text-white">
                      {item.production}
                    </dd>
                  </div>

                  <div className="flex items-center justify-between py-4">
                    <dt className="font-medium tracking-[-0.64px] text-[#666666] dark:text-[#cacaca]">
                      Type:
                    </dt>
                    <dd className="text-[#2A2936] dark:text-white">
                      {item.type}
                    </dd>
                  </div>

                  <div className="flex items-center justify-between py-4">
                    <dt className="font-medium tracking-[-0.64px] text-[#666666] dark:text-[#cacaca]">
                      Year:
                    </dt>
                    <dd className="text-[#2A2936] dark:text-white">
                      {item.year}
                    </dd>
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <dt className="font-medium tracking-[-0.64px] text-[#666666] dark:text-[#cacaca]">
                      Preview:
                    </dt>
                    <dd className="text-right">
                      <Link
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-end text-[#2A2936] underline decoration-solid decoration-1 underline-offset-[3px] dark:text-white"
                      >
                        {item.previewTitle ?? "Open link"}
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Link>
                    </dd>
                  </div>
                </dl>
              </div>
            </section>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
