"use client";

import { useEffect, useRef, useState } from "react";

export default function AnimatedCounter({ value, duration = 1500 }) {
  const ref = useRef(null);
  const [count, setCount] = useState(0);
  const hasRun = useRef(false);

  // Split "10K+" into number part (10) and suffix ("K+")
  const match = value.match(/^([\d.]+)(.*)$/);
  const target = match ? parseFloat(match[1]) : 0;
  const suffix = match ? match[2] : "";

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true;
          const start = performance.now();

          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            setCount(target * eased);
            if (progress < 1) requestAnimationFrame(tick);
          };

          requestAnimationFrame(tick);
          observer.unobserve(node);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [target, duration]);

  const display = Number.isInteger(target)
    ? Math.round(count)
    : count.toFixed(1);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}