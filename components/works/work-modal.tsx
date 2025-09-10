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
  title: string;
  type: string;
  production: string;
  year: string | number;
  imageUrl: string;
  link: string;
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
        className="p-6 md:p-16 w-full overflow-auto sm:max-w-none! md:w-[1200px]! max-h-[90vh] bg-white dark:bg-[#131316] border-0 rounded-2xl font-inter-tight"
      >
        {/* Close */}
        <div className="sticky top-4 md:top-12 z-20 flex justify-end">
          <DialogClose
            className="inline-flex items-center justify-center rounded-full transition cursor-pointer p-1 
               bg-black/60 hover:bg-black/70 
               dark:bg-white/20 dark:hover:bg-white/30 
               md:bg-transparent! w-fit"
            aria-label="Close"
          >
            <X className="size-6 text-[#2A2936] dark:text-white" />
          </DialogClose>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* LEFT: Poster */}
          <div className="relative w-full max-w-[520px] h-[380px] md:h-full rounded-2xl overflow-hidden">
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
          <div className="flex flex-col gap-8 md:justify-between overflow-y-auto">
            {/* Title + Type badge */}
            <div className="flex items-center dark:items-baseline gap-2">
              <h2 className="text-[28px] font-semibold text-[#2A2936] dark:text-white">
                {item.title}
              </h2>
              <Badge className="bg-[#DFDFDF] rounded-full py-[3px] px-1.5 dark:bg-transparent text-[#636363] dark:text-[#999999]">
                {item.type}
              </Badge>
            </div>

            {/* Synopsis */}
            {item.synopsis && (
              <section className="flex flex-col gap-4">
                <h3 className="text-xl font-medium -tracking-[0.8px] text-[#17161D] dark:text-white">
                  Synopsis
                </h3>
                <p className="text-base leading-normal -tracking-[0.64px] text-[#454545] dark:text-[#CACACA]">
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
              <h3 className="text-xl font-medium leading-normal -tracking-[0.8px] text-[#17161D] dark:text-white">
                Details
              </h3>

              <div className="rounded-2xl overflow-hidden bg-[#E6E6E6] dark:bg-[#1b1b1f] text-base p-4">
                <dl className="divide-y divide-[#CCCCCC] dark:divide-gray-700">
                  {item.role && (
                    <div className="flex items-center justify-between pb-4">
                      <dt className="font-medium text-[#666666] -tracking-[0.64px] dark:text-[#cacaca]">
                        Role:
                      </dt>
                      <dd className="text-[#2A2936] dark:text-white">
                        {item.role}
                      </dd>
                    </div>
                  )}

                  <div className="flex items-center justify-between py-4">
                    <dt className="font-medium text-[#666666] -tracking-[0.64px] dark:text-[#cacaca]">
                      Production:
                    </dt>
                    <dd className="text-right max-w-[260px] text-[#2A2936] dark:text-white">
                      {item.production}
                    </dd>
                  </div>

                  <div className="flex items-center justify-between py-4">
                    <dt className="font-medium text-[#666666] -tracking-[0.64px] dark:text-[#cacaca]">
                      Type:
                    </dt>
                    <dd className="text-[#2A2936] dark:text-white">
                      {item.type}
                    </dd>
                  </div>

                  <div className="flex items-center justify-between py-4">
                    <dt className="font-medium text-[#666666] -tracking-[0.64px] dark:text-[#cacaca]">
                      Year:
                    </dt>
                    <dd className="text-[#2A2936] dark:text-white">
                      {item.year}
                    </dd>
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <dt className="font-medium text-[#666666] -tracking-[0.64px] dark:text-[#cacaca]">
                      Preview:
                    </dt>
                    <dd className="text-right">
                      <Link
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#2A2936] dark:text-white underline decoration-solid underline-offset-[3px] decoration-[1px] flex items-center justify-end"
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
