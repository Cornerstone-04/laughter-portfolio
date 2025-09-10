"use client";

import Hero from "@/components/hero/hero";
import { SelectedWorks } from "@/components/selected-works/selected-works";
import { FavouriteQuote } from "@/components/quote/favourite-quote";
import { AboutEphraim } from "@/components/about/about";
import { Testimonials } from "@/components/testimonials/testimonials";
import { ContactMe } from "@/components/contact/contact-me";

import {
  LazyMotion,
  domAnimation,
  m as motion,
  useReducedMotion,
} from "framer-motion";
import type { PropsWithChildren } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 },
};

// Reusable section wrapper: handles scroll-in animation once.
function Section({
  children,
  amount = 0.2, // % of element in view before animating
  delay = 0,
}: PropsWithChildren<{ amount?: number; delay?: number }>) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={fadeUp}
      transition={
        prefersReduced
          ? { duration: 0 }
          : { duration: 0.8, ease: "easeOut", delay }
      }
    >
      {children}
    </motion.div>
  );
}

export default function HomePage() {
  return (
    <div className="relative grid grid-cols-1 gap-y-[40px]">
      <LazyMotion features={domAnimation}>
        <Section amount={0.25}>
          <Hero />
        </Section>
        <Section amount={0.25} delay={0.05}>
          <SelectedWorks />
        </Section>
        <Section amount={0.25} delay={0.05}>
          <FavouriteQuote />
        </Section>
        <Section amount={0.25} delay={0.05}>
          <AboutEphraim />
        </Section>
        <Section amount={0.25} delay={0.05}>
          <Testimonials />
        </Section>
        <Section amount={0.25} delay={0.05}>
          <ContactMe />
        </Section>
      </LazyMotion>
    </div>
  );
}
