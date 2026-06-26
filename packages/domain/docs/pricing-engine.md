# Pricing Engine — Domain Module

The Pricing Engine is the first implemented domain module of PlataPay AI OS.
It computes the final customer price in RUB and returns a **Quote**.

Source: `packages/domain/src/pricing/`

## Formula (Internal)

```text
internalRate          = marketRate + internalSpread
subscriptionCostRub   = basePrice × internalRate
commissionRub         = max(subscriptionCostRub × commissionPercent / 100, minimumCommissionRub)
finalCustomerPriceRub = subscriptionCostRub + operationalExpenseRub + commissionRub
```

## Default Rule Values

| Parameter             | Default |
| --------------------- | ------- |
| internalSpread        | 10 ₽    |
| operationalExpenseRub | 250 ₽   |
| commissionPercent     | 30%     |
| minimumCommissionRub  | 500 ₽   |

## Rounding Rule

`finalCustomerPriceRub` is ceiled to the nearest whole ruble:

```ts
finalCustomerPriceRub = Math.ceil(rawFinalPrice)
```

Internal breakdown values are not rounded.

## Quote Output

```ts
interface CustomerVisible {
  finalCustomerPriceRub: number; // the only value the customer ever sees
  currency: "RUB";
}

interface Quote {
  customerVisible: CustomerVisible;
  pricingBreakdown: PricingBreakdown; // internal audit only — never send to customers
}
```

## Confidentiality Rules

- `customerVisible` contains **only** `finalCustomerPriceRub` and `currency`.
- Internal fields (`internalRate`, `commissionRub`, `operationalExpenseRub`,
  `subscriptionCostRub`) live in `pricingBreakdown` and must **never** be
  sent to or shown to customers.
- Agents must present only `customerVisible.finalCustomerPriceRub`.

## Usage

```ts
import { calculateQuote } from "@platapay/domain";

const quote = calculateQuote({
  basePrice: 20,
  currency: "USD",
  exchangeRate: { currency: "USD", marketRate: 95 },
});

// Safe to send to customer:
console.log(quote.customerVisible.finalCustomerPriceRub); // 2980
```

## Worked Examples

### ChatGPT Plus (basePrice = 20 USD, marketRate = 95)

```text
internalRate        = 95 + 10 = 105
subscriptionCostRub = 20 × 105 = 2100
commissionRub       = max(2100 × 0.30, 500) = 630
finalPrice          = 2100 + 250 + 630 = 2980 ₽
```

### Minimum Commission (basePrice = 2 USD, marketRate = 95)

```text
internalRate        = 105
subscriptionCostRub = 2 × 105 = 210
commissionRub       = max(210 × 0.30, 500) = 500  ← floor applied
finalPrice          = 210 + 250 + 500 = 960 ₽
```

### Claude Max (basePrice = 100 USD, marketRate = 95)

```text
internalRate        = 105
subscriptionCostRub = 100 × 105 = 10500
commissionRub       = max(10500 × 0.30, 500) = 3150
finalPrice          = 10500 + 250 + 3150 = 13900 ₽
```
