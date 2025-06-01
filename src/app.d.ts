/// <reference types="@total-typescript/ts-reset" />
interface MenuItem {
  title: string;
  price: { value: number; discount?: number; afterDiscount?: number };
  description: string;
  spicy: boolean;
  images: string[];
}
