"use client";

import { useState } from "react";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";

interface InfoTooltipProps {
  message: string;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  className?: string;
}

export function InfoTooltip({
  message,
  side = "right",
  align = "start",
  className,
}: InfoTooltipProps) {
  const [open, setOpen] = useState(false);

  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip open={open} onOpenChange={setOpen}>
        <TooltipTrigger asChild className={className}>
          <button
            type="button"
            aria-label="Information tooltip"
            onClick={() => setOpen((o) => !o)} // toggle on mobile
            className="inline-flex items-center justify-center size-4 rounded-full text-[#454545] dark:text-[#cacaca] dark:hover:bg-[#13131d] hover:bg-[#F7F7FB] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4F46E5] cursor-pointer"
          >
            <Info className="size-4" aria-hidden="true" />
          </button>
        </TooltipTrigger>
        <TooltipContent
          side={side}
          align={align}
          className="max-w-[220px] text-sm font-medium bg-le-purple text-white"
        >
          {message}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
