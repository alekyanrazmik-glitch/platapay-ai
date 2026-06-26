export type Currency = "USD" | "EUR" | "GBP" | "TRY" | "RUB";

export interface ExchangeRate {
  currency: Currency;
  /** Market rate: 1 unit of currency → RUB */
  marketRate: number;
}

export interface PricingInput {
  basePrice: number;
  currency: Currency;
  exchangeRate: ExchangeRate;
}

export interface PricingRule {
  internalSpread: number;
  operationalExpenseRub: number;
  commissionPercent: number;
  minimumCommissionRub: number;
}

export interface PricingBreakdown {
  internalRate: number;
  subscriptionCostRub: number;
  operationalExpenseRub: number;
  commissionRub: number;
  finalCustomerPriceRub: number;
}

export interface CustomerVisible {
  finalCustomerPriceRub: number;
  currency: "RUB";
}

export interface Quote {
  customerVisible: CustomerVisible;
  /** Internal audit data — must never be sent to customers */
  pricingBreakdown: PricingBreakdown;
}
