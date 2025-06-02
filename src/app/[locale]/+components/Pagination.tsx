"use client";
import { FC } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

interface PaginationProps {
  pageCount: number;
}

interface PaginationArrowProps {
  direction: "left" | "right";
  href: string;
  isDisabled: boolean;
}

const PaginationArrow: FC<PaginationArrowProps> = ({
  direction,
  href,
  isDisabled,
}) => {
  const router = useRouter();
  const isLeft = direction === "left";
  const disabledClassName = isDisabled
    ? "opacity-50 cursor-not-allowed"
    : "cursor-pointer";

  return (
    <button
      onClick={() => router.push(href)}
      className={`bg-primary px-5 border text-2xl border-foreground py-2 rounded-2xl  text-foreground hover:bg-secondary ${disabledClassName}`}
      disabled={isDisabled}
    >
      {isLeft ? "«" : "»"}
    </button>
  );
};

export function Pagination({ pageCount }: Readonly<PaginationProps>) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };
  if (pageCount > 0) {
    return (
      <div className="flex flex-row items-center justify-center py-8">
        <PaginationArrow
          direction="left"
          href={createPageURL(currentPage - 1)}
          isDisabled={currentPage <= 1}
        />

        <div>
          <span className="p-4 font-semibold text-foreground">
            Page {currentPage}
          </span>
        </div>

        <PaginationArrow
          direction="right"
          href={createPageURL(currentPage + 1)}
          isDisabled={currentPage >= pageCount}
        />
      </div>
    );
  }
}
