import { Activity, Beaker, BookOpen, CheckCircle2, Flame, Gauge } from "lucide-react";
import { navigate } from "../../app/routes.js";
import { ActionCard, Card } from "../../ui/Card.jsx";
import { Badge } from "../../ui/Badge.jsx";
import { EmptyState } from "../../ui/EmptyState.jsx";

export function StudentDashboard({ bootstrap, progress }) {
  const concepts = bootstrap?.featuredConcepts || [];
  const physicsConcepts = concepts.filter((concept) => concept.chapterId.includes("physics"));
  const chemistryConcepts = concepts.filter((concept) => concept.chapterId.includes("chemistry"));
  const firstConcept = concepts[0];

  return (
    <div className="page-stack">
      <header className="page-hero compact">
        <div>
          <p className="eyebrow">Class 9-10 MVP</p>
          <h1>Learning dashboard</h1>
          <p>Start with a concept, open a lab, change the variables, and save the completed run.</p>
        </div>
        {firstConcept && (
          <button className="hero-action" onClick={() => navigate(`/app/concepts/${firstConcept.id}`)}>
            Continue <Flame size={18} />
          </button>
        )}
      </header>

      <section className="metric-grid">
        <Metric icon={<BookOpen />} label="Subjects seeded" value={bootstrap?.subjects?.length || 0} />
        <Metric icon={<Beaker />} label="Simulations ready" value="7" />
        <Metric icon={<CheckCircle2 />} label="Completed" value={progress?.completed || 0} />
        <Metric icon={<Activity />} label="Progress events" value={progress?.touched || 0} />
      </section>

      <ConceptRail title="Physics Chapter 3" subtitle="Force, motion, momentum, collision, friction" concepts={physicsConcepts} tone="physics" />
      <ConceptRail title="Chemistry MVP Labs" subtitle="Neutralization, precipitation, dry cell behavior" concepts={chemistryConcepts} tone="chemistry" />
    </div>
  );
}

function ConceptRail({ title, subtitle, concepts, tone }) {
  return (
    <Card className="content-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{subtitle}</p>
          <h2>{title}</h2>
        </div>
        <Badge tone={tone}>{concepts.length} concepts</Badge>
      </div>
      {concepts.length ? (
        <div className="concept-grid">
          {concepts.map((concept) => (
            <ActionCard key={concept.id} tone={concept.tone} onClick={() => navigate(`/app/concepts/${concept.id}`)}>
              <span className="card-kicker">{concept.sourceRef}</span>
              <strong>{concept.title}</strong>
              <small>{concept.objective}</small>
            </ActionCard>
          ))}
        </div>
      ) : (
        <EmptyState title="No concepts yet" text="This subject is planned for a later content pass." />
      )}
    </Card>
  );
}

function Metric({ icon, label, value }) {
  return (
    <Card className="metric-card">
      {icon}
      <span>{label}</span>
      <strong>{value}</strong>
      <Gauge size={16} />
    </Card>
  );
}
