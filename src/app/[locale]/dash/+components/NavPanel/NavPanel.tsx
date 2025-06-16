import Image from "next/image";
import NavButton from "./NavButton";

export default function NavPanel() {
  return (
    <section className="w-full flex flex-row gap-3 md:px-32 md:text-2xl text-xl mb-8 md:mt-16 mt-12">
      <NavButton href="/order">
        Orders
        <Image src={"/icon/order.svg"} alt="orders" width={35} height={35} />
      </NavButton>
      <NavButton href="/inventory">
        Inventory
        <Image src={"/icon/order.svg"} alt="orders" width={35} height={35} />
      </NavButton>
    </section>
  );
}
