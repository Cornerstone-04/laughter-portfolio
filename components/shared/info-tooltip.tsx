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
            className="inline-flex size-4 cursor-pointer items-center justify-center rounded-full text-[#454545] hover:bg-[#F7F7FB] focus:ring-2 focus:ring-[#4F46E5] focus:ring-offset-2 focus:outline-none dark:text-[#cacaca] dark:hover:bg-[#13131d]"
          >
            <Info className="size-4" aria-hidden="true" />
          </button>
        </TooltipTrigger>
        <TooltipContent
          side={side}
          align={align}
          className="max-w-55 bg-le-purple text-sm font-medium text-white"
        >
          {message}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
