"use client";
import Button from "@/components/UI/Button";
import TextInput from "@/components/UI/inputs/TextInput";
import Fetch from "@/utils/Fetch";
import getTranslation, { TLanguages } from "@/utils/getTranslation";
import { useToast } from "@/utils/useToast";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login({ locale }: { locale: TLanguages }) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const r = useRouter();
  const t = getTranslation(locale);
  return (
    <>
      <form
        className="mt-16 flex flex-col justify-center items-center gap-8 md:min-w-[520px] md:mx-auto"
        onSubmit={() => {
          setLoading(true);
        }}
        action={async (data) => {
          const username = data.get("username");
          const password = data.get("password");
          if (typeof username === "string" && typeof password === "string") {
            try {
              const res = await Fetch.post({
                url: "/signin",
                params: { username, password },
              });
              if (res.status === "success") {
                setLoading(false);
                toast({
                  message: res.result.message,
                  type: "success",
                  position: "top-right",
                });
                r.push(`/${locale}/dash`);
              } else {
                toast({
                  message: "user name or password incorrect",
                  type: "error",
                  position: "top-right",
                });
              }
              setLoading(false);
            } catch (err) {
              console.log(err);
              setLoading(false);
            }
          }
        }}
      >
        <label className="text-3xl mb-16">{t("login.title")}</label>
        <TextInput
          name="username"
          label={t("login.username_input.label")}
          placeholder={t("login.username_input.placeholder")}
          fullWidth
          inputSize="lg"
          type="text"
        />
        <TextInput
          name="password"
          label={t("login.password_input.label")}
          placeholder={t("login.password_input.placeholder")}
          fullWidth
          type="password"
          inputSize="lg"
        />
        <Button type="submit" variant="secondary" loading={loading}>
          {t("login.button")}
        </Button>
      </form>
    </>
  );
}
