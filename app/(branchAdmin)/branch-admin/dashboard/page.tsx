"use client";

import { useState } from "react";
import {
  TrendingUp,
  ShoppingBag,
  Users,
  AlertTriangle,
  Clock,
  Download,
  Smartphone,
  CreditCard,
  Wallet,
  BarChart3Icon,
} from "lucide-react";
import MetricCard from "@/components/admin/ui/MetricCard";
import BreakdownCard from "@/components/Branch-manager/POS/Dashboard/BreakdownCard";
import { dashboardBreakdownData } from "./data";
import PageHeader from "@/components/admin/common/PageHeader";

type FilterType = "today" | "week" | "month" | "year";

const dashboardMetrics = [
  {
    label: "Today's Revenue",
    value: "£3842.50",
    change: "+12.5%",
    positive: true,
    note: "vs yesterday",
    icon: <span className="text-orange-500 font-bold text-lg">£</span>,
  },
  {
    label: "Orders Today",
    value: "127",
    change: "+8.3%",
    positive: true,
    note: "vs yesterday",
    icon: <ShoppingBag className="h-5 w-5 text-orange-500" />,
  },
  {
    label: "Average Order",
    value: "£30.25",
    change: "+5.2%",
    positive: true,
    note: "vs yesterday",
    icon: <TrendingUp className="h-5 w-5 text-orange-500" />,
  },
  {
    label: "Active Customers",
    value: "1245",
    change: "+3.0%",
    positive: true,
    note: "vs yesterday",
    icon: <Users className="h-5 w-5 text-orange-500" />,
  },
];

