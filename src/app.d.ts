/// <reference types="@total-typescript/ts-reset" />
interface Price {
  value: number;
  discount: number;
}
interface MenuItem {
  title: string;
  id: number;
  payment_type: Price;
  description: string;
  spicy: boolean;
  image_urls: string[];
}
