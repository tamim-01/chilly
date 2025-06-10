"use client";

import Button from "@/components/UI/Button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
interface Props {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
}

export default function Error({ error, reset }: Props) {
  const router = useRouter();
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex flex-col h-[600px] justify-center items-center space-y-6">
      <h2 className="text-4xl">Something went wrong!</h2>
      <div className="flex flex-row gap-5">
        <Button variant="secondary" onClick={() => reset()}>
          Try again
        </Button>
        <Button variant="secondary" onClick={() => router.push("/")}>
          Back home
        </Button>
      </div>
    </section>
  );
}
