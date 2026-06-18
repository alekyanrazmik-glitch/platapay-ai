# Orders Contract Draft

Orders represent customer requests from initial intake through operator processing.

## Statuses

| Status | Meaning | Controlled by |
| --- | --- | --- |
| New | New request was created. | Sales Agent or intake channel |
| NeedInfo | Required information is missing. | Sales Agent or operator |
| Quoted | Final customer price is calculated. | Pricing Engine via Sales Agent |
| WaitingPaymentLink | Waiting for payment link or safe payment artifact. | Sales Agent or operator |
| WaitingOperator | Ready for human processing. | Sales Agent |
| InProgress | Operator is executing the payment flow. | Operator |
| Completed | Payment was completed. | Operator |
| Failed | Payment could not be completed. | Operator |
| Cancelled | Customer or operator cancelled the request. | Customer, Sales Agent, or operator |

## Required Order Data by Phase

| Phase | Required data |
| --- | --- |
| Intake | customer contact, source channel, requested service or free text, created time |
| Quoting | service, plan or base price, currency, exchange rate reference, final customer price |
| Handoff | service, plan, final price, payment method, customer contact, status, created time |
| Processing | assigned operator, accepted final price, payment artifact or method, risk notes |
| Completion | result status, completion/failure reason, customer notification status |

## Order Invariants

- An order cannot move to `Quoted` without a final customer price.
- An order cannot move to `WaitingOperator` without a structured handoff payload.
- `InProgress`, `Completed`, and `Failed` require an operator actor.
- Customer-facing messages must not include internal pricing components.
- Account-based flows must be treated as higher-risk than payment links, invoices, gift cards, and balance top-ups.

## Handoff Payload

The order handoff must include:

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
