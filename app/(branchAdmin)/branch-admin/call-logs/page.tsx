"use client";

import { useState } from "react";
import {
  ChevronDown,
  Download,
  Phone,
  CheckCircle,
  XCircle,
  TrendingUp,
  Clock,
  Check,
  PhoneMissed,
  PackageX,
} from "lucide-react";
import { CALL_LOGS, CONVERTED_ORDERS, HISTORY_CALLS } from "./data";
import MetricCard from "@/components/admin/ui/MetricCard";

export default function CallLogsPage() {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Page Title & Subtitle */}
      <div>
        <h1 className="text-lg sm:text-2xl font-black text-white tracking-wider">
          Call Logs
        </h1>
        <p className="text-[#626262] text-sm mt-1 font-semibold">
          Track customer calls and communication history.
        </p>
      </div>

      {/* Top Stat Cards (radial glow centered at 95% 50% with #CCA693 theme color) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <MetricCard
          card={{
            label: "Total Calls",
            value: "50",
            change: "+12.5%",
            positive: true,
            note: "vs last period",
            icon: <Phone size={18} />,
          }}
        />

        <MetricCard
          card={{
            label: "Call Converted",
            value: "30",
            change: "+2.1%",
            positive: true,
            note: "vs last period",
            icon: <CheckCircle size={18} />,
          }}
        />

        <MetricCard
          card={{
            label: "Missed Calls",
            value: "20",
            change: "+2.1%",
            positive: false,
            note: "vs last period",
            icon: <XCircle size={18} />,
          }}
        />

        <MetricCard
          card={{
            label: "Conversion Rate",
            value: "24.8%",
            change: "-0.8%",
            positive: false,
            note: "vs last period",
            icon: <TrendingUp size={18} />,
          }}
        />

        <MetricCard
          card={{
            label: "Avg. Call Duration",
            value: "04:42",
            change: "+5.4%",
            positive: true,
            note: "Labor + COGS",
            icon: <Clock size={18} />,
          }}
        />
      </div>

      {/* Main Call Logs Table Panel */}
      <div className="rounded-[26px] border border-[#2E2E32] p-6 ">
        {/* Header */}
        <div className="mb-6">
          <h3 className="text-[32px] font-bold tracking-[-0.02em] text-white">
            Call Logs Panel
          </h3>

          <p className="mt-1 text-sm text-zinc-500">
            Track and monitor all order-related calls in real time.
          </p>
        </div>

        {/* Top Controls */}
        <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          {/* Tabs */}
          <div className="flex flex-wrap overflow-hidden rounded-xl border border-[#3A3A3E]">
            {["All", "On Delivery", "Available", "Break", "Offline"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`border-r border-[#3A3A3E] px-5 py-3 text-sm font-medium transition-all last:border-r-0
          ${
            activeTab === tab
              ? "bg-[#1C1C20] text-[#FF6A00]"
              : "bg-transparent text-zinc-500 hover:text-white"
          }`}
                >
                  {tab}
                </button>
              ),
            )}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            {["Driver Status", "Branch", "Vehicle Type", "Shift"].map(
              (item, idx) => (
                <button
                  key={idx}
                  className="flex h-12 items-center gap-2 rounded-xl border border-[#3A3A3E]  px-5 text-sm font-medium text-zinc-400 transition hover:text-white"
                >
                  <span>{item}</span>
                  <ChevronDown className="h-4 w-4 text-zinc-500" />
                </button>
              ),
            )}

            <button className="ml-2 flex h-12 items-center gap-2 rounded-xl border border-[#3A3A3E] px-5 text-sm font-medium text-zinc-400 transition hover:text-white">
              <Download className="h-4 w-4" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-[#343438]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-300 border-collapse">
              <thead>
                <tr className="bg-[#353535] text-left">
                  {[
                    "TIME",
                    "CALL NUMBER",
                    "CUSTOMER",
                    "DURATION",
                    "CALL STATUS",
                    "OUTCOME",
                    "LINKED ORDER",
                    "POSTCODE",
                    "ACTION",
                  ].map((head) => (
                    <th
                      key={head}
                      className="px-6 py-6 text-sm font-bold uppercase tracking-wide text-white"
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {CALL_LOGS.map((log) => (
                  <tr
                    key={log.id}
                    className="border-t border-[#2D2D31] transition hover:bg-[#1D1D21]"
                  >
                    <td className="px-6 py-5 text-[15px] font-medium text-zinc-300">
                      {log.time}
                    </td>

                    <td className="px-6 py-5 text-[15px] font-medium text-white">
                      {log.callNumber}
                    </td>

                    <td className="px-6 py-5 text-[15px] text-zinc-200">
                      {log.customer}
                    </td>

                    <td className="px-6 py-5 text-[15px] text-zinc-300">
                      {log.duration}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex rounded-full px-4 py-1.5 text-sm font-semibold
                  ${
                    log.status === "Answered"
                      ? "bg-green-500/15 text-green-400"
                      : "bg-red-500/15 text-red-400"
                  }`}
                      >
                        {log.status}
                      </span>
                    </td>

                    {/* Outcome */}
                    <td className="px-6 py-5">
                      {log.outcome.startsWith("#") ? (
                        <div className="flex items-center gap-2 font-semibold text-green-500">
                          <Check className="h-4 w-4" />
                          <span>{log.outcome}</span>
                        </div>
                      ) : log.outcome === "Missed Call" ? (
                        <div className="flex items-center gap-2 font-semibold text-red-400">
                          <PhoneMissed className="h-4 w-4" />
                          <span>Missed Call</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 font-semibold text-orange-400">
                          <PackageX className="h-4 w-4" />
                          <span>No Order</span>
                        </div>
                      )}
                    </td>

                    <td className="px-6 py-5 text-[15px] font-medium text-zinc-200">
                      {log.linkedOrder}
                    </td>

                    <td className="px-6 py-5 text-[15px] text-zinc-300">
                      {log.postcode}
                    </td>

                    {/* Action */}
                    <td className="px-6 py-5">
                      <button
                        className={`h-12 rounded-xl border px-5 text-sm font-semibold transition
                  ${
                    log.actionText === "View Order"
                      ? "border-[#FF6A00] text-[#FF6A00] hover:bg-[#FF6A00]/10"
                      : "border-[#4A4A4F] text-white hover:border-zinc-400"
                  }`}
                      >
                        {log.actionText}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-sm text-zinc-500">Showing 1 to 10 of 50 results</p>

          <div className="flex items-center gap-2">
            <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#3A3A3E] bg-[#1A1A1D] text-zinc-500">
              {"<"}
            </button>

            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                className={`flex h-11 w-11 items-center justify-center rounded-xl border text-sm font-semibold
          ${
            page === 1
              ? "border-[#FF6A00] text-[#FF6A00]"
              : "border-[#3A3A3E] bg-[#1A1A1D] text-zinc-500"
          }`}
              >
                {page}
              </button>
            ))}

            <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#3A3A3E] bg-[#1A1A1D] text-zinc-500">
              {">"}
            </button>
          </div>
        </div>
      </div>
      {/* Converted Call Orders Table */}
      <div className=" border border-[#343436] rounded-2xl p-5 space-y-6">
        <div>
          <h3 className="text-sm font-black text-white uppercase tracking-wider">
            Converted Call Orders
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800/60 text-[10px] font-black  text-zinc-500 uppercase tracking-widest">
                <th className="pb-3.5">Time</th>
                <th className="pb-3.5">Call Number</th>
                <th className="pb-3.5">Customer</th>
                <th className="pb-3.5">Duration</th>
                <th className="pb-3.5">#Order</th>
                <th className="pb-3.5">Order Type</th>
                <th className="pb-3.5">Status</th>
                <th className="pb-3.5">Postcode</th>
                <th className="pb-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#343436] text-xs">
              {CONVERTED_ORDERS.map((conv) => (
                <tr key={conv.id} className="hover:bg-zinc-900/10">
                  <td className="py-4 font-semibold text-zinc-450">
                    {conv.time}
                  </td>
                  <td className="py-4 font-bold text-white">
                    {conv.callNumber}
                  </td>
                  <td className="py-4 font-bold text-zinc-300">
                    {conv.customer}
                  </td>
                  <td className="py-4 font-semibold text-zinc-450">
                    {conv.duration}
                  </td>
                  <td className="py-4 font-extrabold text-emerald-500 flex items-center space-x-1">
                    <CheckCircle className="h-3.5 w-3.5" />
                    <span>{conv.orderNumber}</span>
                  </td>
                  <td className="py-4 font-bold text-orange-500">
                    {conv.orderType}
                  </td>
                  <td className="py-4">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-500">
                      {conv.status}
                    </span>
                  </td>
                  <td className="py-4 font-semibold text-zinc-450">
                    {conv.postcode}
                  </td>
                  <td className="py-4 text-right">
                    <button className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 hover:border-orange-500 text-zinc-400 hover:text-orange-500 rounded-lg text-[10px] font-black uppercase tracking-wider transition cursor-pointer">
                      View Order
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order History & Call Logs (Horizontal Carousel cards) */}
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-black text-white uppercase tracking-wider">
            Order History & Call Logs
          </h3>
          <p className="text-[11px] text-zinc-500 font-semibold mt-1">
            Combined Customer order and support interaction logs
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {HISTORY_CALLS.map((hist) => {
            const isPurple = hist.actionText === "Order Converted";
            const isRed = !hist.isSuccess;

            return (
              <div
                key={hist.id}
                className=" border border-zinc-800 rounded-2xl p-4 flex flex-col justify-between min-h-48"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    {/* Floating phone icon */}
                    <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center">
                      <Phone className="h-4.5 w-4.5" />
                    </div>

                    <div className="text-right">
                      <span className="block text-[10px] font-bold text-white">
                        {hist.time}
                      </span>
                      <span className="block text-[9px] text-zinc-500 mt-0.5">
                        {hist.date}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-[10px] text-zinc-400 font-bold">
                      <span>Call Duration:</span>
                      <span className="text-white font-extrabold">
                        {hist.duration}
                      </span>
                    </div>

                    <h4 className="text-xs font-black text-white truncate">
                      {hist.customer}
                    </h4>

                    <div className="flex justify-between items-center text-[10px] text-zinc-500 font-semibold">
                      <span className="truncate max-w-23">
                        {hist.branchName}
                      </span>
                      <span className="text-zinc-400 font-bold">
                        {hist.phone}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  {isRed ? (
                    <button className="bg-red-500/5 border border-red-500/25 text-red-400 font-black rounded-lg py-2 w-full text-[11px] uppercase tracking-wide">
                      {hist.actionText}
                    </button>
                  ) : isPurple ? (
                    <button className="bg-purple-500/5 border border-purple-500/25 text-purple-400 font-black rounded-lg py-2 w-full text-[11px] uppercase tracking-wide">
                      {hist.actionText}
                    </button>
                  ) : (
                    <button className="bg-emerald-500/5 border border-emerald-500/25 text-emerald-450 font-black rounded-lg py-2 w-full text-[11px] uppercase tracking-wide">
                      {hist.actionText}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
