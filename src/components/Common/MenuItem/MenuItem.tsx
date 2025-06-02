"use client";
import Image from "next/image";
import Badge from "../../UI/Badge";
import { useState } from "react";

export default function MenuItem({ item }: { item: MenuItem }) {
  const [open, setOpen] = useState(false);
  const { title, payment_type, image_urls, description, spicy } = item;
  const offer = payment_type.discount && payment_type.afterDiscount;
  return (
    <li
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
          {offer && <span>{payment_type.afterDiscount}$</span>}
        </h2>
        <p className={`md:text-2xl mb-3 text-base ${!open && "line-clamp-4"}`}>
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
        <svg
          width="20"
          height="12"
          viewBox="0 0 20 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.99286 7.34329e-05C10.2001 7.34329e-05 10.3969 0.0374346 10.5833 0.112157C10.7694 0.186602 10.9443 0.305629 11.1079 0.46924L19.1537 8.51507C19.4598 8.82118 19.6081 9.1941 19.5987 9.63382C19.5895 10.0738 19.4319 10.4469 19.1258 10.753C18.8197 11.0591 18.4466 11.2122 18.0066 11.2122C17.5669 11.2122 17.194 11.0591 16.8879 10.753L9.99286 3.83007L3.06995 10.753C2.76384 11.0591 2.3955 11.2076 1.96495 11.1984C1.53439 11.189 1.16606 11.0312 0.859947 10.7251C0.553837 10.419 0.40078 10.046 0.40078 9.60632C0.40078 9.16632 0.553837 8.79327 0.859947 8.48716L8.87786 0.46924C9.04147 0.305629 9.21634 0.186602 9.40245 0.112157C9.58884 0.0374346 9.78564 7.34329e-05 9.99286 7.34329e-05Z"
            fill="#5D5D5D"
          />
        </svg>
      </button>
    </li>
  );
}
