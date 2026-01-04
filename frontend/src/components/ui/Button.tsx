import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "danger";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-[#0f172a] text-white shadow-sm hover:bg-slate-800 focus-visible:outline-[#0f172a]",
  secondary:
    "bg-slate-900/5 text-slate-900 hover:bg-slate-900/10 focus-visible:outline-slate-700",
  ghost: "text-slate-700 hover:bg-slate-900/5 focus-visible:outline-slate-700",
  outline:
    "border border-slate-200 text-slate-800 hover:border-slate-300 hover:bg-white focus-visible:outline-slate-700",
  danger:
    "bg-red-600 text-white shadow-sm hover:bg-red-700 focus-visible:outline-red-600",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-sm",
  lg: "h-12 px-5 text-base",
};

type ButtonProps = {
  variant?: Variant;
  size?: Size;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  loading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  iconLeft,
  iconRight,
  loading,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-[10px] font-medium transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-transparent" />
      )}
      {!loading && iconLeft}
      <span className="leading-none">{children}</span>
      {!loading && iconRight}
    </button>
  );
}

