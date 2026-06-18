# Pricing Engine Contract Draft

The Pricing Engine is a domain capability that converts service base price and exchange-rate inputs into a customer-facing final price. This document is a contract draft only; no executable logic is implemented here.

## Inputs

| Input | Required | Description |
| --- | --- | --- |
| service_id | Yes | Service being quoted. |
| plan_id | Required when fixed plan exists | Plan being quoted. |
| base_price | Yes | Price in service currency. |
| currency | Yes | Base price currency. |
| market_exchange_rate | Yes | Market rate to RUB. |
| internal_spread | Yes | Internal spread added to market rate. |
| operational_expense_rub | Yes | Fixed operational expense. |
| commission_percent | Yes | Internal commission percentage. |
| minimum_commission_rub | Yes | Minimum internal commission. |

## Internal Calculation

The documented calculation is:

1. internal exchange rate = market exchange rate + internal spread;
2. subscription cost = base price × internal exchange rate;
3. commission = max(subscription cost × commission percent, minimum commission);
4. final customer price = subscription cost + operational expense + commission.

## Output

| Output | Customer-visible | Description |
| --- | --- | --- |
| final_customer_price_rub | Yes | Final RUB price shown to customer. |
| quote_id | No | Internal quote identifier. |
| pricing_snapshot | No | Internal inputs used for auditability. |
| expires_at | No | Future quote expiry time. |

## Confidentiality Rules

Only `final_customer_price_rub` can be shown to customers. Internal exchange rate, spread, commission percentage, operational expense, margin, and formula details must stay internal.

## Future Implementation Notes

- Add deterministic rounding rules.
- Add quote expiry.
- Add audit snapshot for every quote.
- Add tests for minimum commission and variable-price services.
