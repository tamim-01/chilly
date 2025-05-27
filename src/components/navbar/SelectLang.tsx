"use client";
import Image from "next/image";
import Select from "../UI/input/Select";
import Skeleton from "../UI/skeleton/skeleton";
import { usePathname, useRouter } from "next/navigation";

export default function SelectLang() {
  const router = useRouter();
  const pathName = usePathname();
  const langFromUrl = pathName.split("/")[1];
  const lang = langFromUrl;

  return (
    <>
      {lang !== null ? (
        <div className="w-24 md:w-32">
          <Select
            fullWidth
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
      ) : (
        <div className=" w-24 md:w-32 h-[50px] md:h-[59px]  rounded-[16px] border border-foreground bg-secondary flex flex-row items-center justify-between px-2 md:px-6 md:gap-4">
          <Skeleton width="25px" height="25px" rounded="full" />
          <Skeleton width="36px" height="26px" />
        </div>
      )}
    </>
  );
}
