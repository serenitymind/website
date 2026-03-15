import { useEffect, useRef } from "react";

/**
 * useScrollReveal — adds `.visible` class when element enters viewport.
 * One-time animation: disconnects observer after first intersection.
 * Accounts for fixed header height (~48px) via rootMargin.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    /* Observe element — trigger when 10% visible below the fixed header */
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.disconnect(); /* one-time — don't re-trigger */
        }
      },
      { threshold: 0.1, rootMargin: "-48px 0px 0px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
