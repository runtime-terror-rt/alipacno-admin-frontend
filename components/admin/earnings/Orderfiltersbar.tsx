"use client";

import { useState } from "react";
import { ChevronDown, Search, Download, FileSpreadsheet } from "lucide-react";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

type DateTab = "Today" | "Weekly" | "Monthly" | "Custom Range";

interface OrderFiltersBarProps {
  onDateChange?: (tab: DateTab) => void;
  onSearch?: (query: string) => void;
  onExportCSV?: () => void;
  onExportExcel?: () => void;
}

// ─────────────────────────────────────────────
// OrderFiltersBar
// ─────────────────────────────────────────────

export default function OrderFiltersBar({
  onDateChange,
  onSearch,
  onExportCSV,
  onExportExcel,
}: OrderFiltersBarProps) {
  const [activeTab, setActiveTab] = useState<DateTab>("Today");
  const [search, setSearch] = useState("");

  const dateTabs: DateTab[] = ["Today", "Weekly", "Monthly", "Custom Range"];

  function handleTabClick(tab: DateTab) {
    setActiveTab(tab);
    onDateChange?.(tab);
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Row 1: date tabs + dropdown filters */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Date tabs */}
        <DateTabs tabs={dateTabs} active={activeTab} onSelect={handleTabClick} />

        {/* Divider */}
        <div className="w-px h-6 bg-[#3d3d3d] mx-1" />

        {/* Dropdown filters */}
        <FilterDropdown label="Order Status" />
        <FilterDropdown label="Order Type" />
        <FilterDropdown label="Branch" />
        <FilterDropdown label="Payment Method" />
      </div>

      {/* Row 2: search + export buttons */}
      <div className="flex items-center justify-between gap-3">
        {/* Search input */}
        <div className="flex items-center gap-3 bg-[#252525] border border-[#343436] rounded-xl px-4 py-3 w-[450px]">
          <Search size={18} className="text-[#626262] shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              onSearch?.(e.target.value);
            }}
            placeholder="Search order Id, customer, phone..."
            className="bg-transparent text-[14px] text-white placeholder-[#626262] outline-none w-full"
          />
        </div>

        {/* Export buttons */}
        <div className="flex items-center gap-3">
          <ExportButton
            label="Export CSV"
            icon={<Download size={16} />}
            onClick={onExportCSV}
            primary
          />
          <ExportButton
            label="Export Excel"
            icon={<FileSpreadsheet size={16} />}
            onClick={onExportExcel}
          />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Date tab group
// ─────────────────────────────────────────────

function DateTabs({
  tabs,
  active,
  onSelect,
}: {
  tabs: DateTab[];
  active: DateTab;
  onSelect: (t: DateTab) => void;
}) {
  return (
    <div className="flex items-center bg-[#252525] border border-[#343436] rounded-xl overflow-hidden">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onSelect(tab)}
          className={`px-4 py-2.5 text-[14px] font-medium transition-colors whitespace-nowrap ${
            active === tab
              ? "bg-[#f9671a]/10 text-[#f9671a] border border-[#f9671a] rounded-xl"
              : "text-[#626262] hover:text-white"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// Dropdown filter button
// ─────────────────────────────────────────────

function FilterDropdown({ label }: { label: string }) {
  return (
    <button className="flex items-center gap-2 bg-[#252525] border border-[#343436] rounded-xl px-4 py-2.5 text-[14px] text-[#626262] hover:text-white transition-colors whitespace-nowrap">
      {label}
      <ChevronDown size={16} />
    </button>
  );
}

// ─────────────────────────────────────────────
// Export button
// ─────────────────────────────────────────────

function ExportButton({
  label,
  icon,
  onClick,
  primary = false,
}: {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  primary?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-3 rounded-xl text-[14px] font-medium transition-colors ${
        primary
          ? "border border-[#f9671a] text-[#f9671a] hover:bg-[#f9671a]/10"
          : "border border-[#343436] text-[#626262] hover:text-white"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}