"use client";

import MetricCardsRow from "@/components/admin/common/MetricCardsRow";
import BestBranchBanner from "@/components/admin/dashboard/BestBranchBanner";
import BranchPerformanceTable from "@/components/admin/dashboard/BranchPerformanceTable";
import ChartsRow from "@/components/admin/dashboard/ChartsRow";
import RightSidebarWidgets from "@/components/admin/dashboard/RightSidebarWidgets";
import { IMetricCard } from "@/components/admin/ui/MetricCard";
import PageHeader from "@/components/admin/ui/PageHeader";

const metricCards: IMetricCard[] = [
  {
    label: "TOTAL REVENUE",
    value: "£18,502.40",
    change: "+12.4%",
    positive: true,
  },
  { label: "TOTAL ORDERS", value: "622", change: "+8.7%", positive: true },
  { label: "Net Profit", value: "£29.78", change: "-2.1%", positive: false },
  { label: "Delivery Success", value: "104%", change: "+4.0%", positive: true },
];

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
      <PageHeader
        title="HQ Overview"
        subtitle="All branches · Real-time performance"
      />
      {/* Metric cards row */}
      <MetricCardsRow metricCards={metricCards} />
      {/* Best branch banner */}
      <BestBranchBanner />
      {/* Lower grid: charts + table + sidebar widgets */}
      <LowerGrid />
    </main>
  );
}
