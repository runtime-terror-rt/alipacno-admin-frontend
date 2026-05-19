"use client";

import MetricCardsRow from "@/components/admin/common/MetricCardsRow";
import BranchPerformanceTable from "@/components/admin/dashboard/BranchPerformanceTable";
import ChartsRow from "@/components/admin/dashboard/ChartsRow";
import RightSidebarWidgets from "@/components/admin/dashboard/RightSidebarWidgets";
import { IMetricCard } from "@/components/admin/ui/MetricCard";
import PageHeader from "@/components/admin/ui/PageHeader";
import {
  ChevronRight,
  Zap,
} from "lucide-react";


const metricCards: IMetricCard[] = [
  { label: "TOTAL REVENUE", value: "£18,502.40", change: "+12.4%", positive: true },
  { label: "TOTAL ORDERS", value: "622", change: "+8.7%", positive: true },
  { label: "AVG ORDER VALUE", value: "£29.78", change: "-2.1%", positive: false },
  { label: "Delivery Success", value: "104%", change: "+4.0%", positive: true },
];


// ─────────────────────────────────────────────
// Best branch banner
// ─────────────────────────────────────────────

function BestBranchBanner() {
  return (
    <div className="bg-[#26262680] border border-[#343436] rounded-xl px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-sm bg-primary border border-[#f9671a]/30 flex items-center justify-center text-[#f9671a]">
          <Zap size={20}  className="text-white fill-white"/>
        </div>
        <div>
          <p className="text-[#626262] text-xl text-primary font-bold tracking-widest uppercase">
            Best Branch Today
          </p>
          <p className="text-[#626262] font-semibold text-sm">
            Eltham (EL01) — £1,320 revenue — 12.5% above target!
          </p>
        </div>
      </div>
      <ChevronRight size={20} className="text-[#626262]" />
    </div>
  );
}

// ─────────────────────────────────────────────
// Lower grid
// ─────────────────────────────────────────────

function LowerGrid() {
  return (
    <div className="grid grid-cols-1 2xl:grid-cols-[1fr_260px] gap-6 min-w-0">
      {/* Main Content */}
      <div className="min-w-0 flex flex-col gap-6">
        <ChartsRow />

        <BranchPerformanceTable />
      </div>

      {/* Sidebar */}
      <div className="min-w-0">
        <RightSidebarWidgets />
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <main className="p-4 flex flex-col gap-8 min-w-0 overflow-x-hidden">
        {/* Page title */}
        <PageHeader title="HQ Overview" subtitle="All branches · Real-time performance" />
        {/* Metric cards row */}
        <MetricCardsRow metricCards={metricCards} />
        {/* Best branch banner */}
        <BestBranchBanner />
        {/* Lower grid: charts + table + sidebar widgets */}
        <LowerGrid />
      </main>
  );
}