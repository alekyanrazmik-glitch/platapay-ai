# PlataPay AI

PlataPay AI is the foundation for a production-grade AI platform for PlataPay. The repository is intentionally structured as a platform, not as a single Telegram bot, so future teams can add multiple channels, AI workflows, integrations, and deployment targets without rewriting the core architecture.

## Vision

Build a secure, observable, and extensible AI layer for PlataPay that can support:

- conversational user channels such as Telegram, web chat, and support tools;
- AI orchestration for assistants, tools, retrieval, and workflow automation;
- domain services that keep PlataPay business rules independent from delivery channels;
- integrations with internal PlataPay systems and external providers;
- production deployment with monitoring, security controls, and clear operational ownership.

## Repository Structure

```text
platapay-ai/
├── apps/                  # Deployable applications and user-facing entrypoints
│   ├── api/               # Future public/internal API service
│   └── telegram-bot/      # Future Telegram adapter, not the platform core
├── packages/              # Reusable platform modules
│   ├── ai-orchestration/  # Future AI agents, tools, prompts, retrieval, evaluation
│   ├── domain/            # Future domain model and business capabilities
│   ├── integrations/      # Future adapters for external and internal systems
│   └── shared/            # Future shared utilities, contracts, config helpers
├── infra/                 # Infrastructure templates and deployment assets
│   ├── docker/            # Future Docker and Compose files
│   └── k8s/               # Future Kubernetes manifests or Helm charts
├── docs/                  # Product, architecture, operations, and security docs
│   ├── adr/               # Architecture Decision Records
│   ├── architecture/      # Diagrams and architecture deep-dives
│   └── security/          # Security model, threat analysis, compliance notes
├── scripts/               # Automation scripts for local/dev/CI workflows
└── tests/                 # Cross-package tests and future test fixtures
```

## Architectural Principles

1. **Platform first**: channel adapters such as Telegram must depend on platform modules, not contain core logic.
2. **Domain isolation**: business rules belong in domain packages, not in bots, HTTP controllers, or provider adapters.
3. **Provider independence**: AI and payment-related integrations should be wrapped behind internal interfaces to avoid vendor lock-in.
4. **Security by design**: secrets, user data, payment-adjacent workflows, and AI tool permissions require explicit controls.
5. **Observability from day one**: production services should emit structured logs, metrics, traces, and audit events.
6. **Documented decisions**: important architecture choices are captured as ADRs before implementation details harden.

## Business Core

The PlataPay AI OS business core describes the first agent (the Sales Agent) and
its supporting contracts: product behavior, pricing policy, order lifecycle,
service catalog, customer communication, operator handoff, the Google Sheets
schema, the Sales Agent system prompt, and domain contracts. It is documentation
and contracts only — no runtime code, bot, or payment integration.

The business core is described in:

```text
docs/product/
docs/integrations/google-sheets/schema.md
packages/ai-orchestration/prompts/sales-agent-system.md
packages/domain/docs/
```

## Architecture Overview

The high-level architecture is documented in [`docs/architecture/system-context.md`](docs/architecture/system-context.md). ADRs are stored in [`docs/adr/`](docs/adr/).

## Current Status

This repository currently contains the project foundation only. Business logic, runtime services, AI workflows, and provider integrations have not yet been implemented.

## Getting Started

There is no runnable application yet. The recommended next steps are:

1. choose the initial runtime stack and package manager;
2. define service boundaries and API contracts;
3. add CI checks for formatting, linting, tests, and secret scanning;
4. implement the first thin vertical slice through an API adapter, orchestration package, and domain capability.

## Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for contribution workflow, documentation standards, and architecture decision rules.

## License

This project is licensed under the terms in [`LICENSE`](LICENSE).
