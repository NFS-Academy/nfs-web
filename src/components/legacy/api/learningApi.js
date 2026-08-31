import { request, withMockFallback } from "./client.js";
import {
  mockBootstrap,
  mockConcept,
  mockCurrentUser,
  mockLogin,
  mockProgressSummary,
  mockSaveAttempt,
  mockSaveProgress,
  mockSimulation,
  mockStaffDashboard
} from "./mockApi.js";

export function loginPublic(credentials) {
  return withMockFallback(
    () => request("/auth/public/login", { method: "POST", body: JSON.stringify(credentials) }),
    () => mockLogin("public", credentials)
  );
}

export function loginStaff(credentials) {
  return withMockFallback(
    () => request("/auth/staff/login", { method: "POST", body: JSON.stringify(credentials) }),
    () => mockLogin("staff", credentials)
  );
}

export function getCurrentUser() {
  return withMockFallback(() => request("/auth/public/me"), mockCurrentUser);
}

export function getBootstrap() {
  return withMockFallback(() => request("/catalog/bootstrap"), mockBootstrap);
}

export function getConcept(conceptId) {
  return withMockFallback(() => request(`/catalog/concepts/${conceptId}`), () => mockConcept(conceptId));
}

export function getSimulation(simulationId) {
  return withMockFallback(() => request(`/simulations/${simulationId}`), () => mockSimulation(simulationId));
}

export function getProgressSummary() {
  return withMockFallback(() => request("/progress/summary"), mockProgressSummary);
}

export function saveProgress(body) {
  return withMockFallback(
    () => request("/progress", { method: "POST", body: JSON.stringify(body) }),
    () => mockSaveProgress(body)
  );
}

export function saveSimulationAttempt(simulationId, body) {
  return withMockFallback(
    () => request(`/simulations/${simulationId}/attempts`, { method: "POST", body: JSON.stringify(body) }),
    () => mockSaveAttempt(simulationId, body)
  );
}

export function getStaffDashboard() {
  return withMockFallback(() => request("/staff/dashboard"), mockStaffDashboard);
}
