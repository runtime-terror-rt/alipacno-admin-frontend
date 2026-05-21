"use client";

import {
  Search,  RefreshCw, ChevronRight as ChevRight,
  CloudUpload,
  User,
  Phone,
  PhoneIncoming,
  CircleAlert,
} from "lucide-react";
import MetricCardsRow from "@/components/admin/common/MetricCardsRow";
import PageHeader from "@/components/admin/ui/PageHeader";
import FilterDropdown from "@/components/admin/ui/FilterDropdown";
import DateFiltersBar from "@/components/admin/ui/DateFilterBar";
import Pagination from "@/components/admin/ui/Pagination";
import CustomerTable from "@/components/admin/crm/CustomerTable";
import CustomerPanel from "@/components/admin/crm/CustomerPanel";

// ── Types ──────────────────────────────────────────────────────────────────
export interface Customer {
  name: string;
  caller: string;
  lastVisit: string;
  totalOrders: number;
  totalVisits: number;
  totalSpend: string;
  tags: Array<"Regular" | "VIP" | "Loyalty">;
  action: "View Order" | "Call Back" | "Ext#4446";
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


// ── Main Page ──────────────────────────────────────────────────────────────
export default function CRMPage() {
  const crmMetrics = [
          { icon: <Phone size={18} />,label: "TOTAL CUSTOMERS", value: "£185,050", change: "+12.4%", positive: true },
          { icon: <User size={18} className="fill-primary" />,label: "REPEAT CUSTOMERS", value: "14 Persons", change: "+12.4%", positive: true },
          { icon: <PhoneIncoming size={18}  />,label: "PHONE ORDERS", value: "£185,050", change: "+12.4%", positive: true },
          { icon: <User size={18} className="fill-primary" />,label: "NEW ORDERS", value: "£185,050", change: "+12.4%", positive: true },
          { icon: <CircleAlert   size={18}  />,label: "MISSED OPPORTUNITIES", value: "£185,050", change: "+12.4%", positive: true },
        ]
  return (
    <div className="flex-1  min-h-screen text-white p-5 space-y-6">

      <PageHeader title="CRM Management" subtitle="Manage customers, leads, and sales interactions in one smart platform." backButton />

      <MetricCardsRow 
      metricCards={
        crmMetrics
      }
      grid="5"
      />

      {/* Main grid */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-5">
        {/* Left */}
        <div className="space-y-5">
          {/* Global filter row */}
          <div className="flex flex-wrap items-center gap-2">
            <FilterDropdown label="All" />
            <FilterDropdown label="Visits" />
            <FilterDropdown label="DRIVERS" />
            <FilterDropdown label="Order" />
            <FilterDropdown label="VIP" />
            <FilterDropdown label="Tags" />
            <FilterDropdown label="New" />
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

              <DateFiltersBar 
              tabs={["Today","Weekly","Monthly","Custom Range"]}
              />
              <FilterDropdown label="Visits" />
              <FilterDropdown label="Driver" />
              <FilterDropdown label="Order" />
              <FilterDropdown label="VIP" />
              <FilterDropdown label="Tags" />
              <FilterDropdown label="New" />
            </div>

            {/* Search + Export */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2 bg-[#252527] border border-[#2e2e30] rounded-xl px-3 py-2 flex-1 min-w-[200px]">
                <Search size={14} className="text-zinc-500" />
                <input type="text" placeholder="Search order Id, customer, phone..." className="bg-transparent text-xs text-white placeholder-zinc-500 outline-none flex-1" />
              </div>
              <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#f9671a]/50 text-[#f9671a] text-xs font-medium hover:bg-[#f9671a]/10 transition-colors whitespace-nowrap">
                <CloudUpload size={12} /> Export CSV
              </button>
              <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#2e2e30] text-zinc-400 text-xs font-medium hover:text-white transition-colors whitespace-nowrap">
                <CloudUpload size={12} /> Export Excel
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