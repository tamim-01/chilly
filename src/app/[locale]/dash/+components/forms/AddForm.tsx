"use client";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ADD_SCHEMA, schema } from "./addValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "@/components/UI/inputs/TextInput";
import Button from "@/components/UI/Button";
import Checkbox from "@/components/UI/inputs/CheckBox";
import FileInput from "@/components/UI/inputs/FileInput";

export default function AddForm() {
  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
  } = useForm<ADD_SCHEMA>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      spicy: false,
    },
  });
  const onSubmit: SubmitHandler<ADD_SCHEMA> = (data) => {
    console.log(data);
  };
  return (
    <section>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 w-fit"
      >
        <TextInput
          {...register("name")}
          label="Food name"
          type="text"
          error={errors?.["name"]?.message ? true : false}
          errorMessage={errors?.["name"]?.message}
          placeholder="Taco with avocado..."
        />
        <Checkbox {...register("spicy")} label="Is it Spicy?" />
        <Controller
          control={control}
          name="images"
          render={({ field: { onChange } }) => (
            <FileInput
              label="upload images"
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

        <Button variant="secondary" className="rounded-xl" type="submit">
          Confirm
        </Button>
      </form>
    </section>
  );
}
