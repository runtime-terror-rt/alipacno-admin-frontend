"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Calendar,
  Check,
  Bell,
  Settings,
  MoreVertical,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  AlertTriangle,
  PackageCheck,
  CreditCard,
  UserCheck,
  Megaphone,
} from "lucide-react";

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("Today");

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn pb-12">
      {/* Top Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-wider flex items-center">
          Notifications
        </h1>
        <p className="text-zinc-500 text-xs sm:text-sm mt-1 font-semibold">
          Stay updated with important alerts and activities across your business.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Main Notifications List */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-6">
          <div className="bg-[#121214] border border-zinc-800 rounded-3xl p-6 shadow-2xl relative">
            {/* Header / Subtitle from mockup */}
            <div className="mb-6">
              <h2 className="text-lg font-black text-white">Branch Management</h2>
              <p className="text-zinc-500 text-xs font-semibold mt-1">
                Add, edit and manage all branches from one place.
              </p>
            </div>

            {/* Notification Categories Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-800/80 pb-4 gap-4">
              <div className="flex items-center space-x-4 sm:space-x-6 text-xs font-bold overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
                <button className="flex items-center space-x-1.5 text-white whitespace-nowrap">
                  <span>All</span>
                  <span className="text-orange-500">24</span>
                </button>
                <button className="flex items-center space-x-1.5 text-zinc-500 hover:text-zinc-300 transition-colors whitespace-nowrap">
                  <span>Unread</span>
                  <span className="bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded-md text-[10px]">8</span>
                </button>
                <button className="flex items-center space-x-1.5 text-zinc-500 hover:text-zinc-300 transition-colors whitespace-nowrap">
                  <span>Alerts</span>
                  <span className="bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded-md text-[10px]">6</span>
                </button>
                <button className="flex items-center space-x-1.5 text-zinc-500 hover:text-zinc-300 transition-colors whitespace-nowrap">
                  <span>Branch Report</span>
                  <span className="bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded-md text-[10px]">4</span>
                </button>
                <button className="flex items-center space-x-1.5 text-zinc-500 hover:text-zinc-300 transition-colors whitespace-nowrap">
                  <span>System</span>
                  <span className="bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded-md text-[10px]">2</span>
                </button>
                <button className="flex items-center space-x-1.5 text-zinc-500 hover:text-zinc-300 transition-colors whitespace-nowrap">
                  <span>Marketing</span>
                  <span className="bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded-md text-[10px]">1</span>
                </button>
              </div>

              <div className="flex items-center space-x-3 shrink-0">
                <button className="flex items-center space-x-1.5 px-3 py-1.5 border border-orange-500/50 text-orange-500 hover:bg-orange-500/10 rounded-xl text-[10px] font-black uppercase tracking-wider transition-colors">
                  <Check className="h-3 w-3" />
                  <span>Mark all as read</span>
                </button>
                <button className="flex items-center space-x-1.5 px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-[10px] font-black uppercase tracking-wider transition-colors shadow-lg shadow-orange-500/20">
                  <Settings className="h-3 w-3" />
                  <span>Notification Settings</span>
                </button>
              </div>
            </div>

            {/* Filters Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 gap-4">
              <div className="flex items-center p-1 bg-[#161618] border border-zinc-800/80 rounded-xl text-[11px] font-bold text-zinc-400 shrink-0">
                {["Today", "Weekly", "Monthly", "Custom Range"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3.5 py-1.5 rounded-lg transition-all ${
                      activeTab === tab
                        ? "bg-[#252528] text-white shadow-sm"
                        : "hover:text-zinc-200"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="flex items-center space-x-3 flex-1 sm:justify-end">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                  <input
                    type="text"
                    placeholder="Search notifications..."
                    className="w-full bg-[#161618] border border-zinc-800 rounded-xl py-2 pl-9 pr-4 text-xs font-semibold text-white focus:outline-none focus:border-zinc-600 transition-colors"
                  />
                </div>
                <button className="p-2 bg-[#161618] border border-zinc-800 rounded-xl text-zinc-400 hover:text-white transition-colors shrink-0">
                  <Filter className="h-4 w-4" />
                </button>
                <button className="flex items-center space-x-2 px-3 py-2 bg-[#161618] border border-zinc-800 rounded-xl text-xs font-semibold text-zinc-300 hover:text-white transition-colors shrink-0">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Today</span>
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Notification List */}
            <div className="space-y-6 mt-2">
              {/* Today Section */}
              <div>
                <h3 className="text-sm font-black text-white mb-3">Today</h3>
                <div className="space-y-2">
                  {/* Item 1 */}
                  <div className="flex items-start justify-between p-4 bg-[#161618] border border-zinc-800/60 rounded-2xl hover:border-zinc-700 transition-colors group">
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-orange-500/10 rounded-xl border border-orange-500/20 shrink-0">
                        <Bell className="h-4 w-4 text-orange-500" />
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-white">New Order Received</h4>
                        <p className="text-[11px] text-zinc-500 font-semibold mt-1">
                          Order #ORD-9821 has been placed at Eltham branch.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 shrink-0">
                      <span className="text-[10px] font-bold text-zinc-500">10:32</span>
                      <div className="h-2 w-2 rounded-full bg-orange-500" />
                      <button className="text-zinc-600 hover:text-white transition-colors">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="flex items-start justify-between p-4 bg-[#161618] border border-zinc-800/60 rounded-2xl hover:border-zinc-700 transition-colors group">
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-orange-500/10 rounded-xl border border-orange-500/20 shrink-0">
                        <PackageCheck className="h-4 w-4 text-orange-500" />
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-white">Order Delivered</h4>
                        <p className="text-[11px] text-zinc-500 font-semibold mt-1">
                          Order #ORD-9814 has been delivered successfully.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 shrink-0">
                      <span className="text-[10px] font-bold text-zinc-500">11:02</span>
                      <div className="h-2 w-2 rounded-full bg-orange-500" />
                      <button className="text-zinc-600 hover:text-white transition-colors">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Item 3 */}
                  <div className="flex items-start justify-between p-4 bg-[#161618] border border-zinc-800/60 rounded-2xl hover:border-zinc-700 transition-colors group">
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-orange-500/10 rounded-xl border border-orange-500/20 shrink-0">
                        <AlertTriangle className="h-4 w-4 text-orange-500" />
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-white">Low Stock Alert</h4>
                        <p className="text-[11px] text-zinc-500 font-semibold mt-1">
                          Tomato Sauce (2.5kg) is running low at Richmond branch.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 shrink-0">
                      <span className="text-[10px] font-bold text-zinc-500">6:12</span>
                      <div className="h-2 w-2 rounded-full bg-orange-500" />
                      <button className="text-zinc-600 hover:text-white transition-colors">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Yesterday Section */}
              <div>
                <h3 className="text-sm font-black text-white mb-3">Yesterday</h3>
                <div className="space-y-2">
                  {/* Item 4 */}
                  <div className="flex items-start justify-between p-4 bg-[#161618] border border-zinc-800/60 rounded-2xl hover:border-zinc-700 transition-colors group">
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-zinc-800/60 rounded-xl border border-zinc-700 shrink-0">
                        <CreditCard className="h-4 w-4 text-zinc-400" />
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-white">Payment Received</h4>
                        <p className="text-[11px] text-zinc-500 font-semibold mt-1">
                          Payment of £1,250.00 received from Order #ORD-9785
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 shrink-0">
                      <span className="text-[10px] font-bold text-zinc-500">Yesterday, 09:10 PM</span>
                      <button className="text-zinc-600 hover:text-white transition-colors">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Item 5 */}
                  <div className="flex items-start justify-between p-4 bg-[#161618] border border-zinc-800/60 rounded-2xl hover:border-zinc-700 transition-colors group">
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-zinc-800/60 rounded-xl border border-zinc-700 shrink-0">
                        <UserCheck className="h-4 w-4 text-zinc-400" />
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-white">Driver Assigned</h4>
                        <p className="text-[11px] text-zinc-500 font-semibold mt-1">
                          Driver Mike has been assigned to Order #ORD-9772
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 shrink-0">
                      <span className="text-[10px] font-bold text-zinc-500">Yesterday, 11:30 PM</span>
                      <button className="text-zinc-600 hover:text-white transition-colors">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Item 6 */}
                  <div className="flex items-start justify-between p-4 bg-[#161618] border border-zinc-800/60 rounded-2xl hover:border-zinc-700 transition-colors group">
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-zinc-800/60 rounded-xl border border-zinc-700 shrink-0">
                        <Megaphone className="h-4 w-4 text-zinc-400" />
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-white">Marketing Campaign Sent</h4>
                        <p className="text-[11px] text-zinc-500 font-semibold mt-1">
                          Weekend Special offer SMS campaign has been sent to 8,450 customers.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 shrink-0">
                      <span className="text-[10px] font-bold text-zinc-500">Yesterday, 06:45 PM</span>
                      <button className="text-zinc-600 hover:text-white transition-colors">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-8 pt-6 border-t border-zinc-800/80 text-xs font-semibold text-zinc-500 gap-4">
              <span>Showing 1 to 10 of 50 results</span>
              
              <div className="flex items-center space-x-1.5">
                <button className="h-8 w-8 flex items-center justify-center rounded-lg border border-zinc-800 hover:bg-zinc-800 transition-colors">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button className="h-8 w-8 flex items-center justify-center rounded-lg border border-orange-500 text-orange-500 font-black">
                  1
                </button>
                <button className="h-8 w-8 flex items-center justify-center rounded-lg border border-zinc-800 hover:bg-zinc-800 hover:text-white transition-colors">
                  2
                </button>
                <button className="h-8 w-8 flex items-center justify-center rounded-lg border border-zinc-800 hover:bg-zinc-800 hover:text-white transition-colors">
                  3
                </button>
                <button className="h-8 w-8 flex items-center justify-center rounded-lg border border-zinc-800 hover:bg-zinc-800 hover:text-white transition-colors">
                  4
                </button>
                <button className="h-8 w-8 flex items-center justify-center rounded-lg border border-zinc-800 hover:bg-zinc-800 hover:text-white transition-colors">
                  5
                </button>
                <button className="h-8 w-8 flex items-center justify-center rounded-lg border border-zinc-800 hover:bg-zinc-800 transition-colors">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <span className="px-3 py-1.5 rounded-lg border border-zinc-800 bg-[#161618] flex items-center justify-between min-w-[80px]">
                  <span>5/page</span>
                  <ChevronDown className="h-3.5 w-3.5 ml-2" />
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Summaries & Filters */}
        <div className="lg:col-span-4 xl:col-span-3 space-y-6">
          
          {/* Notifications Summary */}
          <div className="bg-[#121214] border border-zinc-800 rounded-3xl p-6 shadow-2xl">
            <h3 className="text-sm font-black text-white uppercase tracking-wider mb-6">
              Notifications Summary
            </h3>
            
            <div className="flex items-center space-x-6">
              {/* CSS Donut Chart mimicking SVG */}
              <div className="relative h-28 w-28 shrink-0">
                <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
                  <circle cx="50" cy="50" r="40" stroke="#1a1a1c" strokeWidth="16" fill="none" />
                  {/* Orders (Orange) 41% */}
                  <circle cx="50" cy="50" r="40" stroke="#f97316" strokeWidth="16" fill="none" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - 0.41)} />
                  {/* Alerts (Green) 25% */}
                  <circle cx="50" cy="50" r="40" stroke="#10b981" strokeWidth="16" fill="none" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - 0.25)} transform="rotate(147.6 50 50)" />
                  {/* Marketing (Blue/Purple) 17% */}
                  <circle cx="50" cy="50" r="40" stroke="#8b5cf6" strokeWidth="16" fill="none" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - 0.17)} transform="rotate(237.6 50 50)" />
                  {/* System (Grey) 12% */}
                  <circle cx="50" cy="50" r="40" stroke="#71717a" strokeWidth="16" fill="none" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - 0.12)} transform="rotate(298.8 50 50)" />
                  {/* Others (Dark grey) 5% */}
                  <circle cx="50" cy="50" r="40" stroke="#3f3f46" strokeWidth="16" fill="none" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - 0.05)} transform="rotate(342 50 50)" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-black text-white">48</span>
                  <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Total</span>
                </div>
              </div>

              {/* Legend */}
              <div className="flex-1 space-y-2.5">
                {[
                  { name: "Orders", value: "20", pct: "41%", color: "bg-orange-500" },
                  { name: "Alerts", value: "12", pct: "25%", color: "bg-emerald-500" },
                  { name: "Marketing", value: "8", pct: "17%", color: "bg-violet-500" },
                  { name: "System", value: "6", pct: "12%", color: "bg-zinc-400" },
                  { name: "Others", value: "2", pct: "5%", color: "bg-zinc-600" },
                ].map((stat) => (
                  <div key={stat.name} className="flex items-center justify-between text-[11px] font-bold">
                    <div className="flex items-center space-x-2">
                      <span className={`h-2 w-2 rounded-full ${stat.color}`} />
                      <span className="text-zinc-300">{stat.name}</span>
                    </div>
                    <div className="flex space-x-2 text-zinc-400">
                      <span>{stat.value}</span>
                      <span className="w-8 text-right">({stat.pct})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="bg-[#121214] border border-zinc-800 rounded-3xl p-6 shadow-2xl">
            <h3 className="text-sm font-black text-white uppercase tracking-wider mb-4">
              Quick Filters
            </h3>
            <div className="space-y-2.5">
              {[
                { name: "Important", count: "12", icon: Bell },
                { name: "Requires Action", count: "12", icon: AlertTriangle },
                { name: "Mentions", count: "12", icon: UserCheck },
                { name: "With Attachment", count: "12", icon: PackageCheck },
                { name: "Unread", count: "12", icon: Megaphone }, // Changed to generic representations
              ].map((filter) => (
                <button
                  key={filter.name}
                  className="w-full flex items-center justify-between p-3.5 bg-[#161618] border border-zinc-800 hover:border-orange-500/50 rounded-xl transition-all group"
                >
                  <div className="flex items-center space-x-3">
                    <filter.icon className="h-4 w-4 text-orange-500 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold text-white">{filter.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded-full bg-zinc-800 text-[10px] font-black text-zinc-400 group-hover:text-white transition-colors">
                      {filter.count}
                    </span>
                    <ChevronRight className="h-4 w-4 text-zinc-500" />
                  </div>
                </button>
              ))}
            </div>

            <button className="w-full mt-6 py-3 border border-orange-500/50 hover:bg-orange-500/10 text-orange-500 rounded-xl text-xs font-black uppercase tracking-wider transition-colors shadow-[0_0_15px_rgba(249,115,22,0.1)]">
              Manage Integrations
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
