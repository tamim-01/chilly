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
  active: boolean;
  image_urls: string[];
}
interface InventoryItem {
  id: number;
  admin_id: number;
  title: string;
  unit: string;
  available_quantity: number;
  category: string;
  publish_date: string;
}
