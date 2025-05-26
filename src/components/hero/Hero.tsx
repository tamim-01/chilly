import { variables } from "@/locales/variables";
import getTranslation, { TLanguages } from "@/utils/getTranslation";
import Image from "next/image";

export default function Hero({ locale }: { locale: TLanguages }) {
  const t = getTranslation(locale, variables);
  return (
    <section className="flex flex-col md:flex-row w-full items-center gap-6 md:gap-16 justify-center py-16 ">
      <div className="relative w-[160px] h-[148px] md:w-[310px] md:h-[286px]">
        <Image
          src={"/image/pan.png"}
          fill
          alt="pan-image"
          sizes="(max-width: 768px) 100vw"
        />
      </div>
      <section className="flex flex-col items-center  md:items-start">
        <h1 className="font-irish text-[22px] md:text-[56px]">
          {t("menu.title.one")}
        </h1>
        <h2 className="text-gray-500 text-[22px] md:text-[48px]">
          {t("menu.title.two")}
        </h2>
      </section>
    </section>
  );
}
