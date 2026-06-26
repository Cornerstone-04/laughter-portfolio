import { WorksPageContent } from "@/components/works/works-page-content";
import { getAllWorks } from "@/sanity/lib/portfolio-data";

export default async function WorksPage() {
  const works = await getAllWorks();

  return <WorksPageContent works={works} />;
}
