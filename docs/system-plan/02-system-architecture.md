# System Architecture

## App Separation

Keep frontend and backend separate. All frontends communicate with the backend
through documented APIs.

Recommended apps:

- `public-web`: marketing and sample simulation pages.
- `learning-app`: student and teacher learning experience.
- `institution-app`: seat, group, and billing management.
- `staff-admin`: CRM, content, simulation builder, payments, support.
- `api-server`: Express API and auth.
- `worker`: future background jobs for email, analytics, reports, imports.

## Backend Areas

- Auth and sessions
- Users and roles
- Curriculum catalog
- Simulations and formulas
- Practice and progress
- Institutions and seats
- Subscriptions and payments
- Admin workflow and audit logs
- Support and CRM

## Data Flow

Content is authored in staff admin, reviewed by R&D/language roles, published
as versioned records, then served through catalog and simulation APIs. Student
attempts and progress are written separately from content versions.

## Simulation Delivery

Use a registry of approved templates and developer-created modules. Admin users
configure variables, formulas, text, presets, and access tier. Custom code must
follow the module contract and pass validation before publishing.

## Source Workflow

Chapter PDFs should be converted to Markdown before planning. For now, use
`../../../plan/chapters/chapter 3.MD` for Physics Chapter 3 planning.

## Recommended Repository Shape

```text
simulator/
  frontend/          React/Vite learning app first, more apps later
  backend/           Express API, Mongoose models, seed data
  docs/              Planning source of truth
  work-log/          Short conversation update log
  package.json       Root scripts for frontend/backend development
```

Early implementation can use one React app with role-aware routes instead of
separate deployed frontends. The architecture must still keep boundaries clear:

- Public/student/teacher screens are user-facing.
- Staff/admin screens are protected by staff auth and role checks.
- Institution screens are protected by institution membership.
- Backend APIs remain the source of truth for auth, access, content, progress.

## Backend Module Shape

Recommended backend modules:

- `auth`: public/staff login, register, session, device lock.
- `catalog`: grades, subjects, papers, chapters, concepts.
- `learning`: simulations, formulas, practice, progress.
- `admin`: content workflow, simulation builder, review, publish.
- `institutions`: organizations, members, seats, groups.
- `billing`: plans, subscriptions, payments, provider events.
- `support`: tickets, notes, audit logs.

## Frontend Module Shape

Recommended frontend areas:

- `auth`: login/register for public and staff.
- `catalog`: browse grades, subjects, chapters, concepts.
- `simulation-workspace`: canvas, controls, formula, graph, practice.
- `student-dashboard`: progress, recent activity, weak topics.
- `teacher-dashboard`: groups and assignments.
- `institution-dashboard`: seats and usage.
- `admin-dashboard`: CRM, CMS, reviews, builder, payments.

## Data Flow Decisions

- Published content is immutable by version; edits create a draft/new version.
- Progress points to the simulation/content version used at the time.
- Admin preview can load draft versions; public APIs only serve published versions.
- Formula calculations should be shared between backend validation and frontend
  display where practical.

## Development Constraint

Do not hardwire the first Chemistry or Physics simulations directly into route
logic. They can be coded modules, but must still be represented as catalog
content with config, formulas, variables, and published status.
