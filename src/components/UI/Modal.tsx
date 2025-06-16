"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "full";
  variant?: "default" | "danger" | "ghost";
  className?: string;
  showCloseButton?: boolean;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-2xl",
  full: "w-full h-full m-0 rounded-none",
};

const variantClasses = {
  default: "bg-background text-primary-foreground",
  danger: "bg-red-50 text-red-900",
  ghost: "bg-transparent shadow-none",
};

const Modal = ({
  open,
  onClose,
  children,
  size = "md",
  variant = "default",
  className,
  showCloseButton = true,
  header,
  footer,
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement;

    if (open && modalRef.current) {
      modalRef.current.focus();
    }

    return () => {
      previouslyFocused?.focus();
    };
  }, [open]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (open) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        role="dialog"
        className={` w-full mx-4 rounded-md p-6 shadow-lg transition-all duration-300 animate-slide-up focus:outline-none ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {header && (
          <div
            className={`flex mb-4 flex-row ${
              size === "full" ? "justify-end" : "justify-between"
            }  items-center`}
          >
            <div
              className={`text-lg font-semibold w-full ${
                size === "full" ? "text-center  pl-[21px] " : "text-left"
              }text-center`}
            >
              {header}
            </div>
            {showCloseButton && (
              <button
                onClick={onClose}
                className={`${
                  variant === "danger"
                    ? "bg-red-400 hover:bg-red-500"
                    : "bg-secondary hover:bg-primary"
                } px-[6px] pt-0.5 text-center   rounded-full  text-background  text-sm `}
              >
                X
              </button>
            )}
          </div>
        )}

        <div className="mb-4">{children}</div>

        {footer && <div className="pt-2 border-t">{footer}</div>}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
