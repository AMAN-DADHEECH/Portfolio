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
        className={`flex items-center gap-3 px-5 py-3.5 border backdrop-blur-xl shadow-2xl cyber-cut-sm font-mono ${
          isSuccess
            ? "bg-[#040814]/95 border-[#00ff66] text-[#00ff66] shadow-[0_0_25px_rgba(0,255,102,0.3)]"
            : "bg-[#040814]/95 border-[#ff0055] text-[#ff0055] shadow-[0_0_25px_rgba(255,0,85,0.3)]"
        }`}
      >
        {isSuccess ? (
          <CheckCircle2 className="w-5 h-5 text-[#00ff66] shrink-0" />
        ) : (
          <AlertCircle className="w-5 h-5 text-[#ff0055] shrink-0" />
        )}
        <span className="text-xs sm:text-sm font-bold text-white tracking-wide">{message}</span>
        <button
          onClick={onClose}
          className="ml-2 text-slate-400 hover:text-white p-1 transition-colors cursor-pointer"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
