# Simulation Template Registry

## Template Types

- `variable-lab`: sliders, number inputs, formulas, outputs, optional graph.
- `collision-lab`: two-body before/after momentum model.
- `force-vector-lab`: object with force arrows and net force.
- `graph-lab`: graph-first velocity/time or force/time simulation.
- `formula-stepper`: step-by-step formula substitution.
- `experiment-procedure`: lab-style activity, observations, table output.
- `diagram-labeler`: diagram labeling for biology or physics.
- `reaction-lab`: chemistry reaction and observation simulation.
- `circuit-lab`: electricity/circuit simulation.

## Admin Configuration

Editors configure labels, ranges, units, presets, explanations, formulas,
practice questions, and access tier. Developer modules define behavior only
through the approved contract.

## Template Selection Rule

Choose the simplest template that teaches the concept accurately. Do not make a
full custom module when a template configuration is enough.

## Template Requirements

Every template should define:

- Supported input controls.
- Supported visual elements.
- Supported output types.
- Formula binding rules.
- Required admin fields.
- Preview behavior.
- QA checklist.

## Physics Chapter 3 Template Mapping

- Inertia Lab: `force-vector-lab` or `variable-lab`.
- Force Explorer: `force-vector-lab`.
- Momentum Lab: `variable-lab`.
- Rebound Lab: `variable-lab` with vector output.
- Collision Cart Lab: `collision-lab`.
- Newton's Second Law Lab: `graph-lab` or `variable-lab`.
- Gravity And Weight Lab: `formula-stepper` plus visual diagram.
- Third Law Lab: `force-vector-lab`.
- Friction Lab: `force-vector-lab`.

## Chemistry MVP Template Mapping

- Dry Cell: `experiment-procedure` or custom electrochemical module.
- Acid-Base Neutralization: `reaction-lab`.
- Precipitation Reaction: `reaction-lab`.

## Admin Preview Needs

Preview must show:

- Default state.
- Min/max variable state.
- Mobile layout.
- Formula output.
- Practice question linkage.
- Missing translation warnings.
