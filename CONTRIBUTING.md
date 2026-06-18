# Contributing to PlataPay AI

Thank you for helping build PlataPay AI as a production-grade platform. This repository is expected to grow into multiple services and packages, so contributions should preserve clear boundaries and strong documentation.

## Contribution Principles

- Keep business logic out of delivery adapters such as bots and HTTP controllers.
- Prefer explicit interfaces between domain, AI orchestration, integrations, and applications.
- Document architectural trade-offs in ADRs before making foundational changes.
- Treat security, privacy, observability, and operational readiness as product requirements.
- Do not commit secrets, credentials, production data, or generated dependency folders.

## Development Workflow

1. Create or update an issue describing the problem and expected outcome.
2. For architectural changes, add an ADR in `docs/adr/` using the existing ADR format.
3. Keep changes focused and avoid mixing unrelated refactors.
4. Add or update documentation when behavior, structure, or operational assumptions change.
5. Run available checks before opening a pull request.

## Pull Request Checklist

- [ ] The change has a clear scope and description.
- [ ] Documentation is updated when needed.
- [ ] ADRs are added or updated for significant architecture decisions.
- [ ] No secrets, tokens, credentials, or private data are committed.
- [ ] Tests/checks are added or updated when implementation code is introduced.

## Documentation Standards

- Use Markdown for repository documentation.
- Prefer diagrams in Mermaid when possible so architecture can be reviewed as text.
- Keep ADRs immutable after acceptance except for typo fixes; supersede old decisions with new ADRs.
- Link related documents instead of duplicating large sections.

## Commit Style

Use clear, imperative commit messages, for example:

- `docs: add architecture foundation`
- `chore: add repository scaffolding`
- `adr: record platform-first architecture`
