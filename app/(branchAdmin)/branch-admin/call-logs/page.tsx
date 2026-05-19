"use client";

import { useState } from "react";
import Image from "next/image";
import { 
  ChevronDown, 
  Download, 
  ArrowUpRight, 
  ArrowDownRight, 
  Phone, 
  CheckCircle,
} from "lucide-react";
import { 
  CALL_STATS, 
  CALL_LOGS, 
  CONVERTED_ORDERS, 
  HISTORY_CALLS, 
  CallLog, 
  ConvertedOrder 
} from "./data";

export default function CallLogsPage() {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      
      {/* Page Title & Subtitle */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-wider">Call Logs</h1>
        <p className="text-zinc-500 text-xs sm:text-sm mt-1 font-semibold">
          Track customer calls and communication history.
        </p>
      </div>

      {/* Top Stat Cards (radial glow centered at 95% 50% with #CCA693 theme color) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {CALL_STATS.map((stat, idx) => {
          const TrendIcon = stat.isPositive ? ArrowUpRight : ArrowDownRight;
          return (
            <div
              key={idx}
              className="bg-[#121214]/90 border border-zinc-800 rounded-2xl p-5 relative overflow-hidden min-h-[125px] flex flex-col justify-between"
              style={{
                backgroundImage: "radial-gradient(circle at 95% 50%, rgba(204, 166, 147, 0.28) 0%, rgba(204, 166, 147, 0.06) 45%, transparent 75%)"
              }}
            >
              <div>
                <span className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest leading-none">
                  {stat.label}
                </span>
                <span className="block text-2xl font-black text-white mt-3.5 leading-none">
                  {stat.value}
                </span>
              </div>

              <div className="flex items-center space-x-2 mt-4 text-[10px] font-black">
                <span className={`
                  px-2 py-0.5 rounded-md flex items-center space-x-0.5 border
                  ${stat.isPositive 
                    ? "bg-emerald-500/10 text-emerald-450 border-emerald-500/20" 
                    : "bg-red-500/10 text-red-450 border-red-500/20"
                  }
                `}>
                  <TrendIcon className="h-3 w-3 stroke-[2.5px]" />
                  <span>{stat.change}</span>
                </span>
                <span className="text-zinc-550 lowercase tracking-wide">{stat.subtext}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Call Logs Table Panel */}
      <div className="bg-[#121214]/65 rounded-2xl p-5 space-y-6">
        <div>
          <h3 className="text-sm font-black text-white uppercase tracking-wider">Call Logs Panel</h3>
          <p className="text-[11px] text-zinc-500 font-semibold mt-1">Track and monitor all order-related calls in real time.</p>
        </div>

        {/* Filters and Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b border-zinc-800/40 pb-5">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2">
            {["All", "On Delivery", "Available", "Break", "Offline"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  px-4 py-1.5 rounded-full text-xs font-bold transition-all border cursor-pointer
                  ${activeTab === tab
                    ? "bg-orange-500 text-white border-orange-600 shadow-md shadow-orange-500/10"
                    : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white"
                  }
                `}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Select Dropdowns */}
          <div className="flex flex-wrap items-center gap-2.5">
            {["Driver Status", "Branch", "Vehicle Type", "Shift"].map((drop, dIdx) => (
              <button
                key={dIdx}
                className="px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-[11px] font-bold text-zinc-400 hover:text-zinc-200 flex items-center space-x-1.5 cursor-pointer"
              >
                <span>{drop}</span>
                <ChevronDown className="h-3.5 w-3.5 text-zinc-500" />
              </button>
            ))}

            <button className="px-4 py-2 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 rounded-xl text-[11px] font-bold text-zinc-300 flex items-center space-x-1.5 transition cursor-pointer">
              <Download className="h-3.5 w-3.5 text-zinc-400" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Logs Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800/60 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                <th className="pb-3.5">Time</th>
                <th className="pb-3.5">Call Number</th>
                <th className="pb-3.5">Customer</th>
                <th className="pb-3.5">Duration</th>
                <th className="pb-3.5">Call Status</th>
                <th className="pb-3.5">Outcome</th>
                <th className="pb-3.5">Linked Order</th>
                <th className="pb-3.5">Postcode</th>
                <th className="pb-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-850/50 text-xs">
              {CALL_LOGS.map((log) => (
                <tr key={log.id} className="group hover:bg-zinc-900/20">
                  <td className="py-4 font-semibold text-zinc-450">{log.time}</td>
                  <td className="py-4 font-bold text-white">{log.callNumber}</td>
                  <td className="py-4 font-bold text-zinc-300">{log.customer}</td>
                  <td className="py-4 font-semibold text-zinc-450">{log.duration}</td>
                  <td className="py-4">
                    <span className={`
                      px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase border
                      ${log.status === "Answered" 
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                        : "bg-red-500/10 text-red-400 border-red-500/20"
                      }
                    `}>
                      {log.status}
                    </span>
                  </td>
                  <td className="py-4 font-extrabold">
                    {log.outcome.startsWith("#") ? (
                      <span className="text-emerald-500 flex items-center space-x-1">
                        <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                        <span>{log.outcome}</span>
                      </span>
                    ) : (
                      <span className="text-red-400">{log.outcome}</span>
                    )}
                  </td>
                  <td className="py-4 font-extrabold text-white">{log.linkedOrder || "--"}</td>
                  <td className="py-4 font-semibold text-zinc-450">{log.postcode}</td>
                  <td className="py-4 text-right">
                    <button className={`
                      px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider border transition cursor-pointer
                      ${log.actionText === "View Order"
                        ? "border-orange-500 text-orange-500 hover:bg-orange-500/10"
                        : "border-zinc-800 text-zinc-450 hover:text-white"
                      }
                    `}>
                      {log.actionText}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between pt-4 border-t border-zinc-800/40 text-xs">
          <span className="text-zinc-500 font-semibold">Showing 1 to 5 of 50 results</span>
          <div className="flex items-center space-x-1.5">
            <button className="h-7 w-7 rounded bg-zinc-900 border border-zinc-800 text-zinc-500 flex items-center justify-center font-bold">{"<"}</button>
            <button className="h-7 w-7 rounded bg-orange-500/10 border border-orange-500 text-orange-500 flex items-center justify-center font-black">1</button>
            <button className="h-7 w-7 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 flex items-center justify-center font-bold">2</button>
            <button className="h-7 w-7 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 flex items-center justify-center font-bold">3</button>
            <button className="h-7 w-7 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 flex items-center justify-center font-bold">4</button>
            <button className="h-7 w-7 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 flex items-center justify-center font-bold">5</button>
            <button className="h-7 w-7 rounded bg-zinc-900 border border-zinc-800 text-zinc-500 flex items-center justify-center font-bold">{">"}</button>
          </div>
        </div>
      </div>

      {/* Converted Call Orders Table */}
      <div className="bg-[#121214]/65 border border-zinc-850 rounded-2xl p-5 space-y-6">
        <div>
          <h3 className="text-sm font-black text-white uppercase tracking-wider">Converted Call Orders</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800/60 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
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
            <tbody className="divide-y divide-zinc-850/50 text-xs">
              {CONVERTED_ORDERS.map((conv) => (
                <tr key={conv.id} className="hover:bg-zinc-900/10">
                  <td className="py-4 font-semibold text-zinc-450">{conv.time}</td>
                  <td className="py-4 font-bold text-white">{conv.callNumber}</td>
                  <td className="py-4 font-bold text-zinc-300">{conv.customer}</td>
                  <td className="py-4 font-semibold text-zinc-450">{conv.duration}</td>
                  <td className="py-4 font-extrabold text-emerald-500 flex items-center space-x-1">
                    <CheckCircle className="h-3.5 w-3.5" />
                    <span>{conv.orderNumber}</span>
                  </td>
                  <td className="py-4 font-bold text-orange-500">{conv.orderType}</td>
                  <td className="py-4">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-500">
                      {conv.status}
                    </span>
                  </td>
                  <td className="py-4 font-semibold text-zinc-450">{conv.postcode}</td>
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
          <h3 className="text-sm font-black text-white uppercase tracking-wider">Order History & Call Logs</h3>
          <p className="text-[11px] text-zinc-500 font-semibold mt-1">Combined Customer order and support interaction logs</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {HISTORY_CALLS.map((hist) => {
            const isPurple = hist.actionText === "Order Converted";
            const isRed = !hist.isSuccess;
            
            return (
              <div 
                key={hist.id} 
                className="bg-[#121214] border border-zinc-800 rounded-2xl p-4 flex flex-col justify-between min-h-[190px]"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    {/* Floating phone icon */}
                    <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center">
                      <Phone className="h-4.5 w-4.5" />
                    </div>

                    <div className="text-right">
                      <span className="block text-[10px] font-bold text-white">{hist.time}</span>
                      <span className="block text-[9px] text-zinc-500 mt-0.5">{hist.date}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-[10px] text-zinc-400 font-bold">
                      <span>Call Duration:</span>
                      <span className="text-white font-extrabold">{hist.duration}</span>
                    </div>

                    <h4 className="text-xs font-black text-white truncate">{hist.customer}</h4>
                    
                    <div className="flex justify-between items-center text-[10px] text-zinc-500 font-semibold">
                      <span className="truncate max-w-[90px]">{hist.branchName}</span>
                      <span className="text-zinc-400 font-bold">{hist.phone}</span>
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
