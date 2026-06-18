# ADR-0002: Separate Channel Adapters from Domain and AI Orchestration

## Status

Accepted

## Context

Telegram may be the first user-facing interface, but PlataPay AI should support additional interfaces such as API clients, web chat, support consoles, or internal automation. If channel-specific handlers contain business rules, future channels will require duplicated logic and inconsistent behavior.

## Decision

Treat Telegram, HTTP APIs, and future interfaces as channel adapters. Channel adapters should translate transport-specific events into platform use cases and call reusable packages for domain behavior, AI orchestration, and integrations.

## Consequences

- Channel adapters stay thin and easier to replace.
- Business behavior remains consistent across channels.
- The platform needs explicit contracts between applications and packages before business logic is implemented.