export default function DashboardPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("today");
  const [exporting, setExporting] = useState(false);

  // Simulated export handler
  const handleExport = () => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      alert("Business Performance Report exported successfully!");
    }, 1200);
  };

  return (
    <div className="space-y-6 sm:space-y-8 ">
      {/* 1. HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <PageHeader
          title="Dashboard"
          subtitle="Detailed insights into your business performance"
        />

        {/* Filter Controls & Export */}
        <div className="flex items-center space-x-3.5 self-start md:self-auto">
          <div className="flex  p-1 gap-2 rounded-xl">
            {(["today", "week", "month", "year"] as FilterType[]).map(
              (filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`
                  px-3 py-1.5 rounded-lg cursor-pointer text-xs font-bold capitalize transition-all
                  ${
                    activeFilter === filter
                      ? "bg-orange-500 text-white shadow-md shadow-orange-500/10"
                      : "text-zinc-400 bg-[#252527] hover:text-white"
                  }
                `}
                >
                  {filter}
                </button>
              ),
            )}
          </div>

          <button
            onClick={handleExport}
            disabled={exporting}
            className="flex items-center space-x-1.5 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-600/60 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-lg shadow-orange-500/10 transition-all cursor-pointer"
          >
            <Download className="h-3.5 w-3.5" />
            <span>{exporting ? "Exporting..." : "Export"}</span>
          </button>
        </div>
      </div>

      {/* 2. STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {dashboardMetrics.map((metric, index) => (
          <MetricCard iconBorder={false} key={index} card={metric} />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {dashboardBreakdownData.map((card, index) => (
          <BreakdownCard key={index} {...card} />
        ))}
      </div>

      {/* COLUMN 1:  */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 space-x-6">
        {/* Top Products */}
        <div className="bg-[#252527] border border-zinc-800/80 rounded-2xl p-5 space-y-4 flex-1">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Top Products
            </h3>
            <BarChart3Icon className="h-4 w-4 text-orange-500" />
          </div>

          <div className="space-y-3.5">
            {/* Product 1 */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-white">
                  Ribeye Steak{" "}
                  <span className="text-zinc-500 font-normal">(25 sold)</span>
                </span>
                <span className="text-orange-500">£1065.55</span>
              </div>
              <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-500 rounded-full"
                  style={{ width: "75%" }}
                ></div>
              </div>
            </div>

            {/* Product 2 */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-white">
                  Margherita Pizza{" "}
                  <span className="text-zinc-500 font-normal">(36 sold)</span>
                </span>
                <span className="text-orange-500">£493.82</span>
              </div>
              <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-500 rounded-full"
                  style={{ width: "50%" }}
                ></div>
              </div>
            </div>

            {/* Product 3 */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-white">
                  Caesar Salad{" "}
                  <span className="text-zinc-500 font-normal">(34 sold)</span>
                </span>
                <span className="text-orange-500">£325.90</span>
              </div>
              <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-500 rounded-full"
                  style={{ width: "40%" }}
                ></div>
              </div>
            </div>

            {/* Product 4 */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-white">
                  French Fries{" "}
                  <span className="text-zinc-500 font-normal">(52 sold)</span>
                </span>
                <span className="text-orange-500">£208.45</span>
              </div>
              <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-500 rounded-full"
                  style={{ width: "30%" }}
                ></div>
              </div>
            </div>

            {/* Product 5 */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-white">
                  Chicken Wings{" "}
                  <span className="text-zinc-500 font-normal">(28 sold)</span>
                </span>
                <span className="text-orange-500">£179.72</span>
              </div>
              <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-500 rounded-full"
                  style={{ width: "25%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* COLUMN 2: Payments (4 Cols) */}
        <div className="space-y-6 ">
          {/* Payment Methods */}
          <div className="bg-[#252527] border border-zinc-800/80 rounded-2xl p-5 space-y-4 flex flex-col justify-between flex-1">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Payment Methods
            </h3>

            <div className="space-y-3.5">
              {/* Method 1 */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-bold">
                  <div className="flex items-center space-x-2 text-zinc-300">
                    <CreditCard className="h-3.5 w-3.5 text-orange-500" />
                    <span>Card</span>
                  </div>
                  <span className="text-white">67%</span>
                </div>
                <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-orange-500 rounded-full"
                    style={{ width: "67%" }}
                  ></div>
                </div>
              </div>

              {/* Method 2 */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-bold">
                  <div className="flex items-center space-x-2 text-zinc-300">
                    <Wallet className="h-3.5 w-3.5 text-orange-500" />
                    <span>Cash</span>
                  </div>
                  <span className="text-white">32%</span>
                </div>
                <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-orange-500 rounded-full"
                    style={{ width: "32%" }}
                  ></div>
                </div>
              </div>

              {/* Method 3 */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-bold">
                  <div className="flex items-center space-x-2 text-zinc-300">
                    <Smartphone className="h-3.5 w-3.5 text-orange-500" />
                    <span>Digital Wallet</span>
                  </div>
                  <span className="text-white">1%</span>
                </div>
                <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-orange-500 rounded-full"
                    style={{ width: "1%" }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Total Processed Footer */}
            <div className="pt-4 border-t border-zinc-800/40 flex justify-between items-center">
              <span className="text-xs text-zinc-400 font-semibold">
                Total Processed
              </span>
              <span className="text-base font-black text-orange-500">
                £3887.50
              </span>
            </div>
          </div>
        </div>

        {/* COLUMN 3: Recent Activity Feed (3 Cols) */}
        <div className=" bg-[#252527] border border-zinc-800/80 rounded-2xl p-5 space-y-4.5 ">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Recent Activity
            </h3>

            <div className="relative pl-4 space-y-5 border-l border-zinc-800">
              {/* Activity 1 */}
              <div className="relative">
                <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-orange-500 border-2 border-[#121214]" />
                <div className="space-y-1">
                  <p className="text-xs font-bold text-white">
                    Order #127 completed
                  </p>
                  <p className="text-[10px] text-orange-500 font-bold">
                    £45.50
                  </p>
                  <div className="flex items-center text-[9px] text-zinc-500 font-semibold mt-1">
                    <Clock className="h-2.5 w-2.5 mr-1" />
                    <span>2 mins ago</span>
                  </div>
                </div>
              </div>

              {/* Activity 2 */}
              <div className="relative">
                <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-[#121214]" />
                <div className="space-y-1">
                  <p className="text-xs font-bold text-white">
                    Card payment processed
                  </p>
                  <p className="text-[10px] text-emerald-500 font-bold">
                    £62.75
                  </p>
                  <div className="flex items-center text-[9px] text-zinc-500 font-semibold mt-1">
                    <Clock className="h-2.5 w-2.5 mr-1" />
                    <span>5 mins ago</span>
                  </div>
                </div>
              </div>

              {/* Activity 3 */}
              <div className="relative">
                <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-sky-500 border-2 border-[#121214]" />
                <div className="space-y-1">
                  <p className="text-xs font-bold text-white">
                    New customer registered
                  </p>
                  <div className="flex items-center text-[9px] text-zinc-500 font-semibold mt-1">
                    <Clock className="h-2.5 w-2.5 mr-1" />
                    <span>12 mins ago</span>
                  </div>
                </div>
              </div>

              {/* Activity 4 */}
              <div className="relative">
                <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-amber-500 border-2 border-[#121214]" />
                <div className="space-y-1">
                  <p className="text-xs font-bold text-white">
                    Stock alert: Tomatoes low
                  </p>
                  <p className="text-[10px] text-amber-500 font-semibold">
                    Remaining: 5kg
                  </p>
                  <div className="flex items-center text-[9px] text-zinc-500 font-semibold mt-1">
                    <Clock className="h-2.5 w-2.5 mr-1" />
                    <span>18 mins ago</span>
                  </div>
                </div>
              </div>

              {/* Activity 5 */}
              <div className="relative">
                <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-orange-500 border-2 border-[#121214]" />
                <div className="space-y-1">
                  <p className="text-xs font-bold text-white">
                    Delivery #125 completed
                  </p>
                  <div className="flex items-center text-[9px] text-zinc-500 font-semibold mt-1">
                    <Clock className="h-2.5 w-2.5 mr-1" />
                    <span>25 mins ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="  rounded-2xl space-y-4.5 ">
        <h3 className="text-xl font-bold text-white tracking-wider">
          Alerts & Actions
        </h3>

        <div className="space-x-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {/* Alert 1 */}
          <div className="flex items-start space-x-3.5 p-3.5 rounded-xl bg-[#252527] border border-red-500/10">
            <AlertTriangle className="h-4.5 w-4.5 text-[#FB2C36] shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-xs font-bold text-white">
                3 items are out of stock
              </p>
              <button className="text-[10px] font-bold text-[#FB2C36] hover:text-red-300 underline mt-1 transition-colors">
                View Inventory
              </button>
            </div>
          </div>

          {/* Alert 2 */}
          <div className="flex items-start space-x-3.5 p-3.5 rounded-xl bg-[#252527] border border-orange-500/10">
            <AlertTriangle className="h-4.5 w-4.5 text-[#FE9A00] shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-xs font-bold text-white">
                2 pending delivery assignments
              </p>
              <button className="text-[10px] font-bold text-[#FE9A00] hover:text-orange-300 underline mt-1 transition-colors">
                Assign Deliveries
              </button>
            </div>
          </div>

          {/* Alert 3 */}
          <div className="flex items-start space-x-3.5 p-3.5 rounded-xl bg-[#252527] border border-sky-500/10">
            <AlertTriangle className="h-4.5 w-4.5 text-[#2B7FFF] shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-xs font-bold text-white">
                5 orders in preparation queue
              </p>
              <button className="text-[10px] font-bold text-[#2B7FFF] hover:text-sky-300 underline mt-1 transition-colors">
                View KDS
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
