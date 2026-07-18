"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import focus from "@/data/about.json";
import { AboutCard } from "../shared/about-card";
import { EditingTools } from "../shared/editing-tools";
import Tools from "@/data/tools.json";
import Brands from "@/data/brands.json";
import { FeaturedBrands } from "../shared/featured-brands";
import { m as motion, useReducedMotion } from "motion/react";
import type { AboutPageContent } from "@/sanity/lib/portfolio-data";

type Props = {
  content?: AboutPageContent;
};

export const AboutEphraim = ({ content }: Props) => {
  const prefersReduced = useReducedMotion();
  const focusCards = content?.focusCards?.length ? content.focusCards : focus;
  const tools = content?.tools?.length ? content.tools : Tools;
  const brands = content?.brands?.length ? content.brands : Brands;
  const headshot = content?.headshot || "/images/laughter-headshot.jpg";

  // parent controls the stagger
  const gridContainer = {
    hidden: { opacity: 1 }, // keep container visible to avoid flash
    visible: {
      opacity: 1,
      transition: prefersReduced
        ? { duration: 0 }
        : { staggerChildren: 0.08, delayChildren: 0.05 },
    },
  };

  // child anim: small rise + fade (very subtle; change y to 0 for pure-fade)
  const gridItem = prefersReduced
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } };

  return (
    <section
      id="about-laughter"
      className="flex w-full flex-col items-center justify-center self-stretch p-6 sm:p-8 md:p-16 dark:bg-[#15151E]"
    >
      <div className="mx-auto flex w-full max-w-268 flex-col items-center justify-center gap-16">
        {/* Details (unchanged) */}
        <div
          id="details"
          className="flex flex-col items-start gap-8 self-stretch"
        >
          <div className="flex w-full flex-col items-center justify-between gap-4 md:flex-row md:gap-6">
            <h1 className="text-3xl leading-tight font-semibold tracking-[-1.44px] text-[#2A2936] sm:text-4xl md:text-5xl md:leading-normal dark:text-white">
              {content?.headline ?? "About Laughter"}
            </h1>
            <Button
              asChild
              variant="primary"
              className="flex h-12 w-full items-center justify-center px-6 py-3 text-base font-medium sm:h-14 sm:w-fit sm:px-8 sm:py-4"
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
            <p className="self-stretch text-base leading-relaxed font-medium tracking-[-0.48px] text-[#454545] sm:text-lg md:text-2xl md:leading-normal dark:text-[#cacaca]">
              {content?.body ??
                "Hi there! I'm Laughter Ephraim, an AMVCA-nominated film editor with a passion to create stories. With 6 years in the film industry, I have developed a love for bringing stories to life with precision and creativity. I believe in the power of storytelling and its ability to connect, inspire and entertain. It's more than just editing. It's about conveying a message that matters."}
            </p>
          </div>
        </div>

        <div id="focus">
          {/* Mobile-first image (shown only below lg) */}
          <motion.div
            variants={gridItem}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            transition={
              prefersReduced
                ? { duration: 0 }
                : { duration: 0.5, ease: "easeOut" }
            }
            className="relative mb-4 min-h-65 overflow-hidden rounded-2xl sm:min-h-80 lg:hidden"
          >
            <Image
              src={headshot}
              alt="Portrait of Laughter Ephraim"
              fill
              className="object-cover object-top md:object-center"
              priority
              sizes="100vw"
            />
          </motion.div>

          {/* Grid container gains the stagger */}
          <motion.div
            variants={gridContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2"
          >
            {/* LEFT COLUMN (cards 1–3) */}
            <div className="order-2 grid grid-cols-1 gap-4 lg:order-1 lg:grid-rows-3">
              {focusCards
                .slice(0, 3)
                .map(({ id, title, description, color }) => (
                  <motion.div
                    key={id}
                    variants={gridItem}
                    transition={
                      prefersReduced
                        ? { duration: 0 }
                        : { duration: 0.45, ease: "easeOut" }
                    }
                  >
                    <AboutCard
                      id={id}
                      title={title}
                      description={description}
                      color={color}
                    />
                  </motion.div>
                ))}
            </div>

            {/* RIGHT COLUMN (desktop image + card 4) */}
            <div className="order-3 grid grid-cols-1 gap-4 lg:order-2 lg:grid-rows-3">
              {/* Desktop image */}
              <motion.div
                variants={gridItem}
                transition={
                  prefersReduced
                    ? { duration: 0 }
                    : { duration: 0.45, ease: "easeOut" }
                }
                className="relative row-span-1 hidden min-h-65 overflow-hidden rounded-2xl sm:min-h-80 lg:row-span-2 lg:block"
              >
                <Image
                  src="/images/laughter-headshot.jpg"
                  alt="Portrait of Laughter Ephraim"
                  fill
                  className="object-cover object-top md:object-center"
                  priority
                  sizes="(min-width:1024px) 50vw, 100vw"
                />
              </motion.div>

              {/* Card 4 */}
              <motion.div
                variants={gridItem}
                transition={
                  prefersReduced
                    ? { duration: 0 }
                    : { duration: 0.45, ease: "easeOut" }
                }
              >
                <AboutCard
                  id={focusCards[3]?.id ?? 4}
                  title={focusCards[3]?.title ?? "Meaningful Impact"}
                  description={focusCards[3]?.description ?? ""}
                  color={focusCards[3]?.color ?? "#4F46E5"}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>

        <div id="tools" className="w-full">
          <EditingTools items={tools} />
        </div>
        <div id="brands" className="w-full">
          <FeaturedBrands items={brands} />
        </div>
      </div>
    </section>
  );
};
