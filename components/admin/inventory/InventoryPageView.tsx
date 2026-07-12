"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Package,
  AlertTriangle,
  Store,
  Search,
  ChevronDown,
  LogIn,
  ChevronLeft,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
type StockStatus = "In Stock" | "Low Stock" | "Out of Stock";
type ItemType = "Raw material" | "Prepared";

interface InventoryItem {
  id: number;
  image: string;
  detailImage?: string;
  name: string;
  type: ItemType;
  unit: string;
  undistributed: number;
  total: number;
  threshold: number;
  status: StockStatus;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const INVENTORY_ITEMS: InventoryItem[] = [
  { id: 1, image: "/admin/dashboard/inventory-1.png", detailImage: "/admin/dashboard/Frame 2147230267.png", name: "Minced Beef",              type: "Raw material", unit: "KG",  undistributed: 21, total: 29, threshold: 10, status: "In Stock" },
  { id: 2, image: "/admin/dashboard/inventory-2.png", name: "Tomatoes",                 type: "Raw material", unit: "KG",  undistributed: 21, total: 29, threshold: 10, status: "In Stock" },
  { id: 3, image: "/admin/dashboard/inventory-8.png", name: "Mozzarella Cheese",        type: "Raw material", unit: "KG",  undistributed: 21, total: 29, threshold: 10, status: "Low Stock" },
  { id: 4, image: "/admin/dashboard/inventory-3.png", name: "Lettuce",                  type: "Raw material", unit: "KG",  undistributed: 21, total: 29, threshold: 10, status: "In Stock" },
  { id: 5, image: "/admin/dashboard/inventory-4.png", name: "Burger Bun",               type: "Raw material", unit: "PCS", undistributed: 21, total: 29, threshold: 10, status: "Out of Stock" },
  { id: 6, image: "/admin/dashboard/inventory-5.png", name: "Beef Patty",               type: "Prepared",     unit: "PCS", undistributed: 21, total: 29, threshold: 10, status: "In Stock" },
  { id: 7, image: "/admin/dashboard/inventory-6.png", name: "Chicken Breast (portion)", type: "Prepared",     unit: "PCS", undistributed: 21, total: 29, threshold: 10, status: "In Stock" },
  { id: 8, image: "/admin/dashboard/inventory-7.png", name: "Pizza Dough (medium)",     type: "Prepared",     unit: "PCS", undistributed: 21, total: 29, threshold: 10, status: "Out of Stock" },
];

const MOCK_BRANCH_STOCK = [
  { branch: "Eltham", location: "Eltham, London", stock: 12, percent: 95, threshold: 10, status: "In Stock" as StockStatus },
  { branch: "Greenwich", location: "Greenwich, London", stock: 8, percent: 70, threshold: 10, status: "In Stock" as StockStatus },
  { branch: "Woolwich", location: "Woolwich, London", stock: 5, percent: 32, threshold: 10, status: "Low Stock" as StockStatus },
];

// ─── Stat Card ────────────────────────────────────────────────────────────────
interface StatCardProps {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  value: string | number;
}

function StatCard({ icon, iconBg, label, value }: StatCardProps) {
  return (
    <div className="relative bg-[#1e1e20] border border-[#2e2e30] rounded-xl overflow-hidden flex items-center gap-5 px-5 py-5 min-h-[100px] h-full">

      {/* Background: Vector 7 (orange gradient) smoothly masked */}
      <div
        className="absolute right-0 top-0 h-full w-[35%] pointer-events-none select-none"
        style={{
          backgroundImage: "url('/admin/dashboard/Vector 7.png')",
          backgroundSize: "100% 100%",
          backgroundPosition: "right center",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 50%)",
          maskImage: "linear-gradient(to right, transparent 0%, black 50%)",
        }}
      />

      {/* Foreground highlight: Vector 63 (white radial) centered over the gradient */}
      <div
        className="absolute right-0 top-0 h-full w-[25%] pointer-events-none select-none"
        style={{
          backgroundImage: "url('/admin/dashboard/Vector 63 (1).png')",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right center",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 50%)",
          maskImage: "linear-gradient(to right, transparent 0%, black 50%)",
        }}
      />

      {/* Icon */}
      <div className={`relative z-10 w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}>
        {icon}
      </div>

      {/* Text */}
      <div className="relative z-10 flex flex-col gap-1">
        <span className="text-zinc-400 text-[13px] font-medium leading-tight">{label}</span>
        <span className="text-white text-[28px] font-bold leading-tight tracking-tight">{value}</span>
      </div>
    </div>
  );
}

// ─── Status Badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: StockStatus }) {
  const map: Record<StockStatus, string> = {
    "In Stock":     "bg-green-500 text-white",
    "Low Stock":    "bg-yellow-500 text-white",
    "Out of Stock": "bg-red-500 text-white",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap ${map[status]}`}>
      {status}
    </span>
  );
}

