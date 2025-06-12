"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Select from "../UI/inputs/Select";

export default function LangSwitcher() {
  const router = useRouter();
  const pathName = usePathname();
  const langFromUrl = pathName.startsWith("/dash")
    ? pathName.split("/")[2]
    : pathName.split("/")[1];
  const lang = langFromUrl || "en";

  return (
    <div className="w-24 md:w-32" data-testid="lang-select">
      <Select
        fullWidth
        placeholder="select"
        onChange={(val) => {
          if (typeof val === "string") {
            document.cookie = `locale=${val}; path=/; max-age=31536000`;
            const newPath = pathName.replace(/^\/(en|fa)/, `/${val}`);
            router.push(newPath);
          } else {
            return;
          }
        }}
        className="text-base md:text-[22px] leading-normal"
        options={[
          {
            label: "EN",
            value: "en",
            image: (
              <Image
                alt={"english"}
                src={"/image/en.png"}
                width={25}
                height={25}
              />
            ),
          },
          {
            label: "FA",
            value: "fa",
            image: (
              <Image
                alt={"farsi"}
                src={"/image/fa.png"}
                width={25}
                height={25}
              />
            ),
          },
        ]}
        defaultValue={lang}
      />
    </div>
  );
}
