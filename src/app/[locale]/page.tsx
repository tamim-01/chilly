import Hero from "@/app/[locale]/+components/Hero";
import { SearchPanel } from "@/app/[locale]/+components/searchPanel/SearchPanel";
import { TLanguages } from "@/utils/getTranslation";
import Menu from "./+components/Menu";
import { Pagination } from "./+components/Pagintaion";
interface PageProps {
  params: Promise<{
    locale: TLanguages;
  }>;
}
export default async function Home({ params }: PageProps) {
  const { locale } = await params;
  return (
    <>
      <Hero locale={locale} />
      <SearchPanel locale={locale} />
      <Menu locale={locale} />
      <Pagination pageCount={12} />
    </>
  );
}
