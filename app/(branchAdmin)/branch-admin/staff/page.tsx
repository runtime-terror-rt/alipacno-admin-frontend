"use client";

import { useState } from "react";
import { 
  User, 
  Clock, 
  DollarSign, 
  Percent,
  Search,
  X,
  TrendingUp,
} from "lucide-react";
import { STAFF_STATS, STAFF_MEMBERS, StaffMember } from "./data";

export default function StaffPage() {
  const [staff, setStaff] = useState<StaffMember[]>(STAFF_MEMBERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [isReconciliationOpen, setIsReconciliationOpen] = useState(false);
  const [actualCash, setActualCash] = useState("");

  // Toggle shift state (Check In / Check Out)
  const handleToggleShift = (memberId: string) => {
    setStaff(
      staff.map((member) => {
        if (member.id === memberId) {
          const isDuty = member.status === "On Duty";
          return {
            ...member,
            status: isDuty ? "Off Duty" : "On Duty",
            clockIn: isDuty ? "--:--" : "09:00 AM",
            hoursToday: isDuty ? "--" : "8h",
            sales: isDuty ? "--" : "£0.00"
          };
        }
        return member;
      })
    );
  };

  // Filter staff by search query
  const filteredStaff = staff.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Helper icons for stat cards
  const getStatIcon = (iconName: string) => {
    switch (iconName) {
      case "user": return User;
      case "clock": return Clock;
      case "dollar": return DollarSign;
      case "percent": return Percent;
      default: return User;
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn pb-12">
      
      {/* Title block */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-wider">Staff Management</h1>
          <p className="text-zinc-555 text-xs sm:text-sm mt-1 font-semibold">
            Attendance, hours tracking, and performance
          </p>
        </div>

        <button 
          onClick={() => setIsReconciliationOpen(true)}
          className="px-5 py-3 bg-orange-500 hover:bg-orange-600 rounded-2xl text-xs font-black uppercase tracking-wider text-white flex items-center justify-center space-x-1.5 transition shadow-md shadow-orange-500/10 cursor-pointer"
        >
          <TrendingUp className="h-4 w-4" />
          <span>End of Shift Cash Up</span>
        </button>
      </div>

      {/* Top Stat Cards (figma mesh glow styled on the right side) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STAFF_STATS.map((stat, idx) => {
          const Icon = getStatIcon(stat.iconName);
          return (
            <div
              key={idx}
              className="bg-[#121214] border border-[#343435] rounded-2xl p-5 relative overflow-hidden flex items-center space-x-4 min-h-[105px]"
              style={{
                backgroundImage: "radial-gradient(circle at 95% 50%, rgba(204, 166, 147, 0.28) 0%, rgba(204, 166, 147, 0.06) 45%, transparent 75%)"
              }}
            >
              {/* Left Rounded Icon */}
              <div className="h-11 w-11 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-500 flex items-center justify-center shrink-0">
                <Icon className="h-5 w-5" />
              </div>

              {/* Right Labels */}
              <div>
                <span className="block text-[10px] font-black text-zinc-555 uppercase tracking-widest leading-none">
                  {stat.label}
                </span>
                <span className="block text-2xl font-black text-white mt-2 leading-none">
                  {stat.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Search Input bar */}
      <div className="relative w-full">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
          <Search className="h-4 w-4 text-zinc-550" />
        </span>
        <input
          type="text"
          placeholder="Search staff by ID, Name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#121214] border border-zinc-800 rounded-2xl py-3.5 pl-11 pr-4 text-xs sm:text-sm text-white placeholder-zinc-550 focus:outline-none focus:border-orange-500 transition-colors"
        />
      </div>

      {/* Main Staff Duty Table */}
      <div className="bg-[#121214]/65 border border-[#343435] rounded-2xl p-5 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#343435] text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                <th className="pb-3.5">ID</th>
                <th className="pb-3.5">Staff Member</th>
                <th className="pb-3.5">Role</th>
                <th className="pb-3.5">Clock In/Out</th>
                <th className="pb-3.5">Hours Today</th>
                <th className="pb-3.5">Sales</th>
                <th className="pb-3.5">Status</th>
                <th className="pb-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#343435] text-xs">
              {filteredStaff.map((member) => {
                const isOnDuty = member.status === "On Duty";
                return (
                  <tr key={member.id} className="hover:bg-zinc-900/10 group">
                    <td className="py-4 font-bold text-white">{member.id}</td>
                    
                    {/* Member Details */}
                    <td className="py-4">
                      <div className="flex items-center space-x-3">
                        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-orange-500/20 to-amber-600/30 text-orange-400 border border-orange-500/10 flex items-center justify-center font-bold text-xs">
                          {member.avatar}
                        </div>
                        <span className="font-bold text-white text-sm">{member.name}</span>
                      </div>
                    </td>

                    <td className="py-4 font-bold text-zinc-400">{member.role}</td>
                    
                    <td className="py-4 text-zinc-500 font-semibold">
                      <div>In: {member.clockIn}</div>
                      <div className="text-[10px] mt-0.5">Out: {member.clockOut}</div>
                    </td>

                    <td className={`py-4 font-black ${isOnDuty ? 'text-orange-500' : 'text-zinc-550'}`}>
                      {member.hoursToday}
                    </td>

                    <td className="py-4 font-bold text-white">{member.sales}</td>
                    
                    <td className="py-4">
                      <span className={`
                        px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase border
                        ${isOnDuty 
                          ? "bg-emerald-500/10 text-emerald-450 border-emerald-500/20" 
                          : "bg-zinc-800 text-zinc-500 border border-zinc-700/50"
                        }
                      `}>
                        {member.status}
                      </span>
                    </td>

                    <td className="py-4 text-right">
                      {isOnDuty ? (
                        <button
                          onClick={() => handleToggleShift(member.id)}
                          className="px-4 py-1.5 border border-red-500/30 text-red-500 hover:bg-red-500/10 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer"
                        >
                          Check Out
                        </button>
                      ) : (
                        <button
                          onClick={() => handleToggleShift(member.id)}
                          className="px-4 py-1.5 border border-emerald-500/30 text-emerald-450 hover:bg-emerald-500/10 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer"
                        >
                          Check In
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* End of Shift - Cash Reconciliation Modal */}
      {isReconciliationOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="relative w-full max-w-xl bg-[#18181A] border border-zinc-700 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-black uppercase bg-[#0091FF]/10 text-[#0091FF] border border-[#0091FF]/20 px-2 py-0.5 rounded">
                    Container
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white mt-1 leading-tight">
                  End of Shift - Cash Reconciliation
                </h2>
                <p className="text-zinc-500 text-xs mt-1 font-semibold">
                  Review and reconcile today's cash drawer
                </p>
              </div>

              <button
                onClick={() => setIsReconciliationOpen(false)}
                className="h-8 w-8 rounded-full bg-zinc-900 hover:bg-zinc-850 text-zinc-400 hover:text-white flex items-center justify-center border border-zinc-800 transition cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Shift Overview Section */}
            <div className="bg-[#121214] border border-zinc-700 rounded-2xl p-5 space-y-4">
              <span className="block text-xs font-black text-white uppercase tracking-wider">
                Shift Overview
              </span>

              <div className="space-y-4 pt-1">
                {/* Date */}
                <div className="flex items-center space-x-2.5">
                  <div className="h-7 w-7 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-500 flex items-center justify-center">
                    <Clock className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <span className="block text-[9px] text-zinc-500 uppercase font-black tracking-wider leading-none">Shift Date</span>
                    <span className="block text-xs font-black text-white mt-1">Tuesday 12 May 2026</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Total Orders */}
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      <span className="text-[9px] text-zinc-550 uppercase font-black tracking-wider">Total Orders</span>
                    </div>
                    <span className="block text-lg font-black text-white mt-1.5">127</span>
                  </div>

                  {/* Cancellations */}
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <span className="h-2 w-2 rounded-full bg-rose-500" />
                      <span className="text-[9px] text-zinc-555 uppercase font-black tracking-wider">Cancellations</span>
                    </div>
                    <span className="block text-lg font-black text-rose-500 mt-1.5">3</span>
                  </div>
                </div>

                {/* Sales split */}
                <div className="grid grid-cols-2 gap-4 pt-1 border-t border-zinc-700">
                  {/* Cash Sales */}
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <span className="text-emerald-500 text-xs font-extrabold">💵</span>
                      <span className="text-[9px] text-zinc-500 uppercase font-black tracking-wider font-semibold">Cash Sales</span>
                    </div>
                    <span className="block text-sm font-black text-white mt-1">£1247.50</span>
                    <span className="block text-[10px] text-zinc-550 mt-0.5 font-bold">42 transactions</span>
                  </div>

                  {/* Card Sales */}
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <span className="text-purple-500 text-xs font-extrabold">💳</span>
                      <span className="text-[9px] text-zinc-500 uppercase font-black tracking-wider font-semibold">Card Sales</span>
                    </div>
                    <span className="block text-sm font-black text-white mt-1">£2595.00</span>
                    <span className="block text-[10px] text-zinc-550 mt-0.5 font-bold">85 transactions</span>
                  </div>
                </div>

                {/* Total Revenue */}
                <div className="flex justify-between items-center pt-3.5 border-t border-zinc-700">
                  <span className="text-xs text-zinc-400 font-bold">Total Revenue (All Methods)</span>
                  <span className="text-lg font-black text-orange-500">£3842.50</span>
                </div>
              </div>
            </div>

            {/* Cash Reconciliation Card */}
            <div className="bg-[#121214] border border-zinc-700 rounded-2xl p-5 space-y-4">
              <span className="block text-xs font-black text-white uppercase tracking-wider">
                Cash Reconciliation
              </span>

              <div className="space-y-2.5 pt-1 text-xs">
                <div className="flex justify-between text-zinc-450 font-bold">
                  <span>Opening Cash Float</span>
                  <span className="text-white">£200.00</span>
                </div>
                <div className="flex justify-between text-zinc-450 font-bold">
                  <span>Cash Sales Today</span>
                  <span className="text-white">£1247.50</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-zinc-700 text-sm font-black text-white">
                  <span>Expected Total</span>
                  <span className="text-base text-white">£1447.50</span>
                </div>
              </div>
            </div>

            {/* Actual Cash Counted Section */}
            <div className="space-y-3">
              <label className="block text-[10px] font-black text-zinc-455 uppercase tracking-widest">
                Actual Cash Counted
              </label>
              
              <div className="relative">
                <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-zinc-500 font-bold">
                  £
                </span>
                <input
                  type="text"
                  placeholder="0.00"
                  value={actualCash}
                  onChange={(e) => setActualCash(e.target.value)}
                  className="w-full bg-[#121214] border border-zinc-800 rounded-2xl py-3.5 pl-10 pr-4 text-base font-extrabold text-white focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>

              {/* Quick Fill buttons */}
              <div className="grid grid-cols-5 gap-2 pt-1">
                {["1000", "1200", "1400", "1447.50", "Exact"].map((val) => {
                  const label = val === "Exact" ? "Exact" : `£${val}`;
                  const fillValue = val === "Exact" ? "1447.50" : val;
                  const isSelected = actualCash === fillValue;
                  return (
                    <button
                      key={val}
                      onClick={() => setActualCash(fillValue)}
                      className={`
                        py-2.5 rounded-xl text-[10px] font-black uppercase transition cursor-pointer border
                        ${isSelected
                          ? "bg-orange-500/10 border-orange-500/45 text-orange-550 shadow-md animate-pulse"
                          : "bg-[#121214] border-zinc-700 text-zinc-400 hover:text-white"
                        }
                      `}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex gap-4 pt-2">
              <button
                onClick={() => setIsReconciliationOpen(false)}
                className="flex-1 py-3 bg-zinc-900 border border-zinc-800 hover:bg-zinc-850 hover:text-white text-zinc-450 font-black text-xs rounded-xl transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert("Shift cash reconciliation successfully submitted for review!");
                  setIsReconciliationOpen(false);
                }}
                className="flex-1 py-3 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs rounded-xl transition shadow-lg shadow-orange-500/10 cursor-pointer"
              >
                Submit for Review
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
