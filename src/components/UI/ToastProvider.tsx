"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type ToastPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

interface Toast {
  id: string;
  message: string;
  type?: "success" | "error" | "info" | "warning";
  duration?: number;
  position?: ToastPosition;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
}

const iconsVariants: Record<NonNullable<Toast["type"]>, ReactNode> = {
  info: (
    <svg
      className="w-5 h-5 text-blue-500"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 16h-1v-4h-1m1-4h.01"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 20.5C6.753 20.5 2.5 16.247 2.5 11S6.753 1.5 12 1.5 21.5 5.753 21.5 11 17.247 20.5 12 20.5Z"
      />
    </svg>
  ),
  success: (
    <svg
      className="w-5 h-5 text-green-500"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  ),
  error: (
    <svg
      className="w-5 h-5 text-red-500"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  ),
  warning: (
    <svg
      className="w-5 h-5 text-yellow-500"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.29 3.86L1.82 18a1.25 1.25 0 001.08 1.88h18.2a1.25 1.25 0 001.08-1.88L13.71 3.86a1.25 1.25 0 00-2.42 0z"
      />
    </svg>
  ),
};

const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (toast: Omit<Toast, "id">) => {
    const id = crypto.randomUUID();
    const newToast: Toast = {
      ...toast,
      id,
      position: toast.position ?? "bottom-right",
    };

    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      removeToast(id);
    }, toast.duration ?? 6000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const grouped = {
    "top-left": [] as Toast[],
    "top-right": [] as Toast[],
    "bottom-left": [] as Toast[],
    "bottom-right": [] as Toast[],
  };

  toasts.forEach((toast) => {
    grouped[toast.position || "bottom-right"].push(toast);
  });

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}

      {(Object.keys(grouped) as ToastPosition[]).map((position) => (
        <div
          key={position}
          className={`fixed z-50 flex flex-col gap-2 p-4
            ${position.includes("top") ? "top-0" : "bottom-0"}
            ${
              position.includes("left")
                ? "left-0 items-start"
                : "right-0 items-end"
            }
          `}
        >
          {grouped[position].map((toast) => (
            <div
              key={toast.id}
              className={`flex items-center justify-center gap-2 rounded px-4 py-3 text-sm shadow transition-all duration-300 animate-slide-in
              ${
                toast.type === "success"
                  ? "bg-green-100 text-green-800"
                  : toast.type === "error"
                  ? "bg-red-100 text-red-800"
                  : toast.type === "warning"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-gray-100 text-gray-800"
              }
            `}
            >
              <span className="mt-0.5">
                {toast.type && iconsVariants[toast.type]}
              </span>
              <span>{toast.message}</span>
              <span
                className={`cursor-pointer px-[6px] pt-0.5 text-center    ${
                  toast.type === "success"
                    ? "bg-green-300 "
                    : toast.type === "error"
                    ? "bg-red-300 "
                    : toast.type === "warning"
                    ? "bg-yellow-300 "
                    : "bg-gray-300 "
                }   rounded-full text-center  text-white  hover:opacity-70 transition text-sm font-bold`}
                onClick={() => {
                  removeToast(toast.id);
                }}
              >
                ×
              </span>
            </div>
          ))}
        </div>
      ))}
    </ToastContext.Provider>
  );
};

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
};
