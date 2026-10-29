"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type ToastKind = "success" | "error";
type ToastMessage = { id: number; message: string; kind: ToastKind };
type ToastContextValue = (message: string, kind?: ToastKind) => void;

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const toast = useContext(ToastContext);
  if (!toast) throw new Error("useToast must be used inside ToastProvider");
  return toast;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const toast = useCallback((message: string, kind: ToastKind = "success") => {
    const id = Date.now() + Math.random();
    setMessages((current) => [...current, { id, message, kind }]);
    window.setTimeout(
      () => setMessages((current) => current.filter((item) => item.id !== id)),
      4000,
    );
  }, []);

  useEffect(() => {
    function showAuthToast(event: Event) {
      const detail = (event as CustomEvent<ToastMessage>).detail;
      if (detail?.message) toast(detail.message, detail.kind);
    }
    window.addEventListener("bazardor:toast", showAuthToast);
    return () => window.removeEventListener("bazardor:toast", showAuthToast);
  }, [toast]);

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="toast-viewport" aria-live="polite" data-rht-toaster>
        {messages.map((item) => (
          <div
            className={`toast-message toast-${item.kind}`}
            key={item.id}
            role={item.kind === "error" ? "alert" : "status"}
          >
            <span aria-hidden="true">{item.kind === "success" ? "✓" : "!"}</span>
            {item.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function notify(message: string, kind: ToastKind = "success") {
  window.dispatchEvent(
    new CustomEvent("bazardor:toast", { detail: { message, kind } }),
  );
}
