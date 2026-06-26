import type { PricingInput, PricingRule, Quote } from "./types.js";

const DEFAULT_RULE: PricingRule = {
  internalSpread: 10,
  operationalExpenseRub: 250,
  commissionPercent: 30,
  minimumCommissionRub: 500,
};

/**
 * Calculates a customer quote from pricing inputs.
 *
 * Rounding rule: finalCustomerPriceRub is ceiled to the nearest whole ruble.
 * Internal breakdown values are not rounded.
 */
export function calculateQuote(input: PricingInput, rule: PricingRule = DEFAULT_RULE): Quote {
  const internalRate = input.exchangeRate.marketRate + rule.internalSpread;
  const subscriptionCostRub = input.basePrice * internalRate;
  const commissionRub = Math.max(
    (subscriptionCostRub * rule.commissionPercent) / 100,
    rule.minimumCommissionRub,
  );
  const rawFinalPrice = subscriptionCostRub + rule.operationalExpenseRub + commissionRub;
  const finalCustomerPriceRub = Math.ceil(rawFinalPrice);

  return {
    customerVisible: {
      finalCustomerPriceRub,
      currency: "RUB",
    },
    pricingBreakdown: {
      internalRate,
      subscriptionCostRub,
      operationalExpenseRub: rule.operationalExpenseRub,
      commissionRub,
      finalCustomerPriceRub,
    },
  };
}
