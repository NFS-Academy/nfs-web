# Business Rules & Invariants

## Non-Negotiable Constraints

- **Accessibility**: Core curriculum (Physics, Chemistry, Math) and their simulations MUST be accessible without a mandatory login gate or subscription.
- **Future-Proofing**: The architecture must support account creation, profile tracking, and premium features in later phases, even if they are turned off now.
- **Simulation Modularity**: Simulations must be built as independent Next.js components (e.g. `SimulationWorkspace.jsx`, individual formula engines) so they can be easily scaled to 40+ simulations per chapter.
- **Data Persistence**: Initial implementation will use MongoDB (via Mongoose) to track simulation attempts, user progress, and curriculum catalog data.

## Review and Extraction

- **Curriculum Organization**: 
  - The hierarchy is strictly: `Subject` -> `Chapter` -> `Simulations`.
  - The number of simulations is variable (from 0 in intro chapters up to 40+ in advanced dynamic math chapters).
- **Simulation State**: 
  - Simulations must compute results locally on the client for maximum performance and responsiveness.
  - Telemetry/attempts should only be saved if the user is logged in (or tracked anonymously if configured).

## Roles (Future Implementation)

- **Student / Free User**: Can browse the catalog and interact with all free-tier simulations without an account.
- **Registered User**: Can track learning streaks, save progress, and view performance history.
- **Admin / Staff**: Can view platform telemetry, manage the curriculum catalog, and update subscription tiers.

## Security and Retention

- Secure API endpoints using JWT authentication for any routes involving user data or progress.
- Public routes (catalog, simulation configs) remain open for anonymous access.
