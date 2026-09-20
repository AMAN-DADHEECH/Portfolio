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
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-xl shadow-2xl ${
          isSuccess
            ? "bg-slate-900/95 border-emerald-500/40 text-emerald-300 shadow-emerald-500/10"
            : "bg-slate-900/95 border-rose-500/40 text-rose-300 shadow-rose-500/10"
        }`}
      >
        {isSuccess ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
        ) : (
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
        )}
        <span className="text-sm font-medium text-slate-100">{message}</span>
        <button
          onClick={onClose}
          className="ml-2 text-slate-400 hover:text-white p-1 transition-colors"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
