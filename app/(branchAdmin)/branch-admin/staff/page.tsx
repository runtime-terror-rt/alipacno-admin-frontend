"use client";

import { useState } from "react";
import Image from "next/image";
import { 
  User, 
  Clock, 
  DollarSign, 
  Percent,
  Search,
  Check,
  X,
  TrendingUp,
  AlertCircle
} from "lucide-react";
import { STAFF_STATS, STAFF_MEMBERS, StaffMember } from "./data";

export default function StaffPage() {
  const [staff, setStaff] = useState<StaffMember[]>(STAFF_MEMBERS);
  const [searchQuery, setSearchQuery] = useState("");

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

        <button className="px-5 py-3 bg-orange-500 hover:bg-orange-600 rounded-2xl text-xs font-black uppercase tracking-wider text-white flex items-center justify-center space-x-1.5 transition shadow-md shadow-orange-500/10 cursor-pointer">
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
              className="bg-[#121214] border border-zinc-800 rounded-2xl p-5 relative overflow-hidden flex items-center space-x-4 min-h-[105px]"
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
      <div className="bg-[#121214]/65 border border-zinc-850 rounded-2xl p-5 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800/60 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
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
            <tbody className="divide-y divide-zinc-850/50 text-xs">
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

    </div>
  );
}
