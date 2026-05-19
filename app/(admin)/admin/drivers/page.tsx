"use client";

import { useState } from "react";
import {
  TrendingUp, TrendingDown, ChevronDown, ChevronLeft, ChevronRight,
  Plus, Download, MoreVertical, Star, Bike, Clock,
  Package, AlertTriangle, Users, Zap,
} from "lucide-react";

// ── Types & Data ───────────────────────────────────────────────────────────
type DriverStatus = "Available" | "On Delivery" | "Break" | "Offline";

interface Driver {
  id: string;
  name: string;
  phone: string;
  branch: string;
  earnings: string;
  deliveries: number;
  status: DriverStatus;
  rating: number;
  ratingChange: string;
  ratingPositive: boolean;
  vehicle: "bike" | "car" | "scooter";
}

interface RecentActivity {
  time: string;
  driver: string;
  orderId: string;
  branch: string;
  status: "On Delivery" | "Available" | "Break";
  driverColor: string;
}

const DRIVERS: Driver[] = [
  { id: "#d006 4448", name: "Brooklyn Simmons", phone: "(312) 555-0946", branch: "Eltham", earnings: "£32.00", deliveries: 20, status: "Available", rating: 4.9, ratingChange: "+4%", ratingPositive: true, vehicle: "bike" },
  { id: "#d006 4449", name: "Brooklyn Simmons", phone: "(312) 555-0946", branch: "Eltham", earnings: "£28.00", deliveries: 13, status: "On Delivery", rating: 4.2, ratingChange: "-2%", ratingPositive: false, vehicle: "scooter" },
  { id: "#d006 4450", name: "Brooklyn Simmons", phone: "(312) 555-0946", branch: "Eltham", earnings: "£33.00", deliveries: 72, status: "Break", rating: 3.8, ratingChange: "+1%", ratingPositive: true, vehicle: "bike" },
  { id: "#d006 4451", name: "Brooklyn Simmons", phone: "(312) 555-0946", branch: "Eltham", earnings: "£34.00", deliveries: 69, status: "Available", rating: 4.5, ratingChange: "+3%", ratingPositive: true, vehicle: "car" },
  { id: "#d006 4452", name: "Brooklyn Simmons", phone: "(312) 555-0946", branch: "Eltham", earnings: "£29.00", deliveries: 69, status: "Available", rating: 4.1, ratingChange: "+2%", ratingPositive: true, vehicle: "scooter" },
];

const RECENT_ACTIVITY: RecentActivity[] = [
  { time: "09:43 AM", driver: "Brooklyn Simmons", orderId: "4FD-9921", branch: "Eltham (ELO1)", status: "On Delivery", driverColor: "bg-orange-500" },
  { time: "09:43 AM", driver: "Ayesha Doram", orderId: "4FD-9921", branch: "Eltham (ELO1)", status: "On Delivery", driverColor: "bg-purple-500" },
  { time: "09:43 AM", driver: "Brooklyn Simmons", orderId: "4FD-9921", branch: "Eltham (ELO1)", status: "Available", driverColor: "bg-blue-500" },
  { time: "09:43 AM", driver: "Brooklyn Simmons", orderId: "4FD-9921", branch: "Eltham (ELO1)", status: "On Delivery", driverColor: "bg-green-500" },
  { time: "09:43 AM", driver: "Brooklyn Simmons", orderId: "4FD-9921", branch: "Eltham (ELO1)", status: "Available", driverColor: "bg-orange-500" },
];

// ── Sub-components ─────────────────────────────────────────────────────────
function StatCard({ title, value, sub, change, positive }: {
  title: string; value: string; sub?: string; change: string; positive: boolean;
}) {
  return (
    <div className="relative bg-[#1a1a1c] border border-[#2e2e30] rounded-2xl p-4 overflow-hidden flex-1 min-w-0">
      <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-[#f9671a]/25 blur-2xl pointer-events-none" />
      <div className="relative">
        <div className="w-6 h-6 rounded-lg bg-[#f9671a]/15 flex items-center justify-center mb-2">
          <div className="w-3 h-3 rounded-sm bg-[#f9671a]/70" />
        </div>
        <p className="text-[10px] text-zinc-400 uppercase tracking-wide">{title}</p>
        <p className="text-xl font-bold text-[#f9671a]">{value}</p>
        {sub && <p className="text-[10px] text-zinc-500 mt-0.5">{sub}</p>}
        <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-[#2e2e30]">
          <span className={`flex items-center gap-0.5 text-xs font-semibold ${positive ? "text-green-400" : "text-red-400"}`}>
            {positive ? <TrendingUp size={10} /> : <TrendingDown size={10} />} {change}
          </span>
          <span className="text-xs text-zinc-500">vs yesterday</span>
        </div>
      </div>
    </div>
  );
}

function DriverStatusBadge({ status }: { status: DriverStatus }) {
  const map: Record<DriverStatus, string> = {
    Available: "bg-green-500/15 text-green-400 border-green-500/30",
    "On Delivery": "bg-blue-500/15 text-blue-400 border-blue-500/30",
    Break: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
    Offline: "bg-zinc-500/15 text-zinc-400 border-zinc-500/30",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${map[status]}`}>
      {status}
    </span>
  );
}

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

function VehicleIcon({ type }: { type: "bike" | "car" | "scooter" }) {
  return <Bike size={14} className="text-[#f9671a]" />;
}

function Pagination() {
  return (
    <div className="flex items-center justify-between pt-3 border-t border-[#2e2e30]">
      <p className="text-xs text-zinc-500">Showing 1 to 10 of 50 results</p>
      <div className="flex items-center gap-1.5">
        <button className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#252527] text-zinc-400 hover:text-white"><ChevronLeft size={13} /></button>
        {[1,2,3,4,5].map((p) => (
          <button key={p} className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs font-medium ${p === 1 ? "bg-[#f9671a] text-white" : "bg-[#252527] text-zinc-400 hover:text-white"}`}>{p}</button>
        ))}
        <button className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#252527] text-zinc-400 hover:text-white"><ChevronRight size={13} /></button>
        <button className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#252527] text-zinc-400 text-xs hover:text-white ml-1">4/page <ChevronDown size={11} /></button>
      </div>
    </div>
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

