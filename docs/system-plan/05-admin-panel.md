# Admin Panel

## Purpose

The admin panel is both a CRM and a content management system. It must support
non-technical content work while keeping simulation code safe and reviewable.

## Main Areas

- Dashboard
- User management
- Institution management
- Subscription and payment records
- Support tickets
- Curriculum manager
- Concept manager
- Formula manager
- Practice question manager
- Simulation manager
- Template/module registry
- Review workflow
- Audit logs

## Content Workflow

Draft -> simulation design -> math review -> curriculum review -> language
review -> QA preview -> ready to publish -> published -> revision or archived.

## Simulation Builder Rule

Editors can configure approved templates, variables, units, formulas, labels,
presets, explanations, translations, and access tier. Developer-level users can
submit module code only through the module contract and validation pipeline.

## Publishing Controls

Every published simulation needs source references, version, reviewer, known
limitations, change notes, and rollback support.

## Admin Navigation

- Overview dashboard
- Users
- Institutions
- Billing
- Support
- Curriculum
- Concepts
- Formulas
- Practice
- Simulations
- Reviews
- Templates/modules
- Audit logs
- Settings

## Simulation Builder Screens

1. Metadata: class, subject, chapter, concept, title, access tier.
2. Template: choose approved template or module.
3. Variables: keys, labels, units, ranges, defaults.
4. Formulas: formula references, solve mode, step text.
5. Visuals: arrows, labels, graphs, object presets.
6. Content: explanation, hints, common mistakes, language fields.
7. Practice: question set, difficulty, answer/solution steps.
8. Preview: student, teacher, mobile, free/pro.
9. Validation: formulas, units, required fields, permissions.
10. Review: R&D, curriculum, language, QA.
11. Publish: version notes and rollback point.

## Permission Defaults

- Content editor can draft and edit but cannot publish.
- Simulation designer can configure templates and preview.
- R&D reviewer can approve math/science but cannot manage billing.
- Support can view users and tickets but cannot edit content.
- Finance can view billing and payment records.
- Admin can publish and manage normal users.
- Super admin can manage staff roles and system settings.

## Implementation Notes

Admin should be dense and table-driven, not marketing-styled. Important screens
need filters, search, status badges, side panels, preview panes, version history,
and clear destructive-action confirmation.
