export const demoAccounts = {
  public: { email: "student@naim.test", password: "student123" },
  teacher: { email: "teacher@naim.test", password: "teacher123" },
  staff: { email: "admin@naim.test", password: "admin123" }
};

export const users = [
  {
    id: "user_student_demo",
    email: "student@naim.test",
    password: "student123",
    displayName: "Demo Student",
    roles: ["student"],
    plan: "free"
  },
  {
    id: "user_teacher_demo",
    email: "teacher@naim.test",
    password: "teacher123",
    displayName: "Demo Teacher",
    roles: ["teacher"],
    plan: "teacher"
  },
  {
    id: "user_admin_demo",
    email: "admin@naim.test",
    password: "admin123",
    displayName: "Demo Admin",
    roles: ["staff", "admin"],
    plan: "staff"
  }
];

export const grades = [
  { id: "class-9-10", title: "Class 9-10", order: 1 },
  { id: "class-11-12", title: "Class 11-12", order: 2, status: "planned" }
];

export const subjects = [
  { id: "physics-9-10", gradeId: "class-9-10", title: "Physics", order: 1, tone: "physics" },
  { id: "chemistry-9-10", gradeId: "class-9-10", title: "Chemistry", order: 2, tone: "chemistry" },
  { id: "math-9-10", gradeId: "class-9-10", title: "Mathematics", order: 3, status: "planned", tone: "math" },
  { id: "higher-math-9-10", gradeId: "class-9-10", title: "Higher Mathematics", order: 4, status: "planned", tone: "math" },
  { id: "biology-9-10", gradeId: "class-9-10", title: "Biology", order: 5, status: "planned", tone: "biology" }
];

export const chapters = [
  {
    id: "physics-9-10-force-motion",
    subjectId: "physics-9-10",
    title: "Chapter 3: Force And Motion",
    source: "../plan/chapters/chapter 3.MD",
    order: 3
  },
  {
    id: "chemistry-9-10-mvp",
    subjectId: "chemistry-9-10",
    title: "Starter Chemistry Labs",
    source: "docs/simulations/chemistry-mvp.md",
    order: 1
  }
];

export const formulas = [
  { id: "formula-momentum", display: "p = mv", variables: "p momentum, m mass, v velocity", unit: "kg m/s" },
  { id: "formula-force", display: "F = ma", variables: "F force, m mass, a acceleration", unit: "N" },
  { id: "formula-acceleration", display: "a = (v - u) / t", variables: "u initial velocity, v final velocity, t time", unit: "m/s^2" },
  { id: "formula-final-velocity", display: "v = u + at", variables: "u initial velocity, a acceleration, t time", unit: "m/s" },
  { id: "formula-distance", display: "s = ut + 1/2 at^2", variables: "s distance, u initial velocity, a acceleration, t time", unit: "m" },
  { id: "formula-conservation-momentum", display: "m1u1 + m2u2 = m1v1 + m2v2", variables: "two-body one-dimensional collision", unit: "kg m/s" },
  { id: "formula-net-force", display: "Fnet = Fapplied - f", variables: "f friction force opposing motion", unit: "N" }
];

