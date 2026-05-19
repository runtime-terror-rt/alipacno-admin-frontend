"use client";

import { useState } from "react";
import { Phone,  PhoneMissed, ChevronDown,
  CloudUpload,
} from "lucide-react";
import MetricCardsRow from "@/components/admin/common/MetricCardsRow";
import Pagination from "@/components/admin/ui/Pagination";
import Button from "@/components/admin/ui/Button";
import DateFiltersBar from "@/components/admin/ui/DateFilterBar";
import FilterDropdown from "@/components/admin/ui/FilterDropdown";
import { useRouter } from "next/navigation";

// ── Types ──────────────────────────────────────────────────────────────────
type CallStatus = "Answered" | "Missed";
type CallOutcome = "Missed Call" | "No Order" | string; // order id

interface CallLog {
  time: string;
  number: string;
  customer: string;
  duration: string;
  status: CallStatus;
  outcome: CallOutcome;
  linkedOrder: string;
  postcode: string;
}

interface ConvertedOrder {
  time: string;
  number: string;
  customer: string;
  duration: string;
  order: string;
  orderType: string;
  status: "Completed";
  postcode: string;
}

interface CallLogEntry {
  time: string;
  duration: string;
  date: string;
  customer: string;
  phone: string;
  branch: string;
  tag: string;
  tagVariant: "orange" | "red" | "purple";
}

// ── Mock Data ──────────────────────────────────────────────────────────────
const CALL_LOGS: CallLog[] = [
  { time: "08:4PM", number: "+44 3050 244896", customer: "Sarah Mitchell", duration: "04:12", status: "Answered", outcome: "#44569", linkedOrder: "#UK1042 (£300)", postcode: "NW1 6XE" },
  { time: "08:4PM", number: "+44 3050 244896", customer: "Sarah Mitchell", duration: "04:12", status: "Missed",   outcome: "Missed Call", linkedOrder: "#4569 (£300)", postcode: "NW1 6XE" },
  { time: "08:4PM", number: "+44 3050 244896", customer: "Sarah Mitchell", duration: "04:12", status: "Answered", outcome: "#44569", linkedOrder: "#4569 (£300)", postcode: "NW1 6XE" },
  { time: "08:4PM", number: "+44 3050 244896", customer: "Sarah Mitchell", duration: "04:12", status: "Missed",   outcome: "Missed Call", linkedOrder: "#4569 (£300)", postcode: "NW1 6XE" },
  { time: "08:4PM", number: "+44 3050 244896", customer: "Sarah Mitchell", duration: "04:12", status: "Answered", outcome: "No Order",  linkedOrder: "#4568 (£300)", postcode: "NW1 6XE" },
];

const CONVERTED_ORDERS: ConvertedOrder[] = [
  { time: "08:4PM", number: "+44 3050 244896", customer: "Sarah Mitchell", duration: "04:12", order: "#4569 (£300)", orderType: "Delivery", status: "Completed", postcode: "NW1 6XE" },
  { time: "08:4PM", number: "+44 3050 244896", customer: "Sarah Mitchell", duration: "04:12", order: "#4569 (£300)", orderType: "Delivery", status: "Completed", postcode: "NW1 6XE" },
  { time: "08:4PM", number: "+44 3050 244896", customer: "Sarah Mitchell", duration: "04:12", order: "#4569 (£300)", orderType: "Delivery", status: "Completed", postcode: "NW1 6XE" },
];

// const HISTORY_LOGS: CallLogEntry[] = [
//   { time: "09:42 AM", duration: "02:18", date: "May 04, 2026", customer: "Brooklyn Simmons", phone: "(312) 555-0192", branch: "Eltham (ELO1)", tag: "Older Placed", tagVariant: "orange" },
//   { time: "09:42 AM", duration: "02:18", date: "May 04, 2026", customer: "Brooklyn Simmons", phone: "(312) 555-0192", branch: "Eltham (ELO1)", tag: "Older Placed", tagVariant: "orange" },
//   { time: "09:42 AM", duration: "02:18", date: "May 04, 2026", customer: "Brooklyn Simmons", phone: "(312) 555-0192", branch: "Eltham (ELO1)", tag: "Older Placed", tagVariant: "red" },
//   { time: "09:42 AM", duration: "02:18", date: "May 04, 2026", customer: "Brooklyn Simmons", phone: "(312) 555-0192", branch: "Eltham (ELO1)", tag: "Older Placed", tagVariant: "orange" },
//   { time: "09:42 AM", duration: "02:18", date: "May 04, 2026", customer: "Brooklyn Simmons", phone: "(312) 555-0192", branch: "Eltham (ELO1)", tag: "Order Converted", tagVariant: "purple" },
// ];


