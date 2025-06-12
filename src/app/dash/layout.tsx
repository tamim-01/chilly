"use client";
import { Itim, Irish_Grover } from "next/font/google";
import "../globals.css";
import { ToastProvider } from "@/components/UI/ToastProvider";
import { useEffect, useState } from "react";
import Fetch from "@/utils/Fetch";
import { usePathname, useRouter } from "next/navigation";
import LoadingSpinner from "@/components/UI/Spinner";

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

interface LayoutProps {
  children: React.ReactNode;
}
export default function DashLayout({ children }: LayoutProps) {
  const [auth, setAuth] = useState(false);
  const r = useRouter();
  const path = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await Fetch.get({ url: "/admin" }).then((res) => {
          if (res.status === "success") {
            localStorage.setItem("user", res.result.username);
            localStorage.setItem("role", res.result.role);
            if (path === "/dash/login") {
              r.push("/dash");
            }
            setAuth(true);
          } else {
            r.push("/dash/login");
          }
        });
      } catch (error) {
        setAuth(false);
        console.log(error);
      }
    };
    checkAuth();
  }, [r, path]);
  if (!auth && path !== "/dash/login") {
    return (
      <html>
        <body
          className={`${geistSans.variable} ${geistIrish.variable}  antialiased`}
        >
          <main className="container max-w-[1440px] mx-auto p-6 md:px-16 md:py-8 flex flex-col justify-center items-center">
            <LoadingSpinner />
          </main>
        </body>
      </html>
    );
  }
  if (auth || path === "/dash/login")
    return (
      <html>
        <body
          className={`${geistSans.variable} ${geistIrish.variable}  antialiased`}
        >
          <main className="container max-w-[1440px] mx-auto p-6 md:px-16 md:py-8 flex flex-col">
            <ToastProvider>{children}</ToastProvider>
          </main>
        </body>
      </html>
    );
}
