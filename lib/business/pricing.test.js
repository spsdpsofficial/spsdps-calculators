import { describe, expect, it } from "vitest";
import { costFromPriceAndMargin, costFromPriceAndMarkup, fromCostAndPrice, priceFromCostAndMargin, priceFromCostAndMarkup } from "./pricing";

describe("pricing maths", () => {
  it("cost 800, price 1000 → profit 200, margin 20%, markup 25%", () => {
    expect(fromCostAndPrice(800, 1000)).toEqual({ cost: 800, price: 1000, profit: 200, marginPercent: 20, markupPercent: 25 });
  });
  it("markup and margin are inverse views of the same price", () => {
    expect(priceFromCostAndMarkup(800, 25).price).toBe(1000);
    expect(priceFromCostAndMargin(800, 20).price).toBe(1000);
    expect(costFromPriceAndMargin(1000, 20).cost).toBe(800);
    expect(costFromPriceAndMarkup(1000, 25).cost).toBe(800);
  });
  it("rejects margins of 100% or more and guards zero denominators", () => {
    expect(priceFromCostAndMargin(800, 100).error).toBeTruthy();
    expect(costFromPriceAndMargin(1000, 120).error).toBeTruthy();
    expect(fromCostAndPrice(0, 0)).toMatchObject({ marginPercent: 0, markupPercent: 0 });
  });
  it("handles a loss", () => {
    const r = fromCostAndPrice(1000, 900);
    expect(r.profit).toBe(-100);
    expect(r.marginPercent).toBeCloseTo(-11.111, 3);
    expect(r.markupPercent).toBe(-10);
  });
});
