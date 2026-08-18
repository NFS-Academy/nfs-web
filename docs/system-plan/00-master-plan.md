# Master Plan

## Summary

Naim Science Lab is a full-stack bilingual science simulation education
platform for Bangladesh-focused students, teachers, coaching centers, schools,
and internal staff. The product should combine interactive simulations,
formula explanation, step-by-step problem solving, progress tracking, content
management, subscriptions, and institution management.

## Default Stack

- Frontend: React, Vite, JavaScript, JSX
- UI: Tailwind CSS, shadcn-style JSX components, lucide-react
- Backend: Node.js, Express, JavaScript
- Database: MongoDB with Mongoose
- Auth: JWT-based public and staff login flows

## Product Surfaces

- Public website for product explanation, samples, pricing, contact, login.
- Student app for catalog, simulations, formulas, practice, progress, billing.
- Teacher app for classroom use, assignments, presentation mode, progress.
- Institution portal for seats, students, teachers, billing, reports.
- Staff admin panel for CRM, content, simulation publishing, payments, support.
- Backend API for all apps.

## Build Order

1. Finish planning docs and source workflows.
2. Build MVP foundation: auth, catalog, simulation workspace, staff dashboard.
3. Build first simulation packs: Chemistry MVP and Physics Chapter 3.
4. Add bilingual content workflow.
5. Add access control, subscriptions, and payment provider abstraction.
6. Add institution portal and one-active-session policy.
7. Scale with analytics, support CRM, content versioning, caching, and monitoring.

## Non-Goals For Early Build

- Do not build a game character, inventory, or mission system.
- Do not build every class and subject immediately.
- Do not finalize pricing until current hosting and gateway costs are researched.
- Do not allow non-technical editors to publish arbitrary production code.

## Development Principle

Build the product as a serious learning platform first. Every feature must
support one of these outcomes:

- Students understand a concept visually.
- Students solve a formula or board-style question correctly.
- Teachers can explain or assign the concept.
- Institutions can manage seats and usage.
- Staff can safely create, review, publish, and maintain content.

## MVP Definition

The MVP is not the full business. The MVP is the smallest system that proves
the core learning loop and the content-management approach.

MVP must include:

- Public and staff authentication.
- Grade-first catalog with seed Class 9-10 content.
- Concept page with formulas, explanations, and simulation entry.
- Simulation workspace shell with controls, outputs, formula panel, practice tab.
- Basic progress saving.
- Basic staff dashboard.
- Seeded Chemistry MVP simulations and Physics Chapter 3 planning-ready content.

MVP can postpone:

- Real payment gateway activation.
- Full institution portal.
- All subjects and all chapters.
- Advanced analytics.
- Custom code upload from admin.
- Full bilingual content for every page.

## Build Phases

Phase 0: planning and source organization.

- Populate all docs in `docs/`.
- Treat Markdown chapter files as source material.
- Define first simulation packs and admin workflow.

Phase 1: app foundation.

- Create `frontend/` React/Vite app.
- Create `backend/` Express/Mongoose API.
- Add root package scripts for running both.
- Implement public/staff auth, seeded catalog, simulation shell, progress save.

Phase 2: first simulation packs.

- Implement Chemistry MVP simulations.
- Implement first Physics Chapter 3 simulations.
- Add formula engine and unit conversion helpers.

Phase 3: bilingual content.

- Add English/Bangla content fields.
- Add translation status in admin.
- Add language toggle and fallback behavior.

Phase 4: access and payments.

- Add plans, subscriptions, free/pro gating.
- Add payment provider abstraction before real gateways.

Phase 5: institutions.

- Add organization accounts, seats, invites, groups, assignments, reports.

Phase 6: scale.

- Add more classes, more subjects, analytics, worker jobs, monitoring, backups.

## Working Folder Rule

The main working folder for implementation is `C:\Users\mahmud\Desktop\Code\Naim\simulator`.
Planning stays in `simulator/docs`. Source chapter material may remain in
`../plan/` and should be referenced, not copied blindly.

## Development Readiness

Development can start after:

- Each docs folder has clear planning files.
- Physics Chapter 3 and Chemistry MVP have simulation-level details.
- Admin simulation builder is documented.
- API and data model plans are concrete enough for route/model scaffolding.
- The work log exists at `work-log/updates.md`.
