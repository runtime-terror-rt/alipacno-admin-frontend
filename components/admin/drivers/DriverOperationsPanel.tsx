"use client";

import { useState } from "react";
import { MoreVertical, Star, Bike, Search, CloudUpload, PlusCircle, Edit2, Trash2 } from "lucide-react";
import Pagination from "../ui/Pagination";
import DateFiltersBar from "../ui/DateFilterBar";
import FilterDropdown from "../ui/FilterDropdown";
import Image from "next/image";
import toast from 'react-hot-toast';
import EditDriverModal from "./modal/EditDriverModal";

// ── Types & Data ───────────────────────────────────────────────────────────
export type DriverStatus = "Available" | "On Delivery" | "Break" | "Offline";

export interface Driver {
  id: string;
  name: string;
  phone: string;
  branch: string;
  earnings: string;
  deliveries: number;
  status: DriverStatus;
  rating: number;
  ratingChange: string;
  ratingPositive: boolean;
  vehicle: "bike" | "car" | "scooter";
  image?: string;
}

const DRIVERS: Driver[] = [
  { id: "#d006 4448", name: "Brooklyn Simmons", phone: "(312) 555-0946", branch: "Eltham", earnings: "£32.00", deliveries: 20, status: "Available", rating: 4.9, ratingChange: "+4%", ratingPositive: true, vehicle: "bike", image: "/admin/avatar/cody.png" },
  { id: "#d006 4449", name: "Brooklyn Simmons", phone: "(312) 555-0946", branch: "Eltham", earnings: "£28.00", deliveries: 13, status: "On Delivery", rating: 4.2, ratingChange: "-2%", ratingPositive: false, vehicle: "scooter", image: "/admin/avatar/cody.png" },
  { id: "#d006 4450", name: "Brooklyn Simmons", phone: "(312) 555-0946", branch: "Eltham", earnings: "£33.00", deliveries: 72, status: "Break", rating: 3.8, ratingChange: "+1%", ratingPositive: true, vehicle: "bike", image: "/admin/avatar/cody.png" },
  { id: "#d006 4451", name: "Brooklyn Simmons", phone: "(312) 555-0946", branch: "Eltham", earnings: "£34.00", deliveries: 69, status: "Available", rating: 4.5, ratingChange: "+3%", ratingPositive: true, vehicle: "car", image: "/admin/avatar/cody.png" },
  { id: "#d006 4452", name: "Brooklyn Simmons", phone: "(312) 555-0946", branch: "Eltham", earnings: "£29.00", deliveries: 69, status: "Available", rating: 4.1, ratingChange: "+2%", ratingPositive: true, vehicle: "scooter", image: "/admin/avatar/cody.png" },
];

