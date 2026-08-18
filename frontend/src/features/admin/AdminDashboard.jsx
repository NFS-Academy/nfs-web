import { ClipboardList, FileCheck2, Layers3, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { getStaffDashboard } from "../../api/learningApi.js";
import { Badge } from "../../ui/Badge.jsx";
import { Card } from "../../ui/Card.jsx";
import { EmptyState } from "../../ui/EmptyState.jsx";
import { titleCase } from "../../utils/format.js";

export function AdminDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getStaffDashboard().then(setDashboard).catch((err) => setError(err.message));
  }, []);

  if (error) return <EmptyState title="Admin unavailable" text={error} />;
  if (!dashboard) return <EmptyState title="Loading admin" text="Preparing review queue and simulation registry." />;

  return (
    <div className="page-stack">
      <header className="page-header">
        <div>
          <p className="eyebrow">Staff admin</p>
          <h1>Control room</h1>
          <p>CMS-style review and simulation template management, kept safe until backend publishing is ready.</p>
        </div>
        <Badge tone="copper">frontend shell</Badge>
      </header>

      <section className="metric-grid">
        {Object.entries(dashboard.stats).map(([key, value]) => (
          <Card className="metric-card" key={key}>
            <ShieldCheck />
            <span>{titleCase(key)}</span>
            <strong>{value}</strong>
          </Card>
        ))}
      </section>

      <section className="split-grid">
        <Card className="content-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Workflow</p>
              <h2>Review queue</h2>
            </div>
            <FileCheck2 size={20} />
          </div>
          <div className="list-stack">
            {dashboard.reviewQueue.map((item) => (
              <div className="list-row" key={item.id}>
                <ClipboardList size={18} />
                <strong>{item.title}</strong>
                <span className="list-meta">{item.status}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="content-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Builder</p>
              <h2>Simulation registry</h2>
            </div>
            <Layers3 size={20} />
          </div>
          <div className="list-stack">
            {dashboard.recentContent.map((item) => (
              <div className="list-row" key={item.id}>
                <strong>{item.title}</strong>
                <span className="list-meta">{item.templateType} - {item.accessTier}</span>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
