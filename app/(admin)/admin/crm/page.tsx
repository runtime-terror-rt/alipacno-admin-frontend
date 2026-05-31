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
import CrmTable from "@/components/admin/crm/CrmTable";

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
          <div className="flex flex-wrap items-center gap-6">
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
          <CrmTable />

          {/* Converted Calls → Orders */}
          <div className="bg-[#1e1e20] border border-[#2e2e30] rounded-2xl p-5 space-y-4">
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