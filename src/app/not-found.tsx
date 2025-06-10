"use client";
import Button from "@/components/UI/Button";
import Link from "next/link";

export default function NotFound() {
  return (
    <section>
      <h2>Not Found</h2>
      <Link href={"/"}>
        <Button variant="ghost">Back to home</Button>
      </Link>
    </section>
  );
}
