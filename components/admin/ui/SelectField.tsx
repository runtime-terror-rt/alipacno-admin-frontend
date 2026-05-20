import React from "react";
import { ChevronDown } from "lucide-react";

interface SelectFieldProps {
  label: string;
  placeholder: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export default function SelectField({
  label,
  placeholder,
  options,
  value,
  onChange,
}: SelectFieldProps) {
  return (
    <div className="flex flex-col gap-2 w-full select-none">
      <label className="text-xs font-bold text-zinc-400 tracking-wide">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full appearance-none bg-[#1c1c1e] border border-[#2e2e30] rounded-xl px-4 py-3 text-xs font-semibold outline-none focus:border-[#f9671a]/50 transition-all cursor-pointer pr-10 ${
            value ? "text-zinc-100" : "text-zinc-500"
          }`}
        >
          <option value="" disabled hidden>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option} value={option} className="bg-[#1c1c1e] text-zinc-200">
              {option}
            </option>
          ))}
        </select>
        <ChevronDown
          size={14}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none stroke-[2.5]"
        />
      </div>
    </div>
  );
}