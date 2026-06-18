# Domain Entities Draft

This document defines documentation-only domain entities for the first PlataPay AI OS
business core. These are contracts, not implementation code.

## Service

Represents a digital service that PlataPay may help a customer pay for.

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| id | string | Yes | Stable internal identifier. |
| name | string | Yes | Human-readable service name. |
| category | string | Yes | AI assistant, design tools, gaming, etc. |
| default_currency | string | Yes | Default pricing currency. |
| active | boolean | Yes | Whether the service is currently supported. |

## Plan

Represents a purchasable tier or amount for a service.

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| id | string | Yes | Stable internal identifier. |
| service_id | string | Yes | Parent service. |
| name | string | Yes | Plan name. |
| base_price | number | Yes when fixed | Foreign-currency price before internal pricing. |
| currency | string | Yes | Currency of base price. |
| variable | boolean | Yes | True for services such as Steam or Apple services. |

## ExchangeRate

Represents a market and internal exchange rate used for quoting.

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| currency | string | Yes | Foreign currency. |
| market_rate_rub | number | Yes | Market rate. |
| internal_spread_rub | number | Yes | Internal spread. |
| internal_rate_rub | number | Yes | Market rate plus internal spread. |
| effective_at | datetime | Yes | Rate validity timestamp. |

## PricingRule

Represents internal pricing parameters.

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| operational_expense_rub | number | Yes | Fixed internal operational expense. |
| commission_percent | number | Yes | Internal commission percent. |
| minimum_commission_rub | number | Yes | Internal minimum commission. |
| active_from | datetime | Yes | Start of rule validity. |

## Quote

Represents a calculated customer-facing price.

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| id | string | Yes | Stable quote identifier. |
| service_id | string | Yes | Quoted service. |
| plan_id | string | No | Quoted plan if known. |
| currency | string | Yes | Base price currency. |
| base_price | number | Yes | Base service price. |
| final_customer_price_rub | number | Yes | Only customer-facing price. |
| expires_at | datetime | Recommended | Future implementation should define quote expiry. |

## Order

Represents a customer request through its lifecycle.

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| id | string | Yes | Stable order identifier. |
| status | enum | Yes | One lifecycle status. |
| customer_id | string | Yes | Customer reference. |
| quote_id | string | No | Required after quote. |
| payment_method | PaymentMethod | Yes when known | Preferred or required payment method. |
| operator_id | string | No | Assigned operator. |
| created_at | datetime | Yes | Creation timestamp. |
| updated_at | datetime | Yes | Last update timestamp. |

## Customer

Represents a customer contact, not a full identity profile.

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| id | string | Yes | Internal reference. |
| contact | string | Yes | Channel-specific handle or contact value. |
| channel | string | Yes | Telegram, web, API, CRM, etc. |
| notes | string | No | Minimal operational notes only. |

## Operator

Represents a human operator who processes orders.

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| id | string | Yes | Internal operator identifier. |
| display_name | string | Yes | Human-readable name. |
| role | string | Yes | Operator role. |
| active | boolean | Yes | Whether operator can receive orders. |

## PaymentMethod

Represents the intended route for completing payment.

| Value | Description |
| --- | --- |
| payment_link | Customer provides a checkout or payment link. |
| invoice | Customer provides invoice-like payment artifact. |
| gift_card | Operator uses gift card or code route. |
| balance_top_up | Operator tops up a balance or wallet. |
| account_based | Account access may be needed after safer options are checked. |
| unknown | Method is not yet known. |
