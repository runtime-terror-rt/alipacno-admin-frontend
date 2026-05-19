"use client";

import { useState } from "react";
import {
  Search,
  MoreVertical,
  TrendingUp,
  Clock,
  AlertCircle,
  Star,
  Bike,
  Store,
  CloudUpload,
  Award,
} from "lucide-react";
import PageHeader from "@/components/admin/ui/PageHeader";
import MetricCardsRow from "@/components/admin/common/MetricCardsRow";
import DateFiltersBar from "@/components/admin/ui/DateFilterBar";
import FilterDropdown from "@/components/admin/ui/FilterDropdown";
import Button from "@/components/admin/ui/Button";
import Pagination from "@/components/admin/ui/Pagination";

// ── Types ──────────────────────────────────────────────────────────────────
type OrderStatus = "Completed" | "Preparing" | "On Delivery" | "Cancelled";
interface Order {
  id: string;
  customer: string;
  phone: string;
  avatar: string;
  branch: string;
  orderType: string;
  amount: string;
  payment: string;
  status: OrderStatus;
  driver: string;
  driverAvatar: string;
  time: string;
  date: string;
}

// ── Mock Data ──────────────────────────────────────────────────────────────
const ORDERS: Order[] = [
  {
    id: "#FD-9921",
    customer: "Brooklyn Simmons",
    phone: "(312) 555-0192",
    avatar: "/avatars/1.jpg",
    branch: "Eltham",
    orderType: "Delivery",
    amount: "£32.00",
    payment: "Card",
    status: "Completed",
    driver: "Brooklyn Simmons",
    driverAvatar: "/avatars/d1.jpg",
    time: "09:42 AM",
    date: "May 04 2026",
  },
  {
    id: "#FD-9921",
    customer: "Brooklyn Simmons",
    phone: "(312) 555-0192",
    avatar: "/avatars/2.jpg",
    branch: "Eltham",
    orderType: "Delivery",
    amount: "£32.00",
    payment: "Cash",
    status: "Preparing",
    driver: "Brooklyn Simmons",
    driverAvatar: "/avatars/d2.jpg",
    time: "09:42 AM",
    date: "May 04 2026",
  },
  {
    id: "#FD-9921",
    customer: "Brooklyn Simmons",
    phone: "(312) 555-0192",
    avatar: "/avatars/3.jpg",
    branch: "Eltham",
    orderType: "Delivery",
    amount: "£32.00",
    payment: "Cash",
    status: "On Delivery",
    driver: "Brooklyn Simmons",
    driverAvatar: "/avatars/d3.jpg",
    time: "09:42 AM",
    date: "May 04 2026",
  },
  {
    id: "#FD-9921",
    customer: "Brooklyn Simmons",
    phone: "(312) 555-0192",
    avatar: "/avatars/4.jpg",
    branch: "Eltham",
    orderType: "Delivery",
    amount: "£32.00",
    payment: "Card",
    status: "Cancelled",
    driver: "Brooklyn Simmons",
    driverAvatar: "/avatars/d4.jpg",
    time: "09:42 AM",
    date: "May 04 2026",
  },
  {
    id: "#FD-9921",
    customer: "Brooklyn Simmons",
    phone: "(312) 555-0192",
    avatar: "/avatars/5.jpg",
    branch: "Eltham",
    orderType: "Delivery",
    amount: "£32.00",
    payment: "Card",
    status: "Completed",
    driver: "Brooklyn Simmons",
    driverAvatar: "/avatars/d5.jpg",
    time: "09:42 AM",
    date: "May 04 2026",
  },
];


// ── Status Badge ───────────────────────────────────────────────────────────
const statusConfig: Record<OrderStatus, { label: string; className: string }> = {
  Completed: { label: "Completed", className: "bg-green-500/20 text-green-400 border border-green-500/30" },
  Preparing: { label: "Preparing", className: "bg-[#E8833A]/20 text-[#E8833A] border border-[#E8833A]/30" },
  "On Delivery": { label: "On Delivery", className: "bg-blue-500/20 text-blue-400 border border-blue-500/30" },
  Cancelled: { label: "Cancel", className: "bg-red-500/20 text-red-400 border border-red-500/30" },
};

