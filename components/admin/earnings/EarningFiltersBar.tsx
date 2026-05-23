import { CloudUpload } from "lucide-react";
import { useState } from "react";

type DateTab = "Today" | "Yesterday" | "Weekly" | "Monthly" | "Yearly" | "Custom Range";

export default function EarningFiltersBar() {
  const [active, setActive] = useState<DateTab>("Today");
  const tabs: DateTab[] = ["Today", "Yesterday", "Weekly", "Monthly", "Yearly", "Custom Range"];

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      {/* Date tabs */}
     <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide scrollbar-thumb-[#2e2e30] scrollbar-track-transparent">
       <div className="flex flex-wrap items-center gap-1 bg-[#1a1a1c] border border-[#2e2e30] rounded-full p-1  min-w-132">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`px-3 py-2 rounded-lg cursor-pointer text-sm font-medium transition-all whitespace-nowrap ${
              active === tab
                ? " text-[#f9671a] border-r border-[#f9671a]/60"
                : "text-[#626262] hover:text-white border-r border-[#2e2e30] hover:border-[#f9671a]/60"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
     </div>

      {/* Export buttons */}
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#2e2e30] hover:border-[#f9671a] text-[#626262] hover:text-[#f9671a] text-sm font-medium hover:bg-[#f9671a]/10 transition-colors cursor-pointer">
          <CloudUpload size={15} /> Export CSV
        </button>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#2e2e30] hover:border-[#f9671a] text-[#626262] hover:text-[#f9671a] text-sm font-medium hover:bg-[#f9671a]/10 transition-colors cursor-pointer">
          <CloudUpload  size={15} /> Export Excel
        </button>
      </div>
    </div>
  );  
}