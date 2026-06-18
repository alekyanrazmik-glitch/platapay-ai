# ADR-0003: Keep Infrastructure Definitions Isolated from Application Code

## Status

Accepted

## Context

Production AI systems require repeatable deployment, secret management, observability,
scaling, and rollback strategies. Mixing infrastructure files with application modules
makes ownership and review harder as the platform grows.

## Decision

Keep infrastructure and deployment assets under `infra/`, separated from application and
package source directories. Use subdirectories for deployment targets such as Docker and
Kubernetes.

## Consequences

- Infrastructure changes can be reviewed independently from application logic.
- Future CI/CD pipelines can target deployment assets consistently.
- Application packages remain focused on runtime behavior rather than deployment mechanics.
