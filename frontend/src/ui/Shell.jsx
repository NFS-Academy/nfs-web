import { Atom, BookOpen, Building2, ClipboardList, GraduationCap, LayoutDashboard, LogOut, Settings, UserRound } from "lucide-react";
import { navigate } from "../app/routes.js";
import { IconButton } from "./Button.jsx";

function hasRole(user, role) {
  return user?.roles?.includes(role);
}

export function Shell({ children, user, onLogout }) {
  const canTeach = hasRole(user, "teacher") || hasRole(user, "staff");
  const canAdmin = hasRole(user, "staff") || hasRole(user, "admin");

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <button className="brand-mark" onClick={() => navigate("/app")}>
          <span><Atom size={24} /></span>
          <strong>Naim Science Lab</strong>
        </button>

        <nav className="side-nav" aria-label="Main navigation">
          <button onClick={() => navigate("/app")}><LayoutDashboard size={18} /> Dashboard</button>
          <button onClick={() => navigate("/app/catalog")}><BookOpen size={18} /> Catalog</button>
          <button onClick={() => navigate("/app/progress")}><ClipboardList size={18} /> Progress</button>
          {canTeach && <button onClick={() => navigate("/teacher")}><GraduationCap size={18} /> Teacher</button>}
          {canAdmin && <button onClick={() => navigate("/institution")}><Building2 size={18} /> Institution</button>}
          {canAdmin && <button onClick={() => navigate("/admin")}><Settings size={18} /> Admin</button>}
        </nav>

        <div className="account-box">
          <UserRound size={18} />
          <div>
            <strong>{user.displayName}</strong>
            <span>{user.roles.join(", ")} - {user.plan}</span>
          </div>
          <IconButton label="Sign out" onClick={onLogout}>
            <LogOut size={18} />
          </IconButton>
        </div>
      </aside>
      <main className="main-surface">{children}</main>
    </div>
  );
}
