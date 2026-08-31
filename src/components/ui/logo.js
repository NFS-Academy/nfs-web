export function Logo({ className, ...props }) {
  return (
    <svg 
      width="32" 
      height="32" 
      viewBox="0 0 32 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <rect x="2" y="2" width="28" height="28" fill="white" />
      <path d="M8 24V8L24 24V8" stroke="black" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter" />
    </svg>
  );
}
