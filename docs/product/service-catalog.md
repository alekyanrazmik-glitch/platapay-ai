# Initial Service Catalog

This catalog defines the first services for the PlataPay Sales Agent and Pricing Engine. Prices are base subscription prices before internal pricing policy is applied.

| Service | Category | Currency | Base price | Payment link possible | Account login may be required | Gift card possible | Average processing time | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ChatGPT Plus | AI assistant | USD | 20 | Yes | Sometimes | No | 15-60 minutes | Prefer official checkout link or invoice-like payment page when available. |
| Claude Pro | AI assistant | USD | 20 | Yes | Sometimes | No | 15-60 minutes | Availability and payment flow may depend on account region. |
| Claude Max | AI assistant | USD | 100 | Yes | Sometimes | No | 15-90 minutes | Higher-value order; operator should verify exact plan before payment. |
| Midjourney Basic | Creative tools | USD | 10 | Yes | Sometimes | No | 15-60 minutes | Discord/account flow may require customer coordination. |
| Midjourney Standard | Creative tools | USD | 30 | Yes | Sometimes | No | 15-60 minutes | Confirm monthly vs annual billing before quoting if unclear. |
| Canva Pro | Design tools | USD | 15 | Yes | Sometimes | No | 15-60 minutes | Team/family plans may differ from base price. |
| CapCut Pro | Video tools | USD | 10 | Yes | Sometimes | No | 15-60 minutes | Confirm platform and region if price differs. |
| Google One | Cloud storage | USD | 2 / 10 / 20 depending on plan | Sometimes | Sometimes | Sometimes | 30-120 minutes | Confirm selected storage plan and country-specific checkout options. |
| Apple services | Ecosystem services | Variable | Variable | No | Sometimes | Yes | 30-120 minutes | Gift card or balance top-up may be safer than direct account access. |
| Steam | Gaming | Variable | Variable | No | No | Yes | 15-120 minutes | Prefer gift card or wallet top-up route where possible. |

## Catalog Rules

- If the customer names an unsupported service, the agent should not invent availability.
- If base price is variable, the agent must ask for plan, amount, region, or payment page before quoting.
- Service catalog values are business inputs, not executable integration code.
