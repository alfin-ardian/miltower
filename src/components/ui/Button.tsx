import { Link } from "react-router-dom";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

type Variant = "primary" | "secondary" | "ghost" | "navy" | "yellow";

const variantClass: Record<Variant, string> = {
  primary:
    "bg-orange text-navy hover:brightness-95 focus-visible:outline-navy",
  secondary:
    "bg-white text-navy border-2 border-navy hover:bg-cream focus-visible:outline-navy",
  ghost:
    "bg-transparent text-navy border-2 border-navy/25 hover:border-navy",
  navy: "bg-navy text-white hover:bg-navy-soft",
  yellow: "bg-yellow text-navy hover:brightness-95",
};

const baseClass =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-display text-sm font-extrabold uppercase tracking-wide transition disabled:cursor-not-allowed disabled:opacity-50";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(baseClass, variantClass[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}

interface ButtonLinkProps {
  to: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
}

export function ButtonLink({
  to,
  variant = "primary",
  className,
  children,
}: ButtonLinkProps) {
  return (
    <Link to={to} className={cn(baseClass, variantClass[variant], className)}>
      {children}
    </Link>
  );
}
