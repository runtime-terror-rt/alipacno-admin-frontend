"use client";

import { useState } from "react";
import {
  Download,
  FileSpreadsheet,
  TrendingUp,
  TrendingDown,
  Store,
  ShoppingCart,
  Truck,
  CloudUpload,
} from "lucide-react";
import PageHeader from "@/components/admin/ui/PageHeader";
import MetricCardsRow from "@/components/admin/common/MetricCardsRow";
import WeekBarChart from "@/components/admin/ui/WeekBarChart";
import HourlySalesChart from "@/components/admin/ui/HourlySalesChart";
import TargetTrackingCard from "@/components/admin/earnings/TargetTrackingCard";
import ChannelCard from "@/components/admin/earnings/ChannelCard";


type DateTab = "Today" | "Yesterday" | "Weekly" | "Monthly" | "Yearly" | "Custom Range";

function FiltersBar() {
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

interface MetricCardProps {
  label: string;
  value: string;
  change: string;
  positive: boolean;
  note?: string;
}

const metricCards: MetricCardProps[] = [
  { label: "Total Revenue", value: "£12,450", change: "+12.5%", positive: true },
  { label: "Net Profit %", value: "24.2%", change: "+2.1%", positive: true },
  { label: "Net Profit %", value: "24.2%", change: "+2.1%", positive: true },
  { label: "Delivery Fee %", value: "14.8%", change: "-0.8%", positive: false },
  { label: "Cost %", value: "32.4%", change: "+5.4%", positive: false, note: "Labor + COGS" },
];

export interface ChannelCardProps {
  title: string;
  value: string;
  change: string;
  positive: boolean;
  meta: string;
  metaLabel: string;
  icon: React.ReactNode;
}

export const channelCards: ChannelCardProps[] = [
  {
    title: "Shop Revenue",
    value: "£6,240",
    change: "+12.5% Orders",
    positive: true,
    meta: "20",
    metaLabel: "Shops",
    icon: <Store size={18} className="text-[#f9671a]" />,
  },
  {
    title: "Online Revenue",
    value: "£6,240",
    change: "+12.5%",
    positive: true,
    meta: "32",
    metaLabel: "Orders",
    icon: <ShoppingCart size={18} className="text-[#f9671a]" />,
  },
  {
    title: "Delivered Revenue",
    value: "£6,240",
    change: "+12.5%",
    positive: true,
    meta: "38",
    metaLabel: "delivery",
    icon: <Truck size={18} className="text-[#f9671a]" />,
  },
];

const alerts = [
  { text: "Delivery sales are below weekly target", type: "down" },
  { text: "Shop revenue increased 18% this week", type: "up" },
  { text: "Sales dropped 12% compared to yesterday", type: "down" },
];


// ─────────────────────────────────────────────────────────
// Main Earnings Page
// ─────────────────────────────────────────────────────────

export default function EarningsPage() {
  return (
    <main className="flex flex-col gap-6  min-h-screen p-4 text-white">
      {/* bg-[#0f0f11] */}
      {/* Header */}
      <PageHeader title="Earnings Analytics" subtitle="Track revenue, sales, and profit in real time." />
      {/* Filters */}
      <FiltersBar />

     <MetricCardsRow metricCards={metricCards} grid="5" />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_280px] gap-4">
        {/* Bar Chart */}
        <div className="bg-[#1a1a1c] border border-[#2e2e30] rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-white mb-4">Current vs Previous Week Sales</h2>
          <WeekBarChart />
        </div>

        {/* Line Chart */}
        <div className="bg-[#1a1a1c] border border-[#2e2e30] rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-white mb-4">Today's hourly sales</h2>
          <HourlySalesChart />
        </div>

        {/* Target Tracking */}
        <TargetTrackingCard />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {channelCards.map((card, i) => (
          <ChannelCard key={i} {...card} />
        ))}
         <div className="bg-[#1a1a1c] border border-[#2e2e30] rounded-2xl p-5 flex flex-col gap-4">
      <h3 className="text-white text-base font-semibold">Sales Alerts & Insights</h3>
      <div className="flex flex-col gap-3">
        {alerts.map((alert, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
              alert.type === "up" ? "bg-green-500/15" : "bg-red-500/15"
            }`}>
              {alert.type === "up" ? (
                <TrendingUp size={10} className="text-green-400" />
              ) : (
                <TrendingDown size={10} className="text-red-400" />
              )}
            </div>
            <p className="text-sm text-zinc-300 leading-snug">{alert.text}</p>
          </div>
        ))}
      </div>
    </div>
      </div>
    </main>
  );
}