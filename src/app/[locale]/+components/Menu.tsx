import MenuItem from "@/components/Common/MenuItem";
import { TLanguages } from "@/utils/getTranslation";

export default function Menu({ locale }: { locale: TLanguages }) {
  console.log(" locale:", locale);
  return (
    <ul className="w-full py-20 flex flex-col gap-8 ">
      <MenuItem
        item={{
          title: "Hamburger",
          price: { value: 12, discount: 4, afterDiscount: 9 },
          description:
            "A juicy, flame-grilled beef patty topped with melted cheddar cheese, crisp lettuce, vine-ripened tomato, red onion, and our house-made burger sauce, all stacked on a toasted brioche bun. Served with a side of golden fries. A timeless favorite done right.A juicy, flame-grilled beef patty topped with melted cheddar cheese, crisp lettuce, vine-ripened tomato, red onion, and our house-made burger sauce, all stacked on a toasted brioche bun. Served with a side of golden fries. A timeless favorite done right.",
          images: [
            "/image/burger.png",
            "/image/burger.png",
            "/image/burger.png",
          ],
          spicy: true,
        }}
      />
    </ul>
  );
}