function DriverStatusBadge({ status }: { status: DriverStatus }) {
  const map: Record<DriverStatus, string> = {
    Available: "bg-green-500/15 text-green-400 border-green-500/30",
    "On Delivery": "bg-blue-500/15 text-blue-400 border-blue-500/30",
    Break: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
    Offline: "bg-zinc-500/15 text-zinc-400 border-zinc-500/30",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${map[status]}`}>
      {status}
    </span>
  );
}

function VehicleIcon({ type }: { type: "bike" | "car" | "scooter" }) {
  return <Bike size={14} className="text-[#f9671a]" />;
}

export default function DriverOperationsPanel() {
  const [drivers, setDrivers] = useState<Driver[]>(DRIVERS);
  const [editingDriver, setEditingDriver] = useState<Driver | null>(null);

  const handleEdit = (driver: Driver) => {
    setEditingDriver(driver);
  };

  const handleSaveDriver = (updatedDriver: Driver) => {
    setDrivers(prev => prev.map(d => d.id === updatedDriver.id ? updatedDriver : d));
    toast.success(`Driver ${updatedDriver.id} updated successfully`, {
      duration: 4000,
      position: 'top-center',
    });
  };

  const handleDelete = (driver: Driver) => {
    const toastId = toast((t) => (
      <div className="flex flex-col gap-3 min-w-[280px]">
        <div className="text-sm font-medium text-white">
          Delete Driver <span className="text-red-400">{driver.id}</span>?
        </div>
        <p className="text-xs text-zinc-400">
          This action cannot be undone. All associated data will be lost.
        </p>
        <div className="flex gap-2 justify-end mt-2">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-4 py-1.5 text-xs font-medium rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              setDrivers(prev => prev.filter(d => d.id !== driver.id));
              toast.dismiss(t.id);
              toast.success(`Driver ${driver.id} has been deleted`, { duration: 3000 });
            }}
            className="px-4 py-1.5 text-xs font-medium rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    ), {
      duration: Infinity,
      position: 'top-center',
      style: {
        background: '#1a1a1c',
        border: '1px solid #353535',
        padding: '16px',
        borderRadius: '12px',
      },
    });
  };

  return (
    <div className="bg-[#1a1a1c] border border-[#2e2e30] rounded-2xl p-5 space-y-4">
      <div>
        <h2 className="text-sm font-semibold text-white">Driver Operations Panel</h2>
        <p className="text-xs text-zinc-500">Live driver activity and delivery tracking.</p>
      </div>

      {/* Sub-filter row */}
      <div className="flex flex-wrap items-center gap-2">
        <DateFiltersBar tabs={["All", "On Delivery", "Available", "Break", "Offline"]} />
        <DateFiltersBar tabs={["TODAY", "YESTERDAY", "THIS WEEK", "LAST WEEK", "MTD", "6MD", "YTD"]} />
      </div>

      {/* Search + Export */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 bg-[#252527] border border-[#2e2e30] rounded-xl px-3 py-2 flex-1 min-w-[200px]">
          <Search size={14} className="text-zinc-500" />
          <input 
            type="text" 
            placeholder="Search driver Id, name, phone..." 
            className="bg-transparent text-xs text-white placeholder-zinc-500 outline-none flex-1" 
          />
        </div>

        {["Branch", "Driver Status", "Team", "Sort"].map((f) => (
          <FilterDropdown key={f} label={f} />
        ))}

        <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#f9671a]/50 text-[#f9671a] text-xs font-medium hover:bg-[#f9671a]/10 transition-colors whitespace-nowrap">
          <PlusCircle size={12} /> Add Driver
        </button>
        <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#2e2e30] text-zinc-400 text-xs font-medium hover:text-white transition-colors whitespace-nowrap">
          <CloudUpload size={12} /> Export Csv
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-[#2e2e30]">
              {["DRIVER ID", "ORDER NAME", "BRANCH", "EARNINGS", "DELIVERIES", "STATUS", "PERFORMANCE", "VEHICLE", "ACTION"].map((h) => (
                <th key={h} className="text-left text-zinc-500 font-medium pb-2.5 pr-4 whitespace-nowrap">
                  {h === "DRIVER ID" ? (
                    <div className="flex items-center gap-2">
                      <input type="checkbox" className="rounded bg-zinc-700" readOnly />
                      {h}
                    </div>
                  ) : h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2e2e30]/60">
            {drivers.map((d, i) => (
              <tr key={i} className="hover:bg-zinc-800/20 transition-colors">
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded bg-zinc-700" readOnly />
                    <span className="text-[#f9671a] font-medium">{d.id}</span>
                  </div>
                </td>
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-2">
                    <Image 
                      src={d.image || "/admin/avatar/default.png"} 
                      alt={d.name} 
                      width={28} 
                      height={28} 
                      className="rounded-full object-cover" 
                    />
                    <div>
                      <p className="text-white font-medium whitespace-nowrap">{d.name}</p>
                      <p className="text-zinc-500">{d.phone}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 pr-4 text-zinc-300">{d.branch}</td>
                <td className="py-3 pr-4 text-white font-medium">{d.earnings}</td>
                <td className="py-3 pr-4 text-zinc-300">{d.deliveries}</td>
                <td className="py-3 pr-4">
                  <DriverStatusBadge status={d.status} />
                </td>
                <td className="py-3 pr-4">
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-1">
                      <span className="text-white font-semibold">{d.rating}</span>
                      <Star size={10} className="text-yellow-400 fill-yellow-400" />
                    </div>
                    <span className={`text-[10px] font-medium ${d.ratingPositive ? "text-green-400" : "text-red-400"}`}>
                      {d.ratingChange}
                    </span>
                  </div>
                </td>
                <td className="py-3 pr-4">
                  <VehicleIcon type={d.vehicle} />
                </td>
                <td className="py-3">
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={() => handleEdit(d)}
                      className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-orange-400 transition-colors"
                      title="Edit Driver"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button 
                      onClick={() => handleDelete(d)}
                      className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-red-400 transition-colors"
                      title="Delete Driver"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination />

      {/* Edit Modal */}
      {editingDriver && (
        <EditDriverModal
          driver={editingDriver}
          onClose={() => setEditingDriver(null)}
          onSave={handleSaveDriver}
        />
      )}
    </div>
  );
}