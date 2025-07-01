"use client";
import Badge from "@/components/UI/Badge";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function UploadedImages({
  value,
  onChange,
  label,
}: {
  value: string[];
  onChange: React.Dispatch<React.SetStateAction<string[] | null>>;
  label: string;
}) {
  const [items, setItems] = useState<string[]>([]);
  const didInit = useRef(false);
  useEffect(() => {
    if (!didInit.current) {
      if (value) {
        setItems(value);
        didInit.current = true;
      }
    }
  }, [value]);
  useEffect(() => {
    if (didInit.current) {
      onChange(items);
    }
  }, [onChange, items]);
  const handleRemoveFile = (index: number) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };
  return (
    <section className="w-full">
      <h3 className="pb-2 text-[18px]">{label}</h3>
      <div className="bg-secondary py-2.5 px-4 overflow-x-auto rounded-2xl border-1 border-foreground flex flex-row gap-4">
        {items.length > 0 ? (
          items.map((i, index) => (
            <div
              key={index}
              className="relative w-fit rounded-2xl overflow-hidden shadow-xl"
            >
              <Image src={i} alt="image" width={120} height={120} />
              <Badge variant="info" className="flex-row absolute right-0 top-0">
                <span
                  className={`cursor-pointer py-[2px] rounded-full text-center   text-white  hover:opacity-70 transition text-sm font-bold`}
                  onClick={() => {
                    handleRemoveFile(index);
                  }}
                >
                  ×
                </span>
              </Badge>
            </div>
          ))
        ) : (
          <p className="text-[#a5a5a8] text-base">
            No image uploaded before...
          </p>
        )}
      </div>
    </section>
  );
}
