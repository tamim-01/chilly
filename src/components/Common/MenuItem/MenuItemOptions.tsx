"use client";
import Button from "@/components/UI/Button";
import Modal from "@/components/UI/Modal";
import { useToast } from "@/hooks/useToast";
import Fetch from "@/utils/Fetch";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function MenuItemOptions({ id }: { id: number }) {
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const locale = usePathname().split("/")[1];
  const r = useRouter();
  const { toast } = useToast();
  return (
    <>
      <div className="flex flex-row gap-3">
        <Button
          className="rounded-full py-4 mb-6"
          variant="secondary"
          onClick={() => setModal(true)}
        >
          <Image src={"/icon/delete.svg"} width={14} height={14} alt="delete" />
        </Button>
        <Link href={`/${locale}/dash/edit/${id}`}>
          <Button className="rounded-full py-4 mb-6" variant="secondary">
            <Image src={"/icon/edit.svg"} width={14} height={14} alt="edit" />
          </Button>
        </Link>
      </div>
      <Modal
        variant="default"
        open={modal}
        onClose={() => setModal(false)}
        header={"Remove item"}
      >
        <p className="mb-6 text-xl">
          are you sure you want to remove this item ?{" "}
        </p>
        <div className="flex flex-row gap-2">
          <Button
            variant="destructive"
            className="rounded-xl"
            loading={loading}
            onClick={() => {
              setLoading(true);
              Fetch.remove({ url: `/menu/${id}` }).then((res) => {
                if (res.status === "success") {
                  setLoading(false);
                  r.replace(`/${locale}/dash`);
                  toast({
                    message: "Item deleted successfully",
                    position: "top-right",
                    type: "success",
                  });
                  setModal(false);
                } else {
                  setLoading(false);
                  toast({
                    message: "Something went wrong ! try again.",
                    position: "top-right",
                    type: "error",
                  });
                  setModal(false);
                }
              });
            }}
          >
            Yes!
          </Button>
          <Button
            variant="secondary"
            className="rounded-xl"
            onClick={() => setModal(false)}
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
}
