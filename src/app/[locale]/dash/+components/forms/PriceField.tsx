"use client";
import Checkbox from "@/components/UI/inputs/CheckBox";
import TextInput from "@/components/UI/inputs/TextInput";
import useDebouncedCallback from "@/hooks/useDebouncedCallback";
import discountCalc from "@/utils/discountCalc";
import { useEffect, useState } from "react";
export default function PriceField({
  onChange,
  error,
}: {
  onChange: React.Dispatch<React.SetStateAction<Price | null>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
}) {
  const [price, setPrice] = useState<Price>({
    value: 0,
    discount: 0,
  });
  const [discount, setDiscount] = useState(false);

  const priceChangeHandler = useDebouncedCallback<
    React.ChangeEvent<HTMLInputElement>
  >((e) => {
    setPrice({
      ...price,
      value: isNaN(e.target.valueAsNumber) ? 0 : e.target.valueAsNumber,
    });
  }, 1000);
  useEffect(() => {
    if (onChange) {
      onChange(price);
    }
  }, [price, onChange]);
  useEffect(() => {
    if (discount === true) {
      setPrice((p) => ({ ...p, discount: 0 }));
    }
  }, [discount]);

  return (
    <div className="flex flex-col gap-8 max-w-[354px] w-full">
      <div className="flex flex-row gap-3.5 items-center">
        <TextInput
          onChange={priceChangeHandler}
          min={1}
          step={1}
          fullWidth
          label="Price"
          type="number"
          placeholder="food price"
          icon={"$"}
          error={error?.["value"]?.message ? true : false}
          errorMessage={error?.value?.message}
        />
        <Checkbox
          className="mt-9 text-nowrap"
          label="Discount ?"
          disabled={price.value <= 0}
          onChange={() => {
            setDiscount(!discount);
          }}
          checked={price.value === 0 ? false : discount}
        />
      </div>

      <div className="flex flex-row mt-9 gap-4 ">
        <TextInput
          label="Discount"
          disabled={!discount}
          inputSize="lg"
          className="w-[120px]"
          error={error?.discount?.message ? true : false}
          errorMessage={error?.discount?.message}
          min={10}
          max={100}
          onChange={(e) =>
            setPrice({
              ...price,
              discount: isNaN(e.target.valueAsNumber)
                ? 0
                : e.target.valueAsNumber,
            })
          }
          value={discount === false ? 0 : price.discount}
          onKeyDown={(e) => {
            e.preventDefault();
          }}
          step={10}
          type="number"
          icon={"%"}
        />
        <TextInput
          label="After Discount"
          disabled={true}
          inputSize="lg"
          className="w-[220px]"
          inputMode="numeric"
          value={
            price.discount && price.discount > 0
              ? discountCalc(price.discount, price.value)
              : 0
          }
          readOnly
          type="text"
          iconPosition="right"
          placeholder="price after discount"
        />
      </div>
    </div>
  );
}
