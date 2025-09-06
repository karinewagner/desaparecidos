import { useEffect, useMemo, useRef, useState } from "react";

type CountUpProps = {
  value: number;
  duration?: number;
  delay?: number;
  className?: string;
  locale?: string;
};

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export default function CountUp({
  value,
  duration = 1200,
  delay = 0,
  className,
  locale = "pt-BR",
}: CountUpProps) {
  const [display, setDisplay] = useState(0);
  const rafId = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const fromRef = useRef(0);
  const toRef = useRef(value);

  const reduceMotion = useMemo(
    () => window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false,
    []
  );

  useEffect(() => {
    if (reduceMotion) {
      setDisplay(value);
      fromRef.current = value;
      toRef.current = value;
      return;
    }

    fromRef.current = display;
    toRef.current = value;
    startRef.current = null;

    const start = (ts: number) => {
      if (startRef.current === null) startRef.current = ts + delay;

      const elapsed = Math.max(0, ts - (startRef.current ?? 0));
      const t = Math.min(1, elapsed / duration);
      const eased = easeOutCubic(t);
      const current = fromRef.current + (toRef.current - fromRef.current) * eased;

      setDisplay(current);

      if (t < 1) {
        rafId.current = requestAnimationFrame(start);
      }
    };

    rafId.current = requestAnimationFrame(start);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [value, duration, delay, reduceMotion]);

  const formatted = useMemo(
    () => new Intl.NumberFormat(locale).format(Math.round(display)),
    [display, locale]
  );

  return <span className={className}>{formatted}</span>;
}
