# Data Models

These are conceptual MongoDB/Mongoose model groups, not final schemas.

## Curriculum

- `Grade`
- `Subject`
- `Paper`
- `Chapter`
- `Concept`
- `CurriculumSource`
- `MediaAsset`

## Learning Content

- `Simulation`
- `SimulationVersion`
- `SimulationTemplate`
- `SimulationModule`
- `FormulaDefinition`
- `FormulaStep`
- `PracticeQuestion`
- `ExplanationBlock`
- `ScenarioPreset`
- `UnitDefinition`
- `UnitConversion`

## Users And Roles

- `User`
- `Role`
- `Permission`
- `StudentProfile`
- `TeacherProfile`
- `StaffProfile`
- `Session`
- `DeviceLock`

## Learning Activity

- `Progress`
- `SimulationAttempt`
- `PracticeAttempt`
- `Bookmark`
- `SavedExperiment`
- `Assignment`

## Institutions

- `Institution`
- `InstitutionMember`
- `SeatLicense`
- `Invite`
- `ClassGroup`

## Billing

- `Plan`
- `Subscription`
- `Payment`
- `Invoice`
- `Coupon`
- `PaymentProviderEvent`

## Admin And CRM

- `ContentReview`
- `ReviewApproval`
- `SupportTicket`
- `AdminNote`
- `AuditLog`
- `SystemSetting`

## Model Details

### User

Fields:

- `email`, `passwordHash`, `displayName`, `roleKeys`, `status`
- `emailVerified`, `lastLoginAt`, `createdAt`, `updatedAt`

Relationships:

- May have one student, teacher, staff, or institution profile.
- May belong to many institutions through `InstitutionMember`.

### Role And Permission

Roles should be named bundles of permissions. Permissions should gate actions
such as `content:draft`, `content:review`, `content:publish`, `billing:read`,
`institution:manageSeats`, and `admin:manageStaff`.

### Session And DeviceLock

Sessions store active login state. Device locks support one-active-session
rules for plans that require it. Device reset must be available to staff.

### Curriculum Models

`Grade`, `Subject`, `Paper`, `Chapter`, and `Concept` define catalog hierarchy.
Each should support:

- English/Bangla title fields.
- Sort order.
- Active/draft status.
- Source reference IDs.

### Simulation

Represents the stable content identity: grade, subject, chapter, concept,
template type, access tier, and current published version.

### SimulationVersion

Represents versioned configuration:

- Inputs, outputs, variables, units.
- Formula references.
- Scenario presets.
- Visual labels, arrows, graph definitions.
- Explanation blocks.
- Practice question references.
- Reviewer and publish metadata.

### FormulaDefinition

Stores formula display, variables, units, calculation expression, steps,
common mistakes, and related concepts.

### PracticeQuestion

Stores question text, type, variables, correct answer, hints, solution steps,
difficulty, source reference, and access tier.

### Progress

Stores user, concept, simulation, content version, completion state, score,
last activity, and attempts count.

### Institution

Stores organization profile, plan, billing status, seats, active members, and
admin users.

### Billing

`Plan` defines allowed features. `Subscription` links a user or institution to
a plan. `Payment` and `PaymentProviderEvent` preserve gateway details.

### AuditLog

Stores actor, action, target type, target ID, before/after summary, timestamp,
and request metadata for admin-sensitive events.
