/**
 * PlataPay AI OS — domain package public surface.
 *
 * The first implemented module is the Pricing Engine.
 */

export {
  calculateQuote,
  roundFinalCustomerPrice,
  DEFAULT_PRICING_RULE,
} from "./pricing/pricing-engine.js";

export type {
  Currency,
  PricingInput,
  PricingRule,
  ExchangeRate,
  PricingBreakdown,
  CustomerVisibleQuote,
  Quote,
} from "./pricing/types.js";
