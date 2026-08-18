# Work Log

Short conversation-level update log for Naim Science Lab.

## 2026-06-18 - Docs blueprint population

Files changed:

- `docs/system-plan/*`
- `docs/curriculum/*`
- `docs/simulations/*`
- `docs/admin/*`
- `docs/build-roadmap/*`
- `work-log/updates.md`

Summary:

- Expanded the planning docs into a pre-development blueprint for product,
  architecture, data models, APIs, admin, payments, frontend UX, localization,
  security, QA, curriculum, simulations, and roadmap phases.
- Kept `simulator` as the main working folder and `simulator/docs` as the
  planning source.
- Kept Physics Chapter 3 planning based on `../plan/chapters/chapter 3.MD`.
- Added the requested single-file conversation update log.

Next recommended step:

- Review the populated docs, then start Phase 1 implementation: React/Vite
  frontend shell, Express/Mongoose backend shell, auth, seeded catalog,
  simulation workspace shell, basic progress save, and staff dashboard shell.

## 2026-06-18 - Stable v1 MVP scaffold

Files changed:

- `package.json`
- `package-lock.json`
- `backend/*`
- `frontend/*`
- `README.md`
- `work-log/updates.md`

Summary:

- Built the first full-stack v1 app inside `simulator/`: React/Vite frontend,
  Express backend, seeded curriculum, demo users, JWT auth, catalog APIs,
  simulation APIs, progress saving, plan metadata, and staff dashboard shell.
- Added Physics Chapter 3 simulations for momentum, Newton's second law,
  collisions, and friction, plus starter Chemistry simulations for
  neutralization, precipitation, and dry cell behavior.
- Added local `.env` files, installed dependencies, removed the vulnerable
  `concurrently` dependency, and confirmed a clean npm audit.
- Started local dev servers and verified backend health, student login, staff
  dashboard, simulation access, progress save, catalog bootstrap, frontend
  response, and production frontend build.

Next recommended step:

- Review the v1 app in the browser, then decide whether to deepen the admin
  simulation builder first or add MongoDB persistence models first.

## 2026-06-19 - Frontend-first role app refactor

Files changed:

- `frontend/src/app/*`
- `frontend/src/api/*`
- `frontend/src/data/*`
- `frontend/src/features/*`
- `frontend/src/ui/*`
- `frontend/src/styles/*`
- `frontend/src/App.jsx`
- `frontend/src/main.jsx`
- `README.md`
- `work-log/updates.md`

Summary:

- Refactored the frontend from a single large `App.jsx` into a simple
  role-aware React structure with app shell, API wrappers, mock fallback data,
  feature screens, UI primitives, and tokenized CSS.
- Added public/auth, student dashboard, catalog, concept, progress,
  simulation workspace, admin, teacher, and institution frontend surfaces.
- Replaced the old visual layer with the matte lab bold design direction:
  warm white, matte black, graphite, muted red, copper, physics blue-gray, and
  chemistry green.
- Kept backend API paths unchanged and delayed backend development.
- Verified `npm run build`, plus frontend route responses for `/login` and
  `/app/catalog` on port `5178`.

Next recommended step:

- Do a visual browser review of the frontend, then polish any spacing,
  typography, or simulation-control issues before starting backend persistence.
