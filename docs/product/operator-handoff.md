# Operator Handoff

The Sales Agent must produce a structured handoff when a request is ready for operator processing.

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

## Field Rules

| Field | Required | Description |
| --- | --- | --- |
| Service | Yes | Normalized service name from the catalog or free-text service name if unsupported. |
| Plan | Yes when known | Plan, tier, storage amount, subscription term, or requested top-up amount. |
| Currency | Yes when known | Currency of the base price, for example USD. |
| Base price | Yes when known | Service base price before PlataPay internal pricing policy. |
| Final customer price | Yes after quote | Customer-facing final price in RUB. |
| Payment method | Yes | Payment link, invoice, gift card, balance top-up, account-based flow, or unknown. |
| Payment link | Required for link-based flow | URL or payment artifact supplied by the customer. |
| Account access required | Yes | `Yes`, `No`, or `Unknown`; safer methods should be checked first. |
| Customer contact | Yes | Contact handle or channel identifier. Do not include unnecessary personal data. |
| Risk notes | No | Region mismatch, variable plan, unsupported service, credential risk, or payment uncertainty. |
| Status | Yes | Current order lifecycle status. |
| Created at | Yes | Timestamp when the request was created. |
