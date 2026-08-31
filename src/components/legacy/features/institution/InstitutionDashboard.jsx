import { Building2, CreditCard, UserPlus } from "lucide-react";
import { Card } from "../../ui/Card.jsx";

export function InstitutionDashboard() {
  return (
    <div className="page-stack">
      <header className="page-header">
        <div>
          <p className="eyebrow">Institution portal</p>
          <h1>Seats and reports</h1>
          <p>Planning-ready frontend shell for organization users before backend billing and seats are built.</p>
        </div>
      </header>

      <section className="feature-triplet">
        <Card className="feature-card"><Building2 /><strong>Organization profile</strong><span>School or coaching center account details.</span></Card>
        <Card className="feature-card"><UserPlus /><strong>Seat invites</strong><span>Bulk invite and role assignment workflow shell.</span></Card>
        <Card className="feature-card"><CreditCard /><strong>Billing reports</strong><span>Invoices and usage reports will connect in backend phase.</span></Card>
      </section>
    </div>
  );
}
