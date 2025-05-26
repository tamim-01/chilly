"use client";
import Image from "next/image";
import Select from "../UI/input/Select";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Skeleton from "../UI/skeleton/skeleton";

export default function SelectLang() {
  const [lang, setLang] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    const saved = localStorage.getItem("language") || "en";
    if (saved) {
      setLang(saved);
      router.replace(saved);
    }
  }, [router]);

  return (
    <>
      {lang !== null ? (
        <div className="w-24 md:w-32">
          <Select
            fullWidth
            onChange={(val) => {
              if (typeof val === "string") {
                localStorage.setItem("language", val);
                setLang(val);
                router.replace(val);
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
