# Security And Access Control

## Auth

- Public and staff login flows are separate.
- Use secure password hashing.
- Use JWT/session handling with refresh behavior decided during implementation.
- Staff accounts require stronger protection than student accounts.

## Roles

Use role-based access control for students, teachers, institution users,
editors, R&D reviewers, support, finance, admins, and super admins.

## Sessions

Support one active device/session per student when required by plan type.
Admins need tools to reset device locks and resolve false positives.

## Admin Safety

- Audit all admin actions.
- Validate all content inputs.
- Verify payment webhooks.
- Restrict custom simulation module upload to developer-level roles.
- Run simulation preview and validation before publish.

## Privacy

Track learning progress and product analytics, but avoid unnecessary personal
data. Account deletion/export policy should be planned before launch.

## Role-Based Access Control

Each protected action should check permission, not only role name. Roles are
permission bundles.

Important permissions:

- `catalog:read`
- `learning:accessFree`
- `learning:accessPro`
- `progress:writeSelf`
- `institution:manageMembers`
- `billing:read`
- `billing:manage`
- `content:draft`
- `content:review`
- `content:publish`
- `simulation:manageTemplates`
- `staff:manageRoles`
- `audit:read`

## One-Active-Session Policy

Default behavior:

- Apply first to institution students and paid plans that require it.
- Allow current device to replace old session after warning, if policy permits.
- Staff can reset locks from admin with audit note.
- Do not permanently block a student without support path.

## Simulation Module Safety

- Only developer-level staff can submit module code.
- All modules need manifest, schema, tests, and preview.
- Non-technical editors configure templates but cannot edit production code.
- External network calls from modules are blocked unless explicitly approved.

## Audit Events

Audit these actions:

- Staff login.
- Role/permission changes.
- User disable/restore.
- Payment/subscription manual changes.
- Content publish/unpublish/rollback.
- Simulation module approval.
- Device lock reset.
