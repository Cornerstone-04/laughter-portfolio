"use client";

import { Section } from "@/components/shared/animated-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const getYear = (val: string | number): number | null => {
    const s = String(val);
    const m = s.match(/\d{4}/);
    if (!m) return null;
    const y = Number(m[0]);
    return Number.isFinite(y) ? y : null;
  };

  const filtered = useMemo(() => {
    let list: WorkWithYear[] = data;
    const normalizedSearch = searchQuery.trim().toLowerCase();

    if (yearFilter !== "all") {
      const target = Number(yearFilter);
      list = list.filter((item) => getYear(item.year) === target);
    }

    if (typeFilter !== "all") {
      list = list.filter((item) => item.type === typeFilter);
    }

    if (normalizedSearch) {
      list = list.filter((item) =>
        [item.title, item.production, item.type, item.role]
          .filter(Boolean)
          .some((value) =>
            String(value).toLowerCase().includes(normalizedSearch),
          ),
      );
    }

    return [...list].sort((a, b) => {
      const ya = getYear(a.year) ?? 0;
      const yb = getYear(b.year) ?? 0;
      return yb - ya;
    });
  }, [data, searchQuery, typeFilter, yearFilter]);

  const yearOptions = useMemo(
    () =>
      Array.from(
        new Set(
          data
            .map((item) => getYear(item.year))
            .filter((year): year is number => year !== null),
        ),
      ).sort((a, b) => b - a),
    [data],
  );

  const typeOptions = useMemo(
    () => Array.from(new Set(data.map((item) => item.type))).sort(),
    [data],
  );

  const hasActiveFilters =
    yearFilter !== "all" || typeFilter !== "all" || searchQuery.trim() !== "";

  const clearFilters = () => {
    setYearFilter("all");
    setTypeFilter("all");
    setSearchQuery("");
  };

  return (
    <LazyMotion features={domAnimation}>
      <Section amount={0}>
        <main className="w-full p-6 sm:p-8 md:p-16">
          <div className="mx-auto grid w-full max-w-6xl gap-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-6">
              <header className="mb-0">
                <h1 className="text-3xl font-semibold tracking-tight text-[#2A2936] sm:text-4xl md:text-5xl dark:text-white">
                  All Works
                </h1>
                <p className="mt-2 text-[#454545] dark:text-[#cacaca]">
                  Explore the full catalog by title, production, format, or
                  year.
                </p>
                <p className="mt-1 text-xs text-[#706F7C]">
                  Showing{" "}
                  <span className="font-semibold">{filtered.length}</span> of{" "}
                  <span className="font-semibold">{data.length}</span> items
                  {yearFilter !== "all" ? ` (Year: ${yearFilter})` : ""}
                  {typeFilter !== "all" ? ` (Type: ${typeFilter})` : ""}
                </p>
              </header>

              <form
                className="w-full md:w-auto"
                onSubmit={(e) => e.preventDefault()}
                aria-label="Filter works"
              >
                <div className="grid gap-3 rounded-2xl border border-[#eee] bg-white p-3 shadow-sm sm:grid-cols-2 md:flex md:items-end dark:border-[#2a2a2a] dark:bg-[#1d1d1d]">
                  <div className="flex flex-col sm:col-span-2 md:col-span-1">
                    <Label
                      htmlFor="work-search"
                      className="mb-1 text-xs font-medium text-[#706F7C]"
                    >
                      Search
                    </Label>
                    <Input
                      id="work-search"
                      value={searchQuery}
                      onChange={(event) => setSearchQuery(event.target.value)}
                      placeholder="Title or production"
                      className="h-10 w-full rounded-xl border border-[#e5e5ea] bg-white px-3 text-[#2A2936] md:w-56 dark:border-[#303036] dark:bg-[#141416] dark:text-[#e6e6e6]"
                    />
                  </div>

                  <div className="flex flex-col">
                    <Label
                      htmlFor="type-filter"
                      className="mb-1 text-xs font-medium text-[#706F7C]"
                    >
                      Filter by type
                    </Label>

                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                      <SelectTrigger
                        id="type-filter"
                        className="h-10 w-full rounded-xl border border-[#e5e5ea] bg-white px-3 text-[#2A2936] md:w-44 dark:border-[#303036] dark:bg-[#141416] dark:text-[#e6e6e6]"
                        aria-label="Filter by type"
                      >
                        <SelectValue placeholder="All types" />
                      </SelectTrigger>
                      <SelectContent align="end" className="min-w-40">
                        <SelectItem value="all">All types</SelectItem>
                        {typeOptions.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col">
                    <Label
                      htmlFor="year-filter"
                      className="mb-1 text-xs font-medium text-[#706F7C]"
                    >
                      Filter by year
                    </Label>

                    <Select value={yearFilter} onValueChange={setYearFilter}>
                      <SelectTrigger
                        id="year-filter"
                        className="h-10 w-full rounded-xl border border-[#e5e5ea] bg-white px-3 text-[#2A2936] md:w-36 dark:border-[#303036] dark:bg-[#141416] dark:text-[#e6e6e6]"
                        aria-label="Filter by year"
                      >
                        <SelectValue placeholder="All years" />
                      </SelectTrigger>
                      <SelectContent align="end" className="min-w-40">
                        <SelectItem value="all">All years</SelectItem>
                        {yearOptions.map((y) => (
                          <SelectItem key={`y-${y}`} value={String(y)}>
                            {y}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {hasActiveFilters && (
                    <Button
                      onClick={clearFilters}
                      className="h-10 rounded-xl border border-[#e5e5ea] bg-[#2A2936] px-3 text-sm font-medium text-white transition hover:bg-[#2A2936]/80 dark:border-[#303036] dark:bg-white dark:text-[#131316] dark:hover:bg-white/80"
                      aria-label="Clear filters"
                    >
                      Clear
                    </Button>
                  )}
                </div>
              </form>
            </div>

            <section className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-3">
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
                  No works found for the current filters.
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
