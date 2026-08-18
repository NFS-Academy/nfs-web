export function Button({ children, className = "", tone = "primary", ...props }) {
  return (
    <button className={`button button-${tone} ${className}`.trim()} {...props}>
      {children}
    </button>
  );
}

export function IconButton({ label, children, className = "", ...props }) {
  return (
    <button className={`icon-button ${className}`.trim()} aria-label={label} title={label} {...props}>
      {children}
    </button>
  );
}
