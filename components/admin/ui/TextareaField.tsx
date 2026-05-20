import React from "react";

interface TextareaFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}

export default function TextareaField({ 
  label, 
  placeholder, 
  value, 
  onChange, 
  rows = 4 
}: TextareaFieldProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-xs font-bold text-zinc-400 tracking-wide">{label}</label>
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full bg-[#1c1c1e] border border-[#2e2e30] rounded-xl px-4 py-3 text-xs font-semibold text-zinc-100 placeholder-zinc-600 outline-none focus:border-[#f9671a]/50 transition-all resize-none leading-relaxed"
      />
    </div>
  );
}