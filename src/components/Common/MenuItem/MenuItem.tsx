"use client";
import Image from "next/image";
import Badge from "../../UI/Badge";
import { useState } from "react";
import discountCalc from "@/utils/discountCalc";

export default function MenuItem({ item }: { item: MenuItem }) {
  const [open, setOpen] = useState(false);
  const { title, payment_type, image_urls, description, spicy } = item;
  const offer = payment_type.discount > 0;
  return (
    <article
      className=" cursor-pointer border-b-1 border-gray-600 transition-all duration-500"
      onClick={() => {
        setOpen(!open);
      }}
    >
      <div className="relative shadow-2xl  float-left clear-none overflow-hidden md:w-[262px] md:h-[262px] w-[172px] h-[172px] rounded-3xl border border-foreground mr-4 md:mr-20 mb-0.5">
        <Image
          src={image_urls[0]}
          alt={title}
          fill
          className="w-full h-full top-0 left-0 object-cover"
          sizes="(max-width: 768px) 100vw"
          loading="lazy"
        />
        {offer && (
          <div className="absolute -rotate-45 font-bold top-4 left-[-32px]  text-[12px] px-8 py-1 bg-red-500">
            %{payment_type.discount} OFF !!!
          </div>
        )}
      </div>
      <div className="md:min-h-[262px]">
        <h2 className="md:text-3xl text-lg mb-3">
          {title}
          <span
            className={`md:ml-6 mx-2 ${offer && "line-through text-gray-500"}`}
          >
            {payment_type.value}$
          </span>
          {offer && (
            <span>
              {discountCalc(payment_type.discount, payment_type.value)}$
            </span>
          )}
        </h2>
        <p
          className={`md:text-2xl mb-3 text-base text-justify ${
            !open && ` ${spicy ? "line-clamp-3" : "line-clamp-4"} `
          }`}
        >
          {description}
        </p>
        {spicy && <Badge size="lg">Spicy</Badge>}
      </div>

      <div
        className={`${
          open ? "flex" : "hidden"
        } flex-row flex-wrap md:gap-5 gap-2 transition-all fade-in mt-6`}
      >
        {image_urls.map((i, index) => {
          return (
            <div
              key={index}
              className="relative overflow-hidden md:w-[200px] md:h-[200px] w-[100px] h-[100px] rounded-3xl border border-foreground"
            >
              <Image
                src={i}
                alt={title}
                fill
                className="w-full shadow-2xl h-full top-0 left-0 object-cover"
                sizes="(max-width: 768px) 100vw"
                loading="lazy"
              />
            </div>
          );
        })}
      </div>
      <button
        className={`w-full cursor-pointer py-6 flex justify-center transition-all duration-200 ${
          open && "rotate-180"
        }`}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <Image
          src={"/icon/arrow-down.svg"}
          width={16}
          height={16}
          priority
          alt="open/close"
        />
      </button>
    </article>
  );
}
