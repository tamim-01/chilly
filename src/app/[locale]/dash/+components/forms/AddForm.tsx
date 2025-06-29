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
import DependencyField from "./DependencyField";
import Textarea from "@/components/UI/inputs/Textarea";

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
  });

  const onSubmit: SubmitHandler<ADD_SCHEMA> = (data) => {
    const { dependencies, images, ...rest } = data;
    const admin_id = localStorage.getItem("id");
    if (admin_id) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const item: Record<string, any> = rest;
      console.log("dependencies => ", dependencies);
      const formData = new FormData();
      formData.append("admin_id", JSON.stringify(admin_id));
      for (const key in rest) {
        if (Array.isArray(item[key])) {
          item[key].forEach((value) => formData.append(key, value));
        } else {
          formData.append(key, JSON.stringify(item[key]));
        }
      }
      images.forEach((file) => {
        formData.append("images", file);
      });
      console.log("formData => ", formData);
      fetch("http://localhost:3001/api/menu", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6  py-12 md:mx-auto"
    >
      <section className="flex md:flex-row flex-col gap-16 ">
        <div className="flex flex-col gap-8 max-w-[354px] ">
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
          <Checkbox
            {...register("active")}
            label="visible ? "
            inputSize="lg"
            className="mt-4 text-nowrap"
          />
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

        <Controller
          control={control}
          name="payment_type"
          render={({ field: { onChange } }) => (
            <PriceField onChange={onChange} error={errors.payment_type} />
          )}
        />
      </section>
      <Controller
        control={control}
        name="dependencies"
        render={({ field: { onChange } }) => (
          <DependencyField onChange={onChange} error={errors.dependencies} />
        )}
      />
      <section>
        <Textarea
          error={errors.description?.message ? true : false}
          errorMessage={errors.description?.message}
          {...register("description")}
          label="Description"
          fullWidth
          resize="vertical"
          placeholder="Write a brief description about the food and its ingredients..."
        />
      </section>
      <section className="flex flex-row fixed bottom-1 left-4 md:static">
        <Button variant="danger" className="rounded-xl mr-2" type="button">
          cancel
        </Button>
        <Button variant="secondary" className="rounded-xl" type="submit">
          Confirm
        </Button>
      </section>
    </form>
  );
}
