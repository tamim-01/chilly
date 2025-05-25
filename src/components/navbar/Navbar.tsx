import Link from "next/link";
import SelectLang from "./SelectLang";

export function Navbar() {
  return (
    <nav className="w-full p-6 md:px-16 md:py-8 flex justify-between items-center">
      <ul className="px-5 w-fit py-3 rounded-lg border border-foreground bg-secondary flex flex-row items-center gap-3 text-base md:text-3xl">
        <li>
          <Link href={"/"} className="font-irish">
            HOT CHILLY
          </Link>
        </li>
      </ul>
      <SelectLang />
    </nav>
  );
}
