# Orders — Domain Contract

An Order represents one customer request to pay for a foreign digital service.
This is a domain contract, not runtime code. Statuses and transitions are
defined in `../../../docs/product/order-lifecycle.md`.

## Order Fields

| field            | type    | required | description                          |
| ---------------- | ------- | -------- | ------------------------------------ |
| order_id         | string  | yes      | Stable identifier                    |
| customer_contact | string  | yes      | How to reach the customer            |
| service          | string  | yes      | Service name                         |
| plan             | string  | yes      | Plan or tier                         |
| currency         | string  | yes      | Service currency                     |
| base_price       | number  | yes      | Base price input (internal)          |
| final_price      | number  | yes      | Final price shown to the customer    |
| payment_method   | string  | no       | Chosen safe payment method           |
| payment_link     | string  | no       | Link provided by the customer        |
| account_required | boolean | yes      | Whether account access is needed     |
| status           | string  | yes      | Current lifecycle status             |
| operator_id      | string  | no       | Assigned operator                    |
| risk_notes       | string  | no       | Operator risk notes                  |
| created_at       | string  | yes      | Creation timestamp                   |
| updated_at       | string  | yes      | Last update timestamp                |

## Statuses

```text
New
NeedInfo
Quoted
WaitingPaymentLink
WaitingOperator
InProgress
Completed
Failed
Cancelled
```

## Invariants

- `final_price` is set only after a Quote is received from the Pricing Engine.
- The customer has only ever seen `final_price`, never the internal components.
- An order in `WaitingOperator` must have all operator handoff fields populated
  (see `../../../docs/product/operator-handoff.md`).
- Credentials are never stored on the order.

## Relationship to Google Sheets

The Order fields mirror the `Orders` tab in
`../../../docs/integrations/google-sheets/schema.md`.
