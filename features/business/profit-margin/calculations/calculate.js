import { costFromPriceAndMargin, fromCostAndPrice, priceFromCostAndMargin } from "@/lib/business/pricing";

/** mode: "margin" (cost + price), "price" (cost + target margin) or "cost" (price + target margin). */
export function calculateProfitMargin({ mode, cost, price, targetMargin }) {
  if (mode === "price") return priceFromCostAndMargin(cost, targetMargin);
  if (mode === "cost") return costFromPriceAndMargin(price, targetMargin);
  return fromCostAndPrice(cost, price);
}
