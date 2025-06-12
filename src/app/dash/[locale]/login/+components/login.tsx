"use client";
import Button from "@/components/UI/Button";
import TextInput from "@/components/UI/inputs/TextInput";
import Fetch from "@/utils/Fetch";
import { useToast } from "@/utils/useToast";
import { useState } from "react";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
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
              }).then((res) => {
                setLoading(false);
                return res;
              });
              toast({
                message: res.message,
                type: "success",
                position: "top-right",
              });
            } catch (err) {
              console.log(err);
              toast({
                message: "user name or password incorrect",
                type: "error",
                position: "top-right",
              });
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
