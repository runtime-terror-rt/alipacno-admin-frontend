"use client";

import PageHeader from "@/components/admin/ui/PageHeader";
import MetricCardsRow from "@/components/admin/common/MetricCardsRow";
import StockTrackingPanel from "@/components/admin/inventory/StockTrackingPanel";
import InventoryStockOverview from "@/components/admin/inventory/InventoryStockOverview";

export default function InventoryManagementPage() {
  const inventoryStats = [
        {
            label: "Total Items",  value: "132" ,  change: "+8.4%",   positive: false
        }
        ,
        {
            label:"Low Stock Items"   ,   value:"12"  ,    change:"+7.8%",  positive:true
        },
        {label:"Out of Stock Items",  value:"5" ,     change:"+6.1%",  positive:false },
        {label:"Total Stock Value" ,  value:"£18,650", change:"+12.4%",positive:true }
      ]
  return (
    <div className="flex-1 bg-[#0f0f11] min-h-screen text-white p-5 space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-white">Inventory Management</h1>
        <p className="text-xs text-zinc-500 mt-0.5"></p>
      </div>

      <PageHeader title="Inventory Management" subtitle="Track stock levels, manage availability across all branches." />

      {/* Stat Cards */}

      <MetricCardsRow metricCards={inventoryStats} />

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-6">
        {/* LEFT — Stock Tracking Table */}
        <StockTrackingPanel />

        {/* RIGHT — Stock Alert Overview */}
        <InventoryStockOverview />
      </div>
    </div>
  );
}