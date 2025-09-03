// src/hooks/useReveal.ts
"use client";
import { useEffect, useRef, useState } from "react";

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      {
        threshold: [0.3],
        rootMargin: "-50px 0px",
      }
    );

    observer.observe(node);
    return () => observer.unobserve(node);
  }, []);

  return { ref, isVisible } as const;
}
