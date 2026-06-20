# Google Sheets Schema

This document describes the Google Sheets data contract for PlataPay AI OS. It
is a **schema contract only** — it does not describe or include any Google
Sheets API integration. Each tab lists its columns with type, whether the field
is required, and an example.

## Tabs

```text
Services
Pricing
ExchangeRates
Orders
Knowledge
Operators
AuditLog
```

## Services

| column          | type    | required | example          |
| --------------- | ------- | -------- | ---------------- |
| service_id      | string  | yes      | chatgpt_plus     |
| name            | string  | yes      | ChatGPT Plus     |
| category        | string  | yes      | AI assistant     |
| currency        | string  | yes      | USD              |
| base_price      | number  | yes      | 20               |
| payment_link    | boolean | yes      | true             |
| login_required  | boolean | yes      | false            |
| gift_card       | boolean | yes      | false            |
| processing_time | string  | no       | 1–3 hours        |
| notes           | string  | no       | Handled via link |

## Pricing

| column          | type   | required | example      |
| --------------- | ------ | -------- | ------------ |
| service_id      | string | yes      | chatgpt_plus |
| plan            | string | yes      | Plus         |
| currency        | string | yes      | USD          |
| base_price      | number | yes      | 20           |
| operational_cost| number | yes      | 250          |
| commission_pct  | number | yes      | 30           |
| commission_min  | number | yes      | 500          |
| rate_markup     | number | yes      | 10           |

## ExchangeRates

| column     | type   | required | example    |
| ---------- | ------ | -------- | ---------- |
| currency   | string | yes      | USD        |
| rate_rub   | number | yes      | 90         |
| updated_at | string | yes      | 2026-06-20 |
| source     | string | no       | market     |

## Orders

| column              | type   | required | example          |
| ------------------- | ------ | -------- | ---------------- |
| order_id            | string | yes      | ord_0001         |
| customer_contact    | string | yes      | @customer        |
| service             | string | yes      | ChatGPT Plus     |
| plan                | string | yes      | Plus             |
| currency            | string | yes      | USD              |
| base_price          | number | yes      | 20               |
| final_price         | number | yes      | 2850             |
| payment_method      | string | no       | payment link     |
| payment_link        | string | no       | https://...      |
| account_required    | boolean| yes      | false            |
| status              | string | yes      | Quoted           |
| operator_id         | string | no       | op_01            |
| risk_notes          | string | no       | none             |
| created_at          | string | yes      | 2026-06-20 10:00 |
| updated_at          | string | yes      | 2026-06-20 10:05 |

## Knowledge

| column     | type   | required | example                       |
| ---------- | ------ | -------- | ----------------------------- |
| entry_id   | string | yes      | kb_0001                       |
| topic      | string | yes      | refunds                       |
| question   | string | yes      | How are refunds handled?      |
| answer     | string | yes      | Refunds are issued on failure |
| updated_at | string | no       | 2026-06-20                    |

## Operators

| column     | type    | required | example      |
| ---------- | ------- | -------- | ------------ |
| operator_id| string  | yes      | op_01        |
| name       | string  | yes      | Operator One |
| active     | boolean | yes      | true         |
| contact    | string  | no       | @op_one      |

## AuditLog

| column     | type   | required | example             |
| ---------- | ------ | -------- | ------------------- |
| log_id     | string | yes      | log_0001            |
| order_id   | string | yes      | ord_0001            |
| actor      | string | yes      | sales_agent         |
| action     | string | yes      | status:Quoted       |
| detail     | string | no       | final price set     |
| timestamp  | string | yes      | 2026-06-20 10:05    |

## Notes

- This is a data contract only. No credentials, API keys, or integration code
  are part of this document.
- Final prices stored in `Orders` are the values shown to customers. Internal
  formula components live in `Pricing` and `ExchangeRates` and are never shown
  to customers.
