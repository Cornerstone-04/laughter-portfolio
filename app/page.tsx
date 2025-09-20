"use client";

import Hero from "@/components/hero/hero";
import { SelectedWorks } from "@/components/selected-works/selected-works";
import { FavouriteQuote } from "@/components/quote/favourite-quote";
import { AboutEphraim } from "@/components/about/about";
import { Testimonials } from "@/components/testimonials/testimonials";
import { ContactMe } from "@/components/contact/contact-me";
import { LazyMotion, domAnimation } from "framer-motion";
import { Section } from "@/components/shared/animated-section";

export default function HomePage() {
  return (
    <LazyMotion features={domAnimation}>
      <div className="relative grid grid-cols-1 gap-y-[40px]">
        <Section amount={0.25}>
          <Hero />
        </Section>
        <Section amount={0.05}>
          <SelectedWorks />
        </Section>
        <Section amount={0.15} delay={0.05}>
          <FavouriteQuote />
        </Section>
        <Section amount={0.15} delay={0.05}>
          <AboutEphraim />
        </Section>
        {/* <Section amount={0.15} delay={0.05}>
          <Testimonials />
        </Section> */}
        <Section amount={0.15} delay={0.05}>
          <ContactMe />
        </Section>
      </div>
    </LazyMotion>
  );
}