function StatusBadge({ status }: { status: OrderStatus }) {
  const cfg = statusConfig[status];
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${cfg.className}`}>
      {cfg.label}
    </span>
  );
}

// ── Avatar Placeholder ─────────────────────────────────────────────────────
function Avatar({ name, size = 8 }: { name: string; size?: number }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);
  const colors = ["bg-orange-500", "bg-purple-500", "bg-blue-500", "bg-green-500", "bg-pink-500"];
  const color = colors[name.charCodeAt(0) % colors.length];
  return (
    <div
      className={`w-${size} h-${size} rounded-full ${color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}
    >
      {initials}
    </div>
  );
}


// ── Mini Sparkline SVG ─────────────────────────────────────────────────────
function Sparkline({ color = "#E8833A" }: { color?: string }) {
  const points = "0,30 20,20 40,25 60,10 80,15 100,5 120,12";
  return (
    <svg viewBox="0 0 120 40" className="w-full h-10" preserveAspectRatio="none">
      <polyline fill="none" stroke={color} strokeWidth="2" points={points} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function RevenueTrendChart() {
  // Simple SVG line chart
  const data = [
    { x: 0, y: 60 },
    { x: 60, y: 40 },
    { x: 120, y: 55 },
    { x: 180, y: 30 },
    { x: 240, y: 50 },
    { x: 300, y: 35 },
    { x: 360, y: 45 },
  ];
  const pts = data.map((d) => `${d.x},${d.y}`).join(" ");
  const fillPts = `0,80 ${pts} 360,80`;
  return (
    <svg viewBox="0 0 360 80" className="w-full h-20" preserveAspectRatio="none">
      <defs>
        <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E8833A" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#E8833A" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon fill="url(#revGrad)" points={fillPts} />
      <polyline fill="none" stroke="#E8833A" strokeWidth="2" points={pts} strokeLinecap="round" strokeLinejoin="round" />
      {data.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r="3" fill="#E8833A" />
      ))}
    </svg>
  );
}

