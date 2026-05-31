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
import EarningFiltersBar from "@/components/admin/earnings/EarningFiltersBar";

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
  { label: "Average Profit %", value: "24.2%", change: "+2.1%", positive: true },
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
      <EarningFiltersBar />

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
            <div className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 `}>
              {alert.type === "up" ? (
                <TrendingUp size={16} className="text-green-400" />
              ) : (
                <TrendingDown size={16} className="text-red-400" />
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