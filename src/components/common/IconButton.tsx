import { type ButtonHTMLAttributes, type ReactNode } from "react";

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "aria-label"> & {
  ariaLabel: string;
  icon: ReactNode;
  className?: string;
};

export default function IconButton({ ariaLabel, icon, className = "", ...rest }: Props) {
  const base =
    "inline-flex items-center justify-center h-9 w-9 p-2 rounded-xl " +
    "border border-gray-300 bg-white text-gray-700 " +
    "hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 " +
    "disabled:opacity-40 disabled:cursor-not-allowed transition";
  return (
    <button type="button" aria-label={ariaLabel} className={`${base} ${className}`} {...rest}>
      {icon}
    </button>
  );
}
