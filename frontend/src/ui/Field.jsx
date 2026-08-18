export function Field({ label, hint, ...props }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input {...props} />
      {hint && <small>{hint}</small>}
    </label>
  );
}

export function RangeField({ label, unit, value, onChange, ...props }) {
  return (
    <label className="range-field">
      <span>{label}</span>
      <input type="range" value={value} onChange={(event) => onChange(Number(event.target.value))} {...props} />
      <strong>{value} {unit}</strong>
    </label>
  );
}
