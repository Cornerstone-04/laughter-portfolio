"use client";

import { Section } from "@/components/shared/animated-section";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WorkCard } from "@/components/works/work-card";
import { WorkItem, WorkModal } from "@/components/works/work-modal";
import type { WorkContent } from "@/sanity/lib/portfolio-data";
import { domAnimation, LazyMotion } from "motion/react";
import { useMemo, useState } from "react";

type WorkWithYear = WorkItem & { year: string | number };

type Props = {
  works: WorkContent[];
};

export function WorksPageContent({ works }: Props) {
  const data = useMemo(() => works as WorkWithYear[], [works]);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<WorkWithYear | null>(null);
  const [yearFilter, setYearFilter] = useState<string>("all");

  const getYear = (val: string | number): number | null => {
    const s = String(val);
    const m = s.match(/\d{4}/);
    if (!m) return null;
    const y = Number(m[0]);
    return Number.isFinite(y) ? y : null;
  };

  const filtered = useMemo(() => {
    let list: WorkWithYear[] = data;

    if (yearFilter !== "all") {
      const target = Number(yearFilter);
      list = data.filter((item) => getYear(item.year) === target);
    }

    return [...list].sort((a, b) => {
      const ya = getYear(a.year) ?? 0;
      const yb = getYear(b.year) ?? 0;
      return yb - ya;
    });
  }, [data, yearFilter]);

  const yearOptions = useMemo(
    () =>
      Array.from(
        new Set(data.map((item) => getYear(item.year)).filter((year): year is number => year !== null))
      ).sort((a, b) => b - a),
    [data]
  );

  return (
    <LazyMotion features={domAnimation}>
      <Section amount={0}>
        <main className="w-full p-6 sm:p-8 md:p-16">
          <div className="w-full max-w-6xl mx-auto grid gap-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-6">
              <header className="mb-0">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#2A2936] dark:text-white">
                  All Works
                </h1>
                <p className="mt-2 text-[#454545] dark:text-[#cacaca]">
                  Explore the full catalog. Click any card to view details and
                  preview.
                </p>
                <p className="mt-1 text-xs text-[#706F7C]">
                  Showing{" "}
                  <span className="font-semibold">{filtered.length}</span> of{" "}
                  <span className="font-semibold">{data.length}</span> items
                  {yearFilter !== "all" ? ` (Year: ${yearFilter})` : ""}
                </p>
              </header>

              <form
                className="w-full md:w-auto"
                onSubmit={(e) => e.preventDefault()}
                aria-label="Filter by year"
              >
                <div className="flex items-end justify-between gap-3 bg-white dark:bg-[#1d1d1d] rounded-2xl p-3 shadow-sm border border-[#eee] dark:border-[#2a2a2a]">
                  <div className="flex flex-col">
                    <Label
                      htmlFor="year-filter"
                      className="text-xs font-medium text-[#706F7C] mb-1"
                    >
                      Filter by year
                    </Label>

                    <Select value={yearFilter} onValueChange={setYearFilter}>
                      <SelectTrigger
                        id="year-filter"
                        className="h-10 rounded-xl px-3 border border-[#e5e5ea] dark:border-[#303036] bg-white dark:bg-[#141416] text-[#2A2936] dark:text-[#e6e6e6] w-48"
                        aria-label="Filter by year"
                      >
                        <SelectValue placeholder="All years" />
                      </SelectTrigger>
                      <SelectContent align="end" className="min-w-[10rem]">
                        <SelectItem value="all">All years</SelectItem>
                        {yearOptions.map((y) => (
                          <SelectItem key={`y-${y}`} value={String(y)}>
                            {y}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {yearFilter !== "all" && (
                    <Button
                      onClick={() => setYearFilter("all")}
                      className="h-10 px-3 rounded-xl border border-[#e5e5ea] dark:border-[#303036] text-sm font-medium text-white hover:bg-[#2A2936]/80 bg-[#2A2936] dark:bg-white dark:hover:bg-white/80 dark:text-[#131316] transition"
                      aria-label="Clear year filter"
                    >
                      Clear
                    </Button>
                  )}
                </div>
              </form>
            </div>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
              {filtered.map((item, idx) => (
                <WorkCard
                  key={item._id ?? `${item.title}-${item.production}-${idx}`}
                  item={item}
                  onOpen={(it) => {
                    setCurrent(it);
                    setOpen(true);
                  }}
                  large={false}
                />
              ))}
              {filtered.length === 0 && (
                <div className="col-span-full text-[#706F7C]">
                  No works found for {yearFilter}.
                </div>
              )}
            </section>
          </div>

          <WorkModal open={open} onOpenChange={setOpen} item={current} />
        </main>
      </Section>
    </LazyMotion>
  );
}
