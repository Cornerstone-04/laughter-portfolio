import { HomePageContent } from "@/components/home/home-page-content";
import {
  getAboutPageContent,
  getFeaturedWorks,
  getHomePageContent,
  getSiteSettings,
  getTestimonials,
} from "@/sanity/lib/portfolio-data";

export default async function HomePage() {
  const [home, about, siteSettings, selectedWorks, testimonials] =
    await Promise.all([
      getHomePageContent(),
      getAboutPageContent(),
      getSiteSettings(),
      getFeaturedWorks(),
      getTestimonials(),
    ]);

  return (
    <HomePageContent
      home={home}
      about={about}
      siteSettings={siteSettings}
      selectedWorks={selectedWorks}
      testimonials={testimonials}
    />
  );
}