export const concepts = [
  {
    id: "concept-momentum",
    chapterId: "physics-9-10-force-motion",
    title: "Momentum",
    objective: "Understand how mass and velocity combine into momentum.",
    formulas: ["formula-momentum"],
    simulations: ["sim-momentum-lab"],
    sourceRef: "Chapter 3 section 3.4",
    tone: "physics"
  },
  {
    id: "concept-newton-second-law",
    chapterId: "physics-9-10-force-motion",
    title: "Newton's Second Law",
    objective: "Connect force, mass, acceleration, velocity, time, and distance.",
    formulas: ["formula-force", "formula-acceleration", "formula-final-velocity", "formula-distance"],
    simulations: ["sim-newton-second-law"],
    sourceRef: "Chapter 3 section 3.6",
    tone: "physics"
  },
  {
    id: "concept-collision",
    chapterId: "physics-9-10-force-motion",
    title: "Collision And Momentum Conservation",
    objective: "Solve one-dimensional collision problems using conservation of momentum.",
    formulas: ["formula-conservation-momentum"],
    simulations: ["sim-collision-cart"],
    sourceRef: "Chapter 3 section 3.5",
    tone: "physics"
  },
  {
    id: "concept-friction",
    chapterId: "physics-9-10-force-motion",
    title: "Frictional Force",
    objective: "See how friction opposes motion and changes net force.",
    formulas: ["formula-net-force"],
    simulations: ["sim-friction-lab"],
    sourceRef: "Chapter 3 section 3.9",
    tone: "physics"
  },
  {
    id: "concept-neutralization",
    chapterId: "chemistry-9-10-mvp",
    title: "Acid-Base Neutralization",
    objective: "Explore pH, indicator color, and neutralization.",
    formulas: [],
    simulations: ["sim-neutralization"],
    sourceRef: "Chemistry MVP",
    tone: "chemistry"
  },
  {
    id: "concept-precipitation",
    chapterId: "chemistry-9-10-mvp",
    title: "Precipitation Reaction",
    objective: "Mix ions and observe insoluble product formation.",
    formulas: [],
    simulations: ["sim-precipitation"],
    sourceRef: "Chemistry MVP",
    tone: "chemistry"
  },
  {
    id: "concept-dry-cell",
    chapterId: "chemistry-9-10-mvp",
    title: "Dry Cell Behavior",
    objective: "Identify dry-cell parts and electron/current direction.",
    formulas: [],
    simulations: ["sim-dry-cell"],
    sourceRef: "Chemistry MVP",
    tone: "chemistry"
  }
];

