"use client";

import {
  Bike, Clock, AlertTriangle, Users, Zap,
} from "lucide-react";
import PageHeader from "@/components/admin/ui/PageHeader";
import MetricCardsRow from "@/components/admin/common/MetricCardsRow";
import Button from "@/components/admin/ui/Button";
import DriverOperationsPanel from "@/components/admin/drivers/DriverOperationsPanel";
import DeliveriesBarChart from "@/components/admin/ui/DeliveriesBarChart";
import DriversBottomStats from "@/components/admin/drivers/DriversBottomStats";
import RecentDriverActivity from "@/components/admin/drivers/RecentDriverActivity";
import DeliveryGoogleMap from "@/components/admin/deliveries/DeliveryGoogleMap";
import { useRouter } from "next/navigation";

// ── Mini Sparkline ─────────────────────────────────────────────────────────
function Sparkline({ color = "#f9671a", up = true }: { color?: string; up?: boolean }) {
  const pts = up
    ? "0,30 20,25 40,20 60,15 80,18 100,8"
    : "0,10 20,15 40,20 60,18 80,22 100,28";
  return (
    <svg viewBox="0 0 100 35" className="w-16 h-6">
      <polyline fill="none" stroke={color} strokeWidth="2.5" points={pts} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Insight Tile ───────────────────────────────────────────────────────────
function InsightTile({ icon, label, sub, value, change, positive }: {
  icon: React.ReactNode; label: string; sub: string; value?: string; change: string; positive: boolean;
}) {
  return (
    <div className="bg-[#1a1a1c] border border-[#2e2e30] rounded-xl p-3 flex items-center gap-3">
      <div className="w-8 h-8 rounded-xl bg-[#f9671a]/10 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-white">{label}</p>
        <p className="text-[10px] text-zinc-500 truncate">{sub}</p>
      </div>
      <div className="text-right flex-shrink-0">
        <Sparkline up={positive} color={positive ? "#22c55e" : "#ef4444"} />
        <span className={`text-[10px] font-semibold ${positive ? "text-green-400" : "text-red-400"}`}>{change}</span>
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function DriversManagementPage() {
  const router = useRouter()
  return (
    <div className="flex-1 min-h-screen text-white p-5 space-y-5">

      <PageHeader title="Drivers Management" subtitle="Track, assign, and manage your drivers in real time." />

      <MetricCardsRow
        metricCards={
          [
            {
              label: "Active Drivers",
              value: "87",
              change: "+3.9%",
              positive: true,
            },
            {
              label: "On Delivery",
              value: "47",
              change: "+4.9%",
              positive: true,
            },
            {
              label: "Available Drivers",
              value: "24",
              change: "+3.9%",
              positive: true,
            },
            {
              label: "Offline Drivers",
              value: "24",
              change: "+2.9%",
              positive: false,
            },
          ]
        }
      />

      {/* Live Driver Activity */}
      <div className="bg-[#1a1a1c] border border-[#2e2e30] rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white">Live Driver Activity</h2>
          <Button onClick={() => router.push('/admin/ai-insights')} className="w-fit px-6">
            View All Insights
          </Button>
        </div>
        <DeliveryGoogleMap />

        {/* 4 Insight Tiles */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <InsightTile icon={<Bike size={14} className="text-[#f9671a]" />} label="Peak Delivery Zone" sub="Eltham High St" change="+6.1% yesterday" positive />
          <InsightTile icon={<Clock size={14} className="text-[#f9671a]" />} label="Average Delivery Time" sub="28.6 Mins • On Delivery, On 2046" change="+6.5% yesterday" positive />
          <InsightTile icon={<Zap size={14} className="text-green-400" />} label="Driver Efficiency" sub="On Delivery, On 2046" value="87" change="+8.7% yesterday" positive />
          <InsightTile icon={<AlertTriangle size={14} className="text-red-400" />} label="Delayed Deliveries" sub="8.7 vs yesterday" change="+8.7 vs yesterday" positive={false} />
        </div>
      </div>

      {/* Driver Operations Panel */}
      <DriverOperationsPanel />

      {/* Driver Performance Analytics */}
      <div>
        <h2 className="text-sm font-semibold text-white">Driver Performance Analytics</h2>
        <p className="text-xs text-zinc-500">Track driver activity and performance.</p>
      </div>


      <div className=" ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
          {/* Bar chart */}
          <div className="border border-[#2e2e30] bg-[#1a1a1c] rounded-2xl p-5 space-y-4">
            <p className="text-xs font-semibold text-white mb-3">Deliveries Per Driver (Today)</p>
            <DeliveriesBarChart />
          </div>

          {/* Recent Activity */}
          <RecentDriverActivity />
        </div>

        {/* Bottom stats row */}
        <DriversBottomStats />
      </div>
    </div>
  );
}