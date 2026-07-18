import Image from "next/image";
import "@/styles/editing-tools.css";

type Item = { id: string; icon: string; label: string };

export function EditingTools({ items }: { items: Item[] }) {
  const track = [...items, ...items];

  const ICON_SIZES: Record<string, { w: number; h: number }> = {
    "et-1": { w: 48, h: 48 }, // Resolve
    "et-2": { w: 32, h: 32 }, // Premiere
    "et-3": { w: 71, h: 32 }, // Avid
  };
  const FALLBACK = { w: 48, h: 48 };

  return (
    <section
      aria-label="Scrolling list of tools"
      className="flex w-full flex-col items-start gap-6 overflow-hidden"
    >
      <h3 className="text-lg leading-normal font-semibold tracking-[-0.72px] text-[#47474D] sm:text-xl md:text-2xl dark:text-white">
        Proficient with these editing tools
      </h3>

      <div className="relative overflow-hidden py-3 sm:py-4">
        <div
          role="list"
          className="flex min-w-max gap-6 whitespace-nowrap will-change-transform"
          style={{
            animation: "tools-marquee 18s ease-in-out infinite alternate",
          }}
        >
          {track.map((item, i) => (
            <div
              key={`${item.label}-${i}`}
              role="listitem"
              className="flex shrink-0 items-center gap-3 sm:gap-4"
            >
              <span className="inline-flex items-center justify-center">
                <Image
                  src={item.icon}
                  alt={item.label}
                  width={(ICON_SIZES[item.id] ?? FALLBACK).w}
                  height={(ICON_SIZES[item.id] ?? FALLBACK).h}
                  className="object-contain"
                />
              </span>
              <span className="text-base leading-normal font-medium tracking-[-0.6px] text-[#797882] sm:text-lg md:text-xl dark:text-[#cacaca]">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
