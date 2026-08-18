# Phase 1: MVP Foundation

## Goal

Build the base app foundation.

## Outputs

- React/Vite frontend shell
- Express backend shell
- MongoDB/Mongoose connection
- Public and staff auth
- Grade-first catalog
- Concept detail page
- Simulation workspace shell
- Basic progress save
- Basic staff dashboard

## Exit Criteria

A demo student can log in, browse seeded content, open a simulation workspace,
and save progress.

## Implementation Notes

Build one frontend app first. Use role-aware routing for student, teacher,
institution, and staff surfaces, but keep code organized so apps can split
later.

Backend should include:

- Express app.
- MongoDB/Mongoose connection.
- Seed script.
- Public/staff auth.
- Catalog APIs.
- Simulation config API.
- Progress API.
- Staff dashboard API.

Frontend should include:

- Login screens.
- Student dashboard.
- Catalog browser.
- Concept page.
- Simulation workspace shell.
- Staff dashboard shell.

## Seed Data

- Demo student.
- Demo staff admin.
- Class 9-10.
- Physics and Chemistry.
- Physics Chapter 3 concept records.
- Chemistry MVP concept records.
