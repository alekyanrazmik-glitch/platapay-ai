/**
 * Pricing Engine — first PlataPay AI OS domain module.
 *
 * Computes the final customer price from the internal PlataPay formula and
 * returns a {@link Quote}. The customer-facing surface (`customerVisible`)
 * exposes only the final price in RUB; all intermediate values stay in the
 * internal `pricingBreakdown`.
 *
 * Formula (see `docs/product/pricing-policy.md`):
 *
 *   internalRate          = marketRate + internalSpread
 *   subscriptionCostRub   = basePrice * internalRate
 *   commissionRub         = max(subscriptionCostRub * commissionPercent / 100, minimumCommissionRub)
 *   finalCustomerPriceRub = subscriptionCostRub + operationalExpenseRub + commissionRub
 *
 * Rounding rule: the final price is rounded UP to a whole RUB
 * (`Math.ceil`).
 */

import type {
  PricingInput,
  PricingRule,
  PricingBreakdown,
  Quote,
} from "./types.js";

/** Default pricing rule used when an input does not override a parameter. */
export const DEFAULT_PRICING_RULE: PricingRule = {
  internalSpread: 10,
  operationalExpenseRub: 250,
  commissionPercent: 30,
  minimumCommissionRub: 500,
};

/**
 * Rounding rule for the final customer price.
 *
 * Stage 1: round up to a whole RUB. Documented in
 * `packages/domain/docs/pricing-engine.md`.
 */
export function roundFinalCustomerPrice(value: number): number {
  return Math.ceil(value);
}

/**
 * Calculate a {@link Quote} for a pricing request.
 *
 * The returned quote contains the full internal breakdown for audit, plus a
 * `customerVisible` object that holds only the final price and currency.
 */
export function calculateQuote(input: PricingInput): Quote {
  const rule: PricingRule = { ...DEFAULT_PRICING_RULE, ...input.rule };

  const internalRate = input.marketRate + rule.internalSpread;
  const subscriptionCostRub = input.basePrice * internalRate;
  const commissionRub = Math.max(
    (subscriptionCostRub * rule.commissionPercent) / 100,
    rule.minimumCommissionRub,
  );
  const finalCustomerPriceRubRaw =
    subscriptionCostRub + rule.operationalExpenseRub + commissionRub;
  const finalCustomerPriceRub = roundFinalCustomerPrice(
    finalCustomerPriceRubRaw,
  );

  const pricingBreakdown: PricingBreakdown = {
    marketRate: input.marketRate,
    internalSpread: rule.internalSpread,
    internalRate,
    subscriptionCostRub,
    operationalExpenseRub: rule.operationalExpenseRub,
    commissionPercent: rule.commissionPercent,
    minimumCommissionRub: rule.minimumCommissionRub,
    commissionRub,
    finalCustomerPriceRubRaw,
    finalCustomerPriceRub,
  };

  return {
    input,
    pricingBreakdown,
    customerVisible: {
      finalCustomerPriceRub,
      currency: "RUB",
    },
  };
}
