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

    /* Observe element — trigger when 50% of the section is in view.
       rootMargin shrinks the observer box: -48px top (header), -20% bottom
       so the section must scroll well into the viewport before firing. */
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.disconnect(); /* one-time — don't re-trigger */

          /* After entrance animation finishes (~1s), switch children
             to fast hover-friendly transitions (removes stagger delay) */
          setTimeout(() => el.classList.add("revealed"), 1000);
        }
      },
      { threshold: 0.35, rootMargin: "-48px 0px -15% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
