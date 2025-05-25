"use client";
import Image from "next/image";
import Select from "../UI/input/Select";
import { useParams, useRouter } from "next/navigation";

export default function SelectLang() {
  const router = useRouter();
  const { locale } = useParams();
  return (
    <Select
      onChange={(val) => {
        if (typeof val === "string") {
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
            <Image alt={"en"} src={"/image/en.png"} width={20} height={20} />
          ),
        },
        {
          label: "ES",
          value: "es",
          image: (
            <Image alt={"es"} src={"/image/es.png"} width={20} height={20} />
          ),
        },
      ]}
      defaultValue={locale}
    />
  );
}
