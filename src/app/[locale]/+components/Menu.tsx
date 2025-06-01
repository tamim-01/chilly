"use client";
import MenuItem from "@/components/Common/MenuItem/MenuItem";
import MenuItemSkeleton from "@/components/Common/MenuItem/MenuItemSkeleton";
import Button from "@/components/UI/Button";
import { TLanguages } from "@/utils/getTranslation";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Menu({ locale }: { locale: TLanguages }) {
  const [data, setData] = useState<MenuItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown | null>(null);
  console.log(" locale:", locale);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/menu");
        if (!response.ok) {
          throw new Error("Sorry we are facing an error please try again.");
        }
        if (response.ok) {
          const result = await response.json();
          setData(result);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  if (loading)
    return (
      <ul className="w-full py-20 flex flex-col gap-8 ">
        {Array.from({ length: 4 }).map((_, i) => (
          <MenuItemSkeleton key={i} />
        ))}
      </ul>
    );
  if (error)
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
  if (data && data.length === 0)
    return (
      <section className="w-full h-80 flex justify-center items-center">
        <h2 className="md:text-2xl text-xl ">
          Sorry there is no item to show...
        </h2>
      </section>
    );
  return (
    <ul className="w-full py-20 flex flex-col gap-8 ">
      {data && data.map((item) => <MenuItem key={item.id} item={item} />)}
    </ul>
  );
}
