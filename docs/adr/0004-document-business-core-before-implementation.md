# ADR-0004: Document the Business Core Before Implementation

## Status

Accepted

## Context

PlataPay AI OS is an AI platform for the PlataPay service. Its first agent, the
Sales Agent, helps customers pay for foreign digital services. Before writing
runtime code, bot integrations, or payment APIs, the business intent must be
clear and reviewable: how the agent behaves, how prices are calculated and kept
confidential, how orders move through their lifecycle, which services are
offered, how customers are communicated with, and how requests are handed to
human operators.

Starting with implementation risks encoding incorrect or unsafe behavior — for
example revealing the internal pricing formula, hard-coding example prices, or
asking customers for credentials prematurely.

## Decision

Document the business core as contracts before implementation. This includes:

- product documentation under `docs/product/`;
- the pricing policy and its confidentiality rules;
- the order lifecycle;
- the service catalog;
- customer communication rules;
- the operator handoff format;
- the Google Sheets schema under `docs/integrations/google-sheets/`;
- the Sales Agent system prompt under
  `packages/ai-orchestration/prompts/`;
- domain contracts under `packages/domain/docs/`.

No runtime code, bot integration, Google Sheets API, or payment API is added at
this stage.

## Consequences

- Business behavior is reviewable before any code is written.
- Pricing confidentiality and safety rules are fixed up front.
- The Sales Agent uses only Pricing Engine Quotes, never self-calculated or
  hard-coded prices.
- Future implementation can be checked against these contracts.
