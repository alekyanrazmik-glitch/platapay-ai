# Order Lifecycle

An order represents a single customer request to pay for a foreign digital
service. This document fixes the order statuses and, for each one, who moves the
order into it, what the customer sees, what the operator sees, and which data is
required.

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

## Status Details

### New

- **Who sets it:** the system, when a customer first contacts PlataPay.
- **Customer sees:** a greeting and a prompt to describe what they want to pay
  for.
- **Operator sees:** a new request with the raw customer message.
- **Required data:** customer contact, initial message, created-at timestamp.

### NeedInfo

- **Who sets it:** the Sales Agent, when service or plan is unclear.
- **Customer sees:** one clarifying question (for example, which plan).
- **Operator sees:** the request marked as awaiting customer clarification.
- **Required data:** the specific missing field(s).

### Quoted

- **Who sets it:** the Sales Agent, after receiving a Quote from the Pricing
  Engine.
- **Customer sees:** only the final price and an offer to proceed.
- **Operator sees:** service, plan, currency, base price, and the final
  customer price.
- **Required data:** service, plan, currency, base price, final price.

### WaitingPaymentLink

- **Who sets it:** the Sales Agent, when a payment link is the chosen method.
- **Customer sees:** a request to send a payment link or confirm the method.
- **Operator sees:** the request awaiting a payment link.
- **Required data:** chosen payment method, final price.

### WaitingOperator

- **Who sets it:** the Sales Agent, when the request is ready for human
  processing.
- **Customer sees:** a message that the request was handed to a specialist.
- **Operator sees:** the full operator handoff record.
- **Required data:** all operator handoff fields (see `operator-handoff.md`).

### InProgress

- **Who sets it:** the operator, when actively processing the payment.
- **Customer sees:** a status that the request is being processed.
- **Operator sees:** the request assigned to them and in progress.
- **Required data:** operator id, payment method, final price.

### Completed

- **Who sets it:** the operator, when the service has been paid and delivered.
- **Customer sees:** confirmation that the request is completed.
- **Operator sees:** the request closed as successful.
- **Required data:** completion timestamp, result note.

### Failed

- **Who sets it:** the operator, when the request cannot be completed.
- **Customer sees:** a clear explanation and next steps or a refund note.
- **Operator sees:** the request closed as failed with a reason.
- **Required data:** failure reason, timestamp.

### Cancelled

- **Who sets it:** the customer or the operator, when the request is withdrawn.
- **Customer sees:** confirmation that the request was cancelled.
- **Operator sees:** the request closed as cancelled with a reason.
- **Required data:** cancellation reason, timestamp.

## Typical Flow

```text
New -> NeedInfo -> Quoted -> WaitingPaymentLink -> WaitingOperator
    -> InProgress -> Completed
```

Any status may move to `Failed` or `Cancelled` when appropriate.
