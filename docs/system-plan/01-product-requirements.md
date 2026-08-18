# Product Requirements

## Goal

Help students understand science and mathematics through interactive,
curriculum-mapped simulations that connect visuals, formulas, examples, and
exam-style practice.

## Users

- Guest: views public pages and limited sample simulations.
- Student: learns, practices, tracks progress, subscribes.
- Teacher: presents simulations, assigns work, monitors students.
- Institution owner/admin: manages seats, students, teachers, billing.
- Staff editor: creates and edits curriculum content.
- R&D reviewer: verifies science, math, formulas, and assumptions.
- Support/finance staff: handles tickets, payments, invoices.
- Admin/super admin: manages platform-level settings and permissions.

## Education Scope

- Class 9-10: Physics, Chemistry, Mathematics, Higher Mathematics, Biology.
- Class 11-12: Physics, Chemistry, Higher Mathematics, Biology, each split by
  first and second paper where appropriate.
- Main hierarchy: class -> subject -> paper -> chapter -> concept -> simulation
  -> formula -> practice.

## Core Learning Loop

1. Student selects class, subject, chapter, and concept.
2. Student opens a simulation.
3. Student changes variables and observes outputs.
4. Student reads formula and explanation.
5. Student solves guided and exam-style problems.
6. Progress is saved.

## Bilingual Requirement

English and Bangla are first-class content languages. The admin panel must
track missing translations before publishing when bilingual content is required.

## Success Criteria

Student success:

- A student can choose class, subject, chapter, and concept without confusion.
- A student can open a simulation and understand which variables can be changed.
- A student can see formula steps and units, not only final answers.
- A student can practice board-style questions after exploring.
- Progress is saved per concept and simulation.

Teacher success:

- A teacher can open a clean presentation-friendly simulation.
- A teacher can assign a concept or simulation to a group.
- A teacher can see completion and weak-topic signals.

Institution success:

- An institution can manage students, teachers, seats, and subscription status.
- A student under an institution can use the same learning app with access
  controlled by the institution plan.

Admin success:

- Staff can add curriculum structure, formulas, questions, and simulation
  configuration without touching production code.
- R&D reviewers can approve formulas and scientific assumptions.
- Published content is versioned and rollback-ready.

Payment success:

- Free/pro access can be enforced even before final gateway launch.
- Payment records and subscription state are separated.
- Gateway-specific logic is isolated behind a provider layer.

## Access Model

Free access:

- Sample simulations.
- Limited formula explanations.
- Limited practice.
- Basic progress.

Student Pro:

- Full included simulation library.
- Full step-by-step formula mode.
- More practice and saved experiments.

Institution:

- Seat-based access.
- Teacher/group features.
- Lower per-student pricing.
- One-active-session policy where needed.

## Content Assumptions

- Bangladesh/NCTB/SSC/HSC relevance matters more than generic global examples.
- Clean English Markdown chapter files are the preferred source for Codex.
- Bangla content is important, but future clean English sources can drive
  simulation and math extraction first.