function DonutChart() {
  // Segments: Completed 88.2%, Pending 6.1%, On Delivery 4.1%, Cancelled 1.6%
  const segments = [
    { pct: 88.2, color: "#22c55e" },
    { pct: 6.1, color: "#E8833A" },
    { pct: 4.1, color: "#3b82f6" },
    { pct: 1.6, color: "#ef4444" },
  ];
  const r = 60;
  const cx = 80;
  const cy = 80;
  let cumulative = 0;
  const paths = segments.map((seg) => {
    const start = (cumulative / 100) * 2 * Math.PI - Math.PI / 2;
    cumulative += seg.pct;
    const end = (cumulative / 100) * 2 * Math.PI - Math.PI / 2;
    const x1 = cx + r * Math.cos(start);
    const y1 = cy + r * Math.sin(start);
    const x2 = cx + r * Math.cos(end);
    const y2 = cy + r * Math.sin(end);
    const largeArc = seg.pct > 50 ? 1 : 0;
    return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;
  });
  return (
    <svg viewBox="0 0 160 160" className="w-36 h-36 flex-shrink-0">
      {paths.map((d, i) => (
        <path key={i} d={d} fill={segments[i].color} />
      ))}
      <circle cx={cx} cy={cy} r={38} fill="#1C1C1E" />
      <text x={cx} y={cy - 6} textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">1,842</text>
      <text x={cx} y={cy + 10} textAnchor="middle" fill="#71717a" fontSize="7">Total Orders</text>
    </svg>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function OrdersPage() {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const toggleRow = (i: number) =>
    setSelectedRows((prev) => (prev.includes(i) ? prev.filter((r) => r !== i) : [...prev, i]));

  return (
      <main className="p-4 flex flex-col gap-8">
        {/* Page title */}
        <PageHeader title="Order Management" subtitle="Track Total orders, total revenue, avg order value, phone orders count." />

        {/* Metric cards row */}
        <MetricCardsRow metricCards={[
          { label: "Total Orders", value: "£18,502.40", change: "+12.4%", positive: true },
          { label: "Completed Orders", value: "622", change: "+8.7%", positive: true },
          { label: "Cancelled Orders", value: "£29.78", change: "-2.1%", positive: false },
          { label: "TOTAL REVENUE", value: "104%", change: "+4.0%", positive: true },
        ]} />
        
        {/* ── Main Content Grid ── */}
        <div className="grid grid-cols-[1fr_280px] gap-6">
          {/* LEFT COLUMN */}
          <div className="space-y-6">
            {/* Order Report */}
            <div className="bg-[#1C1C1E] rounded-xl p-5">
              <div className="mb-4">
                <h2 className="text-base font-semibold text-white">Order Report</h2>
                <p className="text-xs text-zinc-500">Comprehensive order monitoring and filtering</p>
              </div>

              {/* Filters Row 1 */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <DateFiltersBar
                    tabs={["Today", "Weekly", "Monthly", "Custom Range"]}
                    defaultTab="Weekly"
                    onChange={(tab) => {
                      console.log("Selected:", tab);
                    }}
                />
                <div className="flex flex-wrap gap-2 ml-auto">
                  <FilterDropdown label="Order Status" />
                  <FilterDropdown label="Order Type" />
                  <FilterDropdown label="Branch" />
                  <FilterDropdown label="Payment Method" />
                </div>
              </div>

              {/* Search + Export Row */}
              <div className="flex items-center gap-3 mb-4 bg-[#1a1a1c]">
                <div className="relative flex-1 bg-[#1a1a1c]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="text"
                    placeholder="Search order id, customer, phone..."
                    className="w-full bg-[#1a1a1c] rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-zinc-500 outline-none focus:ring-1 focus:ring-[#E8833A]/50"
                  />
                </div>
               {/* Export buttons */}
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#2e2e30] hover:border-[#f9671a] text-[#626262] hover:text-[#f9671a] text-sm font-medium hover:bg-[#f9671a]/10 transition-colors cursor-pointer">
                    <CloudUpload size={15} /> Export CSV
                </button>
                 <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#2e2e30] hover:border-[#f9671a] text-[#626262] hover:text-  [#f9671a] text-sm font-medium hover:bg-[#f9671a]/10 transition-colors cursor-pointer">
                   <CloudUpload  size={15} /> Export Excel
                </button>
              </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="py-3 rounded-lg!" >
                    <tr className="border-b border-zinc-800 bg-[#3D3D3D]">
                      {["ORDER ID", "CUSTOMER", "BRANCH", "ORDER TYPE", "AMOUNT", "PAYMENT", "STATUS", "DRIVER", "TIME", "ACTION"].map((h) => (
                        <th key={h} className="text-left text-xs text-gray-100   font-medium pb-3 pr-4 first:pl-2 whitespace-nowrap">
                          {h === "ORDER ID" ? (
                            <div className="flex items-center gap-2 pt-3 ">
                              <input type="checkbox" className="rounded bg-zinc-700 border-zinc-600 text-[#E8833A]" readOnly />
                              {h}
                            </div>
                          ) : <div className="pt-3">{h}</div>
                          }
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60">
                    {ORDERS.map((order, i) => (
                      <tr key={i} className="hover:bg-zinc-800/30 transition-colors">
                        <td className="py-3 pr-4 pl-2">
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={selectedRows.includes(i)}
                              onChange={() => toggleRow(i)}
                              className="rounded bg-gray-900 border-zinc-600 text-[#E8833A]"
                            />
                            <span className="text-[#E8833A] text-xs font-medium">{order.id}</span>
                          </div>
                        </td>
                        <td className="py-3 pr-4">
                          <div className="flex items-center gap-2">
                            <Avatar name={order.customer} size={7} />
                            <div>
                              <p className="text-xs font-medium text-white whitespace-nowrap">{order.customer}</p>
                              <p className="text-xs text-zinc-500">{order.phone}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 pr-4 text-xs text-zinc-300">{order.branch}</td>
                        <td className="py-3 pr-4 text-xs text-zinc-300">{order.orderType}</td>
                        <td className="py-3 pr-4 text-xs text-white font-medium">{order.amount}</td>
                        <td className="py-3 pr-4">
                          <div className="flex items-center gap-1.5">
                            <div className={`w-6 h-4 rounded ${order.payment === "Card" ? "bg-gradient-to-r from-zinc-600 to-zinc-500" : "bg-zinc-700"} flex items-center justify-center`}>
                              <div className="w-3 h-2 rounded-sm bg-zinc-400/50" />
                            </div>
                            <span className="text-xs text-zinc-300">{order.payment}</span>
                          </div>
                        </td>
                        <td className="py-3 pr-4">
                          <StatusBadge status={order.status} />
                        </td>
                        <td className="py-3 pr-4">
                          <div className="flex items-center gap-1.5">
                            <Avatar name={order.driver} size={6} />
                            <span className="text-xs text-zinc-300 whitespace-nowrap">{order.driver}</span>
                          </div>
                        </td>
                        <td className="py-3 pr-4">
                          <p className="text-xs text-zinc-300 whitespace-nowrap">{order.time}</p>
                          <p className="text-xs text-zinc-500">{order.date}</p>
                        </td>
                        <td className="py-3">
                          <button className="p-1 rounded-lg hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <Pagination />
            </div>

            {/* Order History & Call Logs */}
            {/* <div>
              <h2 className="text-base font-semibold text-white mb-1">Order History & Call Logs</h2>
              <p className="text-xs text-zinc-500 mb-4">Combined Customer order and support interaction logs</p>
              <div className="grid grid-cols-5 gap-3">
                {CALL_LOGS.map((log, i) => (
                  <div key={i} className="bg-[#1C1C1E] rounded-xl p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                        <Phone className="w-3 h-3 text-green-400" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-white">{log.time}</p>
                        <p className="text-xs text-zinc-500">Call Duration: {log.duration}</p>
                      </div>
                    </div>
                    <p className="text-xs text-zinc-400">{log.date}</p>
                    <div>
                      <p className="text-xs font-semibold text-white">{log.customer}</p>
                      <p className="text-xs text-zinc-500">{log.phone}</p>
                    </div>
                    <p className="text-xs text-zinc-400">{log.branch}</p>
                    <button className={`w-full py-1.5 rounded-lg text-xs font-medium border transition-colors ${log.tagColor}`}>
                      {log.tag}
                    </button>
                  </div>
                ))}
              </div>
            </div> */}

            {/* Bottom Charts Row */}
            <div className="grid grid-cols-2 gap-4">
              {/* Donut */}
              <div className="bg-[#1C1C1E] rounded-xl p-5">
                <h3 className="text-sm font-semibold text-white mb-4">Order Status Distribution</h3>
                <div className="flex items-center gap-5">
                  <DonutChart />
                  <div className="space-y-2 flex-1">
                    {[
                      { label: "Completed", count: "1,624", pct: "88.2%", color: "bg-green-500" },
                      { label: "Pending / Preparing", count: "112", pct: "6.1%", color: "bg-[#E8833A]" },
                      { label: "On Delivery", count: "76", pct: "4.1%", color: "bg-blue-500" },
                      { label: "Cancelled", count: "30", pct: "1.6%", color: "bg-red-500" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${item.color} flex-shrink-0`} />
                        <span className="text-xs text-zinc-400 flex-1">{item.label}</span>
                        <span className="text-xs font-semibold text-white">{item.count}</span>
                        <span className="text-xs text-zinc-500 w-12 text-right">({item.pct})</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Revenue Trend */}
              <div className="bg-[#1C1C1E] rounded-xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-white">Revenue Trend</h3>
                  <span className="text-xs text-zinc-500">(Last 7 Days)</span>
                </div>
                <div className="flex justify-between text-xs text-zinc-500 mb-1">
                  {["£10k", "£7.5k", "£5k", "£2.5k", "0"].map((l) => (
                    <span key={l}>{l}</span>
                  ))}
                </div>
                <RevenueTrendChart />
                <div className="flex justify-between text-xs text-zinc-500 mt-1">
                  {["Apr 28", "Apr 29", "Apr 30", "May 1", "May 2", "May 3", "May 4"].map((d) => (
                    <span key={d}>{d}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — Operational Insights */}
          <div className="space-y-4 bg-[#1C1C1E] rounded-xl p-5">
            <h2 className="text-base font-semibold text-white">Operational Insights</h2>

            {/* Peak Order Hour */}
            <div className="bg-[#1C1C1E] border border-zinc-700 rounded-xl p-4">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <Bike className="w-4 h-4 text-[#E8833A]" />
                  <span className="text-xs font-semibold text-white">Peak Order Hour</span>
                </div>
                <span className="text-sm font-bold text-[#E8833A]">07 PM</span>
              </div>
              <Sparkline />
              <p className="text-xs text-zinc-500 mt-1">324 Orders</p>
            </div>

            {/* Most Active Branch */}
            <div className="bg-[#1C1C1E] border border-zinc-700 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Store className="w-4 h-4 text-[#E8833A]" />
                <span className="text-xs font-semibold text-white">Most Active Branch</span>
              </div>
              <p className="text-sm text-white font-medium">Eltham (ELO1)</p>
              <p className="text-xs text-zinc-500 mb-2">649 Orders</p>
              <div className="w-full h-1.5 rounded-full bg-zinc-700">
                <div className="h-1.5 rounded-full bg-[#E8833A]" style={{ width: "34.8%" }} />
              </div>
              <p className="text-xs text-zinc-500 mt-1">34.8%</p>
            </div>

            {/* Average Delivery Time */}
            <div className="bg-[#1C1C1E] border border-zinc-700 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-[#E8833A]" />
                <span className="text-xs font-semibold text-white">Average Delivery Time</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-white">28.6 mins</span>
                <span className="text-xs text-green-400 flex items-center gap-0.5">
                  <TrendingUp className="w-3 h-3" /> 6.3%
                </span>
              </div>
              <p className="text-xs text-zinc-500 mb-2">vs last period</p>
              <div className="w-full h-1.5 rounded-full bg-zinc-700">
                <div className="h-1.5 rounded-full bg-[#E8833A]" style={{ width: "34.8%" }} />
              </div>
              <p className="text-xs text-zinc-500 mt-1">34.8%</p>
            </div>

            {/* Failed Orders */}
            <div className="bg-[#1C1C1E] border border-zinc-700 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-4 h-4 text-red-400" />
                <span className="text-xs font-semibold text-white">Failed Orders Today</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-white">8 Orders</span>
                <span className="text-xs text-red-400 flex items-center gap-0.5">
                  <TrendingUp className="w-3 h-3 rotate-180" /> 2.1%
                </span>
              </div>
              <p className="text-xs text-zinc-500 mb-2">vs yesterday</p>
              <div className="w-full h-1.5 rounded-full bg-zinc-700">
                <div className="h-1.5 rounded-full bg-red-500" style={{ width: "34.8%" }} />
              </div>
              <p className="text-xs text-zinc-500 mt-1">34.8%</p>
            </div>

            {/* Top Driver */}
            <div className="bg-[#1C1C1E] border border-zinc-700 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-4 h-4 text-success" />
                <span className="text-xs font-semibold text-white">Top Driver Performance</span>
              </div>
              <div className="flex items-center gap-3">
                <Avatar name="Alex Rider" size={9} />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white">Alex Rider</p>
                  <p className="text-xs text-zinc-500">24 Deliveries</p>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-bold text-success">4.9</span>
                  <Star className="w-4 h-4 text-success fill-success" />
                </div>
              </div>
              <div className="mt-2 w-full h-1 rounded-full bg-zinc-700">
                <div className="h-1 rounded-full bg-[#E8833A]" style={{ width: "90%" }} />
              </div>
            </div>

            {/* View All Insights CTA */}
            <Button>
  V           View All Insights
            </Button>

            {/* Stats list */}
            <div className="bg-[#1C1C1E] border border-zinc-700 rounded-xl divide-y divide-zinc-800">
              {[
                { label: "Total calls", value: 128 },
                { label: "Converted Orders", value: 96 },
                { label: "Missed Calls", value: 14 },
                { label: "Phone Orders", value: 38 },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between px-4 py-2.5">
                  <span className="text-xs text-zinc-400">{item.label}</span>
                  <span className="text-xs font-semibold text-white">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
  );
}