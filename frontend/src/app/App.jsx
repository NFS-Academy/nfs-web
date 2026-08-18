import { useEffect, useState } from "react";
import { getBootstrap, getCurrentUser, getProgressSummary, loginPublic, loginStaff } from "../api/learningApi.js";
import { AdminDashboard } from "../features/admin/AdminDashboard.jsx";
import { LoginPage } from "../features/auth/LoginPage.jsx";
import { CatalogPage } from "../features/catalog/CatalogPage.jsx";
import { ConceptPage } from "../features/concept/ConceptPage.jsx";
import { StudentDashboard } from "../features/dashboard/StudentDashboard.jsx";
import { InstitutionDashboard } from "../features/institution/InstitutionDashboard.jsx";
import { ProgressPage } from "../features/progress/ProgressPage.jsx";
import { SimulationWorkspace } from "../features/simulations/SimulationWorkspace.jsx";
import { TeacherDashboard } from "../features/teacher/TeacherDashboard.jsx";
import { Shell } from "../ui/Shell.jsx";
import { navigate } from "./routes.js";
import { useRoute } from "./useRoute.js";

function canUseAdmin(user) {
  return user?.roles?.includes("staff") || user?.roles?.includes("admin");
}

function canUseTeacher(user) {
  return user?.roles?.includes("teacher") || canUseAdmin(user);
}

export default function App() {
  const route = useRoute();
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("naim_user") || "null"));
  const [bootstrap, setBootstrap] = useState(null);
  const [progress, setProgress] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("naim_token") || user) return;
    getCurrentUser()
      .then((payload) => {
        setUser(payload.user);
        localStorage.setItem("naim_user", JSON.stringify(payload.user));
      })
      .catch(() => logout());
  }, [user]);

  useEffect(() => {
    if (!user) return;
    getBootstrap().then(setBootstrap).catch((err) => setError(err.message));
    refreshProgress();
  }, [user]);

  useEffect(() => {
    if (user && route.name === "login") navigate("/app");
  }, [route.name, user]);

  function refreshProgress() {
    return getProgressSummary().then(setProgress).catch(() => setProgress({ completed: 0, touched: 0, items: [] }));
  }

  async function handleLogin(mode, credentials) {
    setError("");
    try {
      const payload = mode === "staff" ? await loginStaff(credentials) : await loginPublic(credentials);
      localStorage.setItem("naim_token", payload.token);
      localStorage.setItem("naim_user", JSON.stringify(payload.user));
      setUser(payload.user);
      navigate(canUseAdmin(payload.user) ? "/admin" : "/app");
    } catch (err) {
      setError(err.message);
    }
  }

  function logout() {
    localStorage.removeItem("naim_token");
    localStorage.removeItem("naim_user");
    setUser(null);
    setBootstrap(null);
    setProgress(null);
    navigate("/login");
  }

  if (!user) {
    return <LoginPage error={error} onLogin={handleLogin} />;
  }

  return (
    <Shell user={user} onLogout={logout}>
      {error && <div className="error-banner">{error}</div>}
      {renderRoute({ route, user, bootstrap, progress, refreshProgress })}
    </Shell>
  );
}

function renderRoute({ route, user, bootstrap, progress, refreshProgress }) {
  if (route.name === "admin") {
    return canUseAdmin(user) ? <AdminDashboard /> : <StudentDashboard bootstrap={bootstrap} progress={progress} />;
  }

  if (route.name === "teacher") {
    return canUseTeacher(user) ? <TeacherDashboard /> : <StudentDashboard bootstrap={bootstrap} progress={progress} />;
  }

  if (route.name === "institution") {
    return canUseAdmin(user) ? <InstitutionDashboard /> : <StudentDashboard bootstrap={bootstrap} progress={progress} />;
  }

  if (route.name === "catalog") return <CatalogPage bootstrap={bootstrap} />;
  if (route.name === "progress") return <ProgressPage progress={progress} />;
  if (route.name === "concept") return <ConceptPage conceptId={route.conceptId} />;
  if (route.name === "simulation") return <SimulationWorkspace simulationId={route.simulationId} onProgressSaved={refreshProgress} />;

  return <StudentDashboard bootstrap={bootstrap} progress={progress} />;
}
