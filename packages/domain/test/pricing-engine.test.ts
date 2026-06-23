import { describe, it, expect } from "vitest";

import { calculateQuote } from "../src/index.js";
import type { PricingInput, Quote } from "../src/index.js";

describe("Pricing Engine", () => {
  it("Test 1 — ChatGPT Plus: USD 20 at marketRate 95 → 2980 RUB", () => {
    const input: PricingInput = {
      basePrice: 20,
      currency: "USD",
      marketRate: 95,
    };

    const quote = calculateQuote(input);

    expect(quote.pricingBreakdown.internalRate).toBe(105);
    expect(quote.pricingBreakdown.subscriptionCostRub).toBe(2100);
    expect(quote.pricingBreakdown.commissionRub).toBe(630);
    expect(quote.customerVisible.finalCustomerPriceRub).toBe(2980);
  });

  it("Test 2 — minimum commission floor applies: basePrice 2 → 960 RUB", () => {
    const input: PricingInput = {
      basePrice: 2,
      currency: "USD",
      marketRate: 95,
    };

    const quote = calculateQuote(input);

    expect(quote.pricingBreakdown.internalRate).toBe(105);
    expect(quote.pricingBreakdown.subscriptionCostRub).toBe(210);
    // 30% of 210 = 63, below the 500 floor → floor applies.
    expect(quote.pricingBreakdown.commissionRub).toBe(500);
    expect(quote.customerVisible.finalCustomerPriceRub).toBe(960);
  });

  it("Test 3 — Claude Max: basePrice 100 → 13900 RUB", () => {
    const input: PricingInput = {
      basePrice: 100,
      currency: "USD",
      marketRate: 95,
    };

    const quote = calculateQuote(input);

    expect(quote.pricingBreakdown.internalRate).toBe(105);
    expect(quote.pricingBreakdown.subscriptionCostRub).toBe(10500);
    expect(quote.pricingBreakdown.commissionRub).toBe(3150);
    expect(quote.customerVisible.finalCustomerPriceRub).toBe(13900);
  });

  it("Test 4 — customerVisible safety: no internal fields leak", () => {
    const input: PricingInput = {
      basePrice: 20,
      currency: "USD",
      marketRate: 95,
    };

    const quote: Quote = calculateQuote(input);
    const customerVisible = quote.customerVisible;

    // customerVisible must contain ONLY the final price and currency.
    expect(Object.keys(customerVisible).sort()).toEqual([
      "currency",
      "finalCustomerPriceRub",
    ]);
    expect(customerVisible.currency).toBe("RUB");
    expect(customerVisible.finalCustomerPriceRub).toBe(2980);

    // None of the internal fields may appear on the customer-visible object.
    const forbidden = [
      "internalRate",
      "commissionRub",
      "operationalExpenseRub",
      "pricingBreakdown",
      "subscriptionCostRub",
      "marketRate",
      "internalSpread",
    ] as const;

    for (const key of forbidden) {
      expect(customerVisible).not.toHaveProperty(key);
    }
  });

  it("rounds the final price UP to a whole RUB", () => {
    // marketRate 95.5 → internalRate 105.5; basePrice 1 → subscription 105.5
    // commission floor 500; final raw = 105.5 + 250 + 500 = 855.5 → ceil 856
    const quote = calculateQuote({
      basePrice: 1,
      currency: "USD",
      marketRate: 95.5,
    });

    expect(quote.pricingBreakdown.finalCustomerPriceRubRaw).toBe(855.5);
    expect(quote.customerVisible.finalCustomerPriceRub).toBe(856);
  });

  it("respects pricing-rule overrides", () => {
    const quote = calculateQuote({
      basePrice: 20,
      currency: "USD",
      marketRate: 95,
      rule: { internalSpread: 0, operationalExpenseRub: 0 },
    });

    // internalRate = 95; subscription = 1900; commission = 570; final = 2470
    expect(quote.pricingBreakdown.internalRate).toBe(95);
    expect(quote.pricingBreakdown.subscriptionCostRub).toBe(1900);
    expect(quote.pricingBreakdown.commissionRub).toBe(570);
    expect(quote.customerVisible.finalCustomerPriceRub).toBe(2470);
  });
});
