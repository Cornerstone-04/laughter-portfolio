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
      className="flex w-full flex-col items-start gap-6 overflow-hidden"
    >
      <h3 className="text-lg leading-normal font-semibold tracking-[-0.72px] text-[#47474D] sm:text-xl md:text-2xl dark:text-white">
        Film production featured
      </h3>

      <div className="relative overflow-hidden py-3 sm:py-4">
        <div
          role="list"
          className="flex min-w-max gap-8 whitespace-nowrap will-change-transform md:gap-16"
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
                className="flex shrink-0 items-center gap-3 sm:gap-4"
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
