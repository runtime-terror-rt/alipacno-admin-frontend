"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CloudUpload } from "lucide-react";
import DateFiltersBar from "@/components/admin/ui/DateFilterBar";
import FilterDropdown from "@/components/admin/ui/FilterDropdown";
import Pagination from "@/components/admin/ui/Pagination";
import CallLogsTable from "./CallLogsTable";

export type CallStatus = "Answered" | "Missed";
export type CallOutcome = "Missed Call" | "No Order" | string;

export interface CallLog {
  time: string;
  number: string;
  customer: string;
  duration: string;
  status: CallStatus;
  outcome: CallOutcome;
  linkedOrder: string;
  postcode: string;
}

const CALL_LOGS: CallLog[] = [
  { time: "08:42 PM", number: "+44 3050 244896", customer: "Sarah Mitchell", duration: "04:12", status: "Answered", outcome: "#44569", linkedOrder: "#UK1042 (£300)", postcode: "NW1 6XE" },
  { time: "08:42 PM", number: "+44 3050 244896", customer: "Sarah Mitchell", duration: "04:12", status: "Missed",   outcome: "Missed Call", linkedOrder: "#4569 (£300)", postcode: "NW1 6XE" },
  { time: "08:42 PM", number: "+44 3050 244896", customer: "Sarah Mitchell", duration: "04:12", status: "Answered", outcome: "#44569", linkedOrder: "#4569 (£300)", postcode: "NW1 6XE" },
  { time: "08:42 PM", number: "+44 3050 244896", customer: "Sarah Mitchell", duration: "04:12", status: "Missed",   outcome: "Missed Call", linkedOrder: "#4569 (£300)", postcode: "NW1 6XE" },
  { time: "08:42 PM", number: "+44 3050 244896", customer: "Sarah Mitchell", duration: "04:12", status: "Answered", outcome: "No Order",  linkedOrder: "#4568 (£300)", postcode: "NW1 6XE" },
];

const CallLogsPanel = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div className="bg-[#1a1a1c] border border-[#2e2e30] rounded-2xl p-5 space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h2 className="text-sm font-semibold text-white">Call Logs Panel</h2>
          <p className="text-xs text-zinc-500">Track and monitor all order-related calls in real time.</p>
        </div>
      </div>

      {/* Filter row */}
      <div className="ml-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <DateFiltersBar
            tabs={["All", "On Delivery", "Available", "Break", "Offline"]}
            defaultTab={activeTab}
            onChange={(tab) => {
              setActiveTab(tab);
              console.log("Selected status group filter:", tab);
            }}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <FilterDropdown label="Driver Status" />
          <FilterDropdown label="Branch" />
          <FilterDropdown label="Vehicle Type" />
          <FilterDropdown label="Shift" />
        </div>

        {/* Export Row */}
        <div className="flex items-center gap-3 mb-4 bg-[#1a1a1c]">
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#2e2e30] hover:border-[#f9671a] text-[#626262] hover:text-[#f9671a] text-sm font-medium hover:bg-[#f9671a]/10 transition-colors cursor-pointer">
              <CloudUpload size={15} /> Export CSV
            </button>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <CallLogsTable 
        logs={CALL_LOGS} 
        onViewOrder={(id) => router.push(`/admin/call-logs/${id}`)}
        // onCallBack={(num) => router.push(`tel:${num}`)}
        onCallBack={(num) => router.push('/admin/chat')}
      />

      <Pagination />
    </div>
  );
};

export default CallLogsPanel;