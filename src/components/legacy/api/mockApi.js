import { bootstrapData, demoAccounts, hydrateConcept, hydrateSimulation, simulations, users } from "../data/mockData.js";

const progressKey = "naim_mock_progress";

function readProgress() {
  return JSON.parse(localStorage.getItem(progressKey) || "[]");
}

function writeProgress(nextProgress) {
  localStorage.setItem(progressKey, JSON.stringify(nextProgress));
}

function publicUser(user) {
  const { password: _password, ...rest } = user;
  return rest;
}

export function mockLogin(mode, credentials) {
  const target = mode === "staff" ? demoAccounts.staff : credentials.email === demoAccounts.teacher.email ? demoAccounts.teacher : demoAccounts.public;
  const user = users.find((item) => item.email === target.email);

  if (credentials.email !== target.email || credentials.password !== target.password) {
    throw new Error("Invalid demo credentials.");
  }

  const payload = {
    token: `mock-token-${user.id}`,
    user: publicUser(user)
  };
  localStorage.setItem("naim_user", JSON.stringify(payload.user));
  return payload;
}

export function mockCurrentUser() {
  const user = JSON.parse(localStorage.getItem("naim_user") || "null");
  if (!user) throw new Error("Not logged in.");
  return { user };
}

export function mockBootstrap() {
  return bootstrapData();
}

export function mockConcept(conceptId) {
  const concept = hydrateConcept(conceptId);
  if (!concept) throw new Error("Concept not found.");
  return { concept };
}

export function mockSimulation(simulationId) {
  const simulation = hydrateSimulation(simulationId);
  if (!simulation) throw new Error("Simulation not found.");
  return { simulation };
}

export function mockProgressSummary() {
  const progress = readProgress();
  return {
    completed: progress.filter((item) => item.status === "completed").length,
    touched: progress.length,
    items: progress.slice(-6).reverse()
  };
}

export function mockSaveProgress(body) {
  const progress = readProgress();
  const nextItem = {
    id: `progress_${Date.now()}`,
    userId: "mock_user",
    updatedAt: new Date().toISOString(),
    ...body
  };
  writeProgress([...progress, nextItem]);
  return { progress: nextItem };
}

export function mockSaveAttempt(simulationId, body) {
  return {
    attempt: {
      id: `attempt_${Date.now()}`,
      simulationId,
      createdAt: new Date().toISOString(),
      ...body
    }
  };
}

export function mockStaffDashboard() {
  return {
    stats: {
      users: users.length,
      students: users.filter((user) => user.roles.includes("student")).length,
      teachers: users.filter((user) => user.roles.includes("teacher")).length,
      staff: users.filter((user) => user.roles.includes("staff")).length,
      concepts: bootstrapData().featuredConcepts.length,
      simulations: simulations.length,
      publishedSimulations: simulations.length,
      progressEvents: readProgress().length
    },
    reviewQueue: [
      { id: "review-physics-3", title: "Physics Chapter 3 pack validation", status: "ready for UI review" },
      { id: "review-chemistry-mvp", title: "Chemistry MVP lab copy", status: "needs bilingual pass" }
    ],
    recentContent: simulations.slice(0, 5)
  };
}
