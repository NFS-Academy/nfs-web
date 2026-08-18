# Phase 4: Payments And Access

## Goal

Add free/pro access control and payment foundation.

## Outputs

- Plan model
- Subscription model
- Free/pro gating
- Payment provider abstraction
- Initial gateway integration plan
- Invoices/payment records
- Webhook verification

## Exit Criteria

Paid access can be granted, checked, changed, and audited safely.

## Implementation Notes

- Start with plan/access models and manual access grants.
- Add provider abstraction before gateway-specific implementation.
- Use mock/manual provider in development.
- Add webhook verification when real providers are integrated.

## First Access Rules

- Free users see sample content.
- Pro users see all MVP simulations.
- Institution users inherit organization plan access.
