"use client";

import works from "@/data/works.json";
import { useMemo, useState } from "react";
import { WorkCard } from "@/components/works/work-card";
import { WorkModal, WorkItem } from "@/components/works/work-modal";

export default function WorksPage() {
  const data = useMemo(() => works as WorkItem[], []);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<WorkItem | null>(null);

  const handleOpen = (item: WorkItem) => {
    setCurrent(item);
    setOpen(true);
  };

  return (
    <main className="w-full p-6 sm:p-8 md:p-16">
      <div className="w-full max-w-6xl mx-auto grid gap-6">
        <header className="mb-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#2A2936] dark:text-white">
            All Works
          </h1>
          <p className="mt-2 text-[#454545] dark:text-[#cacaca]">
            Explore the full catalog. Click any card to view details and
            preview.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
          {data.map((item, idx) => (
            <WorkCard
              key={`${item.title}-${idx}`}
              item={item}
              onOpen={handleOpen}
              large={false}
            />
          ))}
        </section>
      </div>

      <WorkModal open={open} onOpenChange={setOpen} item={current} />
    </main>
  );
}
