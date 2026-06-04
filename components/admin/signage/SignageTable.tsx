"use client";

import { useState } from "react";
import { Search, ChevronDown, MoreVertical, Plus, Edit2, Trash2 } from "lucide-react";
import Image from "next/image";
import { signageTableData } from "@/app/(admin)/admin/signage/data";

export default function SignageTable() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (id: string) => {
    if (openDropdown === id) setOpenDropdown(null);
    else setOpenDropdown(id);
  };

  return (
    <div className="bg-[#121214] border border-zinc-800 rounded-3xl p-6 shadow-2xl overflow-visible">
      <div className="mb-6">
        <h2 className="text-lg font-black text-white">Digital Signage Management</h2>
        <p className="text-zinc-500 text-xs font-semibold mt-1">
          Manage and display content across all in-store screens
        </p>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 relative z-20">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search order id, customer, phone..."
            className="w-full bg-[#161618] border border-zinc-800 focus:border-zinc-700 rounded-xl py-2 pl-9 pr-4 text-xs font-semibold text-white outline-none transition-colors"
          />
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 scrollbar-hide">
          <div className="relative shrink-0">
            <select className="appearance-none bg-[#161618] border border-zinc-800 rounded-xl py-2 pl-4 pr-10 text-xs font-semibold text-zinc-300 outline-none hover:border-zinc-700 transition-colors cursor-pointer">
              <option>All Branches</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 pointer-events-none" />
          </div>
          <div className="relative shrink-0">
            <select className="appearance-none bg-[#161618] border border-zinc-800 rounded-xl py-2 pl-4 pr-10 text-xs font-semibold text-zinc-300 outline-none hover:border-zinc-700 transition-colors cursor-pointer">
              <option>All Screen Groups</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 pointer-events-none" />
          </div>
          <div className="relative shrink-0">
            <select className="appearance-none bg-[#161618] border border-zinc-800 rounded-xl py-2 pl-4 pr-10 text-xs font-semibold text-zinc-300 outline-none hover:border-zinc-700 transition-colors cursor-pointer">
              <option>All Status</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 pointer-events-none" />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 border border-orange-500/50 hover:bg-orange-500/10 text-orange-500 rounded-xl text-xs font-black uppercase tracking-wider transition-colors shrink-0">
            <Plus className="h-4 w-4" />
            <span>Add Item</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto -mx-6 px-6 pb-20">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="border-y border-zinc-800/80 text-[10px] font-black text-zinc-500 uppercase tracking-widest bg-[#1c1c1e]">
              <th className="py-4 px-4 w-[35%]">SCREEN / LOCATION</th>
              <th className="py-4">BRANCH</th>
              <th className="py-4">STATUS</th>
              <th className="py-4">UPDATED</th>
              <th className="py-4">UPDATED</th>
              <th className="py-4 text-right px-4">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60 text-xs font-semibold">
            {signageTableData.map((row) => (
              <tr key={row.id} className="hover:bg-[#161618] transition-colors group">
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-3">
                    <div className="h-16 w-16 bg-zinc-800 rounded overflow-hidden shrink-0 relative">
                       {/* Placeholder Image using next/image. If it fails, bg-zinc-800 shows */}
                       <Image src={row.image} alt={row.name} layout="fill" objectFit="cover" />
                    </div>
                    <div className="flex flex-col space-y-0.5">
                      <span className="text-white font-bold text-xs">{row.name}</span>
                      <span className="text-zinc-500 text-[10px]">{row.resolution}</span>
                    </div>
                  </div>
                </td>
                <td className="py-4 text-zinc-300">{row.branch}</td>
                <td className="py-4">
                  <span className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                    row.status === "Active" 
                      ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" 
                      : "bg-orange-500/10 border-orange-500/20 text-orange-500"
                  }`}>
                    {row.status === "Active" && <span className="mr-0.5">+</span>}
                    <span>{row.status}</span>
                  </span>
                </td>
                <td className="py-4 text-zinc-500 leading-tight">
                  <span className="text-white font-bold block">{row.updatedTime}</span>
                  <span className="text-[10px]">{row.updatedDate}</span>
                </td>
                <td className="py-4 text-zinc-500 leading-tight">
                  <span className="text-white font-bold block">{row.updatedTime}</span>
                  <span className="text-[10px]">{row.updatedDate}</span>
                </td>
                <td className="py-4 text-right px-4 relative z-10">
                  <button 
                    onClick={() => toggleDropdown(row.id)}
                    className="p-2 text-zinc-500 hover:text-white transition-colors"
                  >
                    <MoreVertical className="h-4 w-4 ml-auto" />
                  </button>
                  
                  {openDropdown === row.id && (
                    <>
                      {/* Invisible overlay to close dropdown */}
                      <div className="fixed inset-0 z-40" onClick={() => setOpenDropdown(null)} />
                      
                      <div className="absolute right-8 top-10 w-32 bg-[#1c1c1e] border border-zinc-800 rounded-xl shadow-xl py-1 z-50 animate-fadeIn">
                        <button className="w-full flex items-center space-x-2 px-4 py-2 text-xs font-bold text-white hover:bg-[#2c2c2e] transition-colors">
                          <Edit2 className="h-3 w-3" />
                          <span>Edit</span>
                        </button>
                        <button className="w-full flex items-center space-x-2 px-4 py-2 text-xs font-bold text-red-500 hover:bg-red-500/10 transition-colors">
                          <Trash2 className="h-3 w-3" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
