# Formula Engine

## Goal

Represent formulas in a way that supports simulation outputs, step-by-step
solutions, unit checks, and board-style practice.

## Formula Definition

Each formula needs:

- ID
- Display formula
- Variables
- Units
- Calculation expression
- Step explanation
- Valid input ranges
- Common mistakes
- Related concepts and simulations

## Calculation Modes

- Direct compute
- Solve for missing variable
- Step-by-step substitution
- Unit conversion before solving
- Teacher/advanced explanation

## Chapter 3 Formula Set

- `p = mv`
- `Delta p = p_final - p_initial`
- `m1u1 + m2u2 = m1v1 + m2v2`
- `a = (v - u) / t`
- `F = ma`
- `v = u + at`
- `s = ut + 1/2 at^2`
- `F = Gm1m2 / r^2`
- `g = GM / R^2`
- `W = mg`

## Formula Record Shape

Each formula should be documented with:

- `id`
- `display`
- `description`
- `variables`
- `requiredUnits`
- `solveFor`
- `calculationExpression`
- `steps`
- `commonMistakes`
- `exampleProblems`

## Step Output

Step-by-step mode should show:

1. Given values.
2. Unit conversion.
3. Formula selection.
4. Substitution.
5. Simplification.
6. Final answer with unit.
7. Concept note or mistake warning.

## Safety Rules

- Reject missing required variables.
- Reject division by zero.
- Warn on unsupported units.
- Round display output while preserving internal calculation precision.
- Store formula version used by an attempt.

## First Build Scope

For the first implementation, formulas can be implemented as explicit
JavaScript functions plus metadata. A symbolic algebra engine is not required
until later.
