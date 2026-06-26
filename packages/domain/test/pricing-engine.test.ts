import { describe, expect, it } from "vitest";
import { calculateQuote } from "../src/pricing/pricing-engine.js";

describe("PricingEngine", () => {
  it("Test 1 — ChatGPT Plus", () => {
    const quote = calculateQuote({
      basePrice: 20,
      currency: "USD",
      exchangeRate: { currency: "USD", marketRate: 95 },
    });

    // internalRate = 105, subscriptionCostRub = 2100, commissionRub = 630
    expect(quote.customerVisible.finalCustomerPriceRub).toBe(2980);
    expect(quote.customerVisible.currency).toBe("RUB");
  });

  it("Test 2 — minimum commission applied", () => {
    const quote = calculateQuote({
      basePrice: 2,
      currency: "USD",
      exchangeRate: { currency: "USD", marketRate: 95 },
    });

    // internalRate = 105, subscriptionCostRub = 210, commission floor = 500
    expect(quote.customerVisible.finalCustomerPriceRub).toBe(960);
  });

  it("Test 3 — Claude Max", () => {
    const quote = calculateQuote({
      basePrice: 100,
      currency: "USD",
      exchangeRate: { currency: "USD", marketRate: 95 },
    });

    // internalRate = 105, subscriptionCostRub = 10500, commissionRub = 3150
    expect(quote.customerVisible.finalCustomerPriceRub).toBe(13900);
  });

  it("Test 4 — customerVisible safety: no internal fields exposed", () => {
    const quote = calculateQuote({
      basePrice: 20,
      currency: "USD",
      exchangeRate: { currency: "USD", marketRate: 95 },
    });

    const visible = quote.customerVisible as unknown as Record<string, unknown>;
    expect(visible).not.toHaveProperty("internalRate");
    expect(visible).not.toHaveProperty("commissionRub");
    expect(visible).not.toHaveProperty("operationalExpenseRub");
    expect(visible).not.toHaveProperty("pricingBreakdown");
    expect(visible).not.toHaveProperty("subscriptionCostRub");
    expect(visible).not.toHaveProperty("marketRate");
    expect(visible).not.toHaveProperty("internalSpread");
  });
});
