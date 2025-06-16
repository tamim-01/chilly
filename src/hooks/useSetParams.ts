"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function useSetParams() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleParam = useCallback(
    (param: string, slug: string | null) => {
      const params = new URLSearchParams(searchParams);
      if (slug) {
        params.set(param, slug);
      } else {
        params.delete(param);
      }
      replace(`${pathname}?${params.toString()}`);
    },
    [pathname, replace, searchParams]
  );
  return handleParam;
}
