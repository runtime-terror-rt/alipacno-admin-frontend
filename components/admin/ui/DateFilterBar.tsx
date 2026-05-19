"use client";

import { useState } from "react";

export type TabType =string;
  ;

type DateFiltersBarProps = {
  tabs?: TabType[];
  defaultTab?: TabType;
  onChange?: (tab: TabType) => void;
};

export default function DateFiltersBar({
  tabs = ["Today", "Yesterday", "Weekly", "Monthly", "Yearly", "Custom Range"],
  defaultTab = "Today",
  onChange,
}: DateFiltersBarProps) {
  const [active, setActive] = useState<TabType>(defaultTab);

  const handleClick = (tab: TabType) => {
    setActive(tab);
    onChange?.(tab);
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      {/* Tabs */}
      <div className="flex items-center bg-[#1a1a1c] border border-[#2e2e30] rounded-md  min-w-fit overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => handleClick(tab)}
            className={`px-3 py-2 cursor-pointer border-r border-[#2e2e30] text-sm font-medium transition-all whitespace-nowrap ${
              active === tab
                ? "text-[#f9671a]"
                : "text-[#626262] hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}