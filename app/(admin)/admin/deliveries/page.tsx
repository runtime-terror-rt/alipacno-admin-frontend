"use client";

import { useState } from "react";
import {
  TrendingUp, TrendingDown, ChevronDown, Phone, Eye,
  MapPin, Clock, Package, Truck, AlertTriangle, Plus,
  Navigation, Zap, Circle,
} from "lucide-react";

// ── Types & Data ───────────────────────────────────────────────────────────
type OrderStatus = "Live Order" | "On Delivery" | "Ready" | "Preparing";

interface LiveOrder {
  id: string;
  customer: string;
  address: string;
  phone: string;
  eta: string;
  distance: string;
  status: OrderStatus;
  driver?: string;
}

const LIVE_ORDERS: LiveOrder[] = [
  { id: "#P0980", customer: "Ahmed Khan", address: "Eltham High St, 210 OXT", phone: "(312) 555-0192", eta: "12 min", distance: "2.4 km", status: "Live Order" },
  { id: "#P0980", customer: "Ahmed Khan", address: "Eltham High St, 210 OXT", phone: "(312) 555-0192", eta: "9 min", distance: "1.8 km", status: "On Delivery" },
  { id: "#P0980", customer: "Ahmed Khan", address: "Eltham High St, 210 OXT", phone: "(312) 555-0192", eta: "3 min", distance: "0.5 km", status: "Live Order" },
  { id: "#P0A62", customer: "Ahmed Khan", address: "Eltham High St, 210 OXT", phone: "(312) 555-0192", eta: "5 min", distance: "1.2 km", status: "On Delivery" },
  { id: "#A1042", customer: "Ahmed Khan", address: "Eltham High St, 210 OXT", phone: "(312) 555-0192", eta: "8 min", distance: "2.0 km", status: "Live Order" },
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

// ── Helpers ────────────────────────────────────────────────────────────────
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
          <span className="text-xs text-zinc-500">vs last period</span>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: OrderStatus }) {
  const map: Record<OrderStatus, string> = {
    "Live Order": "bg-green-500/15 text-green-400 border-green-500/30",
    "On Delivery": "bg-blue-500/15 text-blue-400 border-blue-500/30",
    "Ready": "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
    "Preparing": "bg-[#f9671a]/15 text-[#f9671a] border-[#f9671a]/30",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${map[status]}`}>
      {status}
    </span>
  );
}

// ── Fake SVG Map ───────────────────────────────────────────────────────────
function DeliveryMap() {
  // Route paths connecting driver positions to center (Pacinos Eltham)
  const routes = [
    { color: "#f9671a", path: "M 200 150 Q 220 170 240 190 Q 250 210 260 230", label: "12 min\n0.3 km" },
    { color: "#22c55e", path: "M 420 120 Q 380 150 360 180 Q 340 200 320 220 Q 300 235 280 240", label: "9.5 min\n4.0 km" },
    { color: "#a855f7", path: "M 100 220 Q 150 230 200 240 Q 230 245 260 245", label: "" },
    { color: "#3b82f6", path: "M 300 320 Q 295 300 285 280 Q 278 260 270 248", label: "10 min\n3.3 km" },
    { color: "#ef4444", path: "M 350 310 Q 330 290 310 270 Q 295 258 280 248", label: "2 min\n0.1 km" },
    { color: "#eab308", path: "M 160 310 Q 200 290 230 270 Q 250 258 265 248", label: "" },
  ];

  const driverDots = [
    { x: 200, y: 148, color: "#f9671a", label: "12 min", sub: "0.3 km" },
    { x: 422, y: 118, color: "#22c55e", label: "9.5 min", sub: "4.0 km" },
    { x: 98, y: 218, color: "#a855f7", label: "10 min", sub: "3.3 km" },
    { x: 300, y: 322, color: "#3b82f6", label: "2 min", sub: "0.1 km" },
    { x: 350, y: 312, color: "#ef4444", label: "3 min", sub: "0.5 km" },
  ];

  const areaLabels = [
    { x: 120, y: 105, label: "RESEARCH" },
    { x: 230, y: 100, label: "ELTHAM NORTH" },
    { x: 370, y: 90, label: "MOTTMORDEY" },
    { x: 50, y: 220, label: "CROSSINGTOON" },
    { x: 370, y: 190, label: "BUNNOVER" },
    { x: 50, y: 310, label: "WATSONVALE" },
    { x: 250, y: 380, label: "RESERVOIR" },
    { x: 400, y: 360, label: "SOUTH MORNING" },
    { x: 50, y: 370, label: "KEILOR PARK" },
  ];

  return (
    <div className="relative bg-[#111113] rounded-2xl overflow-hidden border border-[#2e2e30]" style={{ minHeight: 420 }}>
      <svg viewBox="0 0 520 420" className="w-full h-full" style={{ minHeight: 420 }}>
        {/* Dark map background */}
        <rect width="520" height="420" fill="#0d0d0f" />

        {/* Road grid lines (subtle) */}
        {[80,160,240,320,400].map(x => (
          <line key={`vr${x}`} x1={x} y1={0} x2={x} y2={420} stroke="#1e1e22" strokeWidth="1" />
        ))}
        {[70,140,210,280,350].map(y => (
          <line key={`hr${y}`} x1={0} y1={y} x2={520} y2={y} stroke="#1e1e22" strokeWidth="1" />
        ))}

        {/* Diagonal roads */}
        <line x1="50" y1="50" x2="280" y2="248" stroke="#252528" strokeWidth="6" />
        <line x1="470" y1="60" x2="280" y2="248" stroke="#252528" strokeWidth="6" />
        <line x1="30" y1="390" x2="280" y2="248" stroke="#252528" strokeWidth="6" />
        <line x1="490" y1="400" x2="280" y2="248" stroke="#252528" strokeWidth="6" />
        <line x1="0" y1="200" x2="520" y2="200" stroke="#252528" strokeWidth="5" />
        <line x1="150" y1="0" x2="150" y2="420" stroke="#252528" strokeWidth="5" />
        <line x1="380" y1="0" x2="380" y2="420" stroke="#252528" strokeWidth="5" />

        {/* Area labels */}
        {areaLabels.map((a, i) => (
          <text key={i} x={a.x} y={a.y} fill="#2e2e32" fontSize="9" fontFamily="monospace" textAnchor="middle" letterSpacing="1">{a.label}</text>
        ))}

        {/* Defs for glows */}
        <defs>
          {routes.map((r, i) => (
            <filter key={i} id={`glow${i}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          ))}
          <filter id="centerGlow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Route paths */}
        {routes.map((r, i) => (
          <path key={i} d={r.path} fill="none" stroke={r.color} strokeWidth="2.5"
            strokeDasharray="6 3" strokeLinecap="round" filter={`url(#glow${i})`} opacity="0.85" />
        ))}

        {/* Driver dots with pulse ring */}
        {driverDots.map((d, i) => (
          <g key={i}>
            <circle cx={d.x} cy={d.y} r="10" fill={d.color} opacity="0.15" />
            <circle cx={d.x} cy={d.y} r="6" fill={d.color} stroke="#0d0d0f" strokeWidth="2" />
            {/* ETA chip */}
            <rect x={d.x + 8} y={d.y - 18} width="42" height="22" rx="4" fill="#1a1a1c" stroke={d.color} strokeWidth="1" opacity="0.95" />
            <text x={d.x + 29} y={d.y - 9} textAnchor="middle" fill={d.color} fontSize="8" fontWeight="bold">{d.label}</text>
            <text x={d.x + 29} y={d.y - 1} textAnchor="middle" fill="#888" fontSize="7">{d.sub}</text>
          </g>
        ))}

        {/* Center - Pacinos Eltham */}
        <circle cx="270" cy="248" r="22" fill="#f9671a" opacity="0.2" filter="url(#centerGlow)" />
        <circle cx="270" cy="248" r="14" fill="#f9671a" opacity="0.4" />
        <circle cx="270" cy="248" r="8" fill="#f9671a" />
        <text x="270" y="275" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Pacinos Eltham</text>

        {/* Traffic legend (bottom-left) */}
        <rect x="10" y="340" width="80" height="70" rx="6" fill="#1a1a1c" stroke="#2e2e30" strokeWidth="1" />
        <text x="20" y="358" fill="#888" fontSize="8" fontWeight="bold">TRAFFIC CONDITION</text>
        {[{ color: "#22c55e", label: "Low" }, { color: "#eab308", label: "Medium" }, { color: "#ef4444", label: "High" }].map((t, i) => (
          <g key={i}>
            <rect x="20" y={368 + i * 12} width="20" height="4" rx="2" fill={t.color} />
            <text x="46" y={374 + i * 12} fill="#666" fontSize="7">{t.label}</text>
          </g>
        ))}
      </svg>

      {/* Legend overlay */}
      <div className="absolute top-3 left-3 bg-[#1a1a1c]/90 border border-[#2e2e30] rounded-xl p-3 text-xs space-y-1.5">
        <p className="text-zinc-400 font-semibold text-[10px] uppercase tracking-wide mb-2">Legend</p>
        {[
          { color: "#f9671a", label: "Active Delivery" },
          { color: "#22c55e", label: "Late / Overdue" },
          { color: "#a855f7", label: "Redelivery" },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-2">
            <div className="w-3 h-[2px] rounded" style={{ backgroundColor: l.color }} />
            <span className="text-zinc-400 text-[10px]">{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Live Order Card ────────────────────────────────────────────────────────
function LiveOrderCard({ order }: { order: LiveOrder }) {
  return (
    <div className="bg-[#1f1f21] border border-[#2e2e30] rounded-xl p-3 space-y-2 hover:border-[#f9671a]/30 transition-colors">
      <div className="flex items-center justify-between">
        <span className="text-[#f9671a] text-xs font-bold">{order.id}</span>
        <StatusBadge status={order.status} />
      </div>
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0">A</div>
        <div className="min-w-0">
          <p className="text-xs font-medium text-white truncate">{order.customer}</p>
          <p className="text-[10px] text-zinc-500 truncate">{order.address}</p>
        </div>
      </div>
      <div className="flex items-center justify-between text-[10px] text-zinc-400">
        <span className="flex items-center gap-1"><Clock size={9} /> {order.eta}</span>
        <span className="flex items-center gap-1"><Navigation size={9} /> {order.distance}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <button className="flex-1 py-1 rounded-lg bg-[#252527] text-zinc-400 text-[10px] hover:text-white transition-colors flex items-center justify-center gap-1">
          <Phone size={9} /> Call
        </button>
        <button className="flex-1 py-1 rounded-lg border border-[#f9671a]/50 text-[#f9671a] text-[10px] hover:bg-[#f9671a]/10 transition-colors flex items-center justify-center gap-1">
          <Eye size={9} /> View Order
        </button>
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function DeliveriesManagementPage() {
  const [activeTab, setActiveTab] = useState("LIVE");

  const tabs = [
    { label: "LIVE", count: 12, color: "text-green-400" },
    { label: "Preparing", count: 5 },
    { label: "Ready", count: null },
    { label: "Out for Delivery", count: 12 },
    { label: "Delivered", count: 54 },
    { label: "Late", count: 8, color: "text-red-400" },
  ];

  return (
    <div className="flex-1 bg-[#0f0f11] min-h-screen text-white p-5 space-y-5">
      {/* Header */}
      <div className="flex items-center gap-2">
        <ChevronDown size={14} className="rotate-90 text-[#f9671a]" />
        <div>
          <h1 className="text-lg font-bold">Deliveries Management</h1>
          <p className="text-xs text-zinc-500">Track and manage your deliveries in real time.</p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="flex gap-3 flex-wrap">
        <StatCard title="ACTIVE DELIVERIES" value="12a" sub="Eltham High St" change="+12.4%" positive />
        <StatCard title="LATE ORDER" value="12a" change="+0.8%" positive={false} />
        <StatCard title="AVG DELIVERY TIME" value="3 mins" change="+1% of time" positive />
        <StatCard title="DELIVERY TODAY" value="3" change="+1% of time" positive />
        <StatCard title="AVG DELIVERY DISTANCE" value="3 miles" change="+1% vs period" positive />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-5">
        {/* Map + tabs */}
        <div className="space-y-3">
          {/* Tab bar */}
          <div className="flex items-center gap-1 flex-wrap">
            {tabs.map((t) => (
              <button
                key={t.label}
                onClick={() => setActiveTab(t.label)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  activeTab === t.label
                    ? "bg-[#f9671a]/10 text-[#f9671a] border border-[#f9671a]/50"
                    : "bg-[#1a1a1c] text-zinc-400 hover:text-white border border-[#2e2e30]"
                }`}
              >
                {t.label}
                {t.count !== null && (
                  <span className={`text-[10px] font-bold ${t.color ?? (activeTab === t.label ? "text-[#f9671a]" : "text-zinc-500")}`}>
                    {t.count}
                  </span>
                )}
              </button>
            ))}
            <div className="ml-auto flex items-center gap-2">
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1a1a1c] border border-[#2e2e30] text-zinc-400 text-xs hover:text-white">
                Today, 10 AM <ChevronDown size={11} />
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#f9671a] text-white text-xs font-medium hover:bg-[#e05a15] transition-colors">
                <Zap size={11} /> Delivery Auto Allot
              </button>
            </div>
          </div>

          {/* Map */}
          <DeliveryMap />
        </div>

        {/* Live Orders Sidebar */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">Live Orders</h2>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-zinc-500">Timestamp</span>
              <button className="flex items-center gap-1 px-2 py-1 rounded-lg bg-[#1a1a1c] border border-[#2e2e30] text-zinc-400 text-xs hover:text-white">
                Routing <ChevronDown size={10} />
              </button>
            </div>
          </div>

          <div className="space-y-2 overflow-y-auto" style={{ maxHeight: 480 }}>
            {LIVE_ORDERS.map((order, i) => (
              <LiveOrderCard key={i} order={order} />
            ))}
          </div>
        </div>
      </div>

      {/* Driver Summary */}
      <div className="bg-[#1a1a1c] border border-[#2e2e30] rounded-2xl p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-white uppercase tracking-wide">Driver Summary</span>
            <button className="text-xs text-[#f9671a] hover:underline">View All Drivers →</button>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#f9671a] text-white text-xs font-medium hover:bg-[#e05a15] transition-colors">
            <Plus size={12} /> Add Customer
          </button>
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          {DRIVERS.map((d, i) => (
            <div key={i} className="flex items-center gap-2.5 bg-[#252527] rounded-xl px-3 py-2.5">
              <div className={`w-8 h-8 rounded-full ${d.color} flex items-center justify-center text-xs font-bold text-white`}>{d.avatar}</div>
              <div>
                <p className="text-xs font-medium text-white">{d.name}</p>
                <p className="text-[10px] text-zinc-500">{d.deliveries} deliveries</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}