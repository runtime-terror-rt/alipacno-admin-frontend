"use client";

import { useState } from "react";
import {
  User,
  Clock,
  DollarSign,
  Percent,
  Search,
  X,
  Clock1,
  DollarSignIcon,
  Calendar,
  ShoppingBag,
  XCircle,
  Banknote,
  CreditCard,
} from "lucide-react";
import { STAFF_STATS, STAFF_MEMBERS, StaffMember } from "./data";
import PageHeader from "@/components/admin/common/PageHeader";
import Image from "next/image";

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
            sales: isDuty ? "--" : "£0.00",
          };
        }
        return member;
      }),
    );
  };

  // Filter staff by search query
  const filteredStaff = staff.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Helper icons for stat cards
  const getStatIcon = (iconName: string) => {
    switch (iconName) {
      case "user":
        return User;
      case "clock":
        return Clock;
      case "dollar":
        return DollarSign;
      case "percent":
        return Percent;
      default:
        return User;
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn pb-12">
      {/* Title block */}
      <div className="flex flex-col sm:flex-row sm:items-center  sm:justify-between gap-2">
        <PageHeader
          title="Staff Management"
          subtitle="Attendance, hours tracking, and performance"
        />

        <button
          onClick={() => setIsReconciliationOpen(true)}
          className="px-5 py-3 bg-[#F9671A] hover:bg-orange-600 rounded-2xl text-base font-semibold  tracking-wider text-white flex items-center justify-center space-x-1.5 transition shadow-md shadow-orange-500/10 cursor-pointer"
        >
          <DollarSignIcon className="h-4 w-4" />
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
              className="bg-[#1E1E20] gap-3 border border-[#2e2e30] rounded-2xl p-5 relative overflow-hidden flex flex-col min-h-25"
            >
              {/* Decorative BG */}
              <div className="absolute right-0 top-0 w-40 h-40 pointer-events-none">
                <Image
                  src="/admin/common/stats.svg"
                  alt="Decorative arc"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Left Rounded Icon */}
              <div className="flex items-center relative z-10">
                <div className="rounded-xl text-orange-500 flex items-center justify-center shrink-0">
                  <Icon className="h-6 w-6" />
                </div>

                <span className="block text-sm text-zinc-555 tracking-widest leading-none">
                  {stat.label}
                </span>
              </div>

              {/* Right Labels */}
              <div className="relative z-10">
                <span className="block text-2xl font-semibold text-white mt-2 leading-none">
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
          <Search className="h-4 w-4 text-[#626262]" />
        </span>
        <input
          type="text"
          placeholder="Search staff by ID, Name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#252527] border border-zinc-800 rounded-2xl py-3.5 pl-11 pr-4 text-xs sm:text-sm text-[white] placeholder-[#626262] focus:outline-none focus:border-orange-500 transition-colors"
        />
      </div>

      {/* Main Staff Duty Table */}
      <div className="bg-[#18181B] border border-[#2A2A2E] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-[#1C1C1C]">
              <tr className="border-b border-[#2B2B30]">
                <th className="px-6 py-5 text-left text-[13px] font-bold text-white">
                  ID
                </th>

                <th className="px-6 py-5 text-left text-[13px] font-bold text-white">
                  Staff Member
                </th>

                <th className="px-6 py-5 text-left text-[13px] font-bold text-white">
                  Role
                </th>

                <th className="px-6 py-5 text-left text-[13px] font-bold text-white">
                  Clock In/Out
                </th>

                <th className="px-6 py-5 text-left text-[13px] font-bold text-white">
                  Hours Today
                </th>

                <th className="px-6 py-5 text-left text-[13px] font-bold text-white">
                  Sales
                </th>

                <th className="px-6 py-5 text-center text-[13px] font-bold text-white">
                  Status
                </th>

                <th className="px-6 py-5 text-right text-[13px] font-bold text-white">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="bg-[#252527]">
              {filteredStaff.map((member) => {
                const isOnDuty = member.status === "On Duty";

                return (
                  <tr
                    key={member.id}
                    className="border-b border-[#2B2B30] hover:bg-[#232327] transition-colors"
                  >
                    <td className="px-6 py-5 text-[15px] font-medium text-white">
                      {member.id}
                    </td>

                    {/* Member Details */}
                    <td className="px-6 py-5">
                      <div className="flex items-center space-x-3">
                        <div className="h-9 w-9 rounded-full bg-linear-to-br from-orange-500/20 to-amber-600/30 text-orange-400 border border-orange-500/10 flex items-center justify-center font-bold text-xs">
                          {member.avatar}
                        </div>

                        <span className="font-medium text-white text-[15px]">
                          {member.name}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-5 text-[15px] font-semibold text-zinc-200">
                      {member.role}
                    </td>

                    <td className="px-6 py-5 text-[15px] text-zinc-300 font-medium">
                      <div>In: {member.clockIn}</div>

                      <div className="text-[12px] mt-1 text-zinc-500">
                        Out: {member.clockOut}
                      </div>
                    </td>

                    <td
                      className={`px-6 py-5 text-[15px] font-bold ${
                        isOnDuty ? "text-orange-500" : "text-zinc-400"
                      }`}
                    >
                      {member.hoursToday}
                    </td>

                    <td className="px-6 py-5 text-[15px] font-semibold text-white">
                      {member.sales}
                    </td>

                    <td className="px-6 py-5 text-center">
                      <span
                        className={`
                    inline-flex items-center justify-center
                    px-4 py-1.5 rounded-full
                    text-[12px] font-semibold
                   

                    ${
                      isOnDuty
                        ? "bg-[#006FA7] text-white"
                        : "bg-[#313131] text-[#808080]"
                    }
                  `}
                      >
                        {member.status}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex justify-end">
                        {isOnDuty ? (
                          <button
                            onClick={() => handleToggleShift(member.id)}
                            className="
          px-5 py-2 flex items-center gap-1
          rounded-xl
          bg-[#FF2D49]
          hover:bg-[#FF2D49]/80
          text-white
          text-sm
          transition-all
          cursor-pointer
        "
                          >
                            <Clock1 className="w-5 h-5"  /> Check Out
                          </button>
                        ) : (
                          <button
                            onClick={() => handleToggleShift(member.id)}
                            className="
          px-5 py-2 flex items-center gap-1
          rounded-xl
          bg-[#00A706]
          hover:bg-[#00A706]/80
          text-white
          text-sm
          transition-all
          cursor-pointer
        "
                          >
                            <Clock1 className="w-5 h-5" /> Check In
                          </button>
                        )}
                      </div>
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
        <div className="fixed inset-0 bg-black/75 backdrop-blur-[1px] flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="w-full max-w-2xl bg-[#1C1C1E] border border-[#2D2D30] rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
            
            {/* Header */}
            <div className="flex items-start justify-between bg-[#1A1A1C] px-6 pt-6 pb-4">
              <PageHeader
                title="End of Shift - Cash Reconciliation"
                subtitle="Review and reconcile today's cash drawer"
              />

              <button
                onClick={() => setIsReconciliationOpen(false)}
                className="p-1.5 rounded-lg bg-[#2D2D30]/65 border border-[#3A3A3E]/50 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                title="Close"
              >
                <X size={16} />
              </button>
            </div>

            {/* Content Container (Scrollable) */}
            <div className="flex-1 bg-[#252527] overflow-y-auto p-6 space-y-6">
              
              {/* SHIFT OVERVIEW */}
              <div className="space-y-3">
                <span className="text-base font-semibold text-white tracking-wider">
                  Shift Overview
                </span>

                <div className="bg-[#1a1a1c] border border-[#2d2d32]/60 rounded-xl p-5 space-y-4">
                  {/* Shift Date */}
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#F9671A]/10 border border-[#F9671A]/20 text-[#F9671A] rounded-lg">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="block text-zinc-500 text-[10px] uppercase font-bold tracking-wider leading-none">
                        Shift Date
                      </span>
                      <span className="block text-white text-sm font-bold mt-1">
                        Tuesday 12 May 2026
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-[#2d2d32]/40" />

                  {/* Orders & Cancellations */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex gap-2.5 items-start">
                      <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-lg mt-0.5">
                        <ShoppingBag className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="block text-zinc-500 text-[10px] uppercase font-bold tracking-wider leading-none">
                          Total Orders
                        </span>
                        <span className="block text-white text-xl font-bold mt-1">
                          127
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2.5 items-start">
                      <div className="p-2 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg mt-0.5">
                        <XCircle className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="block text-zinc-500 text-[10px] uppercase font-bold tracking-wider leading-none">
                          Cancellations
                        </span>
                        <span className="block text-red-500 text-xl font-bold mt-1">
                          3
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Cash & Card Sales split */}
                  <div className="grid grid-cols-2 gap-4 pt-1">
                    <div className="flex gap-2.5 items-start">
                      <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-lg mt-0.5">
                        <Banknote className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="block text-zinc-500 text-[10px] uppercase font-bold tracking-wider leading-none">
                          Cash Sales
                        </span>
                        <span className="block text-white text-base font-bold mt-1">
                          £1247.50
                        </span>
                        <span className="block text-zinc-500 text-[11px] mt-0.5">
                          42 transactions
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2.5 items-start">
                      <div className="p-2 bg-purple-500/10 border border-purple-500/20 text-purple-500 rounded-lg mt-0.5">
                        <CreditCard className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="block text-zinc-500 text-[10px] uppercase font-bold tracking-wider leading-none">
                          Card Sales
                        </span>
                        <span className="block text-white text-base font-bold mt-1">
                          £2595.00
                        </span>
                        <span className="block text-zinc-500 text-[11px] mt-0.5">
                          85 transactions
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-[#2d2d32]/40" />

                  {/* Total Revenue */}
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400 text-xs font-semibold">
                      Total Revenue (All Methods)
                    </span>
                    <span className="text-[#F9671A] text-xl font-bold">
                      £3842.50
                    </span>
                  </div>
                </div>
              </div>

              {/* CASH RECONCILIATION */}
              <div className="space-y-2">
                <span className="text-base font-semibold text-white tracking-wider">
                  Cash Reconciliation
                </span>

                <div className="bg-[#1a1a1c] border border-[#2d2d32]/60 rounded-xl p-5 space-y-3">
                  <div className="text-white text-sm font-bold">
                    Expected Cash Total
                  </div>

                  <div className="flex justify-between text-zinc-400 text-xs pt-1">
                    <span>Opening Cash Float</span>
                    <span className="text-white font-medium">£200.00</span>
                  </div>

                  <div className="flex justify-between text-zinc-400 text-xs">
                    <span>Cash Sales Today</span>
                    <span className="text-white font-medium">£1247.50</span>
                  </div>

                  <div className="border-t border-[#2d2d32]/40" />

                  <div className="flex justify-between items-center text-white">
                    <span className="text-sm font-bold">Expected Total</span>
                    <span className="text-base font-bold">£1447.50</span>
                  </div>
                </div>
              </div>

              {/* ACTUAL CASH COUNTED */}
              <div className="space-y-2.5">
                <span className="text-base font-semibold text-white tracking-wider">
                  Actual Cash Counted
                </span>

                <div className="relative">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-zinc-500">
                    <Banknote className="h-5 w-5" />
                  </div>
                  <input
                    type="text"
                    value={actualCash}
                    onChange={(e) => setActualCash(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-[#18181A] border border-[#2c2c30] focus:border-[#F9671A]/50 rounded-xl py-3 pl-12 pr-4 text-white text-base font-semibold outline-none transition-colors"
                  />
                </div>

                {/* Quick Fill section */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">
                    Quick Fill
                  </span>
                  
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: "£1000", value: "1000.00" },
                      { label: "£1200", value: "1200.00" },
                      { label: "£1400", value: "1400.00" },
                      { label: "£1447.50", value: "1447.50" },
                      { label: "Exact", value: "1447.50" }
                    ].map((fill) => {
                      const isSelected = actualCash === fill.value;
                      return (
                        <button
                          key={fill.label}
                          type="button"
                          onClick={() => setActualCash(fill.value)}
                          className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[#F9671A]/10 border-[#F9671A]/50 text-[#F9671A]"
                              : "bg-[#343436] border-zinc-800 text-zinc-300 hover:bg-[#2d2d32] hover:text-white"
                          }`}
                        >
                          {fill.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Action Buttons inside content container to flow naturally */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsReconciliationOpen(false)}
                  className="flex-1 py-3 bg-[#343436] hover:bg-[#323236] text-white font-semibold text-sm rounded-full transition cursor-pointer text-center"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    alert(
                      "Shift cash reconciliation successfully submitted for review!",
                    );
                    setIsReconciliationOpen(false);
                  }}
                  className="flex-1 py-3 bg-[#EA580C] hover:bg-[#E05615] text-white font-bold text-sm rounded-full transition shadow-lg shadow-orange-500/10 cursor-pointer text-center"
                >
                  Submit for Review
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
