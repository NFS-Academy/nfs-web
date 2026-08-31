import { MonitorPlay, Send, UsersRound } from "lucide-react";
import { Card } from "../../ui/Card.jsx";

export function TeacherDashboard() {
  return (
    <div className="page-stack">
      <header className="page-header">
        <div>
          <p className="eyebrow">Teacher surface</p>
          <h1>Classroom tools</h1>
          <p>Frontend shell for presentation mode, assignments, and progress review.</p>
        </div>
      </header>

      <section className="feature-triplet">
        <Card className="feature-card"><MonitorPlay /><strong>Presentation mode</strong><span>Open a simulation full-screen for class explanation.</span></Card>
        <Card className="feature-card"><Send /><strong>Assignments</strong><span>Send concept labs to groups once backend classes exist.</span></Card>
        <Card className="feature-card"><UsersRound /><strong>Class progress</strong><span>Review completion and weak topics by student group.</span></Card>
      </section>
    </div>
  );
}
