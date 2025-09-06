import { AboutEphraim } from "@/components/about/about";
import { ContactMe } from "@/components/contact/contact-me";
import Hero from "@/components/hero/hero";
import { FavouriteQuote } from "@/components/quote/favourite-quote";
import { SelectedWorks } from "@/components/selected-works/selected-works";

export default function HomePage() {
  return (
    <div className="relative grid grid-cols-1 gap-y-[40px]">
      <Hero />
      <SelectedWorks />
      <FavouriteQuote />
      <AboutEphraim />
      <ContactMe />
    </div>
  );
}
