"use client";

import { AboutEphraim } from "@/components/about/about";
import { ContactMe } from "@/components/contact/contact-me";
import Hero from "@/components/hero/hero";
import { FavouriteQuote } from "@/components/quote/favourite-quote";
import { Section } from "@/components/shared/animated-section";
import { SelectedWorks } from "@/components/selected-works/selected-works";
import { Testimonials } from "@/components/testimonials/testimonials";
import type {
  AboutPageContent,
  HomePageContent,
  SiteSettings,
  TestimonialItem,
  WorkContent,
} from "@/sanity/lib/portfolio-data";
import { LazyMotion, domAnimation } from "motion/react";

type Props = {
  home: HomePageContent;
  about: AboutPageContent;
  siteSettings: SiteSettings;
  selectedWorks: WorkContent[];
  testimonials: TestimonialItem[];
};

export function HomePageContent({
  home,
  about,
  siteSettings,
  selectedWorks,
  testimonials,
}: Props) {
  return (
    <LazyMotion features={domAnimation}>
      <div className="relative grid grid-cols-1 gap-y-10">
        <Section amount={0.25}>
          <Hero
            headline={home.heroHeadline}
            intro={home.heroIntro}
            ctaLabel={home.heroCtaLabel}
            ctaLink={home.heroCtaLink}
            galleryItems={home.gallery}
          />
        </Section>
        <Section amount={0.05}>
          <SelectedWorks works={selectedWorks} />
        </Section>
        <Section amount={0.15} delay={0.05}>
          <FavouriteQuote
            text={home.quoteText}
            attribution={home.quoteAttribution}
          />
        </Section>
        <Section amount={0.15} delay={0.05}>
          <AboutEphraim content={about} />
        </Section>
        <Section amount={0.15} delay={0.05}>
          <Testimonials items={testimonials} />
        </Section>
        <Section amount={0.15} delay={0.05}>
          <ContactMe settings={siteSettings} />
        </Section>
      </div>
    </LazyMotion>
  );
}
