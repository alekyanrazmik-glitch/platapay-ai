# Pricing Engine — Domain Contract

The Pricing Engine computes the final price for a service and plan and returns a
**Quote**. This is a domain contract, not runtime code. The authoritative
formula lives in `../../../docs/product/pricing-policy.md`.

## Inputs

- `service_id`
- `plan`
- `currency`
- `base_price` (service price in its currency)
- `exchange_rate` (market rate to RUB for the currency)

## Formula (Internal)

```text
internal_rate     = exchange_rate + 10 ₽
subscription_cost = base_price × internal_rate
operational_cost  = 250 ₽
commission        = max(0.30 × subscription_cost, 500 ₽)
final_price       = subscription_cost + operational_cost + commission
```

## Output — Quote

The Pricing Engine returns a Quote containing only what the rest of the system
needs:

| field       | type   | customer-visible | description                  |
| ----------- | ------ | ---------------- | ---------------------------- |
| service_id  | string | no               | Service identifier           |
| plan        | string | no               | Plan name                    |
| currency    | string | no               | Service currency             |
| base_price  | number | no               | Base price input             |
| final_price | number | yes              | The only customer-facing value |

## Confidentiality Rules

- The internal rate, subscription cost, operational cost, and commission are
  **never** included in any customer-facing output.
- Agents must use the `final_price` from the Quote and must not recompute or
  reuse fixed prices from examples.

## Determinism

Given the same `base_price` and `exchange_rate`, the Pricing Engine must produce
the same `final_price`. The commission floor of 500 ₽ always applies.
