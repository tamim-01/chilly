import Fetch from "@/utils/Fetch";
import Button from "@/components/UI/Button";
import Link from "next/link";
import EditItemForm from "../../+components/forms/Edit/EditItemForm";

interface PageProps {
  params: Promise<{ id: number }>;
}
export default async function page({ params }: PageProps) {
  const { id } = await params;
  const result = await Fetch.get({ url: `/menu/item/${id}` });
  if (result.status === "success") {
    return (
      <>
        <h2 className="text-4xl mt-8 mb-16 w-full text-center ">
          Edit menu item
        </h2>
        <EditItemForm itemId={id} />
      </>
    );
  } else {
    <section className="flex flex-col h-[600px] justify-center items-center space-y-6">
      <h2 className="text-4xl">Failed to fetch item data!</h2>
      <div className="flex flex-row gap-5">
        <Link href={"/"}>
          <Button variant="secondary">Back home</Button>
        </Link>
      </div>
    </section>;
  }
}
