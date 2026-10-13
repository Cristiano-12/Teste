"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { CheckCircle2, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Toast = {
  id: number;
  message: string;
  type?: "success" | "info";
};

type ToastContextValue = {
  notify: (message: string, type?: Toast["type"]) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const remove = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const notify = useCallback(
    (message: string, type: Toast["type"] = "success") => {
      const id = Date.now();
      setToasts((current) => [...current, { id, message, type }]);
      window.setTimeout(() => remove(id), 3200);
    },
    [remove]
  );

  const value = useMemo(() => ({ notify }), [notify]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div aria-live="polite" className="fixed right-4 top-4 z-50 flex w-[calc(100%-32px)] max-w-sm flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="flex items-center gap-3 rounded-lg border border-app-border bg-white px-4 py-3 text-sm text-app-text shadow-drawer"
          >
            {toast.type === "success" ? (
              <CheckCircle2 className="h-4 w-4 flex-none text-app-positive" aria-hidden />
            ) : (
              <Info className="h-4 w-4 flex-none text-app-primary" aria-hidden />
            )}
            <span className="min-w-0 flex-1">{toast.message}</span>
            <button
              type="button"
              aria-label="Dismiss notification"
              className={cn("rounded-md p-1 text-app-muted transition-colors hover:bg-app-subtle hover:text-app-text")}
              onClick={() => remove(toast.id)}
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}
