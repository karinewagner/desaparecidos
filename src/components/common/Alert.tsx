import { useEffect, useRef, useState } from "react";
import type { AlertProps } from "../../types/alert";

const COLORS: Record<NonNullable<AlertProps["type"]>, string> = {
  success: "bg-green-600",
  error: "bg-red-600",
  info: "bg-blue-600",
};

export default function Alert({
  message,
  type = "info",
  duration = 3000,
  onClose,
}: AlertProps) {
  const [hovering, setHovering] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (hovering) {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      return;
    }
    timerRef.current = window.setTimeout(() => onClose?.(), duration);
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [duration, hovering, onClose]);

  const ariaLive = type === "error" ? "assertive" : "polite";

  return (
    <div
      role="alert"
      aria-live={ariaLive}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className={`fixed top-4 right-4 z-50 max-w-sm
                  text-white shadow-lg rounded-lg
                  ${COLORS[type]} transition
                  animate-fade-in`}
    >
      <div className="flex items-center gap-3 px-4 py-3">
        <span aria-hidden className="mt-0.5">
          {type === "success" ? "✅" : type === "error" ? "⚠️" : "ℹ️"}
        </span>

        <div className="flex-1 text-sm">{message}</div>

        <button
          type="button"
          aria-label="Fechar alerta"
          onClick={() => onClose?.()}
          className="opacity-80 hover:opacity-100 transition"
        >
          ✖
        </button>
      </div>
    </div>
  );
}
