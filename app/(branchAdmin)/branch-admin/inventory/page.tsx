"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Box,
  TrendingUp,
  AlertTriangle,
  AlertCircle,
  Search,
  Plus,
  Download,
  RotateCcw,
} from "lucide-react";
import { INVENTORY_STATS, INVENTORY_ITEMS, InventoryItem } from "./data";
import PageHeader from "@/components/admin/common/PageHeader";

export default function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>(INVENTORY_ITEMS);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("Today");

  // Handle live restock increments
  const handleRestock = (itemId: string) => {
    setItems(
      items.map((item) => {
        if (item.id === itemId) {
          // Increment quantity by 10
          const currentQty = parseInt(item.quantity);
          const unit = item.quantity.replace(/[0-9\s]/g, "");
          const newQtyVal = currentQty + 10;
          const newQty = `${newQtyVal} ${unit}`;

          // Recalculate status
          const minVal = parseInt(item.minStock);
          let status: InventoryItem["status"] = "In Stock";
          if (newQtyVal === 0) status = "Out Of Stock";
          else if (newQtyVal < minVal) status = "Low Stock";

          return { ...item, quantity: newQty, status };
        }
        return item;
      }),
    );
  };

  // Filter items by search
  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Helper icons for stat cards
  const getStatIcon = (iconName: string) => {
    switch (iconName) {
      case "box":
        return Box;
      case "trend-up":
        return TrendingUp;
      case "alert-triangle":
        return AlertTriangle;
      case "alert-circle":
        return AlertCircle;
      default:
        return Box;
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn pb-12">
      {/* Title block */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <PageHeader
          title="Inventory Management"
          subtitle="Track and manage stock levels"
        />

        {/* Filter Pills and Export Button */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="bg-[#121214] border border-zinc-800 rounded-xl p-1 flex">
            {["Today", "Week", "Month", "Year"].map((pill) => (
              <button
                key={pill}
                onClick={() => setActiveFilter(pill)}
                className={`
                  px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-black uppercase tracking-wider transition-all cursor-pointer
                  ${
                    activeFilter === pill
                      ? "bg-zinc-800 text-white border border-zinc-700/50 shadow"
                      : "text-zinc-400 hover:text-zinc-200"
                  }
                `}
              >
                {pill}
              </button>
            ))}
          </div>

          <button className="px-4.5 py-2 bg-orange-500 hover:bg-orange-600 rounded-xl text-[11px] font-black uppercase tracking-wider text-white flex items-center space-x-1.5 transition cursor-pointer">
            <Download className="h-3.5 w-3.5" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Top Stat Cards (figma mesh glow styled on the right side) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {INVENTORY_STATS.map((stat, idx) => {
          const Icon = getStatIcon(stat.iconName);
          return (
            <div
              key={idx}
              className="bg-[#1E1E20] rounded-2xl border border-[#2e2e30] p-5 relative overflow-hidden flex items-center space-x-4 min-h-[105px]"
            >
              {/* Decorative BG */}
              <div className="absolute -right-10 -top-10 w-40 h-40 pointer-events-none">
                <Image
                  src="/admin/common/stats.svg"
                  alt="Decorative arc"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Left Square Icon */}
              <div
                className={`h-11 w-11 rounded-xl flex items-center justify-center shrink-0 border border-[#FFFFFF1A] bg-[#1E1E20] ${stat.iconColor}`}
              >
                <Icon className="h-5 w-5" />
              </div>

              {/* Right Labels */}
              <div className="relative z-10">
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

      {/* Search and Action Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3.5">
        <div className="relative flex-1 w-full">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
            <Search className="h-4 w-4 text-zinc-550" />
          </span>
          <input
            type="text"
            placeholder="Search inventory..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-zinc-800 bg-[#252527] rounded-2xl py-3 pl-11 pr-4 text-xs sm:text-sm text-white placeholder-zinc-550 focus:outline-none focus:border-orange-500 transition-colors"
          />
        </div>

        <button className="w-full sm:w-auto px-5 py-3 bg-[#F9671A] hover:bg-orange-600 rounded-xl text-xs uppercase tracking-wider text-white flex items-center justify-center space-x-1.5 transition-all shadow-md shadow-orange-500/10 cursor-pointer">
          <Plus className="h-4 w-4 stroke-[3px]" />
          <span>Add Item</span>
        </button>
      </div>

      {/* Main Stock Table */}
      <div className="bg-[#18181B] border border-[#2A2A2E] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-[#1C1C1C]">
              <tr className="border-b border-[#2B2B30]">
                <th className="px-6 py-5 text-left text-[13px] font-bold text-white">
                  Item Name
                </th>
                <th className="px-6 py-5 text-left text-[13px] font-bold text-white">
                  Category
                </th>
                <th className="px-6 py-5 text-left text-[13px] font-bold text-white">
                  Quantity
                </th>
                <th className="px-6 py-5 text-left text-[13px] font-bold text-white">
                  Min Stock
                </th>
                <th className="px-6 py-5 text-left text-[13px] font-bold text-white">
                  Price/Unit
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
              {filteredItems.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-[#2B2B30] hover:bg-[#232327] transition-colors"
                >
                  <td className="px-6 py-5 text-[15px] font-medium text-white">
                    {item.name}
                  </td>

                  <td className="px-6 py-5 text-[15px] font-semibold text-zinc-200">
                    {item.category}
                  </td>

                  <td className="px-6 py-5 text-[15px] font-semibold text-white">
                    {item.quantity}
                  </td>

                  <td className="px-6 py-5 text-[15px] font-semibold text-zinc-300">
                    {item.minStock}
                  </td>

                  <td className="px-6 py-5 text-[15px] font-bold text-orange-500">
                    {item.price}
                  </td>

                  <td className="px-6 py-5 text-center">
                    <span
                      className={`
                  inline-flex items-center justify-center
                  px-4 py-1.5 rounded-full
                  text-[12px] font-semibold
                  min-w-[95px]
                  
                  ${item.status === "In Stock" && "bg-emerald-500 text-white"}

                  ${item.status === "Low Stock" && "bg-amber-500 text-white"}

                  ${item.status === "Out Of Stock" && "bg-red-500 text-white"}
                `}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="px-6 py-5 text-right">
                    <button
                      onClick={() => handleRestock(item.id)}
                      className="
                  px-5 py-2
                  rounded-xl
                  bg-[#414141]
                  hover:bg-[#4A4A4E]
                  text-white
                  text-[14px]
                  font-medium
                  transition-all
                  cursor-pointer
                "
                    >
                      Restock
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
