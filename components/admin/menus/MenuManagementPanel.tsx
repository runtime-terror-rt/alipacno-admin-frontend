"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  RefreshCw,
  Download,
  MoreVertical,
} from "lucide-react";

import Pagination from "../ui/Pagination";
import DateFiltersBar from "../ui/DateFilterBar";
import FilterDropdown from "../ui/FilterDropdown";
import Button from "../ui/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";

type MenuStatus =
  | "Available"
  | "Out of Stock"
  | "Hidden";

interface MenuItem {
  customer: string;
  phone: string;
  modifierId: string;
  price: string;
  modifiers: number;
  status: MenuStatus;
  availableAt: string;
  updated: string;
  updatedDate: string;
  image:string;
}

const MENU_ITEMS: MenuItem[] = [
  {
    customer: "Chicken Burger",
    phone: "Fast Food",
    modifierId: "#MOD-001",
    price: "£12.00",
    modifiers: 4,
    status: "Available",
    availableAt: "All Branches",
    updated: "2 mins ago",
    updatedDate: "12 May 2026",
    image: "/admin/avatar/default.png"
  },
  {
    customer: "Cheese Pizza",
    phone: "Pizza",
    modifierId: "#MOD-002",
    price: "£18.00",
    modifiers: 2,
    status: "Out of Stock",
    availableAt: "Downtown",
    updated: "10 mins ago",
    updatedDate: "12 May 2026",
    image: "/admin/avatar/default.png"
  },
  {
    customer: "Chicken Wings",
    phone: "Snacks",
    modifierId: "#MOD-003",
    price: "£9.00",
    modifiers: 5,
    status: "Hidden",
    availableAt: "Eltham",
    updated: "1 hour ago",
    updatedDate: "11 May 2026",
    image: "/admin/avatar/default.png"
  },
   {
    customer: "Chicken Burger",
    phone: "Fast Food",
    modifierId: "#MOD-001",
    price: "£12.00",
    modifiers: 4,
    status: "Available",
    availableAt: "All Branches",
    updated: "2 mins ago",
    updatedDate: "12 May 2026",
    image: "/admin/avatar/default.png"
  },
  {
    customer: "Cheese Pizza",
    phone: "Pizza",
    modifierId: "#MOD-002",
    price: "£18.00",
    modifiers: 2,
    status: "Out of Stock",
    availableAt: "Downtown",
    updated: "10 mins ago",
    updatedDate: "12 May 2026",
    image: "/admin/avatar/default.png"
  },
];

function StatusBadge({
  status,
}: {
  status: MenuStatus;
}) {
  const styles: Record<MenuStatus, string> = {
    Available:
      "bg-green-500/15 text-green-400 border-green-500/30",

    "Out of Stock":
      "bg-red-500/15 text-red-400 border-red-500/30",

    Hidden:
      "bg-zinc-500/15 text-zinc-400 border-zinc-500/30",
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border whitespace-nowrap ${styles[status]}`}
    >
      {status}
    </span>
  );
}

export default function MenuManagementPanel() {
  const router = useRouter();
  const [activeTab, setActiveTab] =
    useState("All");

  const tabs = [
    "All",
    "Popular",
    "Available",
    "Out of Stock",
    "Hidden",
  ];

  const columns = [
    "ITEM",
    "CATEGORY",
    "PRICE",
    "MODIFIERS",
    "STATUS",
    "AVAILABLE AT",
    "UPDATED",  
    "ACTION",
  ];

  return (
    <div className="bg-[#1a1a1c] border border-[#2e2e30] rounded-2xl p-5 space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-base font-bold text-white">
          Menu Management
        </h2>

        <p className="text-xs text-zinc-500">
          Manage categories, items, pricing and
          availability
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <DateFiltersBar
          tabs={tabs}
        //   value={activeTab}
          onChange={setActiveTab}
        />

        <div className="flex items-center gap-2 flex-wrap">
          <FilterDropdown label="All Categories" />
          <FilterDropdown label="All Branches" />
          <FilterDropdown label="All Status" />
        </div>
      </div>

      {/* Search + Actions */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 bg-[#1f1f21] border border-[#2e2e30] rounded-xl px-3 py-2.5 flex-1 min-w-[180px]">
          <Search
            size={14}
            className="text-zinc-500 flex-shrink-0"
          />

          <input
            type="text"
            placeholder="Search menu items..."
            className="bg-transparent text-xs text-white placeholder-zinc-500 outline-none w-full"
          />
        </div>

        <Button type="button" onClick={() => router.push("/admin/menus/add")} className="px-4 py-2.5 flex items-center gap-1.5 w-fit">
          <Plus size={14} />
          Add Item
        </Button>

        <Button
          variant="ghost"
          className="px-4 py-2.5 flex items-center gap-1.5 w-fit"
        >
          <RefreshCw size={14} />
          Bulk Update
        </Button>

        <Button
          variant="ghost"
          className="px-4 py-2.5 flex items-center gap-1.5 w-fit"
        >
          <Download size={14} />
          Export Excel
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-[#2e2e30]">
              {columns.map((h) => (
                <th
                  key={h}
                  className="text-left text-zinc-500 font-medium pb-3 pr-4 whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-[#2e2e30]/60">
            {MENU_ITEMS.map((item, i) => (
              <tr
                key={i}
                className="hover:bg-zinc-800/20 transition-colors"
              >
                {/* Item */}
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-2.5">
                    <Image src={item.image} alt={item.customer} width={44} height={44} />

                    <div>
                      <p className="text-white font-medium whitespace-nowrap">
                        {item.customer}
                      </p>

                      <p className="text-zinc-500 text-[10px]">
                        {item.phone}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Category */}
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-1.5">
                    <input
                      type="checkbox"
                      className="rounded bg-zinc-700"
                      readOnly
                    />

                    <span className="text-[#f9671a] font-medium">
                      {item.modifierId}
                    </span>
                  </div>
                </td>

                {/* Price */}
                <td className="py-3 pr-4 text-white font-medium whitespace-nowrap">
                  {item.price}
                </td>

                {/* Modifiers */}
                <td className="py-3 pr-4 text-zinc-300">
                  {item.modifiers}
                </td>

                {/* Status */}
                <td className="py-3 pr-4">
                  <StatusBadge status={item.status} />
                </td>

                {/* Available */}
                <td className="py-3 pr-4 text-zinc-300 whitespace-nowrap">
                  {item.availableAt}
                </td>

                {/* Updated */}
                <td className="py-3 pr-4">
                  <p className="text-zinc-300 whitespace-nowrap">
                    {item.updated}
                  </p>

                  <p className="text-zinc-500 text-[10px]">
                    {item.updatedDate}
                  </p>
                </td>

                {/* Action */}
                <td className="py-3">
                  <button className="p-1.5 rounded-lg hover:bg-[#252527] text-zinc-400 hover:text-white transition-colors">
                    <MoreVertical size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination />
    </div>
  );
}