// ── Call Status Badge ──────────────────────────────────────────────────────
function CallStatusBadge({ status }: { status: CallStatus }) {
  return status === "Answered"
    ? <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/15 text-green-400 border border-green-500/25">Answered</span>
    : <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/15 text-red-400 border border-red-500/25">Missed</span>;
}

function OutcomeBadge({ outcome }: { outcome: string }) {
  if (outcome === "Missed Call") return (
    <span className="flex items-center gap-1 text-xs text-red-400"><PhoneMissed size={11} /> Missed Call</span>
  );
  if (outcome === "No Order") return (
    <span className="flex items-center gap-1 text-xs text-zinc-400"><Phone size={11} /> No Order</span>
  );
  return <span className="text-xs text-green-400 font-medium">{outcome}</span>;
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function CallLogsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const router = useRouter();

  return (
    <div className="flex-1 min-h-screen text-white p-5 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold">Call Logs</h1>
        <p className="text-xs text-zinc-500 mt-0.5">Track customer calls and communication history.</p>
      </div>

      <MetricCardsRow metricCards={[
          { label: "Total Calls", value: "50", change: "+12.1%", positive: true },
          { label: "Call Converted", value: "30", change: "+1.7%", positive: true },
          { label: "Missed Calls", value: "20", change: "+2.5%", positive: true },
          { label: "Conversion Rate", value: "24.8%", change: "-0.8%", positive: false },
          { label: "Avg. Call Duration", value: "04:22", change: "+5.4%", positive: true, note: "Labor + COGS" },
      ]} grid="5" />


      {/* Call Logs Panel */}
      <div className="bg-[#1a1a1c] border border-[#2e2e30] rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <h2 className="text-sm font-semibold text-white">Call Logs Panel</h2>
            <p className="text-xs text-zinc-500">Track and monitor all order-related calls in real time.</p>
          </div>
          {/* Avatar stack placeholder */}
          <div className="flex -space-x-2">
            {["bg-orange-500","bg-purple-500"].map((c,i) => (
              <div key={i} className={`w-8 h-8 rounded-full ${c} border-2 border-[#1a1a1c] flex items-center justify-center text-xs font-bold text-white`}>S</div>
            ))}
          </div>
        </div>

        {/* Filter row */}
        <div className="ml-auto flex items-center justify-between gap-2 flex-wrap">
             {/* Filters Row 1 */}
              <div className="flex flex-wrap items-center    gap-2 mb-3">
                <DateFiltersBar
                    tabs={["All", "On Delivery", "Available", "Break", "Offline"]}
                    defaultTab="Weekly"
                    onChange={(tab) => {
                      console.log("Selected:", tab);
                    }}
                />
              </div>

              <div className="flex flex-wrap gap-2 ">
                  <FilterDropdown label="Driver Status" />
                  <FilterDropdown label="Branch" />
                  <FilterDropdown label="Vehicle Type" />
                  <FilterDropdown label="Shift" />
              </div>

              {/*  Export Row */}
              <div className="flex items-center gap-3 mb-4 bg-[#1a1a1c]">
               {/* Export buttons */}
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#2e2e30] hover:border-[#f9671a] text-[#626262] hover:text-[#f9671a] text-sm font-medium hover:bg-[#f9671a]/10 transition-colors cursor-pointer">
                    <CloudUpload size={15} /> Export CSV
                </button>
              </div>
              </div>
          </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#2e2e30]">
                {["TIME","CALL NUMBER","CUSTOMER","DURATION","CALL STATUS","OUTCOME","LINKED ORDER","POSTCODE","ACTION"].map((h) => (
                  <th key={h} className="text-left text-zinc-500 font-medium pb-2.5 pr-4 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2e2e30]/60">
              {CALL_LOGS.map((row, i) => (
                <tr key={i} className="hover:bg-zinc-800/20 transition-colors">
                  <td className="py-3 pr-4 text-zinc-300 whitespace-nowrap">{row.time}</td>
                  <td className="py-3 pr-4 text-zinc-300 whitespace-nowrap">{row.number}</td>
                  <td className="py-3 pr-4 text-white font-medium whitespace-nowrap">{row.customer}</td>
                  <td className="py-3 pr-4 text-zinc-300">{row.duration}</td>
                  <td className="py-3 pr-4"><CallStatusBadge status={row.status} /></td>
                  <td className="py-3 pr-4"><OutcomeBadge outcome={row.outcome} /></td>
                  <td className="py-3 pr-4 text-[#f9671a] text-xs">{row.linkedOrder}</td>
                  <td className="py-3 pr-4 text-zinc-300">{row.postcode}</td>
                  <td className="py-3">
                    {i === 0
                      ?  <Button onClick={() => router.push('/admin/call-logs/2')} variant="table">View Order</Button>
                      : <Button variant="table">Call Back</Button>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination />
      </div>

      {/* Converted Call Orders */}
      <div className="bg-[#1a1a1c] border border-[#2e2e30] rounded-2xl p-5 space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {["bg-orange-500","bg-purple-500"].map((c,i) => (
              <div key={i} className={`w-8 h-8 rounded-full ${c} border-2 border-[#1a1a1c] flex items-center justify-center text-xs font-bold text-white`}>S</div>
            ))}
          </div>
          <h2 className="text-sm font-semibold text-white">Converted Call Orders</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#2e2e30]">
                {["TIME","CALL NUMBER","CUSTOMER","DURATION","#ORDER","ORDER TYPE","STATUS","POSTCODE","ACTION"].map((h) => (
                  <th key={h} className="text-left text-zinc-500 font-medium pb-2.5 pr-4 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2e2e30]/60">
              {CONVERTED_ORDERS.map((row, i) => (
                <tr key={i} className="hover:bg-zinc-800/20 transition-colors">
                  <td className="py-3 pr-4 text-zinc-300 whitespace-nowrap">{row.time}</td>
                  <td className="py-3 pr-4 text-zinc-300 whitespace-nowrap">{row.number}</td>
                  <td className="py-3 pr-4 text-white font-medium whitespace-nowrap">{row.customer}</td>
                  <td className="py-3 pr-4 text-zinc-300">{row.duration}</td>
                  <td className="py-3 pr-4 text-green-400">{row.order}</td>
                  <td className="py-3 pr-4 text-[#f9671a]">{row.orderType}</td>
                  <td className="py-3 pr-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/15 text-green-400 border border-green-500/25">Completed</span>
                  </td>
                  <td className="py-3 pr-4 text-zinc-300">{row.postcode}</td>
                  <td className="py-3">
                    <Button onClick={() => router.push('/admin/call-logs/2')} variant="table">View Order</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination />
      </div>

      {/* Order History & Call Logs */}
      {/* <div>
        <h2 className="text-sm font-semibold text-white mb-1">Order History & Call Logs</h2>
        <p className="text-xs text-zinc-500 mb-4">Combined Customer order and support interaction logs</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {HISTORY_LOGS.map((log, i) => (
            <div key={i} className="bg-[#1a1a1c] border border-[#2e2e30] rounded-xl p-4 flex flex-col gap-3">
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-green-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone size={11} className="text-green-400" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">{log.time}</p>
                  <p className="text-xs text-zinc-500">Call Duration: {log.duration}</p>
                </div>
              </div>
              <p className="text-xs text-zinc-400">{log.date}</p>
              <div>
                <p className="text-xs font-semibold text-white">{log.customer}</p>
                <p className="text-xs text-zinc-500">{log.phone}</p>
              </div>
              <p className="text-xs text-zinc-400">{log.branch}</p>
              <button className={`w-full py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                log.tagVariant === "purple" ? "bg-purple-600 text-white border-transparent"
                : log.tagVariant === "red" ? "border-red-500 text-red-400"
                : "border-[#f9671a] text-[#f9671a]"
              }`}>
                {log.tag}
              </button>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
}