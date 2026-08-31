import { Atom, Beaker, LockKeyhole, Sparkles } from "lucide-react";
import { useState } from "react";
import { demoAccounts } from "../../data/mockData.js";
import { Badge } from "../../ui/Badge.jsx";
import { Button } from "../../ui/Button.jsx";
import { Field } from "../../ui/Field.jsx";

export function LoginPage({ error, onLogin }) {
  const [mode, setMode] = useState("public");
  const [form, setForm] = useState(demoAccounts.public);

  function chooseMode(nextMode) {
    setMode(nextMode);
    setForm(nextMode === "staff" ? demoAccounts.staff : demoAccounts.public);
  }

  function submit(event) {
    event.preventDefault();
    onLogin(mode, form);
  }

  return (
    <main className="login-layout">
      <section className="login-hero">
        <div className="brand-lockup">
          <span><Atom size={30} /></span>
          <div>
            <strong>Naim Science Lab</strong>
            <small>Interactive science, built for Class 9-12 growth.</small>
          </div>
        </div>

        <div className="hero-copy">
          <Badge tone="copper">Frontend first build</Badge>
          <h1>Matte, focused simulations for serious science learning.</h1>
          <p>
            Browse chapters, open concept labs, change variables, read formulas,
            and save progress. The UI is built first so the backend can later
            follow a stable product shape.
          </p>
        </div>

        <div className="preview-grid">
          <div>
            <Beaker size={22} />
            <strong>7</strong>
            <span>seed simulations</span>
          </div>
          <div>
            <Sparkles size={22} />
            <strong>3</strong>
            <span>role surfaces</span>
          </div>
          <div>
            <LockKeyhole size={22} />
            <strong>mock</strong>
            <span>offline fallback</span>
          </div>
        </div>
      </section>

      <section className="login-card">
        <div>
          <p className="eyebrow">Access</p>
          <h2>Enter the lab</h2>
        </div>

        <div className="segmented">
          <button className={mode === "public" ? "active" : ""} onClick={() => chooseMode("public")} type="button">Student</button>
          <button className={mode === "staff" ? "active" : ""} onClick={() => chooseMode("staff")} type="button">Staff</button>
        </div>

        <form className="form-stack" onSubmit={submit}>
          <Field label="Email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
          <Field label="Password" type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} />
          {error && <div className="error-banner">{error}</div>}
          <Button type="submit">Log in</Button>
        </form>

        <div className="pricing-strip">
          <strong>Plans</strong>
          <span>Free samples</span>
          <span>Student Pro</span>
          <span>Institution seats</span>
        </div>
      </section>
    </main>
  );
}
