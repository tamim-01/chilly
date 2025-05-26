import type { Metadata } from "next";
import { Itim, Irish_Grover } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar/Navbar";
import { TLanguages } from "@/utils/getTranslation";

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
export default async function RootLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  return (
    <html lang={locale} dir={locale === "fa" ? "rtl" : "ltr"}>
      <body
        className={`${geistSans.variable} ${geistIrish.variable}  antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
