import { TLanguages } from "@/utils/getTranslation";

interface PageProps {
  params: Promise<{
    locale: TLanguages;
  }>;
}
export default async function Home({ params }: PageProps) {
  const { locale } = await params;
  console.log("locale => ", locale);
  return (
    <>
      <p>dash</p>
    </>
  );
}
