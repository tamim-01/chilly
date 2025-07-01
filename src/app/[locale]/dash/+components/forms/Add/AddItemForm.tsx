"use client";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ADD_SCHEMA, schema } from "./addValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "@/components/UI/inputs/TextInput";
import Button from "@/components/UI/Button";
import Checkbox from "@/components/UI/inputs/CheckBox";
import FileInput from "@/components/UI/inputs/FileInput";
import PriceField from "../PriceField";
import Select from "@/components/UI/inputs/Select";
import { OPTIONS } from "@/components/Common/searchPanel/options";
import { usePathname, useRouter } from "next/navigation";
import getTranslation, { TLanguages } from "@/utils/getTranslation";
import DependencyField from "../DependencyField";
import Textarea from "@/components/UI/inputs/Textarea";
import { useToast } from "@/hooks/useToast";
import Fetch from "@/utils/Fetch";
import { useState } from "react";
import { variables } from "@/locales/variables";

export default function AddItemForm() {
  const locale = usePathname().split("/")[1] as TLanguages;
  const t = getTranslation(locale, variables);
  const { toast } = useToast();
  const r = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
  } = useForm<ADD_SCHEMA>({
    resolver: zodResolver(schema),
    defaultValues: {
      active: true,
    },
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<ADD_SCHEMA> = async (data) => {
    const { images, dependencies, ...rest } = data;
    const admin_id = localStorage.getItem("id");

    if (admin_id) {
      const formData = new FormData();
      formData.append("admin_id", JSON.stringify(admin_id));
      const item: Record<string, unknown> = rest;
      for (const key in item) {
        if (Array.isArray(item[key])) {
          item[key].forEach((value) => formData.append(key, value));
        } else {
          formData.append(key, JSON.stringify(item[key]));
        }
      }
      images.forEach((file) => {
        formData.append("images", file);
      });
      dependencies.forEach((d) => {
        formData.append("dependency", JSON.stringify(d));
      });
      const item_id = Math.floor(Math.random() * 100000);
      formData.append("id", item_id.toString());
      setLoading(true);
      await Fetch.post({ url: "/menu", params: formData }).then(async (res) => {
        if (res.status === "success") {
          toast({
            message: t("add.successful"),
            position: "top-right",
            type: "success",
          });
          setLoading(false);
          r.push(`/${locale}/dash`);
        } else {
          setLoading(false);
          toast({
            message: t("add.error"),
            position: "top-right",
            type: "error",
          });
        }
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
              label={t("add.form.title.label")}
              type="text"
              error={errors?.["title"]?.message ? true : false}
              errorMessage={errors?.["title"]?.message}
              placeholder={t("add.form.title.place_holder")}
            />
            <Checkbox
              {...register("spicy")}
              label={t("add.form.spicy.label")}
              className="mt-9 text-nowrap"
            />
          </div>
          <Checkbox
            {...register("active")}
            label={t("add.form.visible.label")}
            inputSize="lg"
            className="mt-4 text-nowrap"
          />
          <Controller
            name="category"
            control={control}
            render={({ field: { onChange } }) => (
              <Select
                label={t("menu.category.label")}
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
                label={t("add.form.Image.label")}
                multiple
                onFilesSelected={onChange}
                droppable
                accept="image/jpeg , image/png , image/jpg , image/webp"
                buttonText={t("add.form.Image.button")}
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
            <PriceField
              onChange={onChange}
              error={errors.payment_type}
              locale={locale}
              hasDefaultValue={false}
            />
          )}
        />
      </section>
      <Controller
        control={control}
        name="dependencies"
        render={({ field: { onChange } }) => (
          <DependencyField
            locale={locale}
            onChange={onChange}
            error={errors.dependencies}
            hasDefaultValue={false}
          />
        )}
      />
      <section>
        <Textarea
          error={errors.description?.message ? true : false}
          errorMessage={errors.description?.message}
          {...register("description")}
          label={t("add.form.description.label")}
          fullWidth
          resize="vertical"
          placeholder={t("add.form.description.place_holder")}
        />
      </section>
      <section className="flex flex-row fixed bottom-1 left-4 md:static">
        <Button
          variant="danger"
          className="rounded-xl mr-2"
          type="button"
          onClick={() => r.push(`/${locale}/dash`)}
        >
          {t("add.form.button.cancel")}
        </Button>
        <Button
          variant="secondary"
          className="rounded-xl"
          type="submit"
          loading={loading}
        >
          {t("add.form.button.confirm")}
        </Button>
      </section>
    </form>
  );
}
