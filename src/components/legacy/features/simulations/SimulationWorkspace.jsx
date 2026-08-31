import { ArrowLeft, Calculator, ClipboardCheck, Gauge, LineChart, Lock, RotateCcw, Save, Sigma } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { getSimulation, saveProgress, saveSimulationAttempt } from "../../api/learningApi.js";
import { navigate } from "../../app/routes.js";
import { Badge } from "../../ui/Badge.jsx";
import { Button } from "../../ui/Button.jsx";
import { Card } from "../../ui/Card.jsx";
import { EmptyState } from "../../ui/EmptyState.jsx";
import { RangeField } from "../../ui/Field.jsx";
import { Tabs } from "../../ui/Tabs.jsx";
import { calculate, defaultsFromInputs } from "./simulationEngines.js";
import { SimulationVisual } from "./SimulationVisual.jsx";

const tabs = [
  { id: "formula", label: "Formula" },
  { id: "calculation", label: "Calculation" },
  { id: "practice", label: "Practice" }
];

export function SimulationWorkspace({ simulationId, onProgressSaved }) {
  const [simulation, setSimulation] = useState(null);
  const [values, setValues] = useState({});
  const [activeTab, setActiveTab] = useState("formula");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setSimulation(null);
    setError("");
    getSimulation(simulationId)
      .then((payload) => {
        setSimulation(payload.simulation);
        setValues(defaultsFromInputs(payload.simulation.inputs));
      })
      .catch((err) => setError(err.message));
  }, [simulationId]);

  const result = useMemo(() => simulation ? calculate(simulation.moduleKey, values) : null, [simulation, values]);

  async function saveRun() {
    setStatus("Saving...");
    try {
      await saveProgress({ conceptId: simulation.conceptId, simulationId: simulation.id, status: "completed", score: 100 });
      await saveSimulationAttempt(simulation.id, { values, result });
      onProgressSaved();
      setStatus("Progress saved");
    } catch (err) {
      setStatus(err.message);
    }
  }

  if (error) return <EmptyState title="Simulation unavailable" text={error} />;
  if (!simulation || !result) return <EmptyState title="Loading simulation" text="Preparing controls, formulas, and visual model." />;

  return (
    <div className="page-stack">
      <Button tone="ghost" onClick={() => navigate(`/app/concepts/${simulation.conceptId}`)}><ArrowLeft size={18} /> Back to concept</Button>
      <header className={`page-hero tone-${simulation.moduleKey}`}>
        <div>
          <p className="eyebrow">{simulation.templateType}</p>
          <h1>{simulation.title}</h1>
          <p>{simulation.conceptTitle}</p>
        </div>
        <Badge tone={simulation.accessTier === "pro" ? "copper" : "chemistry"}>
          {simulation.accessTier === "pro" && <Lock size={14} />} {simulation.accessTier}
        </Badge>
      </header>

      <section className="workspace-grid">
        <Card className="sim-canvas-card">
          <SimulationVisual visual={result.visual} moduleKey={simulation.moduleKey} />
          <div className="result-grid">
            {result.metrics.map(([label, value]) => (
              <article className="result-tile" key={label}>
                <Gauge size={17} />
                <span>{label}</span>
                <strong>{value}</strong>
              </article>
            ))}
          </div>
          <p className="note-panel">{result.note}</p>
        </Card>

        <Card className="control-card">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Live inputs</p>
              <h2>Controls</h2>
            </div>
            <Button tone="ghost" onClick={() => setValues(defaultsFromInputs(simulation.inputs))}><RotateCcw size={16} /> Reset</Button>
          </div>

          <div className="control-list">
            {simulation.inputs.map((input) => (
              <RangeField
                key={input.key}
                label={input.label}
                unit={input.unit}
                min={input.min}
                max={input.max}
                step={input.step}
                value={values[input.key]}
                onChange={(nextValue) => setValues({ ...values, [input.key]: nextValue })}
              />
            ))}
          </div>

          <Button onClick={saveRun}><Save size={17} /> Save completed progress</Button>
          {status && <p className="save-status">{status}</p>}
        </Card>
      </section>

      <Card className="content-section">
        <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />
        {activeTab === "formula" && <FormulaPanel formulas={simulation.formulas} note={result.note} />}
        {activeTab === "calculation" && <CalculationPanel metrics={result.metrics} />}
        {activeTab === "practice" && <PracticePanel practice={simulation.practice} />}
      </Card>
    </div>
  );
}

function FormulaPanel({ formulas, note }) {
  if (!formulas.length) return <p className="panel-copy"><Sigma size={18} /> {note}</p>;
  return (
    <div className="formula-grid">
      {formulas.map((formula) => (
        <article className="formula-card" key={formula.id}>
          <Sigma size={18} />
          <strong>{formula.display}</strong>
          <span>{formula.variables}</span>
          <small>{formula.unit}</small>
        </article>
      ))}
    </div>
  );
}

function CalculationPanel({ metrics }) {
  return (
    <div className="list-stack">
      {metrics.map(([label, value]) => (
        <div className="list-row" key={label}>
          <Calculator size={18} />
          <strong>{label}</strong>
          <span className="list-meta">{value}</span>
        </div>
      ))}
    </div>
  );
}

function PracticePanel({ practice }) {
  return (
    <div className="practice-card">
      <ClipboardCheck size={22} />
      <div>
        <strong>Practice prompt</strong>
        <p>{practice}</p>
      </div>
      <LineChart size={22} />
    </div>
  );
}
