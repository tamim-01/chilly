import Hero from "@/components/hero/Hero";
import { TLanguages } from "@/utils/getTranslation";
interface PageProps {
  params: Promise<{
    locale: TLanguages;
  }>;
}
export default async function Home({ params }: PageProps) {
  const { locale } = await params;
  return (
    <main className="container max-w-[1440px] mx-auto p-6 md:px-16 md:py-8 flex ">
      <Hero locale={locale} />
    </main>
  );
}
