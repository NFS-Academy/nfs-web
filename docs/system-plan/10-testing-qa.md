# Testing And QA

## Simulation QA

- Formula output is correct.
- Units and conversions are correct.
- Variable min/max/default values work.
- Visual arrows, graphs, and outputs match formulas.
- Edge cases do not produce invalid numbers.
- R&D reviewer approves scientific accuracy.

## UI QA

- Desktop, tablet, and mobile layouts work.
- Text does not overflow.
- Buttons and sliders are touch-friendly.
- Language toggle works.
- Free/pro locked states are clear.

## API QA

- Auth works for public and staff users.
- Catalog loads without broken hierarchy.
- Simulation configs load by published version.
- Progress and attempts save correctly.
- Admin actions enforce permissions.

## Payment QA

- Plan access changes after successful payment.
- Failed payment state is handled.
- Webhooks are verified.
- Invoices and payment records match provider events.

## Documentation QA

- Each planning folder has an obvious purpose.
- Source references point to actual files.
- No app code is created inside docs planning work.

## Acceptance Tests For MVP

Student:

- Register or log in.
- Browse grade -> subject -> chapter -> concept.
- Open a simulation workspace.
- Change a variable and see output update.
- View formula steps.
- Answer a practice question.
- See progress saved.

Staff:

- Log in through staff auth.
- View dashboard.
- Create/edit a draft concept.
- Preview simulation configuration.
- Submit content for review.

Admin:

- Approve/publish a content version.
- View audit log.
- Reset a user session/device lock.

API:

- Reject staff route access for public-only users.
- Reject unpublished content from public catalog APIs.
- Save attempts with simulation version ID.

## Simulation Math QA

For each simulation:

- Test default values.
- Test min and max values.
- Test unit conversion.
- Test invalid input handling.
- Compare formula output against hand-calculated examples.
- Validate graph/arrow direction matches sign conventions.

## Localization QA

- Language toggle changes labels and explanations.
- Missing translations show fallback/warning, not broken UI.
- Formula symbols and units remain correct in both languages.
