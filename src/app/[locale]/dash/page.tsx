import { TLanguages } from "@/utils/getTranslation";
import { SearchPanel } from "../../../components/Common/searchPanel/SearchPanel";
import NavPanel from "./+components/NavPanel/NavPanel";
import Menu from "./+components/Menu";

interface PageProps {
  params: Promise<{
    locale: TLanguages;
  }>;
}
export default async function Home({ params }: PageProps) {
  const { locale } = await params;
  return (
    <>
      <NavPanel />
      <SearchPanel locale={locale} />
      <Menu locale={locale} />
    </>
  );
}
