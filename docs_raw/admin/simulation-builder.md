# Simulation Builder

## Goal

Let non-technical staff create and update simulations through safe templates
while developers can add custom modules through a strict contract.

## Editor Workflow

1. Create concept.
2. Select template.
3. Configure variables, ranges, units, defaults.
4. Add formulas and step explanations.
5. Add visuals, labels, arrows, graphs, and presets.
6. Add Bangla and English content.
7. Add practice questions.
8. Preview as student, teacher, mobile, and free/pro user.
9. Send for review.
10. Publish version.

## Developer Workflow

1. Create module files from `simulation-module-contract.md`.
2. Add schema and tests.
3. Submit to preview sandbox.
4. Run validation.
5. Send to R&D and admin review.
6. Publish only after approval.

## Safety Rule

Non-technical editors should not edit production JavaScript directly.

## Builder Data Sections

- Metadata
- Source references
- Template/module selection
- Variables
- Outputs
- Formula steps
- Visual configuration
- Scenario presets
- Practice questions
- Localized text
- Access tier
- Review status
- Version notes

## Validation Checks

- Required fields exist.
- Variables have valid units and ranges.
- Formulas reference existing variables.
- Outputs do not produce invalid numbers.
- Practice answers match formula outputs where applicable.
- Preview renders on desktop and mobile.
- Translation status is acceptable.
- Reviewer approvals are complete.

## Publish Checklist

- Source linked.
- R&D approved.
- Language reviewed or marked partial for MVP.
- QA preview passed.
- Version notes written.
- Rollback target exists when replacing published content.
