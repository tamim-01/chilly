import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function useInitializeParams() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const initializer = useCallback(
    (inits: { param: string; init: string }[]) => {
      const params = new URLSearchParams(searchParams);
      inits.forEach((i) => {
        if (!params.get(i.param)) {
          params.set(i.param, i.init);
        }
      });

      replace(`${pathname}?${params.toString()}`);
    },
    [searchParams, replace, pathname]
  );
  return initializer;
}
