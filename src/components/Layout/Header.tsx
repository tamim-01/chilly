"use client";
import { usePathname } from "next/navigation";
import LangSwitcher from "../Common/LangSwitcher";
import Link from "next/link";

export function Header() {
  const path = usePathname();
  const pathArray = path.split("/");
  const locale = pathArray[1];
  const current = pathArray[pathArray.length - 1];
  return (
    <header className="container max-w-[1440px] mx-auto p-6 md:px-16 md:py-8 flex justify-end items-center">
      {path.includes("login") ? (
        <></>
      ) : (
        <nav className="px-5 w-fit py-3 rounded-[16px] border border-foreground bg-secondary flex flex-row items-center gap-3 text-[14px] md:text-3xl ">
          <ul className="flex flex-row ">
            <li className="font-irish">
              <Link href={"/"}>HOT CHILLY</Link>
            </li>
            {path
              .split("/")
              .slice(2)
              .map((p, i) => (
                <div key={i} className="inline-flex md:text-2xl">
                  <li className="md:mx-3 mx-1.5">/</li>
                  <li
                    className={` ${
                      current === p ? "text-amber-600" : "text-foreground"
                    }`}
                  >
                    <Link href={`/${locale}/${p}`}> {p}</Link>
                  </li>
                </div>
              ))}
          </ul>
        </nav>
      )}

      <LangSwitcher />
    </header>
  );
}
