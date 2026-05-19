import { ChevronDown } from "lucide-react";

export default function FilterDropdown({ label }: { label: string }) {
  return (
    <button className="flex items-center bg-[#1a1a1c] gap-2 px-3 py-2 cursor-pointer rounded-lg border border-[#2A2A2C] text-zinc-400 hover:text-white text-xs font-medium transition-colors">
      {label} <ChevronDown className="w-3 h-3" />
    </button>
  );
}