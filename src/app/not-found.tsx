"use client";
import Button from "@/components/UI/Button";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <section className="flex flex-col h-[600px] justify-center items-center space-y-6">
      <h2 className="text-4xl">Something went wrong!</h2>
      <Button variant="secondary" onClick={() => router.push("/")}>
        Back home
      </Button>
    </section>
  );
}
