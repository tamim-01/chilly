import LangSwitcher from "../Common/LangSwitcher";

export function Header() {
  return (
    <header className="container max-w-[1440px] mx-auto p-6 md:px-16 md:py-8 flex justify-between items-center">
      <div className="px-5 w-fit py-3 rounded-[16px] border border-foreground bg-secondary flex flex-row items-center gap-3 text-base md:text-3xl">
        <p className="font-irish">HOT CHILLY</p>
      </div>
      <LangSwitcher />
    </header>
  );
}
