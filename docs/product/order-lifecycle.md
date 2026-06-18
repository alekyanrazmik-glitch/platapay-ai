# Order Lifecycle

This document defines the first draft of the PlataPay AI OS order lifecycle.

## Status Overview

1. `New` — new request.
2. `NeedInfo` — additional data is required.
3. `Quoted` — final price has been calculated.
4. `WaitingPaymentLink` — waiting for payment link or equivalent safe payment
   artifact.
5. `WaitingOperator` — request has been transferred to an operator.
6. `InProgress` — operator is processing the payment.
7. `Completed` — payment has been completed.
8. `Failed` — payment could not be completed.
9. `Cancelled` — customer cancelled the request.

## Status Matrix

| Status | Owner | Required data summary |
| --- | --- | --- |
| `New` | Sales Agent or intake channel | Contact, request, created time |
| `NeedInfo` | Sales Agent or operator | Known fields and missing fields |
| `Quoted` | Pricing Engine via Sales Agent | Service, plan/base price, final price |
| `WaitingPaymentLink` | Sales Agent or operator | Quote and expected payment method |
| `WaitingOperator` | Sales Agent | Handoff payload and customer contact |
| `InProgress` | Operator | Assigned operator and payment method |
| `Completed` | Operator | Completed time, operator, result note |
| `Failed` | Operator | Failure reason and notification status |
| `Cancelled` | Customer, Sales Agent, or operator | Cancellation reason and timestamp |

## Status Details

### New

- **Who moves order here**: Sales Agent or intake channel.
- **Customer sees**: a short confirmation that the request is being checked.
- **Operator sees**: raw request, source channel, and timestamp.
- **Required data**: customer contact, requested service or free-text request,
  and created time.

### NeedInfo

- **Who moves order here**: Sales Agent or operator.
- **Customer sees**: a clear question for missing service, plan, region,
  payment link, or method.
- **Operator sees**: missing fields and conversation context.
- **Required data**: customer contact, known request fields, and list of missing
  fields.

### Quoted

- **Who moves order here**: Pricing Engine via Sales Agent.
- **Customer sees**: final customer price only and next safe step.
- **Operator sees**: pricing inputs, final price, and quote timestamp.
- **Required data**: service, plan or base price, currency, exchange-rate
  reference, and final customer price.

### WaitingPaymentLink

- **Who moves order here**: Sales Agent or operator.
- **Customer sees**: request to send payment link, invoice, gift card option,
  balance top-up instruction, or clarify account-based flow.
- **Operator sees**: order with quote and missing payment artifact.
- **Required data**: service, plan, final price, expected payment method, and
  customer contact.

### WaitingOperator

- **Who moves order here**: Sales Agent after quote and required intake data are
  ready.
- **Customer sees**: confirmation that the request was passed to an operator.
- **Operator sees**: structured handoff payload and risk notes.
- **Required data**: service, plan, final price, payment method, customer
  contact, status, and created time.

### InProgress

- **Who moves order here**: operator.
- **Customer sees**: operator is working on the request.
- **Operator sees**: execution checklist, payment artifact, and risk notes.
- **Required data**: assigned operator, accepted final price, payment method,
  and customer contact.

### Completed

- **Who moves order here**: operator.
- **Customer sees**: payment is completed and any next customer instruction.
- **Operator sees**: completion notes and proof/reference if allowed.
- **Required data**: completed time, operator, result note, and customer
  notification status.

### Failed

- **Who moves order here**: operator.
- **Customer sees**: payment could not be completed; next options may be
  offered.
- **Operator sees**: failure reason, risk notes, and suggested next step.
- **Required data**: failure reason, operator, and customer notification status.

### Cancelled

- **Who moves order here**: customer, Sales Agent, or operator.
- **Customer sees**: request is cancelled.
- **Operator sees**: cancellation reason and conversation context.
- **Required data**: cancellation reason, actor, and timestamp.

## Lifecycle Rules

- `Quoted` must not expose internal pricing components to the customer.
- `WaitingOperator` requires enough information for a human operator to
  understand the request without rereading the full conversation.
- `InProgress`, `Completed`, and `Failed` are operator-controlled statuses.
- If account access may be required, safer alternatives should be checked first.
