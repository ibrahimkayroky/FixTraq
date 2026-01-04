import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import type { ReactNode } from "react";

type ModalProps = {
  title: string;
  description?: string;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  widthClassName?: string;
};

export function Modal({
  title,
  description,
  open,
  onClose,
  children,
  widthClassName,
}: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/40 px-4 backdrop-blur-sm">
      <div
        className={cn(
          "relative max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-2xl bg-white p-6 shadow-2xl",
          widthClassName,
        )}
      >
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 transition hover:text-slate-600"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="mb-6 space-y-2 pr-8">
          <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
          {description && (
            <p className="text-sm text-slate-500">{description}</p>
          )}
        </div>
        <div className="space-y-4">{children}</div>
      </div>
    </div>
  );
}

