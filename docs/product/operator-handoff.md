# Operator Handoff

When a request is ready for human processing, the Sales Agent prepares an
operator handoff record and moves the order to `WaitingOperator`.

## Handoff Format

```text
Service:
Plan:
Currency:
Base price:
Final customer price:
Payment method:
Payment link:
Account access required:
Customer contact:
Risk notes:
Status:
Created at:
```

## Field Notes

- **Service** — the exact service (e.g. ChatGPT Plus).
- **Plan** — the specific plan or tier.
- **Currency** — the service's native currency.
- **Base price** — the catalog base price in that currency (internal input).
- **Final customer price** — the final price shown to the customer (from the
  Quote). This is the only price the customer has seen.
- **Payment method** — the chosen safe method (payment link, invoice, gift
  card, balance top-up, instructions).
- **Payment link** — the link, if provided by the customer.
- **Account access required** — yes/no and what is needed, if applicable.
- **Customer contact** — how to reach the customer.
- **Risk notes** — anything the operator should be careful about.
- **Status** — the current order status (see `order-lifecycle.md`).
- **Created at** — timestamp of the request.

## Rules

- Never include the internal formula, internal rate, commission, or margin in
  the handoff record shown beyond internal operators.
- Never include passwords or secrets. If account access is required, follow the
  secure access procedure rather than storing credentials in the handoff.
- The handoff record mirrors the Google Sheets `Orders` tab fields.