export const simulations = [
  {
    id: "sim-momentum-lab",
    conceptId: "concept-momentum",
    moduleKey: "momentum",
    title: "Momentum Lab",
    templateType: "variable-lab",
    accessTier: "free",
    inputs: [
      { key: "massA", label: "Object A mass", unit: "kg", min: 1, max: 100, default: 20, step: 1 },
      { key: "velocityA", label: "Object A velocity", unit: "m/s", min: -30, max: 30, default: 10, step: 1 },
      { key: "massB", label: "Object B mass", unit: "kg", min: 1, max: 100, default: 10, step: 1 },
      { key: "velocityB", label: "Object B velocity", unit: "m/s", min: -30, max: 30, default: 15, step: 1 }
    ],
    practice: "A 20 kg object moves at 10 m/s. Find its momentum."
  },
  {
    id: "sim-newton-second-law",
    conceptId: "concept-newton-second-law",
    moduleKey: "newtonSecond",
    title: "Newton's Second Law Lab",
    templateType: "graph-lab",
    accessTier: "free",
    inputs: [
      { key: "mass", label: "Mass", unit: "kg", min: 1, max: 100, default: 10, step: 1 },
      { key: "force", label: "Applied force", unit: "N", min: 0, max: 500, default: 100, step: 5 },
      { key: "initialVelocity", label: "Initial velocity", unit: "m/s", min: 0, max: 40, default: 0, step: 1 },
      { key: "time", label: "Time", unit: "s", min: 1, max: 20, default: 5, step: 1 }
    ],
    practice: "A 5 kg object is pushed by 100 N. Find acceleration."
  },
  {
    id: "sim-collision-cart",
    conceptId: "concept-collision",
    moduleKey: "collision",
    title: "Collision Cart Lab",
    templateType: "collision-lab",
    accessTier: "pro",
    inputs: [
      { key: "m1", label: "Cart 1 mass", unit: "kg", min: 1, max: 50, default: 10, step: 1 },
      { key: "u1", label: "Cart 1 initial velocity", unit: "m/s", min: -20, max: 20, default: 8, step: 1 },
      { key: "m2", label: "Cart 2 mass", unit: "kg", min: 1, max: 50, default: 20, step: 1 },
      { key: "u2", label: "Cart 2 initial velocity", unit: "m/s", min: -20, max: 20, default: 0, step: 1 },
      { key: "v1", label: "Cart 1 final velocity", unit: "m/s", min: -20, max: 20, default: 1, step: 1 }
    ],
    practice: "Use conservation of momentum to find cart 2 final velocity."
  },
  {
    id: "sim-friction-lab",
    conceptId: "concept-friction",
    moduleKey: "friction",
    title: "Friction Lab",
    templateType: "force-vector-lab",
    accessTier: "free",
    inputs: [
      { key: "mass", label: "Mass", unit: "kg", min: 1, max: 80, default: 12, step: 1 },
      { key: "appliedForce", label: "Applied force", unit: "N", min: 0, max: 300, default: 80, step: 5 },
      { key: "friction", label: "Friction force", unit: "N", min: 0, max: 200, default: 35, step: 5 }
    ],
    practice: "Find net force when applied force is 80 N and friction is 35 N."
  },
  {
    id: "sim-neutralization",
    conceptId: "concept-neutralization",
    moduleKey: "neutralization",
    title: "Acid-Base Neutralization",
    templateType: "reaction-lab",
    accessTier: "free",
    inputs: [
      { key: "acid", label: "Acid amount", unit: "mL", min: 0, max: 100, default: 50, step: 5 },
      { key: "base", label: "Base amount", unit: "mL", min: 0, max: 100, default: 45, step: 5 }
    ],
    practice: "Predict whether the mixture is acidic, neutral, or basic."
  },
  {
    id: "sim-precipitation",
    conceptId: "concept-precipitation",
    moduleKey: "precipitation",
    title: "Precipitation Reaction",
    templateType: "reaction-lab",
    accessTier: "free",
    inputs: [
      { key: "solutionA", label: "Silver nitrate", unit: "mL", min: 0, max: 100, default: 40, step: 5 },
      { key: "solutionB", label: "Sodium chloride", unit: "mL", min: 0, max: 100, default: 40, step: 5 }
    ],
    practice: "Identify the precipitate formed when AgNO3 and NaCl are mixed."
  },
  {
    id: "sim-dry-cell",
    conceptId: "concept-dry-cell",
    moduleKey: "dryCell",
    title: "Dry Cell Behavior",
    templateType: "experiment-procedure",
    accessTier: "pro",
    inputs: [
      { key: "load", label: "Load resistance", unit: "ohm", min: 1, max: 100, default: 20, step: 1 },
      { key: "cellHealth", label: "Cell condition", unit: "%", min: 20, max: 100, default: 85, step: 5 }
    ],
    practice: "Explain why a dry cell does not use a salt bridge."
  }
];

export const plans = [
  { id: "free", title: "Free", features: ["sample simulations", "basic progress"] },
  { id: "student-pro", title: "Student Pro", features: ["all MVP simulations", "full practice", "saved experiments"] },
  { id: "institution", title: "Institution", features: ["seat access", "teacher tools", "usage reports"] }
];

export function hydrateConcept(conceptId) {
  const concept = concepts.find((item) => item.id === conceptId);
  if (!concept) return null;

  return {
    ...concept,
    formulas: formulas.filter((formula) => concept.formulas.includes(formula.id)),
    simulations: simulations
      .filter((simulation) => concept.simulations.includes(simulation.id))
      .map((simulation) => ({ ...simulation, conceptTitle: concept.title }))
  };
}

export function hydrateSimulation(simulationId) {
  const simulation = simulations.find((item) => item.id === simulationId);
  if (!simulation) return null;
  const concept = hydrateConcept(simulation.conceptId);

  return {
    ...simulation,
    conceptTitle: concept?.title || "Concept",
    formulas: concept?.formulas || []
  };
}

export function bootstrapData() {
  return {
    grades,
    subjects,
    chapters,
    featuredConcepts: concepts,
    plans
  };
}
