# Order Lifecycle

This document defines the first draft of the PlataPay AI OS order lifecycle.

## Status Overview

1. `New` — new request.
2. `NeedInfo` — additional data is required.
3. `Quoted` — final price has been calculated.
4. `WaitingPaymentLink` — waiting for payment link or equivalent safe payment artifact.
5. `WaitingOperator` — request has been transferred to an operator.
6. `InProgress` — operator is processing the payment.
7. `Completed` — payment has been completed.
8. `Failed` — payment could not be completed.
9. `Cancelled` — customer cancelled the request.

## Status Details

| Status | Who moves order here | Customer sees | Operator sees | Required data |
| --- | --- | --- | --- | --- |
| `New` | Sales Agent or intake channel | A short confirmation that the request is being checked | Raw request, source channel, timestamp | Customer contact, requested service or free-text request, created time |
| `NeedInfo` | Sales Agent or operator | A clear question for missing service, plan, region, payment link, or method | Missing fields and conversation context | Customer contact, known request fields, list of missing fields |
| `Quoted` | Pricing Engine via Sales Agent | Final customer price only and next safe step | Pricing inputs, final price, quote timestamp | Service, plan or base price, currency, exchange rate reference, final customer price |
| `WaitingPaymentLink` | Sales Agent or operator | Request to send payment link, invoice, gift card option, balance top-up instruction, or clarify account-based flow | Order with quote and missing payment artifact | Service, plan, final price, expected payment method, customer contact |
| `WaitingOperator` | Sales Agent after quote and required intake data are ready | Confirmation that the request was passed to an operator | Structured handoff payload and risk notes | Service, plan, final price, payment method, customer contact, status, created time |
| `InProgress` | Operator | Operator is working on the request | Execution checklist, payment artifact, risk notes | Assigned operator, accepted final price, payment method, customer contact |
| `Completed` | Operator | Payment is completed and any next customer instruction | Completion notes, proof/reference if allowed | Completed time, operator, result note, customer notification status |
| `Failed` | Operator | Payment could not be completed; next options may be offered | Failure reason, risk notes, suggested next step | Failure reason, operator, customer notification status |
| `Cancelled` | Customer, Sales Agent, or operator | Request is cancelled | Cancellation reason and conversation context | Cancellation reason, actor, timestamp |

## Lifecycle Rules

- `Quoted` must not expose internal pricing components to the customer.
- `WaitingOperator` requires enough information for a human operator to understand the request without rereading the full conversation.
- `InProgress`, `Completed`, and `Failed` are operator-controlled statuses.
- If account access may be required, safer alternatives should be checked first.