// ── Bar chart for deliveries per driver ─────────────────────────────────────
function DeliveriesBarChart() {
  const data = [
    { name: "Ahmed Khan", val: 24 },
    { name: "City Star", val: 20 },
    { name: "Flex", val: 16 },
    { name: "City Star", val: 10 },
    { name: "City Star", val: 8 },
    { name: "City Star", val: 6 },
  ];
  const max = 24;
  return (
    <div className="space-y-2">
      {data.map((d, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="text-[10px] text-zinc-400 w-20 truncate flex-shrink-0">{d.name}</span>
          <div className="flex-1 h-3 bg-[#252527] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-[#f9671a] transition-all"
              style={{ width: `${(d.val / max) * 100}%` }}
            />
          </div>
          <span className="text-[10px] font-semibold text-white w-5 text-right">{d.val}</span>
        </div>
      ))}
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function DriversManagementPage() {
  const [activeStatus, setActiveStatus] = useState("All");
  const [activePeriod, setActivePeriod] = useState("TODAY");

  const statusTabs = ["All", "On Delivery", "Available", "Break", "Offline"];
  const periodTabs = ["TODAY", "YESTERDAY", "THIS WEEK", "LAST WEEK", "MTD", "6MD", "YTD"];

  return (
    <div className="flex-1 bg-[#0f0f11] min-h-screen text-white p-5 space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-lg font-bold">Drivers Management</h1>
        <p className="text-xs text-zinc-500">Track, assign, and manage your drivers in real time.</p>
      </div>

      {/* Stat Cards */}
      <div className="flex gap-3 flex-wrap">
        <StatCard title="Active Drivers" value="87" change="+3.9%" positive />
        <StatCard title="On Delivery" value="47a" change="+4.9%" positive />
        <StatCard title="Available Drivers" value="24a" change="+3.9%" positive />
        <StatCard title="Offline Drivers" value="24a" change="+2.9%" positive={false} />
      </div>

      {/* Live Driver Activity */}
      <div className="bg-[#1a1a1c] border border-[#2e2e30] rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white">Live Driver Activity</h2>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#f9671a]/50 text-[#f9671a] text-xs font-medium hover:bg-[#f9671a]/10 transition-colors">
            View All Insights
          </button>
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
      <div className="bg-[#1a1a1c] border border-[#2e2e30] rounded-2xl p-5 space-y-4">
        <div>
          <h2 className="text-sm font-semibold text-white">Driver Operations Panel</h2>
          <p className="text-xs text-zinc-500">Live driver activity and delivery tracking.</p>
        </div>

        {/* Status + Period filter rows */}
        <div className="flex flex-wrap items-center gap-2">
          {statusTabs.map((t) => (
            <button key={t} onClick={() => setActiveStatus(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeStatus === t ? "bg-[#f9671a]/10 text-[#f9671a] border border-[#f9671a]/50" : "bg-[#252527] text-zinc-400 hover:text-white border border-transparent"
              }`}
            >{t}</button>
          ))}
          <div className="w-px h-5 bg-[#2e2e30] mx-1" />
          {periodTabs.map((t) => (
            <button key={t} onClick={() => setActivePeriod(t)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activePeriod === t ? "bg-[#f9671a]/10 text-[#f9671a] border border-[#f9671a]/50" : "bg-[#252527] text-zinc-400 hover:text-white border border-transparent"
              }`}
            >{t}</button>
          ))}
        </div>

        {/* Search + Filters + Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 bg-[#252527] border border-[#2e2e30] rounded-xl px-3 py-2 w-64">
            <svg width="13" height="13" viewBox="0 0 20 20" fill="none"><circle cx="9" cy="9" r="6" stroke="#626262" strokeWidth="2"/><line x1="14" y1="14" x2="18" y2="18" stroke="#626262" strokeWidth="2" strokeLinecap="round"/></svg>
            <input type="text" placeholder="Search by name, vehicle Id..." className="bg-transparent text-xs text-white placeholder-zinc-500 outline-none w-full" />
          </div>
          {["Branch","Driver Status","Team","Sort"].map((f) => (
            <button key={f} className="flex items-center gap-1 px-3 py-2 rounded-xl bg-[#252527] border border-[#2e2e30] text-zinc-400 text-xs hover:text-white transition-colors">
              {f} <ChevronDown size={11} />
            </button>
          ))}
          <div className="ml-auto flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#f9671a] text-white text-xs font-medium hover:bg-[#e05a15] transition-colors">
              <Plus size={12} /> Add Driver
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#2e2e30] text-zinc-400 text-xs hover:text-white transition-colors">
              <Download size={12} /> Export CSV
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#2e2e30]">
                {["DRIVER ID","ORDER NAME","BRANCH","EARNINGS","DELIVERIES","STATUS","PERFORMANCE","VEHICLE","ACTION"].map((h) => (
                  <th key={h} className="text-left text-zinc-500 font-medium pb-2.5 pr-4 whitespace-nowrap">
                    {h === "DRIVER ID" ? (
                      <div className="flex items-center gap-2"><input type="checkbox" className="rounded bg-zinc-700" readOnly />{h}</div>
                    ) : h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2e2e30]/60">
              {DRIVERS.map((d, i) => (
                <tr key={i} className="hover:bg-zinc-800/20 transition-colors">
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" className="rounded bg-zinc-700" readOnly />
                      <span className="text-[#f9671a] font-medium">{d.id}</span>
                    </div>
                  </td>
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0">B</div>
                      <div>
                        <p className="text-white font-medium whitespace-nowrap">{d.name}</p>
                        <p className="text-zinc-500">{d.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 pr-4 text-zinc-300">{d.branch}</td>
                  <td className="py-3 pr-4 text-white font-medium">{d.earnings}</td>
                  <td className="py-3 pr-4 text-zinc-300">{d.deliveries}</td>
                  <td className="py-3 pr-4"><DriverStatusBadge status={d.status} /></td>
                  <td className="py-3 pr-4">
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-1">
                        <span className="text-white font-semibold">{d.rating}</span>
                        <Star size={10} className="text-yellow-400 fill-yellow-400" />
                      </div>
                      <span className={`text-[10px] font-medium ${d.ratingPositive ? "text-green-400" : "text-red-400"}`}>{d.ratingChange}</span>
                    </div>
                  </td>
                  <td className="py-3 pr-4">
                    <VehicleIcon type={d.vehicle} />
                  </td>
                  <td className="py-3">
                    <button className="p-1 rounded-lg hover:bg-[#252527] text-zinc-400 hover:text-white transition-colors">
                      <MoreVertical size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination />
      </div>

      {/* Driver Performance Analytics */}
      <div className="bg-[#1a1a1c] border border-[#2e2e30] rounded-2xl p-5 space-y-4">
        <div>
          <h2 className="text-sm font-semibold text-white">Driver Performance Analytics</h2>
          <p className="text-xs text-zinc-500">Track driver activity and performance.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bar chart */}
          <div>
            <p className="text-xs font-semibold text-white mb-3">Deliveries Per Driver (Today)</p>
            <DeliveriesBarChart />
          </div>

          {/* Recent Activity */}
          <div>
            <p className="text-xs font-semibold text-white mb-3">Recent Driver Activity</p>
            <div className="space-y-2">
              {RECENT_ACTIVITY.map((a, i) => (
                <div key={i} className="flex items-center gap-3 py-2 border-b border-[#2e2e30]/50 last:border-0">
                  <div className={`w-7 h-7 rounded-full ${a.driverColor} flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0`}>
                    {a.driver[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs text-zinc-400">{a.time}</span>
                      <span className="text-xs font-medium text-white truncate">{a.driver}</span>
                    </div>
                    <p className="text-[10px] text-zinc-500">{a.orderId} • {a.branch}</p>
                  </div>
                  <ActivityStatusBadge status={a.status} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-3 border-t border-[#2e2e30]">
          {[
            { label: "Total Deliveries", value: "1,542" },
            { label: "Avg Earnings Per Driver", value: "£64.2" },
            { label: "Avg Delivery Time", value: "28.6 Mins" },
            { label: "Top Raking Driver", value: "Alex Rider id: 87" },
            { label: "Delayed Orders", value: "7" },
            { label: "Available Riders", value: "48" },
          ].map((s) => (
            <div key={s.label} className="bg-[#252527] rounded-xl p-3 text-center">
              <p className="text-[10px] text-zinc-500 mb-1">{s.label}</p>
              <p className="text-xs font-bold text-white leading-tight">{s.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}