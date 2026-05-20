"use client";

import Pagination from "@/components/admin/ui/Pagination";
import DateFiltersBar from "@/components/admin/ui/DateFilterBar";
import FilterDropdown from "@/components/admin/ui/FilterDropdown";
import {
  Search,
  MoreVertical,
  CloudUpload,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";


type OrderStatus = "Completed" | "Preparing" | "On Delivery" | "Cancelled";

interface Order {
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
  image : string;
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

// ── Status Badge ───────────────────────────────────────────────────────────
const statusConfig: Record<OrderStatus, { label: string; className: string }> = {
  Completed: { label: "Completed", className: "bg-green-500/20 text-green-400 border border-green-500/30" },
  Preparing: { label: "Preparing", className: "bg-[#E8833A]/20 text-[#E8833A] border border-[#E8833A]/30" },
  "On Delivery": { label: "On Delivery", className: "bg-blue-500/20 text-blue-400 border border-blue-500/30" },
  Cancelled: { label: "Cancel", className: "bg-red-500/20 text-red-400 border border-red-500/30" },
};

function StatusBadge({ status }: { status: OrderStatus }) {
  const cfg = statusConfig[status];
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${cfg.className}`}>
      {cfg.label}
    </span>
  );
}

const OrderReportPanel = () => {

  const [selectedRows, setSelectedRows] = useState<number[]>([]);  
  const toggleRow = (i: number) =>
        setSelectedRows((prev) => (prev.includes(i) ? prev.filter((r) => r !== i) : [...prev, i]));
  return (
    <div className="bg-[#1C1C1E] rounded-xl p-5">
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
              <div className="flex items-center gap-3 mb-4 bg-[#1a1a1c]">
                <div className="relative flex-1 bg-[#1a1a1c]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="text"
                    placeholder="Search order id, customer, phone..."
                    className="w-full bg-[#1a1a1c] rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-zinc-500 outline-none focus:ring-1 focus:ring-[#E8833A]/50"
                  />
                </div>
               {/* Export buttons */}
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#2e2e30] hover:border-[#f9671a] text-[#626262] hover:text-[#f9671a] text-sm font-medium hover:bg-[#f9671a]/10 transition-colors cursor-pointer">
                    <CloudUpload size={15} /> Export CSV
                </button>
                 <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#2e2e30] hover:border-[#f9671a] text-[#626262] hover:text-  [#f9671a] text-sm font-medium hover:bg-[#f9671a]/10 transition-colors cursor-pointer">
                   <CloudUpload  size={15} /> Export Excel
                </button>
              </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="py-3 rounded-lg!" >
                    <tr className="border-b border-zinc-800 bg-[#3D3D3D]">
                      {["ORDER ID", "CUSTOMER", "BRANCH", "ORDER TYPE", "AMOUNT", "PAYMENT", "STATUS", "DRIVER", "TIME", "ACTION"].map((h) => (
                        <th key={h} className="text-left text-xs text-gray-100   font-medium pb-3 pr-4 first:pl-2 whitespace-nowrap">
                          {h === "ORDER ID" ? (
                            <div className="flex items-center gap-2 pt-3 ">
                              <input type="checkbox" className="rounded bg-zinc-700 border-zinc-600 text-[#E8833A]" readOnly />
                              {h}
                            </div>
                          ) : <div className="pt-3">{h}</div>
                          }
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60">
                    {ORDERS.map((order, i) => (
                      <tr key={i} className="hover:bg-zinc-800/30 transition-colors">
                        <td className="py-3 pr-4 pl-2">
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={selectedRows.includes(i)}
                              onChange={() => toggleRow(i)}
                              className="rounded bg-gray-900 border-zinc-600 text-[#E8833A]"
                            />
                            <span className="text-[#E8833A] text-xs font-medium">{order.id}</span>
                          </div>
                        </td>
                        <td className="py-3 pr-4">
                          <div className="flex items-center gap-2">
                            <Image src={order.image} alt={order.customer} width={40} height={40} />
                            <div>
                              <p className="text-xs font-medium text-white whitespace-nowrap">{order.customer}</p>
                              <p className="text-xs text-zinc-500">{order.phone}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 pr-4 text-xs text-zinc-300">{order.branch}</td>
                        <td className="py-3 pr-4 text-xs text-zinc-300">{order.orderType}</td>
                        <td className="py-3 pr-4 text-xs text-white font-medium">{order.amount}</td>
                        <td className="py-3 pr-4">
                          <div className="flex items-center gap-1.5">
                            <div className={`w-6 h-4 rounded ${order.payment === "Card" ? "bg-gradient-to-r from-zinc-600 to-zinc-500" : "bg-zinc-700"} flex items-center justify-center`}>
                              <div className="w-3 h-2 rounded-sm bg-zinc-400/50" />
                            </div>
                            <span className="text-xs text-zinc-300">{order.payment}</span>
                          </div>
                        </td>
                        <td className="py-3 pr-4">
                          <StatusBadge status={order.status} />
                        </td>
                        <td className="py-3 pr-4">
                          <div className="flex items-center gap-1.5">
                            <Image src={order.image} alt={order.customer} width={32} height={32} />
                            <span className="text-xs text-zinc-300 whitespace-nowrap">{order.driver}</span>
                          </div>
                        </td>
                        <td className="py-3 pr-4">
                          <p className="text-xs text-zinc-300 whitespace-nowrap">{order.time}</p>
                          <p className="text-xs text-zinc-500">{order.date}</p>
                        </td>
                        <td className="py-3">
                          <button className="p-1 rounded-lg hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <Pagination />
            </div>
  )
}

export default OrderReportPanel
