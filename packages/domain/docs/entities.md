# Domain Entities

This document defines the core domain entities for PlataPay AI OS. These are
contracts, not runtime code.

## Service

A digital service that PlataPay can help pay for.

| field           | type    | description                          |
| --------------- | ------- | ------------------------------------ |
| service_id      | string  | Stable identifier                    |
| name            | string  | Display name                         |
| category        | string  | Service category                     |
| currency        | string  | Native billing currency              |
| base_price      | number  | Catalog base price in currency       |
| payment_link    | boolean | Whether a payment link is possible   |
| login_required  | boolean | Whether account access may be needed |
| gift_card       | boolean | Whether a gift card path exists      |
| processing_time | string  | Average processing time              |
| notes           | string  | Additional context                   |

## Plan

A specific tier of a service (for example Plus, Pro, Max, Basic, Standard).

| field      | type   | description                    |
| ---------- | ------ | ------------------------------ |
| service_id | string | Owning service                 |
| plan       | string | Plan name                      |
| base_price | number | Base price for this plan       |
| currency   | string | Currency for this plan         |

## ExchangeRate

| field      | type   | description                    |
| ---------- | ------ | ------------------------------ |
| currency   | string | Currency code                  |
| rate_rub   | number | Market rate to RUB             |
| updated_at | string | When the rate was recorded     |

## Quote

The result of the Pricing Engine. The customer sees only `final_price`.

| field            | type   | description                         |
| ---------------- | ------ | ----------------------------------- |
| service_id       | string | Service identifier                  |
| plan             | string | Plan name                           |
| currency         | string | Service currency                    |
| base_price       | number | Base price input                    |
| final_price      | number | Final price shown to the customer   |

Internal components (internal rate, subscription cost, operational cost,
commission) are computed inside the Pricing Engine and are **not** part of the
customer-facing Quote.

## Order

A single customer request. See `orders.md` for the full contract and
`../../../docs/product/order-lifecycle.md` for statuses.

## Customer

| field   | type   | description            |
| ------- | ------ | ---------------------- |
| contact | string | How to reach them      |

## Operator

| field       | type    | description        |
| ----------- | ------- | ------------------ |
| operator_id | string  | Identifier         |
| name        | string  | Display name       |
| active      | boolean | Whether available  |
