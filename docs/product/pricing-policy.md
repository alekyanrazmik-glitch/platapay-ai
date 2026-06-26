# Pricing Policy

This document fixes the internal pricing formula for PlataPay AI OS. It is an
**internal** contract. The customer is shown **only the final price**.

## Internal Formula

```text
Internal rate     = exchange rate + 10 ₽

Subscription cost = service price in currency × internal rate

Operational cost  = 250 ₽

PlataPay commission = 30% of subscription cost, minimum 500 ₽

Final price       = subscription cost + operational cost + commission
```

## Rounding Rule

The final customer price is rounded **up** to the nearest whole ruble:

```text
finalCustomerPriceRub = Math.ceil(rawFinalPrice)
```

This ensures the customer price is always a whole-ruble amount and PlataPay never
absorbs fractional ruble losses.

## Definitions

- **Exchange rate** — the market exchange rate for the service currency to RUB,
  taken from the `ExchangeRates` source.
- **Internal rate** — the market exchange rate plus a fixed 10 ₽ markup.
- **Subscription cost** — the service price in its currency multiplied by the
  internal rate, expressed in RUB.
- **Operational cost** — a fixed 250 ₽ that covers processing.
- **PlataPay commission** — 30% of the subscription cost, with a floor of 500 ₽.
- **Final price** — the only value shown to the customer, rounded up to a whole ruble.

## Customer-Visible Output

The Pricing Engine returns a `Quote`. The customer may only ever receive
`customerVisible.finalCustomerPriceRub`. The full breakdown stays in
`pricingBreakdown` for internal audit purposes only.

## Worked Example (Internal Only)

This example is for internal understanding and must **never** be shown to a
customer. The customer sees only the final price.

```text
Service price        = USD 20
Exchange rate        = 90 ₽ per USD
Internal rate        = 90 + 10 = 100 ₽
Subscription cost    = 20 × 100 = 2000 ₽
Operational cost     = 250 ₽
Commission (30%)     = 0.30 × 2000 = 600 ₽ (>= 500 ₽ floor)
Final price          = 2000 + 250 + 600 = 2850 ₽  → ceiled = 2850 ₽
```

Numbers above are illustrative. Real values come from the Pricing Engine and the
live exchange rate.

## What Must Never Be Disclosed to the Customer

The customer must **never** be told:

- the internal rate;
- the 30% commission;
- the 250 ₽ operational cost;
- the margin;
- the detailed formula;
- intermediate calculations.

## Quote Contract

- The Pricing Engine produces a **Quote**: a single final price plus metadata
  needed internally (service, plan, currency, base price, computed final price).
- Agents request a Quote and present only `customerVisible.finalCustomerPriceRub`.
- Agents must not calculate prices themselves and must not reuse fixed prices
  from examples or prompts.

## Implementation Status

The Pricing Engine is implemented as the first domain module in
`packages/domain/src/pricing/`. See
`../../packages/domain/docs/pricing-engine.md` for the implementation contract.
