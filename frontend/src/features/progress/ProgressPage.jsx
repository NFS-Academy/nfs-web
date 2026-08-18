import { CheckCircle2, Clock3, Target } from "lucide-react";
import { Card } from "../../ui/Card.jsx";
import { EmptyState } from "../../ui/EmptyState.jsx";

export function ProgressPage({ progress }) {
  const items = progress?.items || [];

  return (
    <div className="page-stack">
      <header className="page-header">
        <div>
          <p className="eyebrow">Student record</p>
          <h1>Progress</h1>
          <p>Simple frontend-first view of completed simulations and recent learning events.</p>
        </div>
      </header>

      <section className="metric-grid">
        <Card className="metric-card"><CheckCircle2 /><span>Completed</span><strong>{progress?.completed || 0}</strong></Card>
        <Card className="metric-card"><Target /><span>Touched</span><strong>{progress?.touched || 0}</strong></Card>
        <Card className="metric-card"><Clock3 /><span>Recent items</span><strong>{items.length}</strong></Card>
      </section>

      <Card className="content-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Latest</p>
            <h2>Saved activity</h2>
          </div>
        </div>
        {items.length ? (
          <div className="list-stack">
            {items.map((item) => (
              <div className="list-row" key={item.id}>
                <strong>{item.simulationId}</strong>
                <span className="list-meta">{item.status} - score {item.score || 0}</span>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState title="No progress yet" text="Complete a simulation workspace to create the first progress event." />
        )}
      </Card>
    </div>
  );
}
