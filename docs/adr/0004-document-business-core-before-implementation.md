# ADR-0004: Document Business Core Before Implementation

## Status

Accepted

## Context

PlataPay AI OS needs a concrete business core before implementation starts. If the team
immediately writes a Telegram bot or API handlers, pricing rules, order states, customer
communication behavior, and operator handoff details will likely become scattered across
bots, handlers, prompts, and integrations.

That would make the platform harder to scale, test, audit, and reuse across future
channels.

## Decision

Before implementing Telegram, API, payment execution, or external integrations, document
the business core of PlataPay AI OS:

- product vision and agent constitution;
- Sales Agent behavior;
- internal pricing policy;
- order lifecycle;
- service catalog;
- customer communication rules;
- operator handoff format;
- Google Sheets operational schema;
- Sales Agent system prompt;
- domain model contracts for entities, pricing, and orders.

## Consequences

- Business rules become reviewable before code is written.
- Telegram and future channels can reuse the same domain model and AI orchestration rules.
- Pricing confidentiality and customer communication constraints are explicit.
- Implementation is intentionally delayed until the business core is agreed.
- Documentation must be kept synchronized with future code and tests.
