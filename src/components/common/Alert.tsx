import { useEffect } from "react";
import type { AlertProps } from "../../types/alert";

export default function Alert({
  message,
  type = "info",
  duration = 3000,
  onClose,
}: AlertProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const colors = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  };

  return (
    <div
      className={`fixed top-4 right-4 px-4 py-2 rounded shadow-lg text-white ${colors[type]} animate-fade-in`}
    >
      {message}
    </div>
  );
}
