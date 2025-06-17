"use client";
import Button from "@/components/UI/Button";
import Modal from "@/components/UI/Modal";
import Fetch from "@/utils/Fetch";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function MenuItemOptions({ id }: { id: number }) {
  const [modal, setModal] = useState(false);
  const locale = usePathname().split("/")[1];
  return (
    <>
      <div className="flex flex-row gap-3">
        <Button
          className="rounded-full py-4 mb-6"
          variant="secondary"
          onClick={() => setModal(true)}
        >
          <Image src={"/icon/delete.svg"} width={18} height={18} alt="delete" />
        </Button>
        <Link href={`/${locale}/dash/edit/${id}`}>
          <Button className="rounded-full py-4 mb-6" variant="secondary">
            <Image src={"/icon/edit.svg"} width={18} height={18} alt="edit" />
          </Button>
        </Link>

        <Button className="rounded-full py-4 mb-6" variant="secondary">
          <Image
            src={"/icon/visibility.svg"}
            width={18}
            height={18}
            alt="visibility"
          />
        </Button>
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
            onClick={() => {
              Fetch.remove({ url: `/menu/${id}` });
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
