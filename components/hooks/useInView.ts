"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Hook that reports when a referenced element enters the viewport.
 * `hasBeenSeen` stays true once triggered — one-shot animations keep their final state.
 */
export function useInView<T extends Element>(
  threshold: number = 0.3,
  rootMargin: string = "0px"
) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  const [hasBeenSeen, setHasBeenSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setInView(visible);
        if (visible) setHasBeenSeen(true);
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, inView, hasBeenSeen };
}
