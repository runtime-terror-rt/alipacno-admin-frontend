"use client";

import { Bike, Clock, AlertTriangle, Users, Zap,
} from "lucide-react";
import PageHeader from "@/components/admin/ui/PageHeader";
import MetricCardsRow from "@/components/admin/common/MetricCardsRow";
import Button from "@/components/admin/ui/Button";
import DriverOperationsPanel from "@/components/admin/drivers/DriverOperationsPanel";
import DeliveriesBarChart from "@/components/admin/ui/DeliveriesBarChart";
import Image from "next/image";
import DriversBottomStats from "@/components/admin/drivers/DriversBottomStats";
import RecentDriverActivity from "@/components/admin/drivers/RecentDriverActivity";

interface RecentActivity {
  time: string;
  driver: string;
  orderId: string;
  branch: string;
  status: "On Delivery" | "Available" | "Break";
  driverColor: string;
  image: string;
}

const RECENT_ACTIVITY: RecentActivity[] = [
  { image : "/admin/avatar/default.png", time: "09:43 AM", driver: "Brooklyn Simmons", orderId: "4FD-9921", branch: "Eltham (ELO1)", status: "On Delivery", driverColor: "bg-orange-500" },
  { image : "/admin/avatar/default.png", time: "09:43 AM", driver: "Ayesha Doram", orderId: "4FD-9921", branch: "Eltham (ELO1)", status: "On Delivery", driverColor: "bg-purple-500" },
  { image : "/admin/avatar/default.png", time: "09:43 AM", driver: "Brooklyn Simmons", orderId: "4FD-9921", branch: "Eltham (ELO1)", status: "Available", driverColor: "bg-blue-500" },
  { image : "/admin/avatar/default.png", time: "09:43 AM", driver: "Brooklyn Simmons", orderId: "4FD-9921", branch: "Eltham (ELO1)", status: "On Delivery", driverColor: "bg-green-500" },
  { image : "/admin/avatar/default.png", time: "09:43 AM", driver: "Brooklyn Simmons", orderId: "4FD-9921", branch: "Eltham (ELO1)", status: "Available", driverColor: "bg-orange-500" },
];


function ActivityStatusBadge({ status }: { status: "On Delivery" | "Available" | "Break" }) {
  const map = {
    "On Delivery": "bg-blue-500/15 text-blue-400 border-blue-500/30",
    Available: "bg-green-500/15 text-green-400 border-green-500/30",
    Break: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${map[status]}`}>
      {status}
    </span>
  );
}


// ── Live Driver Map ────────────────────────────────────────────────────────
function LiveDriverMap() {
  const driverDots = [
    { x: 80, y: 90, color: "#22c55e", status: "available" },
    { x: 200, y: 70, color: "#22c55e", status: "available" },
    { x: 330, y: 50, color: "#22c55e", status: "available" },
    { x: 440, y: 80, color: "#22c55e", status: "available" },
    { x: 120, y: 160, color: "#f9671a", status: "delivery" },
    { x: 260, y: 140, color: "#f9671a", status: "delivery" },
    { x: 380, y: 130, color: "#f9671a", status: "delivery" },
    { x: 50, y: 230, color: "#f9671a", status: "delivery" },
    { x: 160, y: 240, color: "#f9671a", status: "delivery" },
    { x: 310, y: 250, color: "#ffffff", status: "offline" },
    { x: 420, y: 220, color: "#f9671a", status: "delivery" },
  ];

  return (
    <div className="relative bg-[#0d0d0f] rounded-2xl overflow-hidden border border-[#2e2e30]" style={{ minHeight: 280 }}>
      <svg viewBox="0 0 520 280" className="w-full" style={{ minHeight: 280 }}>
        <rect width="520" height="280" fill="#0d0d0f" />

        {/* Road grid */}
        {[80,160,240,320,400,480].map(x => (
          <line key={`v${x}`} x1={x} y1={0} x2={x} y2={280} stroke="#1a1a1c" strokeWidth="1" />
        ))}
        {[60,120,180,240].map(y => (
          <line key={`h${y}`} x1={0} y1={y} x2={520} y2={y} stroke="#1a1a1c" strokeWidth="1" />
        ))}

        {/* Main roads */}
        <line x1="0" y1="140" x2="520" y2="140" stroke="#222225" strokeWidth="5" />
        <line x1="0" y1="90" x2="520" y2="90" stroke="#1e1e22" strokeWidth="4" />
        <line x1="130" y1="0" x2="130" y2="280" stroke="#222225" strokeWidth="5" />
        <line x1="370" y1="0" x2="370" y2="280" stroke="#1e1e22" strokeWidth="4" />

        {/* Diagonal routes with orange glow */}
        <defs>
          <filter id="routeGlow">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <polyline points="50,60 130,90 220,140 310,160 440,120 520,80"
          fill="none" stroke="#f9671a" strokeWidth="2" strokeDasharray="8 4" filter="url(#routeGlow)" opacity="0.9" />

        {/* Area labels */}
        <text x="80" y="50" fill="#2a2a2e" fontSize="10" fontFamily="monospace" letterSpacing="2">ELTHAM</text>
        <text x="380" y="45" fill="#2a2a2e" fontSize="10" fontFamily="monospace" letterSpacing="2">ROMFORD</text>
        <text x="60" y="265" fill="#2a2a2e" fontSize="10" fontFamily="monospace" letterSpacing="2">ROPINGTON</text>

        {/* Center shop icon */}
        <rect x="200" y="155" width="22" height="22" rx="5" fill="#f9671a" opacity="0.2" />
        <rect x="203" y="158" width="16" height="16" rx="3" fill="#f9671a" opacity="0.6" />

        {/* Driver dots */}
        {driverDots.map((d, i) => (
          <g key={i}>
            <circle cx={d.x} cy={d.y} r="9" fill={d.color} opacity="0.15" />
            <circle cx={d.x} cy={d.y} r="5" fill={d.color} stroke="#0d0d0f" strokeWidth="1.5" />
          </g>
        ))}

        {/* Map zoom controls */}
        <rect x="490" y="100" width="22" height="22" rx="4" fill="#1a1a1c" stroke="#2e2e30" strokeWidth="1" />
        <text x="501" y="115" textAnchor="middle" fill="white" fontSize="14">+</text>
        <rect x="490" y="128" width="22" height="22" rx="4" fill="#1a1a1c" stroke="#2e2e30" strokeWidth="1" />
        <text x="501" y="143" textAnchor="middle" fill="white" fontSize="14">−</text>
      </svg>

      {/* Status legend */}
      <div className="absolute top-3 left-3 flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-xs text-zinc-300">Available (48)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#f9671a]" />
          <span className="text-xs text-zinc-300">On Delivery (56)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-white" />
          <span className="text-xs text-zinc-300">Offline (24)</span>
        </div>
      </div>
    </div>
  );
}

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
  return (
    <div className="flex-1 bg-[#0f0f11] min-h-screen text-white p-5 space-y-5">

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
          <Button className="w-fit px-6">
            View All Insights
          </Button>
        </div>
        <LiveDriverMap />

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