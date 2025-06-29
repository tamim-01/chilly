"use client";
import { ToastProvider } from "@/components/UI/ToastProvider";
import { useEffect, useState } from "react";
import Fetch from "@/utils/Fetch";
import { usePathname, useRouter } from "next/navigation";
import LoadingSpinner from "@/components/UI/Spinner";

interface LayoutProps {
  children: React.ReactNode;
}
export default function DashLayout({ children }: LayoutProps) {
  const [auth, setAuth] = useState(false);
  const r = useRouter();
  const path = usePathname();

  useEffect(() => {
    const locale = path.split("/")[1];
    const checkAuth = async () => {
      try {
        await Fetch.get({ url: "/admin" }).then((res) => {
          if (res.status === "success") {
            localStorage.setItem("user", res.result.username);
            localStorage.setItem("role", res.result.role);
            localStorage.setItem("id", res.result.id);
            if (path.includes("/dash/login")) {
              r.push(`http://localhost:3000/${locale}/dash`);
            }
            setAuth(true);
          } else {
            r.push(`http://localhost:3000/${locale}/dash/login`);
          }
        });
      } catch (error) {
        setAuth(false);
        console.log(error);
      }
    };
    checkAuth();
  }, [r, path]);
  if (!auth && !path.includes("/dash/login")) {
    return (
      <section className="h-screen flex justify-center items-center">
        <LoadingSpinner size={"lg"} />
      </section>
    );
  }
  if (auth || path.includes("/dash/login"))
    return <ToastProvider>{children}</ToastProvider>;
}
