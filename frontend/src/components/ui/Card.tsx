import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  muted?: boolean;
};

export function Card({ className, muted, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200 bg-white/90 shadow-[0_10px_40px_rgba(15,23,42,0.06)] backdrop-blur",
        muted && "bg-slate-50 border-slate-200/70 shadow-none",
        className,
      )}
      {...props}
    />
  );
}

