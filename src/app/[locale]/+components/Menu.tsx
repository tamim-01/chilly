"use client";
import MenuItem from "@/components/Common/MenuItem/MenuItem";
import MenuItemSkeleton from "@/components/Common/MenuItem/MenuItemSkeleton";
import Button from "@/components/UI/Button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Pagination } from "./Pagination";

export default function Menu() {
  const [data, setData] = useState<{
    items: MenuItem[];
    totalPages: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown | null>(null);
  const params = useSearchParams();
  const perPage = 8;
  useEffect(() => {
    const page = params.get("page");
    const query = params.get("query");
    const category = params.get("category");
    const filter = params.get("filter");
    console.log("query => ", query);
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/menu/${
            page && parseInt(page) - 1
          }?count=${perPage}&category=${category}&filter=${filter}&${
            query ? `query=${query.trim().toLowerCase()}` : ""
          }`
        );
        if (!response.ok) {
          throw new Error("Sorry we are facing an error please try again.");
        }
        if (response.ok) {
          const res = await response.json();
          setData(res);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    if (page) {
      fetchData();
    }
  }, [params]);
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
        <h2 className="text-2xl">
          {String(error).includes("NetworkError")
            ? "Network Error please try again"
            : "Sorry we are facing an error please try again."}
        </h2>
        <Link href={"/"}>
          <Button variant="secondary">Refresh</Button>
        </Link>
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
