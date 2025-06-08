"use client";
import MenuItem from "@/components/Common/MenuItem/MenuItem";
import MenuItemSkeleton from "@/components/Common/MenuItem/MenuItemSkeleton";
import Button from "@/components/UI/Button";
import { useRouter, useSearchParams } from "next/navigation";
import { Pagination } from "./Pagination";
import useFetchedData from "@/hooks/useFetchedData";

export default function Menu() {
  const params = useSearchParams();
  const { refresh } = useRouter();
  const page = params.get("page") ?? "1";
  const perPage = "8";
  const searchParams = {
    count: perPage,
    category: params.get("category") ?? "all",
    filter: params.get("filter") ?? "all",
    query: params.get("query")?.trim().toLowerCase() ?? "",
  };
  const urlParams = new URLSearchParams(searchParams);
  const { data, error, loading } = useFetchedData<{
    items: MenuItem[];
    totalPages: number;
  }>(`http://localhost:3001/api/menu/${page}?${urlParams}`);

  if (loading)
    return (
      <ul className="w-full py-20 flex flex-col gap-8 ">
        {Array.from({ length: 4 }).map((_, i) => (
          <MenuItemSkeleton key={i} />
        ))}
      </ul>
    );
  if (error) {
    return (
      <section className="w-full h-80 flex flex-col justify-center items-center gap-12">
        <h3 className="text-2xl">
          {String(error).includes("NetworkError")
            ? "Network Error please try again"
            : "Sorry we are facing an error please try again."}
        </h3>

        <Button onClick={refresh} variant="secondary">
          Refresh
        </Button>
      </section>
    );
  }

  if (data && data.items.length === 0) {
    return (
      <section className="w-full h-80 flex justify-center items-center">
        <h2 className="md:text-2xl text-xl ">
          Sorry there is no item to show...
        </h2>
      </section>
    );
  }

  return (
    <>
      <ul className="w-full py-20 flex flex-col gap-8 ">
        {data &&
          data.items
            .sort(function (a, b) {
              return a.id - b.id;
            })
            .map((item) => <MenuItem key={item.id} item={item} />)}
      </ul>
      {data?.totalPages ? <Pagination pageCount={data?.totalPages} /> : <></>}
    </>
  );
}
