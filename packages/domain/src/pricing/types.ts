/**
 * Pricing Engine — domain types.
 *
 * The Pricing Engine computes the final customer price from an internal
 * formula. Only the final price in RUB is ever exposed to the customer; all
 * intermediate values stay inside the internal breakdown.
 *
 * The authoritative business formula lives in
 * `docs/product/pricing-policy.md` and the engine documentation in
 * `packages/domain/docs/pricing-engine.md`.
 */

/** Service currency. The internal/customer-facing settlement currency is RUB. */
export type Currency = "USD" | "EUR" | "RUB";

/**
 * Tunable pricing parameters. Every field is optional on input; defaults are
 * supplied by the engine (see `DEFAULT_PRICING_RULE`).
 */
export interface PricingRule {
  /** Fixed markup added to the market rate, in RUB. Default: 10. */
  readonly internalSpread: number;
  /** Fixed operational expense per order, in RUB. Default: 250. */
  readonly operationalExpenseRub: number;
  /** PlataPay commission percentage of the subscription cost. Default: 30. */
  readonly commissionPercent: number;
  /** Commission floor, in RUB. Default: 500. */
  readonly minimumCommissionRub: number;
}

/**
 * Market exchange rate for a currency to RUB, taken from the exchange-rate
 * source. This is the raw market rate, before the internal spread is applied.
 */
export interface ExchangeRate {
  /** Currency the rate is quoted for. */
  readonly currency: Currency;
  /** Market rate: how many RUB per one unit of `currency`. */
  readonly marketRate: number;
}

/** Input to a pricing calculation. */
export interface PricingInput {
  /** Service base price expressed in `currency`. */
  readonly basePrice: number;
  /** Currency of `basePrice`. */
  readonly currency: Currency;
  /** Market exchange rate to RUB for `currency`. */
  readonly marketRate: number;
  /**
   * Optional pricing-rule overrides. Any field left out falls back to
   * `DEFAULT_PRICING_RULE`.
   */
  readonly rule?: Partial<PricingRule>;
}

/**
 * Full internal breakdown of a price calculation. For audit and internal use
 * only — never returned to the customer.
 */
export interface PricingBreakdown {
  /** Market rate used (RUB per unit of currency). */
  readonly marketRate: number;
  /** Fixed markup applied to the market rate, in RUB. */
  readonly internalSpread: number;
  /** Market rate plus internal spread, in RUB. */
  readonly internalRate: number;
  /** Subscription cost in RUB (basePrice × internalRate). */
  readonly subscriptionCostRub: number;
  /** Fixed operational expense in RUB. */
  readonly operationalExpenseRub: number;
  /** Commission percentage applied. */
  readonly commissionPercent: number;
  /** Commission floor in RUB. */
  readonly minimumCommissionRub: number;
  /** Commission charged in RUB (after applying the floor). */
  readonly commissionRub: number;
  /** Final price before rounding, in RUB. */
  readonly finalCustomerPriceRubRaw: number;
  /** Final price after the ceil rounding rule, in RUB. */
  readonly finalCustomerPriceRub: number;
}

/**
 * The only customer-facing surface of a Quote. Must contain nothing beyond the
 * final price and its currency.
 */
export interface CustomerVisibleQuote {
  /** Final price the customer pays, rounded up to a whole RUB. */
  readonly finalCustomerPriceRub: number;
  /** Always "RUB". */
  readonly currency: "RUB";
}

/**
 * A Quote pairs the customer-visible result with the internal breakdown.
 * Only `customerVisible` may leave the system toward a customer.
 */
export interface Quote {
  /** Echo of the request input, for audit. Internal only. */
  readonly input: PricingInput;
  /** Full internal calculation. Internal only. */
  readonly pricingBreakdown: PricingBreakdown;
  /** The only customer-facing part of the quote. */
  readonly customerVisible: CustomerVisibleQuote;
}
