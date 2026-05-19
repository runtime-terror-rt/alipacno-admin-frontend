"use client";

import { useState } from "react";
import {
  TrendingUp, TrendingDown, ChevronDown, ChevronLeft, ChevronRight,
  Search, Download, RefreshCw, Phone, MessageSquare, PlusCircle,
  Star, ChevronRight as ChevRight,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────
interface Customer {
  name: string;
  caller: string;
  lastVisit: string;
  totalOrders: number;
  totalVisits: number;
  totalSpend: string;
  tags: Array<"Regular" | "VIP" | "Loyalty">;
  action: "View Order" | "Call Back" | "Ext#4446";
}

interface OrderHistory {
  date: string;
  type: string;
  amount: string;
  deliveredAmount: string;
}

interface MenuItem {
  name: string;
  orders: number;
}

// ── Mock Data ──────────────────────────────────────────────────────────────
const CUSTOMERS: Customer[] = [
  { name: "Ahmed Khan", caller: "07881 234 567", lastVisit: "Yesterday", totalOrders: 4, totalVisits: 3, totalSpend: "£22.80", tags: ["Regular","VIP"], action: "View Order" },
  { name: "Ahmed Khan", caller: "07881 234 567", lastVisit: "Yesterday", totalOrders: 4, totalVisits: 3, totalSpend: "£22.80", tags: ["Regular","VIP"], action: "Call Back" },
  { name: "Ahmed Khan", caller: "07881 234 567", lastVisit: "Yesterday", totalOrders: 4, totalVisits: 3, totalSpend: "£22.80", tags: ["Regular","VIP"], action: "Call Back" },
  { name: "Ahmed Khan", caller: "07881 234 567", lastVisit: "Yesterday", totalOrders: 4, totalVisits: 3, totalSpend: "£22.80", tags: ["Loyalty"], action: "Ext#4446" },
  { name: "Ahmed Khan", caller: "07881 234 567", lastVisit: "Yesterday", totalOrders: 4, totalVisits: 3, totalSpend: "£22.80", tags: ["Loyalty"], action: "View Order" },
];

const CONVERTED: Customer[] = [
  { name: "Ahmed Khan", caller: "07881 234 567", lastVisit: "Yesterday", totalOrders: 4, totalVisits: 3, totalSpend: "£22.80", tags: ["Regular","VIP"], action: "View Order" },
  { name: "Ahmed Khan", caller: "07881 234 567", lastVisit: "Yesterday", totalOrders: 4, totalVisits: 3, totalSpend: "£22.80", tags: ["Loyalty"], action: "Ext#4446" },
];

const ORDER_HISTORY: OrderHistory[] = [
  { date: "Sun, Apr 21", type: "Phone Order", amount: "£39.50", deliveredAmount: "£16.20" },
];

const MENU_ITEMS: MenuItem[] = [
  { name: "Cheeseburger", orders: 11 },
  { name: "Chicken Wrap", orders: 7 },
  { name: "Large Fries", orders: 7 },
  { name: "Cheeseburger", orders: 11 },
  { name: "Cheeseburger", orders: 11 },
  { name: "Chicken Wrap", orders: 7 },
  { name: "Chicken Wrap", orders: 7 },
];

const FOOD_COLORS = ["bg-orange-500","bg-yellow-500","bg-red-500","bg-green-500","bg-purple-500","bg-blue-500","bg-pink-500"];

// ── Sub-components ─────────────────────────────────────────────────────────
function StatCard({ title, value, sub, change, positive }: { title: string; value: string; sub?: string; change: string; positive: boolean }) {
  return (
    <div className="relative bg-[#1a1a1c] border border-[#2e2e30] rounded-2xl p-4 overflow-hidden flex-1 min-w-0">
      <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-[#f9671a]/25 blur-2xl pointer-events-none" />
      <div className="relative">
        <div className="w-6 h-6 rounded-lg bg-[#f9671a]/15 flex items-center justify-center mb-2">
          <div className="w-3 h-3 rounded-sm bg-[#f9671a]/70" />
        </div>
        <p className="text-[10px] text-zinc-400 uppercase tracking-wide">{title}</p>
        <p className="text-lg font-bold text-[#f9671a]">{value}</p>
        {sub && <p className="text-[10px] text-zinc-500">{sub}</p>}
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

function TagBadge({ tag }: { tag: "Regular" | "VIP" | "Loyalty" }) {
  const map: Record<string, string> = {
    Regular: "bg-[#f9671a]/15 text-[#f9671a] border-[#f9671a]/30",
    VIP: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
    Loyalty: "bg-purple-500/15 text-purple-400 border-purple-500/30",
  };
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${map[tag]}`}>{tag}</span>;
}

function ActionBtn({ action }: { action: Customer["action"] }) {
  if (action === "View Order") return (
    <button className="px-3 py-1 rounded-lg border border-[#f9671a] text-[#f9671a] text-xs hover:bg-[#f9671a]/10 transition-colors whitespace-nowrap">View Order</button>
  );
  if (action === "Call Back") return (
    <button className="px-3 py-1 rounded-lg bg-[#252527] text-zinc-300 text-xs hover:text-white transition-colors whitespace-nowrap">Call Back</button>
  );
  return (
    <button className="flex items-center gap-1 px-3 py-1 rounded-lg bg-[#252527] text-zinc-300 text-xs hover:text-white transition-colors whitespace-nowrap">
      <Phone size={10} /> {action}
    </button>
  );
}

function DropPill({ label }: { label: string }) {
  return (
    <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#252527] text-zinc-400 hover:text-white text-xs font-medium transition-colors whitespace-nowrap border border-transparent">
      {label} <ChevronDown size={12} />
    </button>
  );
}

function Pill({ label, active, onClick }: { label: string; active?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
        active ? "bg-[#f9671a]/10 text-[#f9671a] border border-[#f9671a]/50" : "bg-[#252527] text-zinc-400 hover:text-white border border-transparent"
      }`}
    >
      {label}
    </button>
  );
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
        <button className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#252527] text-zinc-400 text-xs hover:text-white ml-1">5/page <ChevronDown size={11} /></button>
      </div>
    </div>
  );
}

function CustomerTable({ rows }: { rows: Customer[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-[#2e2e30]">
            {["NAME","CALLER NUMBER","LAST VISIT","TOTAL ORDERS","TOTAL VISITS","TOTAL SPEND","TAGS","ACTION"].map((h) => (
              <th key={h} className="text-left text-zinc-500 font-medium pb-2.5 pr-4 whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#2e2e30]/60">
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-zinc-800/20 transition-colors">
              <td className="py-3 pr-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">A</div>
                  <span className="text-white font-medium whitespace-nowrap">{row.name}</span>
                </div>
              </td>
              <td className="py-3 pr-4 text-zinc-300 whitespace-nowrap">{row.caller}</td>
              <td className="py-3 pr-4 text-zinc-400">{row.lastVisit}</td>
              <td className="py-3 pr-4 text-zinc-300">{row.totalOrders}</td>
              <td className="py-3 pr-4 text-zinc-300">{row.totalVisits}</td>
              <td className="py-3 pr-4 text-white font-medium">{row.totalSpend}</td>
              <td className="py-3 pr-4">
                <div className="flex items-center gap-1 flex-wrap">
                  {row.tags.map((t) => <TagBadge key={t} tag={t} />)}
                </div>
              </td>
              <td className="py-3"><ActionBtn action={row.action} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Customer Detail Panel ──────────────────────────────────────────────────
function CustomerPanel() {
  return (
    <div className="bg-[#1a1a1c] border border-[#2e2e30] rounded-2xl p-5 flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-sm font-bold text-white">C</div>
        <div>
          <p className="text-sm font-bold text-white">Cody</p>
          <p className="text-xs text-zinc-500">07881 234 587</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#f9671a]/15 text-[#f9671a] border border-[#f9671a]/30">Regular</span>
        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-yellow-500/15 text-yellow-400 border border-yellow-500/30">VIP</span>
        <button className="ml-auto text-xs text-zinc-400 hover:text-white">View All</button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3 border-b border-[#2e2e30] pb-2">
        {["History","1 Missed Call","23 orders"].map((t, i) => (
          <button key={t} className={`text-xs font-medium transition-colors whitespace-nowrap ${i === 0 ? "text-white border-b-2 border-[#f9671a] pb-2 -mb-2" : "text-zinc-500 hover:text-white"}`}>{t}</button>
        ))}
      </div>

      {/* Order history row */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs text-zinc-400">Sun, Apr 21</p>
          <button className="text-xs text-zinc-400 hover:text-white">View All</button>
        </div>
        <div className="bg-[#252527] rounded-xl p-3 flex items-center gap-2">
          <Phone size={13} className="text-[#f9671a]" />
          <div className="flex-1">
            <p className="text-xs text-white font-medium">Phone Order</p>
            <p className="text-xs text-zinc-500">10:45 PM</p>
          </div>
          <span className="text-xs font-semibold text-white">£39.50</span>
        </div>
        <div className="mt-2 pl-3 flex items-center justify-between">
          <span className="text-xs text-zinc-500">Delivered</span>
          <span className="text-xs font-semibold text-[#f9671a]">£16.20</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#252527] border border-[#2e2e30] text-white text-xs font-medium hover:border-[#f9671a]/50 transition-colors">
          <PlusCircle size={13} className="text-[#f9671a]" /> Add note
        </button>
        <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#f9671a] text-white text-xs font-medium hover:bg-[#e05a15] transition-colors">
          <MessageSquare size={13} /> Send Message
        </button>
      </div>

      {/* Most Ordered Items */}
      <div>
        <p className="text-xs font-semibold text-white mb-3">Most Ordered Items</p>
        <div className="space-y-2">
          {MENU_ITEMS.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg ${FOOD_COLORS[i % FOOD_COLORS.length]} flex items-center justify-center text-xs font-bold text-white flex-shrink-0`}>
                {item.name[0]}
              </div>
              <div className="flex-1">
                <p className="text-xs text-white">{item.name}</p>
                <p className="text-[10px] text-zinc-500">{item.orders} orders</p>
              </div>
              <ChevRight size={13} className="text-zinc-600" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function CRMPage() {
  const [activeTab, setActiveTab] = useState("Today");

  return (
    <div className="flex-1  min-h-screen text-white p-5 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <button className="w-7 h-7 rounded-lg bg-[#252527] flex items-center justify-center text-zinc-400 hover:text-white">
          <ChevronLeft size={14} />
        </button>
        <h1 className="text-lg font-bold">Crm Management</h1>
      </div>

      {/* Stat Cards */}
      <div className="flex gap-3 flex-wrap">
        <StatCard title="TOTAL CUSTOMERS" value="£185,050" change="+12.4%" positive />
        <StatCard title="REPEAT CUSTOMERS" value="14 Persons" change="+12.4%" positive />
        <StatCard title="New CUSTOMERS" sub="100 Persons" value="£185,050" change="+12.4%" positive />
        <StatCard title="PHONE ORDERS" value="£185,050" change="+12.4%" positive />
        <StatCard title="MISSED OPPORTUNITIES" value="£185,050" change="+12.4%" positive />
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-5">
        {/* Left */}
        <div className="space-y-5">
          {/* Global filter row */}
          <div className="flex flex-wrap items-center gap-2">
            <Pill label="All" active />
            <DropPill label="Visits" />
            <DropPill label="DRIVERS" />
            <DropPill label="Order" />
            <DropPill label="VIP" />
            <DropPill label="Tags" />
            <DropPill label="New" />
            <button className="px-3 py-1.5 rounded-lg bg-[#252527] text-zinc-400 hover:text-white text-xs font-medium transition-colors whitespace-nowrap">No Orders Yes</button>
            <span className="text-sm font-bold text-white">1, 284 RESULTS</span>
            <button className="ml-auto flex items-center gap-1.5 px-4 py-1.5 rounded-xl border border-[#f9671a]/50 text-[#f9671a] text-xs font-medium hover:bg-[#f9671a]/10 transition-colors">
              <RefreshCw size={12} /> Export
            </button>
          </div>

          {/* CRM Table */}
          <div className="bg-[#1a1a1c] border border-[#2e2e30] rounded-2xl p-5 space-y-4">
            <div>
              <h2 className="text-sm font-semibold text-white">CRM</h2>
              <p className="text-xs text-zinc-500">Manage customers, leads, and sales interactions in one smart platform.</p>
            </div>

            {/* Sub-filter row */}
            <div className="flex flex-wrap items-center gap-2">
              {["Today","Weekly","Monthly","Custom Range"].map((t) => (
                <Pill key={t} label={t} active={activeTab === t} onClick={() => setActiveTab(t)} />
              ))}
              <DropPill label="Visits" />
              <DropPill label="Driver" />
              <DropPill label="Order" />
              <DropPill label="VIP" />
              <DropPill label="Tags" />
              <DropPill label="New" />
            </div>

            {/* Search + Export */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2 bg-[#252527] border border-[#2e2e30] rounded-xl px-3 py-2 flex-1 min-w-[200px]">
                <Search size={14} className="text-zinc-500" />
                <input type="text" placeholder="Search order Id, customer, phone..." className="bg-transparent text-xs text-white placeholder-zinc-500 outline-none flex-1" />
              </div>
              <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#f9671a]/50 text-[#f9671a] text-xs font-medium hover:bg-[#f9671a]/10 transition-colors whitespace-nowrap">
                <Download size={12} /> Export CSV
              </button>
              <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#2e2e30] text-zinc-400 text-xs font-medium hover:text-white transition-colors whitespace-nowrap">
                Export Excel
              </button>
            </div>

            <CustomerTable rows={CUSTOMERS} />
            <Pagination />
          </div>

          {/* Converted Calls → Orders */}
          <div className="bg-[#1a1a1c] border border-[#2e2e30] rounded-2xl p-5 space-y-4">
            <h2 className="text-sm font-semibold text-white">Converted Calls → Orders</h2>
            <CustomerTable rows={CONVERTED} />
          </div>
        </div>

        {/* Right — Customer Panel */}
        <CustomerPanel />
      </div>
    </div>
  );
}