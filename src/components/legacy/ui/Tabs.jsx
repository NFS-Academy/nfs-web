export function Tabs({ tabs, active, onChange }) {
  return (
    <div className="tabs" role="tablist" aria-label="Workspace sections">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={active === tab.id ? "active" : ""}
          onClick={() => onChange(tab.id)}
          type="button"
          role="tab"
          aria-selected={active === tab.id}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
