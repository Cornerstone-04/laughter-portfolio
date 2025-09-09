"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogOverlay,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export type WorkItem = {
  title: string;
  type: string;
  brands: string;
  year: string | number;
  imageUrl: string;
  link: string;
  role?: string;
  previewTitle?: string;
};

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  item: WorkItem | null;
};

export function WorkModal({ open, onOpenChange, item }: Props) {
  if (!item) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay className="bg-[#131316]/80 backdrop-blur-sm" />

      <DialogContent className="max-w-3xl p-0 overflow-hidden bg-white dark:bg-[#131316]">
        <div className="relative h-56 w-full">
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#131316]/30" />
        </div>

        <div className="grid gap-4 p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl text-[#2A2936] dark:text-white">{item.title}</DialogTitle>
            <DialogDescription className="sr-only text-[#2A2936] dark:text-white">
              Details and preview for {item.title}
            </DialogDescription>
          </DialogHeader>

          <div className="grid md:grid-cols-5 gap-6 text-sm">
            <div className="md:col-span-2 space-y-3">
              <div className="flex justify-between">
                <span className="text-[#2A2936] dark:text-white">Type</span>
                <span className="font-medium text-[#454545] dark:text-[#cacaca]">
                  {item.type}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#2A2936] dark:text-white">Year</span>
                <span className="font-medium text-[#454545] dark:text-[#cacaca]">
                  {item.year}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#2A2936] dark:text-white">
                  Production / Brands
                </span>
                <span className="font-medium text-right max-w-[220px] line-clamp-2 text-[#454545] dark:text-[#cacaca]">
                  {item.brands}
                </span>
              </div>
              {item.role && (
                <div className="flex justify-between">
                  <span className="text-[#2A2936] dark:text-white">Role</span>
                  <span className="font-medium text-right max-w-[220px] text-[#454545] dark:text-[#cacaca]">
                    {item.role}
                  </span>
                </div>
              )}
            </div>

            <div className="md:col-span-3">
              <p className="text-[#454545] dark:text-[#cacaca] leading-relaxed">
                Explore credits, roles, and a preview below.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              asChild
              className="bg-[#2A2936] text-white dark:text-[#131316] dark:bg-white dark:hover:bg-white/90"
            >
              <Link href={item.link} target="_blank" rel="noopener noreferrer">
                {item.previewTitle ?? "Preview / Watch Trailer"}{" "}
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
