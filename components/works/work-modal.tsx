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
      <DialogOverlay className="bg-black/80 backdrop-blur-sm" />

      <DialogContent className="max-w-3xl p-0 overflow-hidden">
        <div className="relative h-56 w-full">
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="grid gap-4 p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl">{item.title}</DialogTitle>
            <DialogDescription className="sr-only">
              Details and preview for {item.title}
            </DialogDescription>
          </DialogHeader>

          <div className="grid md:grid-cols-5 gap-6 text-sm">
            <div className="md:col-span-2 space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Type</span>
                <span className="font-medium">{item.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Year</span>
                <span className="font-medium">{item.year}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Production / Brands
                </span>
                <span className="font-medium text-right max-w-[220px] line-clamp-2">
                  {item.brands}
                </span>
              </div>
              {item.role && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Role</span>
                  <span className="font-medium text-right max-w-[220px]">
                    {item.role}
                  </span>
                </div>
              )}
            </div>

            <div className="md:col-span-3">
              <p className="text-muted-foreground leading-relaxed">
                Explore credits, roles, and a preview below.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button asChild>
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
