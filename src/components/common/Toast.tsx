"use client";

import React, { useEffect } from "react";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

interface ToastProps {
  message: string;
  type?: "success" | "error";
  isOpen: boolean;
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = "success",
  isOpen,
  onClose,
  duration = 3500,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  const isSuccess = type === "success";

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed z-50 bottom-4 inset-x-4 sm:inset-x-auto sm:bottom-6 sm:right-6 animate-fade-up"
    >
      <div className="glass flex items-center gap-3 rounded-2xl bg-canvas-2/90 px-4 py-3 sm:min-w-[280px]">
        <span
          className={`grid place-items-center h-8 w-8 rounded-full shrink-0 ${
            isSuccess ? "bg-mint/15 text-mint" : "bg-rose/15 text-rose"
          }`}
        >
          {isSuccess ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
        </span>
        <span className="flex-1 text-sm font-medium text-ink">{message}</span>
        <button
          onClick={onClose}
          className="text-ink-dim hover:text-ink p-1 rounded-full transition-colors cursor-pointer"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
