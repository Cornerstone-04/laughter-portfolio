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

  return (
    <section
      aria-label="Scrolling list of tools"
      className="w-full overflow-hidden flex flex-col gap-6 items-start"
    >
      <h3 className="text-[#47474D] text-lg sm:text-xl md:text-2xl font-semibold leading-normal -tracking-[0.72px]">
        Proficient with these editing tools
      </h3>

      <div className="relative overflow-hidden py-3 sm:py-4">
        <div
          role="list"
          className="flex gap-6 min-w-max whitespace-nowrap will-change-transform"
          style={{
            animation: "tools-marquee 18s ease-in-out infinite alternate",
          }}
        >
          {track.map((item, i) => (
            <div
              key={`${item.label}-${i}`}
              role="listitem"
              className="flex items-center gap-3 sm:gap-4 shrink-0"
            >
              <span className="inline-flex items-center justify-center">
                <Image
                  src={item.icon}
                  alt={item.label}
                  width={ICON_SIZES[item.id].w}
                  height={ICON_SIZES[item.id].h}
                  className="object-contain"
                />
              </span>
              <span className="text-base sm:text-lg md:text-xl text-[#797882] leading-normal -tracking-[0.6px] font-medium">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
