# ADR-0001: Use a Platform-Oriented Repository Structure

## Status

Accepted

## Context

PlataPay AI must become an AI platform that can support multiple user channels, AI
workflows, integrations, and deployment models. A repository structured only around a
Telegram bot would make the first channel the center of the system and would encourage
business logic to leak into bot handlers.

## Decision

Organize the repository around deployable applications, reusable platform packages,
infrastructure assets, and documentation:

- `apps/` for deployable entrypoints;
- `packages/` for reusable domain, AI orchestration, integration, and shared modules;
- `infra/` for deployment and infrastructure definitions;
- `docs/` for architecture, security, and decision records.

## Consequences

- The platform can add new channels without duplicating core logic.
- Domain and AI orchestration modules can be tested independently from delivery adapters.
- Initial setup requires more structure than a simple bot repository, but this reduces future migration risk.