// ─── Select Filter Dropdown ───────────────────────────────────────────────────
interface SelectFilterProps {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}

function SelectFilter({ label, options, value, onChange }: SelectFilterProps) {
  const [open, setOpen] = useState(false);
  const display = value === "" ? label : value;
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-1.5 px-3 py-2 border rounded-lg text-[13px] transition-colors whitespace-nowrap cursor-pointer ${
          value !== ""
            ? "bg-orange-500/10 border-orange-500/40 text-orange-400"
            : "bg-[#1e1e20] border-[#2e2e30] text-zinc-300 hover:border-zinc-600"
        }`}
      >
        {display}
        <ChevronDown
          size={13}
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : ""
          } ${value !== "" ? "text-orange-400" : "text-zinc-500"}`}
        />
      </button>

      {open && (
        <>
          {/* backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setOpen(false)}
          />
          {/* dropdown */}
          <div className="absolute top-full mt-1 left-0 z-20 bg-[#1a1a1c] border border-[#2e2e30] rounded-xl shadow-xl overflow-hidden min-w-[150px]">
            {/* All option */}
            <button
              onClick={() => { onChange(""); setOpen(false); }}
              className={`w-full text-left px-3 py-2.5 text-[13px] hover:bg-zinc-800/60 transition-colors ${
                value === "" ? "text-orange-400 font-semibold" : "text-zinc-300"
              }`}
            >
               {label}
            </button>
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => { onChange(opt); setOpen(false); }}
                className={`w-full text-left px-3 py-2.5 text-[13px] hover:bg-zinc-800/60 transition-colors ${
                  value === opt ? "text-orange-400 font-semibold" : "text-zinc-300"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ─── Main View ────────────────────────────────────────────────────────────────
export default function InventoryPageView() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter]     = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const totalItems  = INVENTORY_ITEMS.length;
  const lowStock    = INVENTORY_ITEMS.filter((i) => i.status === "Low Stock").length;
  const outOfStock  = INVENTORY_ITEMS.filter((i) => i.status === "Out of Stock").length;
  const totalBranch = 3;

  const filtered = INVENTORY_ITEMS.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchType   = typeFilter   === "" || item.type   === typeFilter;
    const matchStatus = statusFilter === "" || item.status === statusFilter;
    return matchSearch && matchType && matchStatus;
  });

  const [viewItem, setViewItem] = useState<InventoryItem | null>(null);

  if (viewItem) {
    return (
      <div className="flex-1 min-h-screen text-white p-5 space-y-6">
        {/* Back Button */}
        <button 
          onClick={() => setViewItem(null)}
          className="flex items-center gap-1.5 text-zinc-300 hover:text-white transition-colors text-sm font-medium cursor-pointer w-fit"
        >
          <ChevronLeft size={16} />
          back to inventory
        </button>

        {/* Header section */}
        <div className="flex flex-col sm:flex-row gap-8 items-start mt-4 bg-[#1e1e20] p-6 rounded-2xl border border-[#2e2e30]">
          {/* Image */}
          <div className="relative w-full sm:w-[320px] h-[220px] rounded-xl overflow-hidden shrink-0 border border-[#3a3a3c] bg-[#141415] shadow-lg">
            <Image 
              src={viewItem.detailImage || viewItem.image} 
              alt={viewItem.name} 
              fill 
              className="object-cover hover:scale-105 transition-transform duration-500"
              unoptimized 
            />
          </div>
          {/* Info */}
          <div className="flex flex-col gap-3 pt-2">
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-bold text-white tracking-tight">{viewItem.name}</h1>
              <StatusBadge status={viewItem.status} />
            </div>
            
            <p className="text-zinc-400 text-[15px] leading-relaxed max-w-xl mt-1">
              Stock breakdown across all branches. Central inventory is synchronized and automatically triggers alerts when thresholds are reached.
            </p>

            <div className="flex flex-wrap items-center gap-8 mt-5 pt-5 border-t border-[#2e2e30]/80">
               <div className="flex flex-col gap-1.5">
                  <span className="text-[11px] text-zinc-500 uppercase tracking-wider font-bold">Item Category</span>
                  <span className={`text-sm font-semibold ${viewItem.type === "Prepared" ? "text-orange-400" : "text-zinc-200"}`}>{viewItem.type}</span>
               </div>
               <div className="flex flex-col gap-1.5">
                  <span className="text-[11px] text-zinc-500 uppercase tracking-wider font-bold">Measurement Unit</span>
                  <span className="text-sm font-semibold text-zinc-200">{viewItem.unit}</span>
               </div>
               <div className="flex flex-col gap-1.5">
                  <span className="text-[11px] text-orange-500/70 uppercase tracking-wider font-bold">Low Stock Threshold</span>
                  <span className="text-sm font-bold text-orange-400">{viewItem.threshold} {viewItem.unit}</span>
               </div>
               <div className="flex flex-col gap-1.5">
                  <span className="text-[11px] text-blue-500/70 uppercase tracking-wider font-bold">Total Undistributed</span>
                  <span className="text-sm font-bold text-blue-400">{viewItem.undistributed} {viewItem.unit}</span>
               </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-[#1e1e20] border border-[#2e2e30] rounded-xl overflow-hidden mt-8">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#1C1C1C] border-b border-[#343436]">
                  {["SL", "Branch Name", "Location", "Stock available",  "Threshold", "Status"].map((h) => (
                    <th key={h} className="text-left text-zinc-400 text-xs font-medium px-5 py-4 whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2e2e30]/60">
                {MOCK_BRANCH_STOCK.map((row, idx) => (
                  <tr key={idx} className="hover:bg-zinc-800/20 transition-colors">
                    <td className="px-5 py-4 text-zinc-400 whitespace-nowrap">{idx + 1}</td>
                    <td className="px-5 py-4 font-medium text-white whitespace-nowrap">{row.branch}</td>
                    <td className="px-5 py-4 text-zinc-300 whitespace-nowrap">{row.location}</td>
                    <td className="px-5 py-4 text-zinc-300 whitespace-nowrap">{row.stock} {viewItem.unit.toLowerCase()}</td>
                   
                    <td className="px-5 py-4 text-zinc-300 whitespace-nowrap">{row.threshold}</td>
                    <td className="px-5 py-4">
                      <StatusBadge status={row.status} />
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

  return (
    <div className="flex-1 min-h-screen text-white p-5 space-y-5">

      {/* ── Page Header ── */}
      <div>
        <h1 className="text-xl font-bold text-white">Inventory management</h1>
        <p className="text-zinc-500 text-sm mt-0.5">
          Undistributed stock sits centrally until sent to a branch. Totals include everything distributed.
        </p>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 w-full">
        <StatCard
            iconBg="bg-blue-600"
            icon={<Package size={24} className="text-white" />}
            label="Total Items"
            value={totalItems}
          />
          <StatCard
            iconBg="bg-orange-500"
            icon={<AlertTriangle size={24} className="text-white" />}
            label="Low Stock"
            value={lowStock}
          />
          <StatCard
            iconBg="bg-red-500"
            icon={<AlertTriangle size={24} className="text-white" />}
            label="Out of Stock"
            value={outOfStock}
          />
        <StatCard
          iconBg="bg-green-600"
          icon={<Store size={24} className="text-white" />}
          label="Total branch"
          value={totalBranch}
        />
      </div>

      {/* ── Search + Filters + Export ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {/* Search — full width on mobile, wider on large screens */}
        <div className="flex items-center gap-2 bg-[#1e1e20] border border-[#2e2e30] rounded-lg px-3 py-2.5 w-full sm:max-w-sm lg:max-w-md xl:max-w-lg transition-all">
          <Search size={15} className="text-zinc-500 shrink-0" />
          <input
            type="text"
            placeholder="Search inventory..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-sm text-white placeholder-zinc-500 outline-none w-full"
          />
        </div>

        {/* Filters + Export — wrap on mobile */}
        <div className="flex flex-wrap items-center gap-2">
          <SelectFilter
            label="All Items"
            options={INVENTORY_ITEMS.map((i) => i.name)}
            value={search}
            onChange={setSearch}
          />
          <SelectFilter
            label="All Type"
            options={["Raw material", "Prepared"]}
            value={typeFilter}
            onChange={setTypeFilter}
          />
          <SelectFilter
            label="Stock Status"
            options={["In Stock", "Low Stock", "Out of Stock"]}
            value={statusFilter}
            onChange={setStatusFilter}
          />
          <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 transition-colors rounded-lg text-white text-sm font-semibold whitespace-nowrap ml-auto sm:ml-0 cursor-pointer">
            Export
            <LogIn size={16} />
          </button>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="bg-[#1e1e20] border border-[#2e2e30] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#1C1C1C] border-b border-[#343436]">
                {["Image", "Item Name", "Type", "Unit", "Undistributed", "Total", "Threshold", "Status", "Actions"].map((h) => (
                  <th
                    key={h}
                    className="text-left text-zinc-500 text-xs font-semibold px-4 py-3.5 whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2e2e30]/60">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-zinc-800/20 transition-colors">

                  {/* Image */}
                  <td className="px-4 py-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#2a2a2c] relative">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </td>

                  {/* Name */}
                  <td className="px-4 py-3 text-white font-medium whitespace-nowrap">
                    {item.name}
                  </td>

                  {/* Type */}
                  <td className={`px-4 py-3 whitespace-nowrap font-medium ${item.type === "Prepared" ? "text-orange-400" : "text-zinc-400"}`}>
                    {item.type}
                  </td>

                  {/* Unit */}
                  <td className="px-4 py-3 text-zinc-400 whitespace-nowrap">{item.unit}</td>

                  {/* Undistributed */}
                  <td className="px-4 py-3 text-zinc-300 whitespace-nowrap">{item.undistributed}</td>

                  {/* Total */}
                  <td className="px-4 py-3 text-zinc-300 whitespace-nowrap">{item.total}</td>

                  {/* Threshold */}
                  <td className="px-4 py-3 text-zinc-300 whitespace-nowrap">{item.threshold}</td>

                  {/* Status */}
                  <td className="px-4 py-3">
                    <StatusBadge status={item.status} />
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3">
                    <button 
                      onClick={() => setViewItem(item)}
                      className="px-3 py-1.5 bg-[#2a2a2c] hover:bg-zinc-700 border border-[#3a3a3c] transition-colors rounded-lg text-zinc-300 text-xs font-medium whitespace-nowrap cursor-pointer"
                    >
                      View stock
                    </button>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-4 py-10 text-center text-zinc-500 text-sm">
                    No items found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
