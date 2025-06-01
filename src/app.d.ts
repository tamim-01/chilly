/// <reference types="@total-typescript/ts-reset" />
interface MenuItem {
  title: string;
  id: number;
  payment_type: { value: number; discount?: number; afterDiscount?: number };
  description: string;
  spicy: boolean;
  image_urls: string[];
}
