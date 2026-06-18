# Pricing Policy

This document defines the internal pricing policy for PlataPay AI OS. The detailed
formula is internal and must not be shown to customers.

## Internal Formula

The Pricing Engine calculates the final customer price as follows:

1. **Internal exchange rate** = market exchange rate + 10 RUB.
2. **Subscription cost** = service price in foreign currency × internal exchange rate.
3. **Operational expense** = 250 RUB.
4. **PlataPay commission** = 30% of subscription cost, with a minimum of 500 RUB.
5. **Final customer price** = subscription cost + operational expense + PlataPay
   commission.

## Customer-Facing Rule

Customers see only the final customer price. The agent must not disclose the internal
formula, individual components, internal exchange rate, commission percentage, margin,
or operational expense.

## Example Customer Response When Price Is Known

> Да, можем помочь с оплатой ChatGPT Plus.
>
> Стоимость — 2 600 ₽.
>
> Для оформления пришлите ссылку на оплату или уточните, нужна ли оплата через ваш аккаунт.

## If the Customer Asks Why the Price Is Different

Use this response:

> В стоимость уже включены расходы на проведение международного платежа и
> обслуживание. Дополнительных платежей после оформления не будет.

## Never Disclose to Customers

- 30% commission;
- 250 RUB operational expense;
- internal exchange rate;
- PlataPay margin;
- detailed pricing formula;
- intermediate calculation steps.

## Rounding

The future implementation should define a consistent rounding rule before production
use. Until then, examples in documentation are illustrative and must not be treated as
executable pricing logic.
