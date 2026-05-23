"use client";

import MetricCardsRow from "@/components/admin/common/MetricCardsRow";
import OrderHistoryCallLogs from "@/components/admin/col-logs/OrderHistoryCallLogs";
import CallLogsPanel from "@/components/admin/col-logs/CallLogsPanel";
import ConvertedCallOrders from "@/components/admin/col-logs/ConvertedCallOrders";
import { ClockArrowUp, Phone, PhoneIncoming, PhoneOutgoing, Timer } from "lucide-react";

// ── Main Page ──────────────────────────────────────────────────────────────
export default function CallLogsPage() {
  const callLogsMetrics =[
          { icon : <PhoneIncoming size={18} />,label: "Total Calls", value: "50", change: "+12.1%", positive: true },
          { icon : <PhoneOutgoing  size={18} />,label: "Call Converted", value: "30", change: "+1.7%", positive: true },
          { icon : <PhoneOutgoing  size={18} />,label: "Missed Calls", value: "20", change: "+2.5%", positive: true },
          { icon : <ClockArrowUp size={18} />,label: "Conversion Rate", value: "24.8%", change: "-0.8%", positive: false },
          { icon : <Timer  size={18} />,label: "Avg. Call Duration", value: "04:22", change: "+5.4%", positive: true, note: "Labor + COGS" },
      ]
  return (
    <div className="flex-1 min-h-screen text-white p-5 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold">Call Logs</h1>
        <p className="text-xs text-zinc-500 mt-0.5">Track customer calls and communication history.</p>
      </div>

      <MetricCardsRow metricCards={callLogsMetrics} grid="5" />


      {/* Call Logs Panel */}
      <CallLogsPanel />

      {/* Converted Call Orders */}
      <ConvertedCallOrders /> 

      {/* Order History & Call Logs */}
      <OrderHistoryCallLogs />
    </div>
  );
}