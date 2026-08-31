# Chemistry MVP

## Goal

Use Class 9-10 Chemistry as the first proof of simulation quality.

## Simulations

1. Dry Cell / Electrochemical Behavior
   - Show dry-cell structure and current behavior.
   - Do not incorrectly mix this with salt-bridge galvanic cell behavior.

2. Acid-Base Neutralization
   - Show pH, indicator color, acid/base amount, and neutralization result.
   - Include formula/explanation and practice mode.

3. Precipitation Reaction
   - Show ion mixing, insoluble product formation, and observation.
   - Include reaction equation and practice questions.

## MVP Requirements

- Visual model
- Inputs and controls
- Formula or reaction panel
- Explanation
- Practice questions
- Progress tracking
- Free/pro access flag
- Localization-ready content fields

## Simulation Details

### Dry Cell / Electrochemical Behavior

Goal: explain dry-cell structure and how chemical energy becomes electrical
energy in a beginner-friendly way.

Controls:

- Cell condition preset.
- Load/resistance preset.
- Material labels on/off.
- Step-through reaction explanation.

Outputs:

- Current direction visual.
- Electron flow explanation.
- Parts labels.
- Common misconception note.

Important distinction:

- Do not present a salt bridge as part of a dry cell.
- If galvanic cell comparison is needed, create a separate comparison mode.

### Acid-Base Neutralization

Goal: show how acid and base quantities affect pH and indicator color.

Controls:

- Acid amount.
- Base amount.
- Indicator type.
- Concentration preset in advanced mode.

Outputs:

- pH range.
- Indicator color.
- Neutral/acidic/basic result.
- Word equation and simple reaction explanation.

### Precipitation Reaction

Goal: show how mixing ions can form an insoluble product.

Controls:

- Solution A.
- Solution B.
- Amounts.
- Observation mode.

Outputs:

- Ions before mixing.
- Precipitate formed.
- Balanced/simple equation.
- Observation note.

## Admin Fields

- Chapter/source reference.
- Reaction or concept type.
- Inputs and presets.
- Visual labels.
- Formula/reaction text.
- Safety/assumption notes.
- Practice questions.
- English/Bangla content fields.

## First Implementation Recommendation

Build acid-base neutralization first because it has clear variables, visual
feedback, and beginner-friendly practice. Then build precipitation. Build dry
cell after the electrochemical explanation is reviewed carefully.
