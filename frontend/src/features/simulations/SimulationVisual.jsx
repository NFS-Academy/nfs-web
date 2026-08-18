import { Atom, Zap } from "lucide-react";

export function SimulationVisual({ visual, moduleKey }) {
  const kind = visual?.kind || moduleKey;
  const intensity = Math.max(12, Math.min(100, visual?.intensity || 36));

  return (
    <div className={`sim-stage sim-${kind}`} style={{ "--level": `${intensity}%` }}>
      <div className="vector vector-left" data-active={visual?.leftArrow ? "true" : "false"}>F</div>
      <div className="lab-track">
        <div className="lab-object">
          {kind === "cell" ? <Zap size={46} /> : <Atom size={48} />}
        </div>
        <div className="level-bar"><span /></div>
      </div>
      <div className="vector vector-right" data-active={visual?.rightArrow ? "true" : "false"}>v</div>
    </div>
  );
}
