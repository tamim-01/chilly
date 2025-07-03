import Link from "next/link";
import Button from "../UI/Button";
import { TLanguages } from "@/utils/getTranslation";

export default function AddNew({ locale }: { locale: TLanguages }) {
  return (
    <section className="md:p-8 mt-12 w-fit">
      <Link href={`/${locale}/dash/add`} className="w-fit">
        <Button
          variant="secondary"
          size="lg"
          className="md:px-10 px-4 py-0 rounded-[16px]"
        >
          + Add New
        </Button>
      </Link>
    </section>
  );
}
