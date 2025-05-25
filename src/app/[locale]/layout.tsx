import type { Metadata } from "next";
import { Itim, Irish_Grover } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar/Navbar";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistIrish.variable}  antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
