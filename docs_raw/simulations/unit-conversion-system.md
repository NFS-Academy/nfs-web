# Unit Conversion System

## Goal

Prevent wrong answers caused by unit mismatch and help students learn common
SSC-style conversions.

## Initial Units

- Length: m, km
- Time: s, min, hour
- Speed: m/s, km/hour
- Mass: g, kg
- Force: N
- Acceleration: m/s^2
- Momentum: kg m/s

## Initial Conversions

- `1 km = 1000 m`
- `1 hour = 3600 s`
- `1 km/hour = 5/18 m/s`
- `1 m/s = 18/5 km/hour`
- `1000 g = 1 kg`

## UI Behavior

- Show selected unit beside each input.
- Warn when a problem mixes units.
- Convert before formula substitution.
- Show both original and converted values in step-by-step mode.

## Conversion Record Shape

Each conversion should define:

- `fromUnit`
- `toUnit`
- `factor`
- `offset`, if ever needed
- `quantityType`
- `displayRule`

## Quantity Types

- `length`
- `time`
- `mass`
- `speed`
- `acceleration`
- `force`
- `momentum`
- `energy`, later
- `charge`, later
- `concentration`, later

## Physics Chapter 3 Needs

- Convert `km/hour` to `m/s`.
- Convert `g` to `kg`.
- Convert `km` to `m`.
- Keep `N`, `kg m/s`, and `m/s^2` visible in final outputs.

## Admin Rule

Simulation variables must select from known units. Editors should not type
random unit strings for publishable simulations.
