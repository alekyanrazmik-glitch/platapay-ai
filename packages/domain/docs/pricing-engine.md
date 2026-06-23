# Pricing Engine — Domain Module

The Pricing Engine computes the final price for a service and plan and returns a
**Quote**. As of the first implementation stage it is a working domain module
(`packages/domain/src/pricing/`), not only a contract. The authoritative
business formula lives in `../../../docs/product/pricing-policy.md` and has
**not changed** — this document describes the implemented engine.

## Status

- The Pricing Engine is the **first implemented domain module** of PlataPay
  AI OS.
- Public entry point: `calculateQuote(input)` exported from
  `@platapay/domain`.
- No Telegram bot, payment API, Google Sheets API, or external integration is
  part of this module — domain code, types, tests, and docs only.

## Inputs — `PricingInput`

- `basePrice` — service base price in `currency`.
- `currency` — currency of `basePrice` (`USD` | `EUR` | `RUB`).
- `marketRate` — market exchange rate to RUB for `currency`.
- `rule` _(optional)_ — partial `PricingRule` overrides. Anything omitted falls
  back to the defaults below.

## Default Pricing Rule

| Parameter               | Default |
| ----------------------- | ------- |
| `internalSpread`        | 10 ₽    |
| `operationalExpenseRub` | 250 ₽   |
| `commissionPercent`     | 30 %    |
| `minimumCommissionRub`  | 500 ₽   |

## Formula (Internal)

```text
internalRate          = marketRate + internalSpread
subscriptionCostRub   = basePrice * internalRate
commissionRub         = max(subscriptionCostRub * commissionPercent / 100, minimumCommissionRub)
finalCustomerPriceRub = subscriptionCostRub + operationalExpenseRub + commissionRub
```

## Rounding Rule

The final customer price is **rounded up to a whole rouble**:

```text
finalCustomerPriceRub = Math.ceil(finalCustomerPriceRub)
```

This is the stage-1 rule and is applied in `roundFinalCustomerPrice`. The
breakdown keeps both the raw value (`finalCustomerPriceRubRaw`) and the rounded
value (`finalCustomerPriceRub`) for audit.

## Output — `Quote`

`calculateQuote` returns a `Quote` with three parts:

| field              | customer-visible | description                                   |
| ------------------ | ---------------- | --------------------------------------------- |
| `input`            | no               | Echo of the request, for audit.               |
| `pricingBreakdown` | no               | Full internal calculation, for audit.         |
| `customerVisible`  | yes              | The only customer-facing part of the quote.   |

### `customerVisible`

`customerVisible` contains **only**:

- `finalCustomerPriceRub` — the rounded final price;
- `currency` — always `"RUB"`.

No internal field (`internalRate`, `subscriptionCostRub`, `commissionRub`,
`operationalExpenseRub`, `marketRate`, `internalSpread`, `pricingBreakdown`, …)
may ever appear in `customerVisible`. This is enforced by the test suite.

## Confidentiality Rules

- Internal values (internal rate, subscription cost, operational cost,
  commission) live **only** in `pricingBreakdown` and are **never** part of any
  customer-facing output.
- Consumers must read the price from `customerVisible.finalCustomerPriceRub` and
  must not recompute prices or reuse fixed prices from examples.

## Determinism

Given the same input, the engine produces the same `Quote`. The commission floor
of 500 ₽ always applies.

## Worked Examples (Internal Only)

These illustrate the formula and must never be shown to a customer.

| Service     | basePrice | marketRate | subscriptionCostRub | commissionRub | finalCustomerPriceRub |
| ----------- | --------- | ---------- | ------------------- | ------------- | --------------------- |
| ChatGPT Plus| 20 USD    | 95         | 2100                | 630           | 2980                  |
| Floor case  | 2 USD     | 95         | 210                 | 500 (floor)   | 960                   |
| Claude Max  | 100 USD   | 95         | 10500               | 3150          | 13900                 |

## Running

```bash
npm install
npm test        # vitest run
npm run typecheck
```
