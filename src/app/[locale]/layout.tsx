import type { Metadata } from "next";
import { Itim, Irish_Grover } from "next/font/google";
import "../globals.css";
import { TLanguages } from "@/utils/getTranslation";
import { Header } from "@/components/Layout/Header";

const geistSans = Itim({
  weight: "400",
  variable: "--font-itim",
  subsets: ["latin"],
});

const geistIrish = Irish_Grover({
  weight: "400",
  variable: "--font-irish",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hot chilly",
  description: "",
};
interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: TLanguages;
  }>;
}
export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  return (
    <html lang={locale} dir={locale === "fa" ? "rtl" : "ltr"}>
      <body
        className={`${geistSans.variable} ${geistIrish.variable}  antialiased`}
      >
        <Header />
        <main className="container max-w-[1440px] mx-auto p-6 md:px-16 md:py-8 flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
