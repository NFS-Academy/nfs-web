# Naim Science Lab Docs

This folder is the planning hub for the full Naim Science Lab platform.
It is documentation-only. Do not treat these files as implemented code.

## Source Rules

- Use Markdown chapter files as the primary Codex-readable sources.
- For the first Physics Chapter 3 plan, use `../../plan/chapters/chapter 3.MD`.
- Do not depend on the original Chapter 3 PDF during planning.
- Future workflow: convert clean English PDFs to Markdown first, then analyze
  formulas, variables, scenarios, experiments, UI controls, and admin fields.

## Main Folders

- `system-plan/`: product, architecture, APIs, data, payments, UX, security, QA.
- `curriculum/`: class, subject, paper, chapter, and source-reference planning.
- `simulations/`: simulation templates, formula engine, unit conversion, first packs.
- `admin/`: CMS, CRM, roles, content workflow, and simulation builder planning.
- `build-roadmap/`: phased implementation plans from planning to scale.

## Codex Usage

For future work, read `system-plan/README.md` first, then read the specific
folder needed for the requested feature. Keep implementation prompts scoped to
one phase, one subsystem, or one simulation pack at a time.
