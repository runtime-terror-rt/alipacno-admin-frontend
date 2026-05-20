import React, { useEffect } from "react";
import { X, Zap } from "lucide-react";

interface ToastNotificationProps {
  message: string;
  onClose: () => void;
}

export default function ToastNotification({ message, onClose }: ToastNotificationProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  return (
    <div className="flex items-start gap-3 bg-[#1c1c1e] border border-[#f9671a]/30 rounded-xl p-4 shadow-2xl min-w-[280px] max-w-[340px] animate-in slide-in-from-top-4 fade-in duration-200 fixed top-5 right-5 z-50 select-none">
      <div className="w-7 h-7 rounded-full bg-[#f9671a]/10 border border-[#f9671a]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
        <Zap size={13} className="text-[#f9671a]" />
      </div>
      
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold text-[#f9671a] tracking-wide">Selection Updated</p>
        <p className="text-[11px] text-zinc-300 mt-1 leading-normal font-medium">
          {message}
        </p>
      </div>

      <button 
        onClick={onClose} 
        className="text-zinc-500 hover:text-zinc-200 transition-colors flex-shrink-0 p-0.5"
      >
        <X size={13} />
      </button>
    </div>
  );
}