import { users as seedUsers } from "./seedData.js";

const grades = [];
const subjects = [];
const chapters = [];
const concepts = [];
const formulas = [];
const simulations = [];
const plans = [];
const progress = [];
const attempts = [];

export const store = {
  users: [...seedUsers],
  grades,
  subjects,
  chapters,
  concepts,
  formulas,
  simulations,
  plans,
  progress,
  attempts
};

export function publicUser(user) {
  return {
    id: user.id,
    email: user.email,
    displayName: user.displayName,
    roles: user.roles,
    plan: user.plan,
    status: user.status
  };
}

export function getConceptPayload(conceptId) {
  const concept = store.concepts.find((item) => item.id === conceptId);
  if (!concept) return null;

  return {
    ...concept,
    formulas: concept.formulas.map((id) => store.formulas.find((formula) => formula.id === id)).filter(Boolean),
    simulations: concept.simulations.map((id) => store.simulations.find((simulation) => simulation.id === id)).filter(Boolean)
  };
}

export function staffStats() {
  return {
    users: store.users.length,
    students: store.users.filter((user) => user.roles.includes("student")).length,
    teachers: store.users.filter((user) => user.roles.includes("teacher")).length,
    staff: store.users.filter((user) => user.roles.includes("staff")).length,
    concepts: store.concepts.length,
    simulations: store.simulations.length,
    publishedSimulations: store.simulations.length,
    progressEvents: store.progress.length,
    attempts: store.attempts.length,
    pendingReviews: 3,
    paymentIssues: 0
  };
}
