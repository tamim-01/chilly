export default function discountCalc(discount: number, price: number) {
  return Math.floor(price - price * (discount / 100));
}
