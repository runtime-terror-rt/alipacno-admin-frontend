"use client";

import { useState } from "react";
import {
  BarChart3,
  DollarSign,
  Package,
  Users,
  Clock,
  Download,
  Search,
  Calendar,
  CreditCard,
  Wallet,
  TrendingUp,
  Percent,
  CheckCircle2,
} from "lucide-react";
import {
  INCOME_STATS,
  TOP_PRODUCTS,
  PAYMENT_METHODS,
  HOURLY_PERFORMANCE,
  StatGroup,
} from "./data";
import PageHeader from "@/components/admin/common/PageHeader";

export default function IncomeReportsPage() {
  const [activePeriod, setActivePeriod] = useState<string>("Today");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Helpers to assign matching icons
  const getGroupIcon = (iconName: string) => {
    switch (iconName) {
      case "dollar":
        return DollarSign;
      case "package":
        return Package;
      case "users":
        return Users;
      case "clock":
        return Clock;
      default:
        return BarChart3;
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn pb-12">
      {/* Nearest Branch Banner & Global Timing Header (Pre-constructed in layout) */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <PageHeader
          title="Income Reports & Analytics"
          subtitle="Detailed insights into your business performance"
        />

        {/* Time period quick selector + Export buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex gap-1 rounded-xl p-1">
            {[
              "Today",
              "Week",
              "Month",
              "Year",
              "Last Week",
              "This Week",
              "Yesterday",
            ].map((period) => {
              const isActive = activePeriod === period;
              return (
                <button
                  key={period}
                  onClick={() => setActivePeriod(period)}
                  className={`
                    px-3 py-1.5 rounded-lg text-sm  tracking-wider transition cursor-pointer
                    ${
                      isActive
                        ? "bg-orange-500 text-white"
                        : "text-[#9CA3AF] bg-[#252527] hover:text-zinc-200"
                    }
                  `}
                >
                  {period}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => alert("Reports spreadsheet exported successfully.")}
            className="px-4 py-2.5 bg-orange-500 hover:bg-orange-600 rounded-xl text-xs font-black uppercase tracking-wider text-white flex items-center justify-center space-x-1.5 transition shadow-md shadow-orange-500/10 cursor-pointer"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Top 4 Stat Groups */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {INCOME_STATS.map((group, groupIdx) => {
          const Icon = getGroupIcon(group.iconName);

          // Pick active background icon color
          let iconBg = "bg-[#00C950] border-emerald-500/20 text-white";
          if (group.iconName === "package")
            iconBg = "bg-[#2B7FFF] border-blue-500/20 text-white";
          if (group.iconName === "users")
            iconBg = "bg-[#AD46FF] border-purple-500/20 text-white";
          if (group.iconName === "clock")
            iconBg = "bg-[#FE9A00] border-amber-500/20 text-white";

          return (
            <div
              key={groupIdx}
              className="bg-[#252527] border border-[#343435] rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between space-y-4"
            >
              {/* Card Header Label */}
              <div className="flex items-center space-x-3">
                <div
                  className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 border ${iconBg}`}
                >
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <span className=" text-sm sm:text-lg font-semibold text-white tracking-widest leading-none">
                  {group.title}
                </span>
              </div>

              {/* Stat parameters */}
              <div className="space-y-2.5 pt-1">
                {group.metrics.map((metric, metricIdx) => (
                  <div
                    key={metricIdx}
                    className="flex justify-between items-end border-b border-[#343435] pb-1.5 last:border-b-0 last:pb-0"
                  >
                    <div>
                      <span className="block text-xs text-[#9CA3AF] tracking-wider">
                        {metric.label}
                      </span>
                      <span className="block text-sm sm:text-lg font-black text-white mt-1 leading-none">
                        {metric.value}
                      </span>
                    </div>

                    {/* Change indicator pill */}
                    <span className="px-2 py-0.5 rounded  text-[#00C950]  text-[9px] font-black uppercase leading-none">
                      {metric.change}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Roster / Search Section */}
      <div className="relative w-full">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
          <Search className="h-4 w-4 text-zinc-550" />
        </span>
        <input
          type="text"
          placeholder="Search reports or category statistics..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#252527] border border-zinc-800 rounded-2xl py-3.5 pl-11 pr-4 text-xs sm:text-sm text-white placeholder-zinc-555 focus:outline-none focus:border-orange-500 transition-colors"
        />
      </div>

      {/* Main Analysis grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left Side: Top Products List (3 columns width) */}
        <div className="lg:col-span-3 bg-[#252527] border border-[#343435] rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white tracking-wider">
              Top Products
            </h3>
            <BarChart3 className="h-4.5 w-4.5 text-[#F9671A]" />
          </div>

          <div className="space-y-4 pt-1">
            {TOP_PRODUCTS.map((prod) => (
              <div key={prod.name} className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold">
                  <div>
                    <span className="text-white block font-black">
                      {prod.name}
                    </span>
                    <span className="text-zinc-555 text-[10px] mt-0.5 block">
                      {prod.soldCount} sold
                    </span>
                  </div>
                  <span className="text-orange-550 font-black">
                    £{prod.revenue.toFixed(2)}
                  </span>
                </div>

                {/* Filled horizontal progress indicator */}
                <div className="w-full h-2 rounded-full bg-zinc-900 overflow-hidden">
                  <div
                    className="h-full bg-[#F9671A] rounded-full transition-all duration-1000"
                    style={{ width: `${prod.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Payment Methods split (2 columns width) */}
        <div className="lg:col-span-2 bg-[#252527] border border-[#343435] rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CreditCard className="h-4.5 w-4.5 text-[#F9671A]" />
              <h3 className="text-sm font-black text-white uppercase tracking-wider">
                Payment Methods
              </h3>
            </div>
          </div>

          <div className="space-y-5 pt-1">
            {PAYMENT_METHODS.map((method) => {
              // Custom colors matching card/cash metrics
              let barColor = "bg-purple-500";
              if (method.name === "Cash") barColor = "bg-emerald-500";
              if (method.name === "Digital Wallet") barColor = "bg-blue-500";

              return (
                <div key={method.name} className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <div className="flex items-center space-x-2">
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${barColor}`}
                      />
                      <span className="text-white font-black">
                        {method.name}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-white font-black block">
                        {method.percentage}%
                      </span>
                      <span className="text-zinc-555 text-[10px] mt-0.5 block">
                        £{method.amount.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Split Progress */}
                  <div className="w-full h-2 rounded-full bg-zinc-900 overflow-hidden">
                    <div
                      className={`h-full ${barColor} rounded-full transition-all duration-1000`}
                      style={{ width: `${method.percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}

            {/* Total Highlighted value at the bottom */}
            <div className="pt-4 border-t border-[#353537] flex justify-between items-center text-xs font-black">
              <span className="text-zinc-400 font-bold uppercase tracking-wider">
                Total Processed
              </span>
              <span className="text-base text-orange-500">£3,887.50</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hourly Performance log list */}
      <div className="bg-[#252527] border border-[#343435] rounded-2xl p-5 space-y-4">
        <div className="flex items-center space-x-2">
          <Calendar className="h-4.5 w-4.5 text-orange-500" />
          <h3 className="text-sm font-black text-white uppercase tracking-wider">
            Hourly Performance
          </h3>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-[#343435]">
          <table className="w-full border-collapse">
            {/* Table Header */}
            <thead className="bg-[#3D3D3D]">
              <tr className="text-sm font-black uppercase tracking-[0.18em] text-zinc-400">
                <th className="py-5 px-5 text-left">Order ID</th>
                <th className="py-5 px-5 text-left">Order Type</th>
                <th className="py-5 px-5 text-left">Payment</th>
                <th className="py-5 px-5 text-center">Status</th>
                <th className="py-5 px-5 text-center">Time</th>
                <th className="py-5 px-5 text-center">Status</th>
                <th className="py-5 px-5 text-center">Revenue</th>
                <th className="py-5 px-5 text-right">Performance</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {HOURLY_PERFORMANCE.map((log, idx) => {
                let statusPill =
                  "bg-green-500/10 text-green-500 border border-green-500/20";

                if (log.status === "Preparing") {
                  statusPill =
                    "bg-orange-500/10 text-orange-400 border border-orange-500/20";
                }

                if (log.status === "On Delivery") {
                  statusPill =
                    "bg-blue-500/10 text-blue-400 border border-blue-500/20";
                }

                if (log.status === "Cancel") {
                  statusPill =
                    "bg-rose-500/10 text-rose-400 border border-rose-500/20";
                }

                return (
                  <tr
                    key={idx}
                    className="border-b border-[#2A2A2F] hover:bg-white/[0.02] transition"
                  >
                    {/* ORDER ID */}
                    <td className="px-5 py-7">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-zinc-600 bg-transparent"
                        />

                        <span className="text-[11px] font-black text-orange-500">
                          {log.id}
                        </span>
                      </div>
                    </td>

                    {/* ORDER TYPE */}
                    <td className="px-5 py-7 text-[11px] font-semibold text-zinc-300">
                      {log.type}
                    </td>

                    {/* PAYMENT */}
                    <td className="px-5 py-7">
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded bg-zinc-200" />

                        <span className="text-[11px] font-medium text-zinc-300">
                          {log.payment}
                        </span>
                      </div>
                    </td>

                    {/* STATUS */}
                    <td className="px-5 py-7 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${statusPill}`}
                      >
                        {log.status}
                      </span>
                    </td>

                    {/* TIME */}
                    <td className="px-5 py-7 text-center text-[11px] font-medium text-zinc-300">
                      {log.time}
                    </td>

                    {/* PREP TIME */}
                    <td className="px-5 py-7 text-center text-[11px] font-bold text-white">
                      {log.prepTime}
                    </td>

                    {/* REVENUE */}
                    <td className="px-5 py-7 text-center text-[11px] font-black text-orange-500">
                      £{log.revenue.toFixed(2)}
                    </td>

                    {/* PERFORMANCE */}
                    <td className="px-5 py-7">
                      <div className="flex justify-end">
                        <div className="w-[230px] h-[6px] rounded-full bg-[#111115] overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-orange-500 to-orange-400"
                            style={{ width: `${log.efficiency}%` }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
