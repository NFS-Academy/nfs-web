"use client";

import { forwardRef, useRef } from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Button = forwardRef(({ 
  className, 
  variant = "primary", 
  size = "md", 
  children, 
  ...props 
}, ref) => {
  
  const innerRef = useRef(null);
  const hoverBgRef = useRef(null);
  
  const { contextSafe } = useGSAP({ scope: innerRef });

  const handleMouseEnter = contextSafe(() => {
    if (variant !== 'ghost' && variant !== 'link') {
      gsap.to(hoverBgRef.current, { scaleX: 1, duration: 0.3, ease: "power3.out" });
      gsap.to(innerRef.current, { scale: 0.98, duration: 0.3, ease: "power3.out" });
    }
  });

  const handleMouseLeave = contextSafe(() => {
    if (variant !== 'ghost' && variant !== 'link') {
      gsap.to(hoverBgRef.current, { scaleX: 0, duration: 0.4, ease: "power3.out" });
      gsap.to(innerRef.current, { scale: 1, duration: 0.4, ease: "power3.out" });
    }
  });

  const baseStyles = "relative inline-flex items-center justify-center font-sans font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF3366] focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:pointer-events-none rounded-none overflow-hidden select-none";
  
  const variants = {
    primary: "bg-white text-black border border-white",
    secondary: "bg-transparent text-white border border-[#333333] hover:border-white",
    ghost: "bg-transparent text-[#888888] hover:text-white",
    danger: "bg-[#FF3366] text-white border border-[#FF3366]",
  };

  const sizes = {
    sm: "h-9 px-4 text-xs",
    md: "h-12 px-6 text-sm",
    lg: "h-16 px-8 text-base",
  };

  return (
    <button
      ref={ref}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <div ref={innerRef} className="relative z-10 w-full flex items-center justify-center gap-2">
        {children}
      </div>
      
      {/* Brutalist hover fill block */}
      {variant !== 'ghost' && variant !== 'link' && (
        <div 
          ref={hoverBgRef}
          className={cn(
            "absolute inset-0 z-0 origin-left scale-x-0",
            variant === 'primary' ? "bg-[#FF3366]" : "bg-white"
          )}
        />
      )}
    </button>
  );
});

Button.displayName = "Button";

export { Button };
