"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const Button = forwardRef(({ 
  className, 
  variant = "primary", 
  size = "md", 
  children, 
  ...props 
}, ref) => {
  
  const baseStyles = "relative inline-flex items-center justify-center font-sans font-medium transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-black disabled:opacity-50 disabled:pointer-events-none rounded-full overflow-hidden select-none active:scale-[0.98] group";
  
  const variants = {
    primary: "bg-slate-900 text-white dark:bg-white dark:text-slate-900 border border-transparent hover:bg-slate-800 dark:hover:bg-slate-100 shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] dark:shadow-[0_4px_14px_0_rgba(255,255,255,0.1)]",
    secondary: "bg-white dark:bg-black text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5",
    ghost: "bg-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5",
    danger: "bg-rose-500 text-white border border-transparent hover:bg-rose-600 shadow-[0_4px_14px_0_rgba(244,63,94,0.3)]",
  };

  const sizes = {
    sm: "h-9 px-5 text-xs",
    md: "h-11 px-6 text-sm",
    lg: "h-14 px-8 text-base",
  };

  return (
    <button
      ref={ref}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      <div className="relative z-10 w-full flex items-center justify-center gap-2">
        {children}
      </div>
      
      {/* Inner highlight for premium hardware feel */}
      {variant === 'primary' && (
        <div className="absolute inset-0 rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] dark:shadow-[inset_0_-1px_1px_rgba(0,0,0,0.15)] pointer-events-none" />
      )}
    </button>
  );
});

Button.displayName = "Button";

export { Button };
