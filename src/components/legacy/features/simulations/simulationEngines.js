const round = (value, places = 2) => Number(value.toFixed(places));

export function defaultsFromInputs(inputs) {
  return Object.fromEntries(inputs.map((input) => [input.key, input.default]));
}

export function calculate(moduleKey, values) {
  switch (moduleKey) {
    case "momentum": {
      const pA = values.massA * values.velocityA;
      const pB = values.massB * values.velocityB;
      return {
        metrics: [
          ["Object A momentum", `${round(pA)} kg m/s`],
          ["Object B momentum", `${round(pB)} kg m/s`],
          ["Total momentum", `${round(pA + pB)} kg m/s`]
        ],
        note: Math.abs(pA) > Math.abs(pB) ? "Object A carries greater momentum magnitude." : "Object B is equal or greater in momentum magnitude.",
        visual: { kind: "cart", leftArrow: Math.sign(values.velocityA), rightArrow: Math.sign(values.velocityB), intensity: Math.min(100, Math.abs(pA + pB)) }
      };
    }
    case "newtonSecond": {
      const acceleration = values.force / values.mass;
      const finalVelocity = values.initialVelocity + acceleration * values.time;
      const distance = values.initialVelocity * values.time + 0.5 * acceleration * values.time ** 2;
      return {
        metrics: [
          ["Acceleration", `${round(acceleration)} m/s^2`],
          ["Final velocity", `${round(finalVelocity)} m/s`],
          ["Distance", `${round(distance)} m`]
        ],
        note: "Force increases acceleration; mass resists acceleration for the same force.",
        visual: { kind: "force", leftArrow: 0, rightArrow: 1, intensity: Math.min(100, acceleration * 12) }
      };
    }
    case "collision": {
      const before = values.m1 * values.u1 + values.m2 * values.u2;
      const v2 = (before - values.m1 * values.v1) / values.m2;
      const after = values.m1 * values.v1 + values.m2 * v2;
      return {
        metrics: [
          ["Momentum before", `${round(before)} kg m/s`],
          ["Cart 2 final velocity", `${round(v2)} m/s`],
          ["Momentum after", `${round(after)} kg m/s`]
        ],
        note: "The missing final velocity is chosen so total momentum stays conserved.",
        visual: { kind: "collision", leftArrow: Math.sign(values.u1), rightArrow: Math.sign(v2), intensity: Math.min(100, Math.abs(before)) }
      };
    }
    case "friction": {
      const netForce = values.appliedForce - values.friction;
      const acceleration = netForce / values.mass;
      return {
        metrics: [
          ["Net force", `${round(netForce)} N`],
          ["Acceleration", `${round(acceleration)} m/s^2`],
          ["Motion state", netForce > 0 ? "Moves forward" : netForce < 0 ? "Slows or reverses" : "Balanced"]
        ],
        note: "Friction acts opposite the attempted or actual motion.",
        visual: { kind: "friction", leftArrow: -1, rightArrow: 1, intensity: Math.min(100, Math.abs(netForce)) }
      };
    }
    case "neutralization": {
      const diff = values.base - values.acid;
      const pH = diff === 0 ? 7 : Math.max(1, Math.min(14, 7 + diff / 10));
      return {
        metrics: [
          ["Estimated pH", `${round(pH, 1)}`],
          ["Result", pH < 6.8 ? "Acidic" : pH > 7.2 ? "Basic" : "Neutral"],
          ["Indicator color", pH < 6.8 ? "Red/orange" : pH > 7.2 ? "Blue/purple" : "Green"]
        ],
        note: "Neutralization happens when acid and base balance into salt and water.",
        visual: { kind: pH < 6.8 ? "acid" : pH > 7.2 ? "base" : "neutral", intensity: Math.abs(diff) }
      };
    }
    case "precipitation": {
      const amount = Math.min(values.solutionA, values.solutionB);
      return {
        metrics: [
          ["Precipitate", amount > 0 ? "AgCl forms" : "None"],
          ["Estimated amount", `${round(amount)} relative units`],
          ["Observation", amount > 0 ? "Cloudy white solid appears" : "Clear solution"]
        ],
        note: "Ag+ and Cl- ions combine to form insoluble silver chloride.",
        visual: { kind: amount > 0 ? "cloudy" : "neutral", intensity: amount }
      };
    }
    case "dryCell": {
      const current = values.cellHealth / values.load;
      return {
        metrics: [
          ["Relative current", `${round(current, 2)} units`],
          ["Cell health", `${values.cellHealth}%`],
          ["Load", `${values.load} ohm`]
        ],
        note: "A dry cell uses paste electrolyte and does not use a salt bridge.",
        visual: { kind: "cell", intensity: Math.min(100, current * 20) }
      };
    }
    default:
      return { metrics: [], note: "This simulation module is planned.", visual: { kind: "planned", intensity: 20 } };
  }
}
