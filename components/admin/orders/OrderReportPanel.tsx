"use client";

import Pagination from "@/components/admin/ui/Pagination";
import DateFiltersBar from "@/components/admin/ui/DateFilterBar";
import FilterDropdown from "@/components/admin/ui/FilterDropdown";
import { Search, CloudUpload } from "lucide-react";
import { useState } from "react";
import OrdersTable from "./OrdersTable";

export type OrderStatus = "Completed" | "Preparing" | "On Delivery" | "Cancelled";

export interface Order {
  id: string;
  customer: string;
  phone: string;
  avatar: string;
  branch: string;
  orderType: string;
  amount: string;
  payment: string;
  status: OrderStatus;
  driver: string;
  driverAvatar: string;
  time: string;
  date: string;
  image: string;
}

const ORDERS: Order[] = [
  {
    id: "#FD-9921",
    customer: "Brooklyn Simmons",
    phone: "(312) 555-0192",
    avatar: "/avatars/1.jpg",
    branch: "Eltham",
    orderType: "Delivery",
    amount: "£32.00",
    payment: "Card",
    status: "Completed",
    driver: "Brooklyn Simmons",
    driverAvatar: "/avatars/d1.jpg",
    time: "09:42 AM",
    date: "May 04 2026",
    image: "/admin/avatar/default.png"
  },
  {
    id: "#FD-9921",
    customer: "Brooklyn Simmons",
    phone: "(312) 555-0192",
    avatar: "/avatars/2.jpg",
    branch: "Eltham",
    orderType: "Delivery",
    amount: "£32.00",
    payment: "Cash",
    status: "Preparing",
    driver: "Brooklyn Simmons",
    driverAvatar: "/avatars/d2.jpg",
    time: "09:42 AM",
    date: "May 04 2026",
    image: "/admin/avatar/default.png"
  },
  {
    id: "#FD-9921",
    customer: "Brooklyn Simmons",
    phone: "(312) 555-0192",
    avatar: "/avatars/3.jpg",
    branch: "Eltham",
    orderType: "Delivery",
    amount: "£32.00",
    payment: "Cash",
    status: "On Delivery",
    driver: "Brooklyn Simmons",
    driverAvatar: "/avatars/d3.jpg",
    time: "09:42 AM",
    date: "May 04 2026",
    image: "/admin/avatar/default.png"
  },
  {
    id: "#FD-9921",
    customer: "Brooklyn Simmons",
    phone: "(312) 555-0192",
    avatar: "/avatars/4.jpg",
    branch: "Eltham",
    orderType: "Delivery",
    amount: "£32.00",
    payment: "Card",
    status: "Cancelled",
    driver: "Brooklyn Simmons",
    driverAvatar: "/avatars/d4.jpg",
    time: "09:42 AM",
    date: "May 04 2026",
    image: "/admin/avatar/default.png"
  },
  {
    id: "#FD-9921",
    customer: "Brooklyn Simmons",
    phone: "(312) 555-0192",
    avatar: "/avatars/5.jpg",
    branch: "Eltham",
    orderType: "Delivery",
    amount: "£32.00",
    payment: "Card",
    status: "Completed",
    driver: "Brooklyn Simmons",
    driverAvatar: "/avatars/d5.jpg",
    time: "09:42 AM",
    date: "May 04 2026",
    image: "/admin/avatar/default.png"
  },
];

const OrderReportPanel = () => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);  
  
  const toggleRow = (i: number) =>
    setSelectedRows((prev) => (prev.includes(i) ? prev.filter((r) => r !== i) : [...prev, i]));

  return (
    <div className="bg-[#1C1C1E] rounded-xl p-5 border border-[#353535]">
      <div className="mb-4">
        <h2 className="text-base font-semibold text-white">Order Report</h2>
        <p className="text-xs text-zinc-500">Comprehensive order monitoring and filtering</p>
      </div>

      {/* Filters Row 1 */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <DateFiltersBar
          tabs={["Today", "Weekly", "Monthly", "Custom Range"]}
          defaultTab="Weekly"
          onChange={(tab) => {
            console.log("Selected:", tab);
          }}
        />
        <div className="flex flex-wrap gap-2 ml-auto">
          <FilterDropdown label="Order Status" />
          <FilterDropdown label="Order Type" />
          <FilterDropdown label="Branch" />
          <FilterDropdown label="Payment Method" />
        </div>
      </div>

      {/* Search + Export Row */}
      <div className="flex items-center gap-3 mb-5">
        <div className="relative flex-1 bg-[#1A1A1C] rounded-lg">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search order id, customer, phone..."
            className="w-full bg-[#1A1A1C] rounded-lg pl-9 pr-4 py-2.5 text-sm text-white placeholder-zinc-500 outline-none focus:ring-1 focus:ring-(--color-brand)/40"
          />
        </div>
        
        {/* Export buttons */}
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#2e2e30] hover:border-(--color-brand) text-[#626262] hover:text-(--color-brand) text-sm font-medium hover:bg-(--color-brand)/10 transition-colors cursor-pointer">
            <CloudUpload size={15} /> Export CSV
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#2e2e30] hover:border-(--color-brand) text-[#626262] hover:text-(--color-brand) text-sm font-medium hover:bg-(--color-brand)/10 transition-colors cursor-pointer">
            <CloudUpload size={15} /> Export Excel
          </button>
        </div>
      </div>

      {/* Table Section (Props Connected) */}
      <OrdersTable 
        ORDERS={ORDERS} 
        selectedRows={selectedRows} 
        toggleRow={toggleRow} 
      />

      {/* Pagination wrapper spacing */}
      <div className="mt-5">
        <Pagination />
      </div>
    </div>
  );
};

export default OrderReportPanel;