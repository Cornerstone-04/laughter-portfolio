import Image from "next/image";
import "@/styles/brands.css";

type Item = { id: string; icon: string };

export function FeaturedBrands({ items }: { items: Item[] }) {
  // you can keep duplication; it's fine for ping-pong too
  const track = [...items, ...items, ...items];

  const ICON_SIZES: Record<string, { w: number; h: number }> = {
    dtsv: { w: 84, h: 32 },
    netflix: { w: 84, h: 24 },
    prime: { w: 84, h: 24 },
    am: { w: 84, h: 24 },
  };
  const FALLBACK = { w: 64, h: 32 };

  return (
    <section
      aria-label="Scrolling list of tools"
      className="w-full overflow-hidden flex flex-col gap-6 items-start"
    >
      <h3 className="text-[#47474D] text-lg sm:text-xl md:text-2xl font-semibold leading-normal -tracking-[0.72px]">
        Film production featured
      </h3>

      <div className="relative overflow-hidden py-3 sm:py-4">
        <div
          role="list"
          className="flex gap-8 md:gap-16 min-w-max whitespace-nowrap will-change-transform"
          /* ⬇️ changed: add 'alternate' (ping-pong) + smoother easing */
          style={{
            animation: "brand-marquee 18s ease-in-out infinite alternate",
          }}
        >
          {track.map((item, i) => {
            const sz = ICON_SIZES[item.id] ?? FALLBACK;
            return (
              <div
                key={`${item.id}-${i}`}
                role="listitem"
                className="flex items-center gap-3 sm:gap-4 shrink-0"
              >
                <span className="inline-flex items-center justify-center">
                  <Image
                    src={item.icon}
                    alt={item.id}
                    width={sz.w}
                    height={sz.h}
                    className="object-contain"
                  />
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
