export function Card({ children, className = "", tone = "default", ...props }) {
  return (
    <section className={`card card-${tone} ${className}`.trim()} {...props}>
      {children}
    </section>
  );
}

export function ActionCard({ children, className = "", tone = "default", ...props }) {
  return (
    <button className={`action-card card-${tone} ${className}`.trim()} {...props}>
      {children}
    </button>
  );
}
