"use client";
import Checkbox from "@/components/UI/inputs/CheckBox";
import TextInput from "@/components/UI/inputs/TextInput";
import { variables } from "@/locales/variables";
import discountCalc from "@/utils/discountCalc";
import getTranslation, { TLanguages } from "@/utils/getTranslation";
import { useEffect, useRef, useState } from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
export default function PriceField({
  onChange,
  error,
  value,
  hasDefaultValue,
  locale,
}: {
  onChange: React.Dispatch<React.SetStateAction<Price | null>>;
  error:
    | Merge<FieldError, FieldErrorsImpl<{ value: number; discount: number }>>
    | undefined;
  value?: Price;
  hasDefaultValue: boolean;
  locale: TLanguages;
}) {
  const [price, setPrice] = useState<Price>({
    value: 0,
    discount: 0,
  });

  const [discount, setDiscount] = useState(false);
  const priceChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice({
      ...price,
      value: isNaN(e.target.valueAsNumber) ? 0 : e.target.valueAsNumber,
    });
  };
  const didInit = useRef(false);

  useEffect(() => {
    if (hasDefaultValue) {
      if (!didInit.current) {
        if (value) {
          setPrice(value);
          if (value.discount > 0) {
            setDiscount(true);
          }
          didInit.current = true;
        }
      }
    } else {
      didInit.current = true;
    }
  }, [value, hasDefaultValue]);
  useEffect(() => {
    if (didInit.current) {
      onChange(price);
    }
  }, [price, onChange]);

  const t = getTranslation(locale, variables);
  return (
    <div className="flex flex-col gap-8 max-w-[354px] w-full">
      <div className="flex flex-row gap-3.5 items-center">
        <TextInput
          onChange={priceChangeHandler}
          value={price.value}
          min={1}
          step={1}
          fullWidth
          label={t("add.form.price.label")}
          type="number"
          placeholder={t("add.form.price.place_holder")}
          icon={"$"}
          error={error?.["value"]?.message ? true : false}
          errorMessage={error?.value?.message}
        />
        <Checkbox
          className="mt-9 text-nowrap"
          label={t("add.form.price.discount")}
          disabled={price.value <= 0}
          onChange={() => {
            setDiscount(!discount);
          }}
          checked={price.value === 0 ? false : discount}
        />
      </div>

      <div className="flex flex-row mt-9 gap-4 ">
        <TextInput
          label={t("add.form.price.discount_label")}
          disabled={!discount || price.value <= 0}
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
          label={t("add.form.price.after_discount_label")}
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
          placeholder={t("add.form.price.after_discount_place_holder")}
        />
      </div>
    </div>
  );
}
