# Physics Chapter 3: Force And Motion

Source: `../../../plan/chapters/chapter 3.MD`

## Source Handling

Use the Markdown file as enough source material for this planning pass. Do not
depend on the original PDF. Future clean English chapters should follow the
same Markdown-first workflow.

## Concepts

- Inertia and Newton's first law
- Force and force classification
- Fundamental forces
- Momentum
- Momentum change and rebound
- Collision and conservation of momentum
- Newton's second law
- Gravitational force, `g`, and weight
- Newton's third law
- Frictional force

## Simulation Pack

1. Inertia Lab: object keeps rest or uniform motion unless net force acts.
2. Force Explorer: contact/non-contact forces, direction, magnitude, net force.
3. Momentum Lab: compare `p = mv` for two objects.
4. Rebound Lab: calculate momentum change when direction reverses.
5. Collision Cart Lab: solve one-dimensional conservation of momentum.
6. Newton's Second Law Lab: `F = ma`, `a = (v-u)/t`, `v = u+at`, distance.
7. Gravity And Weight Lab: `F = Gm1m2/r^2`, `g = GM/R^2`, `W = mg`.
8. Third Law Lab: action-reaction pairs on different bodies.
9. Friction Lab: friction direction, net force, acceleration.

## Admin-Configurable Fields

- Title and learning objective
- Variable labels, units, min/max/defaults
- Scenario presets
- Formula steps
- Explanation text
- Practice questions and hints
- Free/pro access tier
- Source page reference
- Language fields

## Board-Style Practice Patterns

- Convert units before solving.
- Calculate momentum, acceleration, force, distance, weight, or final velocity.
- Solve missing collision variable.
- Explain force-pair and friction-direction concepts.

## Detailed Simulation Specs

### 1. Inertia Lab

Goal: show Newton's first law using everyday motion.

Inputs:

- Mass
- Initial velocity
- Applied force on/off
- Friction on/off
- Scenario preset: bus start, bus stop, table object, moving cart

Outputs:

- Motion state
- Net force
- Velocity direction
- Explanation of inertia of rest or motion

UI:

- Object/canvas with velocity arrow.
- Force/friction arrows.
- Timeline play/pause.
- Formula/explanation panel.

### 2. Force Explorer

Goal: classify force and show how direction/magnitude change motion.

Inputs:

- Force magnitude
- Force direction
- Object mass
- Force type: push, pull, gravity, magnetic, electric

Outputs:

- Contact/non-contact classification
- Net force
- Predicted motion
- Acceleration when applicable

### 3. Momentum Lab

Goal: teach `p = mv`.

Inputs:

- Object A mass and velocity
- Object B mass and velocity
- Direction for each object

Outputs:

- Momentum of each object
- Total momentum
- Which object has greater momentum
- Unit conversion warnings

Practice:

- Find momentum.
- Find mass from momentum and velocity.
- Find velocity from momentum and mass.

### 4. Rebound Lab

Goal: teach momentum change when direction reverses.

Inputs:

- Ball mass
- Incoming velocity
- Rebound velocity
- Contact time, optional advanced mode

Outputs:

- Initial momentum
- Final momentum
- Momentum change
- Average force in advanced mode

### 5. Collision Cart Lab

Goal: solve one-dimensional conservation of momentum.

Inputs:

- `m1`, `m2`
- `u1`, `u2`
- Known final velocity `v1` or `v2`
- Collision mode: simple conservation first

Outputs:

- Momentum before
- Momentum after
- Missing final velocity
- Conservation check

### 6. Newton's Second Law Lab

Goal: connect force, mass, acceleration, velocity, time, and distance.

Inputs:

- Mass
- Applied force
- Initial velocity
- Time
- Friction toggle, optional

Outputs:

- Acceleration
- Final velocity
- Distance
- Force needed for target acceleration

Graphs:

- Velocity-time graph.
- Optional force-time graph.

### 7. Gravity And Weight Lab

Goal: distinguish mass, gravity, `g`, and weight.

Inputs:

- Object mass
- Distance/height preset
- Earth constants preset

Outputs:

- `g`
- Weight
- Gravitational force

Modes:

- Simple mode: `W = mg`
- Advanced mode: `F = GmM/r^2`, `g = GM/R^2`

### 8. Newton's Third Law Lab

Goal: show equal and opposite forces on different bodies.

Inputs:

- Body A mass
- Body B mass
- Interaction force
- Surface/friction preset

Outputs:

- Action force arrow
- Reaction force arrow
- Acceleration of each body
- Explanation that forces act on different objects

### 9. Friction Lab

Goal: show friction opposing motion or attempted motion.

Inputs:

- Applied force
- Mass
- Surface preset
- Friction coefficient in advanced mode

Outputs:

- Friction direction
- Net force
- Whether object moves
- Acceleration

## Admin Fields For Every Chapter 3 Simulation

- Source: `../../../plan/chapters/chapter 3.MD`
- Chapter section.
- Concept title.
- Learning objective.
- Inputs with units/ranges/defaults.
- Output formulas.
- Scenario presets.
- Formula steps.
- Common mistakes.
- Practice questions.
- Access tier.
- Translation status.

## First Implementation Recommendation

Build in this order:

1. Momentum Lab.
2. Newton's Second Law Lab.
3. Collision Cart Lab.
4. Friction Lab.
5. Inertia/Force/Third Law/Gravity labs.

This order proves formula, graph, vector, and collision templates early.
