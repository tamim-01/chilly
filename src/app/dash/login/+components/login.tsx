"use client";
import Button from "@/components/UI/Button";
import TextInput from "@/components/UI/inputs/TextInput";
import Fetch from "@/utils/Fetch";
import { useToast } from "@/utils/useToast";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const r = useRouter();
  return (
    <>
      <form
        className="h-screen flex flex-col justify-center items-center gap-8 md:min-w-[520px] md:mx-auto"
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
                r.push("/dash");
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
        <label className="text-3xl mb-16">Hot Chilly Dashboard</label>
        <TextInput
          name="username"
          placeholder="Enter you user name..."
          label="Username"
          fullWidth
          inputSize="lg"
          type="text"
        />
        <TextInput
          name="password"
          placeholder="Enter you password..."
          label="Password"
          fullWidth
          type="password"
          inputSize="lg"
        />
        <Button type="submit" variant="secondary" loading={loading}>
          Confirm
        </Button>
      </form>
    </>
  );
}
