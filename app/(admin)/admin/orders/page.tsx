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