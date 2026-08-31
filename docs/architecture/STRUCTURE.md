# Repository Structure

## Top-Level Ownership (Transitioning to Next.js)

| Path | Purpose |
| --- | --- |
| `frontend/` | (Legacy) Vite/React application, routing, and UI components. |
| `backend/` | (Legacy) Express/MongoDB application and API routes. |
| `docs/` | Governed project knowledge base, logbook, and generated code map. |
| `docs_raw/` | Raw planning documents (curriculum, simulations, system-plan). |
| `.qc-tmp/` | Gitignored in-project scratch space (if needed). |

## Future Next.js Structure (Planned)

Once the Next.js migration begins, the repository structure will shift towards:

| Path | Purpose |
| --- | --- |
| `src/app/` | Next.js App Router (pages, layouts, API routes). |
| `src/components/` | Shared UI components, layout shells. |
| `src/components/simulations/` | Directory where standalone math/physics/chemistry simulation components will be dropped. |
| `src/lib/` | Shared utilities, database connection logic (Mongoose), and formula engines. |

## Documentation Ownership

- Start every repository task at [START-HERE.md](../core/START-HERE.md).
- The canonical document for each topic is listed in the starting guide. Do not add parallel plans or duplicate maps.
- All technical definitions regarding simulations and curriculum should be reflected in the database setup or `docs/domain/`.
