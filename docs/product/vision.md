# PlataPay AI OS — Vision

## What PlataPay AI OS Is

PlataPay AI OS is an AI platform for the PlataPay service. It coordinates AI
agents, business rules, and human operators so customers can pay for foreign
digital services quickly and safely.

The platform is built as an operating system for business operations, not as a
single chatbot. Agents, pricing, catalog, and operator workflows are described
as durable contracts so the implementation can evolve without losing the
business intent.

## The First Agent — Sales Agent

The first agent on the platform is the **Sales Agent**. It helps customers
place a request to pay for foreign digital services (for example ChatGPT Plus,
Claude Pro, Midjourney, Canva Pro).

The Sales Agent:

- accepts the customer request;
- clarifies the service and the plan;
- gets the final price from the Pricing Engine;
- shows the customer only the final price;
- offers safe payment methods first (payment link, invoice, gift card, balance
  top-up, instructions);
- hands the request over to a human operator.

## What PlataPay Is Not

PlataPay must always be presented honestly. PlataPay:

- is **not** a bank;
- is **not** a payment system;
- is **not** an official partner of the services it helps pay for.

PlataPay is a service that accepts a customer request and helps arrange payment
for foreign digital services.

## Principles

- **Safety first.** Prefer payment links, invoices, gift cards, and balance
  top-ups over account credentials.
- **Price transparency to the customer, confidentiality of the formula.** The
  customer sees only the final price; the internal calculation stays internal.
- **Human in the loop.** Every request can be handed over to an operator.
- **Contracts before code.** Business behavior is documented and reviewable
  before runtime implementation.

## Scope of This Documentation

This documentation describes the business core only: product behavior, pricing
policy, order lifecycle, service catalog, communication rules, operator
handoff, the Sales Agent system prompt, the Google Sheets schema, and domain
contracts. It does not include runtime code, bot integrations, or payment APIs.
