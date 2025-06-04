"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { OPTIONS } from "./options";
import { variables } from "@/locales/variables";
import getTranslation, { TLanguages } from "@/utils/getTranslation";
import TextInput from "../../../../components/UI/inputs/TextInput";
import Select from "@/components/UI/inputs/Select";
import useSetParams from "@/hooks/useSetParams";
import useInitializeParams from "@/hooks/useInitializeParams";
import useDebouncedCallback from "@/hooks/useDebouncedCallback";
import Image from "next/image";
import search from "../../../../../public/icon/search.svg";

export function SearchPanel({ locale }: { locale: TLanguages }) {
  const [query, setQuery] = useState<null | string>(null);
  const searchParams = useSearchParams();
  const t = getTranslation(locale, variables);
  const handleParam = useSetParams();
  const initializer = useInitializeParams();
  const onChange = useDebouncedCallback((query: string) => {
    setQuery(query);
  }, 1000);

  useEffect(() => {
    if (query !== null || query !== undefined) handleParam("query", query);
  }, [handleParam, query]);
  useEffect(() => {
    initializer([
      { param: "category", init: "all" },
      { param: "filter", init: "all" },
      { param: "page", init: "1" },
    ]);
  }, [initializer]);
  return (
    <section className="w-full flex flex-row md:gap-4 gap-2 justify-center md:px-32">
      <div className="md:w-7/12 w-6/12">
        <TextInput
          label={t("menu.search_input.label")}
          icon={
            <Image src={search} width={16} height={16} priority alt="search" />
          }
          fullWidth
          type="search"
          placeholder={t("menu.search_input.placeholder")}
          inputSize="lg"
          onChange={(e) => onChange(e.target.value)}
          defaultValue={searchParams.get("query")?.toString()}
        />
      </div>
      <div className="md:w-5/12 w-6/12 flex flex-row gap-2">
        <Select
          label={t("menu.category.label")}
          fullWidth
          className="text-[18px]"
          placeholder={OPTIONS.FILTER[locale][0].label}
          options={OPTIONS.FOOD_CATEGORY[locale]}
          defaultValue={searchParams.get("category")?.toString()}
          onChange={(e) => {
            if (typeof e === "string") handleParam("category", e);
          }}
        />
        <Select
          label={t("menu.filter.label")}
          fullWidth
          className="text-[18px]"
          placeholder={OPTIONS.FILTER[locale][0].label}
          options={OPTIONS.FILTER[locale]}
          onChange={(e) => {
            if (typeof e === "string") handleParam("filter", e);
          }}
          defaultValue={searchParams.get("filter")?.toString()}
        />
      </div>
    </section>
  );
}
