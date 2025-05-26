import SelectLang from "./SelectLang";

export function Navbar() {
  return (
    <nav className="container max-w-[1440px] mx-auto p-6 md:px-16 md:py-8 flex justify-between items-center">
      <ul className="px-5 w-fit py-3 rounded-[16px] border border-foreground bg-secondary flex flex-row items-center gap-3 text-base md:text-3xl">
        <li className="font-irish">HOT CHILLY</li>
      </ul>
      <SelectLang />
    </nav>
  );
}
