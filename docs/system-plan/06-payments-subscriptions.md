# Payments And Subscriptions

## Access Levels

- Free: sample simulations, limited formulas, limited practice.
- Student Pro monthly/yearly: full student simulation and practice access.
- Teacher plan: classroom presentation and assignment features.
- Institution plan: seat-based access for coaching centers and schools.
- Enterprise/school plan: invoice/manual contract support later.

## Gateway Direction

Use a payment provider abstraction so bKash, Nagad, Rocket, card payments,
Stripe, and manual invoices can be added without rewriting subscriptions.

## Subscription Behavior

- Plan controls feature access and content tier.
- Institution plan controls seats and one-active-session policy.
- Payment records and provider events must be stored separately.
- Failed payments should not immediately destroy learning progress.

## Pricing Rule

Do not finalize pricing from guesses. Create a separate pricing model using
current hosting, database, bandwidth, email/SMS, storage, support, and gateway
fee data before launch.

## Plan Behavior

Free plan:

- Public sample simulations.
- Limited formula and practice access.
- Progress saving for registered students.

Student Pro:

- Full included simulation library.
- Full step-by-step formula mode.
- More practice and saved experiments.

Teacher:

- Presentation mode.
- Group assignment tools.
- Student progress visibility for assigned groups.

Institution:

- Seat-based student access.
- Teacher accounts.
- Bulk invites.
- Usage reports.
- Optional one-active-session enforcement.

## Payment Provider Layer

Provider integrations should share a common interface:

- `createCheckout`
- `verifyWebhook`
- `getPaymentStatus`
- `refundOrVoid`, when supported
- `normalizeEvent`

Initial provider candidates:

- Manual invoice
- bKash
- Nagad
- Rocket
- Local card/bank gateway
- Stripe for international cards where available

## Billing State Rules

- Access is controlled by subscription status and plan features.
- Failed payment marks subscription as past due before access is removed.
- Manual institution invoices can be pending, paid, overdue, cancelled.
- Provider events are append-only; subscriptions are derived state.

## Admin Billing Needs

- Search by user/institution.
- View plan, subscription, invoices, gateway events.
- Grant temporary access manually with audit note.
- Export basic billing report later.
