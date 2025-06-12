import { TLanguages } from "@/utils/getTranslation";
import Login from "./+components/login";
interface PageProps {
  params: Promise<{
    locale: TLanguages;
  }>;
}
export default async function login({ params }: PageProps) {
  const { locale } = await params;
  return <Login locale={locale} />;
}
