import { cn } from "@/lib/utils";

export function Card({ className, children, ...props }) {
  return (
    <div 
      className={cn(
        "bg-[#0A0A0A] border border-[#1A1A1A] p-6 transition-colors hover:border-[#333333]", 
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }) {
  return (
    <div className={cn("flex flex-col space-y-1.5 mb-4", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }) {
  return (
    <h3 className={cn("font-bold text-lg leading-none tracking-tight text-white", className)} {...props}>
      {children}
    </h3>
  );
}

export function CardDescription({ className, children, ...props }) {
  return (
    <p className={cn("text-sm text-[#888888]", className)} {...props}>
      {children}
    </p>
  );
}

export function CardContent({ className, children, ...props }) {
  return (
    <div className={cn("pt-0", className)} {...props}>
      {children}
    </div>
  );
}
