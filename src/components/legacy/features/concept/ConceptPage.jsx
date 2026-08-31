import { ArrowLeft, Beaker, Sigma } from "lucide-react";
import { useEffect, useState } from "react";
import { getConcept } from "../../api/learningApi.js";
import { navigate } from "../../app/routes.js";
import { Badge } from "../../ui/Badge.jsx";
import { Button } from "../../ui/Button.jsx";
import { Card } from "../../ui/Card.jsx";
import { EmptyState } from "../../ui/EmptyState.jsx";

export function ConceptPage({ conceptId }) {
  const [concept, setConcept] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setConcept(null);
    setError("");
    getConcept(conceptId).then((payload) => setConcept(payload.concept)).catch((err) => setError(err.message));
  }, [conceptId]);

  if (error) return <EmptyState title="Concept unavailable" text={error} />;
  if (!concept) return <EmptyState title="Loading concept" text="Preparing formulas and simulation entries." />;

  return (
    <div className="page-stack">
      <Button tone="ghost" onClick={() => navigate("/app/catalog")}><ArrowLeft size={18} /> Back to catalog</Button>
      <header className={`page-hero tone-${concept.tone}`}>
        <div>
          <p className="eyebrow">{concept.sourceRef}</p>
          <h1>{concept.title}</h1>
          <p>{concept.objective}</p>
        </div>
        <Badge tone={concept.tone}>{concept.tone}</Badge>
      </header>

      <section className="split-grid">
        <Card className="content-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Interactive</p>
              <h2>Simulation entries</h2>
            </div>
          </div>
          <div className="list-stack">
            {concept.simulations.map((simulation) => (
              <button className="list-row action" key={simulation.id} onClick={() => navigate(`/app/simulations/${simulation.id}`)} type="button">
                <Beaker size={18} />
                <span className="list-main">
                  <strong>{simulation.title}</strong>
                  <small>{simulation.templateType} - {simulation.accessTier}</small>
                </span>
              </button>
            ))}
          </div>
        </Card>

        <Card className="content-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Math</p>
              <h2>Formula cards</h2>
            </div>
          </div>
          {concept.formulas.length ? (
            <div className="formula-grid">
              {concept.formulas.map((formula) => (
                <article className="formula-card" key={formula.id}>
                  <Sigma size={18} />
                  <strong>{formula.display}</strong>
                  <span>{formula.variables}</span>
                  <small>{formula.unit}</small>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState title="Observation lab" text="This concept uses reaction observations instead of numeric formulas." />
          )}
        </Card>
      </section>
    </div>
  );
}
