# Simulation Module Contract

## Purpose

Allow developer-created simulation modules to be safely configured and published
from the admin panel.

## Required Files

```text
simulation.meta.json
simulation.schema.json
SimulationModule.jsx
README.md
tests/simulation.test.js
```

## Metadata Minimum

```json
{
  "id": "physics-force-motion-newton-second-law",
  "templateType": "variable-lab",
  "version": "1.0.0",
  "curriculum": {
    "grade": "9-10",
    "subject": "Physics",
    "chapter": "Force",
    "concept": "Newton's Second Law"
  },
  "inputs": [],
  "outputs": [],
  "formulas": [],
  "access": {
    "tier": "free"
  }
}
```

## Component Contract

```jsx
export default function SimulationModule({
  config,
  locale,
  initialState,
  onStateChange,
  onProgress,
}) {
  // Render inside the sandboxed simulation frame.
}
```

## Rules

- The module must not call backend APIs directly.
- The module must use validated config inputs and outputs.
- The module must report progress through `onProgress`.
- External scripts require admin/developer approval.
- Publishing requires preview, validation, R&D review, and version notes.

## Manifest Fields

Required manifest fields:

- `id`
- `templateType`
- `version`
- `curriculum.grade`
- `curriculum.subject`
- `curriculum.chapter`
- `curriculum.concept`
- `inputs`
- `outputs`
- `formulas`
- `access.tier`

Recommended manifest fields:

- `sourceReferences`
- `difficulty`
- `supportedLocales`
- `scenarioPresets`
- `knownLimitations`
- `reviewStatus`

## Input Definition

Each input should define:

- `key`
- `label`
- `unit`
- `min`
- `max`
- `default`
- `step`
- `controlType`

Control types:

- `slider`
- `number`
- `stepper`
- `toggle`
- `select`
- `segmented`

## Output Definition

Each output should define:

- `key`
- `label`
- `unit`
- `formula`
- `precision`
- `displayType`

Display types:

- `metric`
- `vector`
- `graph`
- `table`
- `step`

## Validation Checklist

- Manifest parses.
- Schema matches manifest.
- Input keys match formulas.
- Defaults are inside min/max.
- Units exist in unit conversion system.
- Module renders without console errors.
- No direct backend calls.
- No unapproved external scripts.
- Progress callbacks work.
