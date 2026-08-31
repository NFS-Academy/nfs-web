"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger globally
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function useFadeIn(ref, options = {}) {
  useGSAP(() => {
    gsap.from(ref.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      ...options,
    });
  }, { scope: ref });
}

export function useStaggerReveal(containerRef, selector, options = {}) {
  useGSAP(() => {
    gsap.from(selector, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      },
      ...options,
    });
  }, { scope: containerRef });
}
