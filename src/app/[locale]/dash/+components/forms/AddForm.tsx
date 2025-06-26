"use client";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ADD_SCHEMA, schema } from "./addValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "@/components/UI/inputs/TextInput";
import Button from "@/components/UI/Button";
import Checkbox from "@/components/UI/inputs/CheckBox";
import FileInput from "@/components/UI/inputs/FileInput";
import PriceField from "./PriceField";
import Select from "@/components/UI/inputs/Select";
import { OPTIONS } from "@/components/Common/searchPanel/options";
import { usePathname } from "next/navigation";
import { TLanguages } from "@/utils/getTranslation";

export default function AddForm() {
  const locale = usePathname().split("/")[1] as TLanguages;

  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
  } = useForm<ADD_SCHEMA>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {
      title: "",
      spicy: false,
    },
  });

  const onSubmit: SubmitHandler<ADD_SCHEMA> = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 w-full py-16"
    >
      <div className="flex md:flex-row flex-col gap-16 justify-center">
        <div className="flex flex-col gap-8 max-w-[354px] w-full">
          <div className="flex flex-row gap-3.5 items-center ">
            <TextInput
              {...register("title")}
              fullWidth
              label="Food title"
              type="text"
              error={errors?.["title"]?.message ? true : false}
              errorMessage={errors?.["title"]?.message}
              placeholder="Taco with avocado..."
            />
            <Checkbox
              {...register("spicy")}
              label="Is it Spicy?"
              className="mt-9 text-nowrap"
            />
          </div>

          <Controller
            name="category"
            control={control}
            render={({ field: { onChange } }) => (
              <Select
                label="Category"
                className="mt-9 text-[18px]"
                error={errors?.["category"]?.message ? true : false}
                errorMessage={errors?.["category"]?.message}
                options={OPTIONS.FOOD_CATEGORY[locale].filter(
                  (i) => i.value !== "all"
                )}
                onChange={onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="images"
            render={({ field: { onChange } }) => (
              <FileInput
                fullWidth
                label="Upload images"
                multiple
                onFilesSelected={onChange}
                droppable
                accept="image/jpeg , image/png , image/jpg , image/webp"
                buttonText="Upload"
                error={errors?.["images"]?.message ? true : false}
                errorMessage={errors?.["images"]?.message?.toString()}
              />
            )}
          />
        </div>
        <div className="flex flex-col gap-8 max-w-[354px] w-full">
          <Controller
            control={control}
            name="price"
            render={({ field: { onChange } }) => (
              <PriceField onChange={onChange} error={errors.price} />
            )}
          />
        </div>
      </div>
      <div className="flex flex-row fixed bottom-1 left-4 md:static">
        <Button variant="danger" className="rounded-full mr-2" type="button">
          X
        </Button>
        <Button variant="secondary" className="rounded-xl" type="submit">
          Confirm
        </Button>
      </div>
    </form>
  );
}
