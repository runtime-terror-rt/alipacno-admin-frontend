"use client";

import PageHeader from "@/components/admin/ui/PageHeader";
import MetricCardsRow from "@/components/admin/common/MetricCardsRow";
import OrderStatusDonut from "@/components/admin/orders/OrderStatusDonut";
import OrdersRevenueTrend from "@/components/admin/orders/OrdersRevenueTrend";
import OrderReportPanel from "@/components/admin/orders/OrderReportPanel";
import OrderOperationalInsights from "@/components/admin/orders/OrderOperationalInsights";

export default function OrdersPage() {

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
            <OrderReportPanel />

            {/* Order History & Call Logs */}
            {/* 
            <div>
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
            </div>
            */}

            {/* Bottom Charts Row */}
            <div className="grid grid-cols-2 gap-4">
              {/* Donut */}
              <OrderStatusDonut />

              {/* Revenue Trend */}
              <OrdersRevenueTrend />
            </div>
          </div>

          {/* RIGHT COLUMN — Operational Insights */}
          <OrderOperationalInsights />
        </div>
      </main>
  );
}