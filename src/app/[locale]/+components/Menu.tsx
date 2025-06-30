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
  }>(`api/menu/${page}?${urlParams}`);
  const inventory =
    useFetchedData<Array<Record<string, string | number>>>(`api/inventory`);
  const ingredients =
    useFetchedData<Array<Record<string, string | number>>>(
      `api/menu/ingredients`
    );

  const filteredItems = data?.items
    .sort(function (a, b) {
      return a.id - b.id;
    })
    .filter((item) => {
      const itemIngredients = ingredients.data?.filter(
        (i) => i.item_id == item.id
      );
      const check = itemIngredients?.map((i) =>
        Number(i.value) <
        Number(
          inventory.data?.filter((e) => e.id == i.inventory_id)[0]
            .available_quantity
        )
          ? true
          : false
      );

      if (check?.every((i) => i === true)) return true;
      return false;
    });
  if (loading || inventory.loading || ingredients.loading) {
    return (
      <ul className="w-full py-20 flex flex-col gap-8 ">
        {Array.from({ length: 4 }).map((_, i) => (
          <MenuItemSkeleton key={i} />
        ))}
      </ul>
    );
  }

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

  if (data?.items.length === 0) {
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
        {filteredItems &&
          filteredItems.map((item) => (
            <li key={item.id}>
              <MenuItem item={item} />
            </li>
          ))}
      </ul>
      {data?.totalPages ? (
        <Pagination
          pageCount={data?.totalPages}
          itemCount={filteredItems?.length ?? 0}
        />
      ) : (
        <></>
      )}
    </>
  );
}
