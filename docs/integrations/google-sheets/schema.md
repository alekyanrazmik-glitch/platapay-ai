# Google Sheets Schema Draft

This schema describes a low-code operational data model for the first PlataPay AI OS iteration. It is documentation only and does not connect to Google Sheets.

## Services

| Column | Type | Required | Example |
| --- | --- | --- | --- |
| service_id | string | Yes | svc_chatgpt_plus |
| name | string | Yes | ChatGPT Plus |
| category | string | Yes | AI assistant |
| default_currency | string | Yes | USD |
| active | boolean | Yes | true |
| notes | string | No | Prefer payment link |

Example row: `svc_chatgpt_plus | ChatGPT Plus | AI assistant | USD | true | Prefer official checkout link`.

## Pricing

| Column | Type | Required | Example |
| --- | --- | --- | --- |
| pricing_id | string | Yes | price_chatgpt_plus_monthly |
| service_id | string | Yes | svc_chatgpt_plus |
| plan_name | string | Yes | Plus monthly |
| base_price | number | Yes | 20 |
| currency | string | Yes | USD |
| operational_expense_rub | number | Yes | 250 |
| commission_percent | number | Yes | 30 |
| minimum_commission_rub | number | Yes | 500 |
| active | boolean | Yes | true |

Example row: `price_chatgpt_plus_monthly | svc_chatgpt_plus | Plus monthly | 20 | USD | 250 | 30 | 500 | true`.

## ExchangeRates

| Column | Type | Required | Example |
| --- | --- | --- | --- |
| currency | string | Yes | USD |
| market_rate_rub | number | Yes | 95 |
| internal_spread_rub | number | Yes | 10 |
| internal_rate_rub | number | Yes | 105 |
| source | string | Yes | manual |
| effective_at | datetime | Yes | 2026-06-18T10:00:00Z |

Example row: `USD | 95 | 10 | 105 | manual | 2026-06-18T10:00:00Z`.

## Orders

| Column | Type | Required | Example |
| --- | --- | --- | --- |
| order_id | string | Yes | ord_20260618_0001 |
| status | enum | Yes | Quoted |
| service_id | string | Yes | svc_chatgpt_plus |
| plan_name | string | Yes | Plus monthly |
| currency | string | Yes | USD |
| base_price | number | Yes | 20 |
| final_customer_price_rub | number | Yes after quote | 2600 |
| payment_method | enum | Yes | payment_link |
| payment_link | string | Required for link flow | https://example.com/pay |
| account_access_required | boolean/string | Yes | Unknown |
| customer_contact | string | Yes | @customer |
| risk_notes | string | No | Region unclear |
| operator_id | string | No | op_001 |
| created_at | datetime | Yes | 2026-06-18T10:05:00Z |
| updated_at | datetime | Yes | 2026-06-18T10:10:00Z |

Example row: `ord_20260618_0001 | Quoted | svc_chatgpt_plus | Plus monthly | USD | 20 | 2600 | payment_link |  | Unknown | @customer |  |  | 2026-06-18T10:05:00Z | 2026-06-18T10:10:00Z`.

## Knowledge

| Column | Type | Required | Example |
| --- | --- | --- | --- |
| knowledge_id | string | Yes | kb_chatgpt_payment_link |
| service_id | string | No | svc_chatgpt_plus |
| topic | string | Yes | payment link instructions |
| content | text | Yes | Ask customer for official checkout link. |
| active | boolean | Yes | true |
| updated_at | datetime | Yes | 2026-06-18T10:00:00Z |

Example row: `kb_chatgpt_payment_link | svc_chatgpt_plus | payment link instructions | Ask customer for official checkout link. | true | 2026-06-18T10:00:00Z`.

## Operators

| Column | Type | Required | Example |
| --- | --- | --- | --- |
| operator_id | string | Yes | op_001 |
| display_name | string | Yes | Operator 1 |
| role | string | Yes | payments_operator |
| active | boolean | Yes | true |
| contact | string | No | internal_chat_id |

Example row: `op_001 | Operator 1 | payments_operator | true | internal_chat_id`.

## AuditLog

| Column | Type | Required | Example |
| --- | --- | --- | --- |
| audit_id | string | Yes | audit_0001 |
| actor_type | enum | Yes | agent |
| actor_id | string | Yes | sales_agent |
| entity_type | string | Yes | order |
| entity_id | string | Yes | ord_20260618_0001 |
| action | string | Yes | status_changed |
| before | json/text | No | {"status":"New"} |
| after | json/text | No | {"status":"Quoted"} |
| created_at | datetime | Yes | 2026-06-18T10:10:00Z |

Example row: `audit_0001 | agent | sales_agent | order | ord_20260618_0001 | status_changed | {"status":"New"} | {"status":"Quoted"} | 2026-06-18T10:10:00Z`.
