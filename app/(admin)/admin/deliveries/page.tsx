"use client";

import { ChevronDown,Clock,Handbag,Plus, Van,
} from "lucide-react";
import MetricCardsRow from "@/components/admin/common/MetricCardsRow";
import Image from "next/image";
import { IMetricCard } from "@/components/admin/ui/MetricCard";
import DeliveryGoogleMap from "@/components/admin/deliveries/DeliveryGoogleMap";
import LiveOrdersSidebar from "@/components/admin/deliveries/LiveOrdersSidebar";

const STATISTICS : IMetricCard[] = [
        {
          icon:<Van size={18} /> ,label: "ACTIVE DELIVERIES", value: "12a",  change: "+12.4%", positive: true,
        },
        {
          icon:<Clock size={18} /> ,label: "LATE ORDER", value: "12a", change: "+0.8%",  positive: false,
        },
        {
          icon:<Clock size={18} /> ,label: "AVG DELIVERY TIME",
          value: "3 mins",
          change: "+1% of time",
          positive: true,
        },
        {
          icon:<Handbag size={18} />,
          label: "DELIVERY TODAY",
          value: "3",
          change: "+1% of time",
          positive: true,
        },
        {
          icon:<Handbag size={18} /> ,label: "AVG DELIVERY DISTANCE",
          value: "3 miles",
          change: "+1% vs period",
          positive: true,
        }
  ];
interface DriverSummary {
  name: string;
  deliveries: number;
  avatar: string;
  color: string;
}

const DRIVERS: DriverSummary[] = [
  { name: "Ahmed Khan", deliveries: 4, avatar: "A", color: "bg-orange-500" },
  { name: "Mo", deliveries: 3, avatar: "M", color: "bg-purple-500" },
  { name: "Ali", deliveries: 6, avatar: "L", color: "bg-blue-500" },
  { name: "Nile", deliveries: 2, avatar: "N", color: "bg-green-500" },
];

// ── Main Page ──────────────────────────────────────────────────────────────
export default function DeliveriesManagementPage() {
  return (
    <div className="flex-1  min-h-screen text-white p-5 space-y-5">
      {/* Header */}
      <div className="flex items-center gap-2">
        <ChevronDown size={14} className="rotate-90 text-[#f9671a]" />
        <div>
          <h1 className="text-lg font-bold">Deliveries Management</h1>
          <p className="text-xs text-zinc-500">Track and manage your deliveries in real time.</p>
        </div>
      </div>

      <MetricCardsRow grid="5" metricCards={STATISTICS} />
      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-5">
        {/* Map + tabs */}
        <DeliveryGoogleMap />

        {/* Live Orders Sidebar */}
        <LiveOrdersSidebar />
      </div>

      {/* Driver Summary */}
      <div className="bg-[#1a1a1c] border border-[#2e2e30] rounded-2xl p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-white uppercase tracking-wide">Driver Summary</span>
            <button className="text-xs text-[#f9671a] hover:underline">View All Drivers →</button>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#3B2012] text-[#F9671A] hover:text-white hover:text-white cursor-pointer text-xs font-medium hover:bg-[#e05a15] transition-colors">
              <Plus size={20} className=" fill-[#3B2012] transition-colors" /> 
          Add Customer
          </button>
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          {DRIVERS.map((d, i) => (
            <div key={i} className="flex items-center gap-2.5 bg-[#252527] rounded-xl px-3 py-2.5">
              <Image src={`/admin/avatar/cody.png`} alt={d.name} width={32} height={32} className="rounded-full" />
              <div>
                <p className="text-xs font-medium text-white">{d.name}</p>
                <p className="text-xs text-green-500 font-medium text-success">on Run</p>
                <p className="text-[10px] text-zinc-500">{d.deliveries} deliveries</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}