# API Plan

This file lists API groups and minimum behavior. Exact request/response shapes
should be defined during implementation planning.

## Auth APIs

- Public register, login, logout, refresh session.
- Staff login, logout, refresh session.
- Email verification and password reset.
- Session/device management for one-active-session policy.

## Catalog APIs

- Bootstrap catalog.
- List grades, subjects, papers, chapters, concepts.
- Fetch concept details with formulas, simulations, and practice metadata.

## Simulation APIs

- Fetch simulation config and published version.
- Save simulation progress.
- Save attempt and answer data.
- Fetch formula steps and unit conversion rules.

## Practice APIs

- Fetch questions by concept, difficulty, and access tier.
- Submit answer.
- Reveal hint or solution.
- Track mastery and weak topics.

## Admin APIs

- Manage curriculum, concepts, formulas, simulations, practice questions.
- Manage simulation templates, modules, versions, previews, validation.
- Review, approve, publish, unpublish, rollback.
- Read audit logs.

## Institution APIs

- Manage institution profile.
- Invite students and teachers.
- Assign seats.
- Create groups and assignments.
- View reports.

## Payment APIs

- List plans.
- Start checkout or gateway payment flow.
- Handle provider webhook.
- Read subscription and invoice status.

## Route Group Details

### Public Auth

- `POST /api/auth/public/register`
- `POST /api/auth/public/login`
- `POST /api/auth/public/logout`
- `GET /api/auth/public/me`
- `POST /api/auth/public/verify-email`
- `POST /api/auth/public/forgot-password`
- `POST /api/auth/public/reset-password`

### Staff Auth

- `POST /api/auth/staff/login`
- `POST /api/auth/staff/logout`
- `GET /api/auth/staff/me`

Staff auth must reject non-staff roles even if the user has a valid public
account.

### Catalog

- `GET /api/catalog/bootstrap`
- `GET /api/catalog/grades`
- `GET /api/catalog/grades/:gradeId/subjects`
- `GET /api/subjects/:subjectId/chapters`
- `GET /api/chapters/:chapterId/concepts`
- `GET /api/concepts/:conceptId`

### Simulations

- `GET /api/simulations/:simulationId`
- `GET /api/simulations/:simulationId/formulas`
- `GET /api/simulations/:simulationId/practice`
- `POST /api/simulations/:simulationId/attempts`

### Progress

- `GET /api/progress/summary`
- `GET /api/progress/concepts/:conceptId`
- `POST /api/progress`

### Admin CMS

- `GET /api/staff/dashboard`
- `GET/POST/PATCH /api/admin/curriculum/*`
- `GET/POST/PATCH /api/admin/concepts`
- `GET/POST/PATCH /api/admin/formulas`
- `GET/POST/PATCH /api/admin/questions`
- `GET/POST/PATCH /api/admin/simulations`
- `POST /api/admin/simulations/:id/preview`
- `POST /api/admin/simulations/:id/submit-review`
- `POST /api/admin/simulations/:id/publish`
- `POST /api/admin/simulations/:id/rollback`

### Institutions

- `GET/POST/PATCH /api/institutions`
- `GET/POST /api/institutions/:id/members`
- `POST /api/institutions/:id/invites`
- `GET/PATCH /api/institutions/:id/seats`
- `GET /api/institutions/:id/reports`

### Payments

- `GET /api/plans`
- `POST /api/billing/checkout`
- `GET /api/billing/subscription`
- `GET /api/billing/invoices`
- `POST /api/webhooks/payments/:provider`

## API Rules

- Public APIs only return published content.
- Admin APIs require staff auth and permissions.
- Institution APIs require organization membership.
- Payment webhooks must verify provider signatures before changing state.
- Simulation attempts should store content version IDs.
