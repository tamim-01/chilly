"use client";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";

export default function NavButton({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) {
  const r = useRouter();
  const p = usePathname();
  return (
    <button
      onClick={() => r.push(p + href)}
      className="w-full bg-secondary flex flex-row justify-center items-center gap-3 md:py-8 py-4 border border-foreground rounded-[18px] cursor-pointer hover:bg-primary  active:scale-[0.98] duration-200  "
    >
      {children}
    </button>
  );
}
