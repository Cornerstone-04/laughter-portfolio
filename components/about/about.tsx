"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import focus from "@/data/about.json";
import { AboutCard } from "../shared/about-card";
import { EditingTools } from "../shared/editing-tools";
import Tools from "@/data/tools.json";
import Brands from "@/data/brands.json";
import { FeaturedBrands } from "../shared/featured-brands";

export const AboutEphraim = () => {
  return (
    <section
      id="about-laughter"
      className="w-full p-6 sm:p-8 md:p-16 flex flex-col items-center justify-center self-stretch"
    >
      <div className="flex flex-col gap-16 w-full max-w-[1072px] justify-center items-center mx-auto">
        <div
          id="details"
          className="flex flex-col items-start self-stretch gap-8"
        >
          <div className="w-full flex flex-col md:flex-row items-center gap-4 md:gap-6 justify-between">
            <h1 className="text-[#2A2936] text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight md:leading-normal tracking-[-1.44px]">
              About Laughter
            </h1>
            <Button
              variant="primary"
              className="h-12 sm:h-14 w-full sm:w-fit px-6 sm:px-8 py-3 sm:py-4 text-base flex items-center justify-center font-medium"
            >
              <Link
                href="#contact-me"
                className="flex items-center justify-center gap-2.5"
              >
                Let&apos;s Colab! <ArrowRight />
              </Link>
            </Button>
          </div>
          <div>
            <p className="text-[#454545] text-base sm:text-lg md:text-2xl font-medium leading-relaxed md:leading-normal tracking-[-0.48px] self-stretch ">
              Hi there! I&apos;m Laughter Ephraim, an AMVCA-nominated film
              editor with a passion to create stories. With 6 years in the film
              industry, I have developed a love for bringing stories to life
              with precision and creativity. I believe in the power of
              storytelling and its ability to connect, inspire and entertain.
              It&apos;s more than just editing. It&apos;s about conveying a
              message that matters.
            </p>
          </div>
        </div>
        <div id="focus">
          {/* Mobile-first image (shown only below lg) */}
          <div className="relative rounded-2xl overflow-hidden min-h-[260px] sm:min-h-[320px] lg:hidden mb-4">
            <Image
              src="/images/laughter-headshot.jpg"
              alt="Portrait of Laughter Ephraim"
              fill
              className="object-cover object-top md:object-center"
              priority
              sizes="100vw"
            />
          </div>

          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* LEFT COLUMN (cards 1–3) — second on mobile, first on desktop */}
            <div className="order-2 lg:order-1 grid grid-cols-1 gap-4 lg:grid-rows-3">
              {focus.slice(0, 3).map(({ id, title, description, color }) => (
                <AboutCard
                  key={id}
                  id={id}
                  title={title}
                  description={description}
                  color={color}
                />
              ))}
            </div>

            {/* RIGHT COLUMN (desktop image + card 4) — third on mobile, second on desktop */}
            <div className="order-3 lg:order-2 grid grid-cols-1 gap-4 lg:grid-rows-3">
              {/* Desktop image (hidden on mobile) */}
              <div className="relative rounded-2xl overflow-hidden row-span-1 lg:row-span-2 min-h-[260px] sm:min-h-[320px] hidden lg:block">
                <Image
                  src="/images/laughter-headshot.jpg"
                  alt="Portrait of Laughter Ephraim"
                  fill
                  className="object-cover object-top md:object-center"
                  priority
                  sizes="(min-width:1024px) 50vw, 100vw"
                />
              </div>

              {/* Card 4 */}
              <AboutCard
                id={focus[3].id}
                title={focus[3].title}
                description={focus[3].description}
                color={focus[3].color}
              />
            </div>
          </div>
        </div>

        <div id="tools" className="w-full">
          <EditingTools items={Tools} />
        </div>
        <div id="brands" className="w-full">
          <FeaturedBrands items={Brands} />
        </div>
      </div>
    </section>
  );
};
