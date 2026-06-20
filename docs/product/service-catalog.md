# Service Catalog

This document lists the first services PlataPay AI OS supports. Base prices are
in the service's native currency and are used as input to the Pricing Engine.
The customer is always shown only the final price returned as a Quote.

For each service:

- **category** — the type of service;
- **currency** — the native billing currency;
- **base price** — the catalog price in that currency;
- **payment link possible** — whether a payment link can be used;
- **account login may be required** — whether account access may be needed;
- **gift card possible** — whether a gift card path exists;
- **average processing time** — a rough estimate;
- **notes** — additional context.

## Services

### ChatGPT Plus

- category: AI assistant
- currency: USD
- base price: 20
- payment link possible: yes
- account login may be required: sometimes
- gift card possible: no
- average processing time: 1–3 hours
- notes: Most requests can be handled via payment link.

### Claude Pro

- category: AI assistant
- currency: USD
- base price: 20
- payment link possible: yes
- account login may be required: sometimes
- gift card possible: no
- average processing time: 1–3 hours
- notes: Plan upgrade tied to the customer account.

### Claude Max

- category: AI assistant
- currency: USD
- base price: 100
- payment link possible: yes
- account login may be required: sometimes
- gift card possible: no
- average processing time: 1–3 hours
- notes: Higher-tier plan; confirm exact tier with the customer.

### Midjourney Basic

- category: AI image generation
- currency: USD
- base price: 10
- payment link possible: yes
- account login may be required: sometimes
- gift card possible: no
- average processing time: 1–3 hours
- notes: Subscription tied to the customer account.

### Midjourney Standard

- category: AI image generation
- currency: USD
- base price: 30
- payment link possible: yes
- account login may be required: sometimes
- gift card possible: no
- average processing time: 1–3 hours
- notes: Confirm plan tier before quoting.

### Canva Pro

- category: Design
- currency: USD
- base price: 15
- payment link possible: yes
- account login may be required: sometimes
- gift card possible: no
- average processing time: 1–6 hours
- notes: Team vs individual plan affects price.

### CapCut Pro

- category: Video editing
- currency: USD
- base price: 10
- payment link possible: yes
- account login may be required: sometimes
- gift card possible: no
- average processing time: 1–6 hours
- notes: Confirm monthly vs annual.

### Google One

- category: Cloud storage
- currency: USD
- base price: 2 / 10 / 20 depending on plan
- payment link possible: yes
- account login may be required: sometimes
- gift card possible: no
- average processing time: 1–6 hours
- notes: Price depends on the selected storage plan.

### Apple services

- category: Platform / subscriptions
- currency: variable
- base price: variable
- payment link possible: sometimes
- account login may be required: sometimes
- gift card possible: yes
- average processing time: 1–12 hours
- notes: Gift card path is often preferred for Apple services.

### Steam

- category: Gaming
- currency: variable
- base price: variable
- payment link possible: sometimes
- account login may be required: no
- gift card possible: yes
- average processing time: 1–12 hours
- notes: Gift card / wallet top-up is the usual safe path.

## Notes

- Base prices are inputs only; final prices come from the Pricing Engine.
- Prices and availability change; treat this catalog as the source of base
  values, synchronized with the Google Sheets `Services` and `Pricing` tabs.
