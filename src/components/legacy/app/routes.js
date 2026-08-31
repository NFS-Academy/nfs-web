export function routeFromPath(pathname) {
  const path = pathname === "/" ? "/login" : pathname;
  const parts = path.split("/").filter(Boolean);

  if (path === "/login") return { name: "login" };
  if (path === "/admin") return { name: "admin" };
  if (path === "/teacher") return { name: "teacher" };
  if (path === "/institution") return { name: "institution" };
  if (path === "/app") return { name: "dashboard" };
  if (path === "/app/catalog") return { name: "catalog" };
  if (path === "/app/progress") return { name: "progress" };
  if (parts[0] === "app" && parts[1] === "concepts" && parts[2]) return { name: "concept", conceptId: parts[2] };
  if (parts[0] === "app" && parts[1] === "simulations" && parts[2]) return { name: "simulation", simulationId: parts[2] };

  return { name: "dashboard" };
}

export function navigate(path) {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new Event("routechange"));
}
