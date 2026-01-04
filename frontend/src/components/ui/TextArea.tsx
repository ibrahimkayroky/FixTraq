import { cn } from "@/lib/utils";
import type { TextareaHTMLAttributes } from "react";

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  hint?: string;
  error?: string;
};

export function TextArea({
  label,
  hint,
  error,
  className,
  ...props
}: TextAreaProps) {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-slate-800">
      {label}
      <textarea
        className={cn(
          "min-h-[110px] rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-normal text-slate-900 outline-none ring-0 transition focus:border-slate-300 focus:ring-2 focus:ring-slate-200/80",
          error && "border-red-300 ring-red-100 focus:ring-red-200",
          className,
        )}
        {...props}
      />
      {(hint || error) && (
        <span
          className={cn(
            "text-xs font-normal text-slate-500",
            error && "text-red-600",
          )}
        >
          {error || hint}
        </span>
      )}
    </label>
  );
}

