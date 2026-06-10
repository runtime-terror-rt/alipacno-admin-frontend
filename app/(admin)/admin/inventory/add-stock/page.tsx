"use client";

import { useState } from "react";
import { ArrowLeft, ChevronDown, X, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import DistributionModal from "@/components/admin/inventory/DistributionModal";

// ─────────────────────────────────────────────
// Types & Data
// ─────────────────────────────────────────────

export interface StockEntry {
  id: string;
  name: string;
  emoji: string;
  date: string;
  time: string;
  supplier: string;
  invoiceNo: string;
  unit: string;
  unitCost: number;
  stockValue: number;
}

const STOCK_ENTRIES: StockEntry[] = [
  { id: "#ITM001", name: "Beef Patty", emoji: "🥩", date: "5May,2026", time: "8AM", supplier: "Raw Material", invoiceNo: "All Branches", unit: "PCS", unitCost: 50, stockValue: 50 },
  { id: "#ITM001", name: "Beef Patty", emoji: "🥩", date: "5May,2026", time: "8AM", supplier: "Raw Material", invoiceNo: "All Branches", unit: "PCS", unitCost: 34, stockValue: 34 },
  { id: "#ITM001", name: "Beef Patty", emoji: "🥩", date: "5May,2026", time: "8AM", supplier: "Raw Material", invoiceNo: "All Branches", unit: "Kg", unitCost: 12, stockValue: 12 },
  { id: "#ITM001", name: "Beef Patty", emoji: "🥩", date: "5May,2026", time: "8AM", supplier: "Vegetable", invoiceNo: "All Branches", unit: "Kg", unitCost: 13, stockValue: 13 },
  { id: "#ITM001", name: "Beef Patty", emoji: "🥩", date: "5May,2026", time: "8AM", supplier: "Vegetable", invoiceNo: "All Branches", unit: "Kg", unitCost: 78, stockValue: 78 },
];

// ─────────────────────────────────────────────
// Atoms
// ─────────────────────────────────────────────

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-2">
      {children}
    </p>
  );
}

function InputField({
  placeholder, icon, type = "text",
}: {
  placeholder: string; icon?: React.ReactNode; type?: string;
}) {
  return (
    <div className="relative">
      {icon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-sm select-none">
          {icon}
        </span>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full bg-[#1a1a1c] border border-[#2e2e30] rounded-xl py-3 text-sm text-white placeholder-zinc-600 outline-none focus:border-[#f9671a]/60 focus:ring-1 focus:ring-[#f9671a]/20 transition-all ${icon ? "pl-7 pr-4" : "px-4"}`}
      />
    </div>
  );
}

function SelectField({
  placeholder, defaultValue,
}: {
  placeholder: string; defaultValue?: string;
}) {
  return (
    <div className="relative">
      <select
        defaultValue={defaultValue ?? ""}
        className="w-full appearance-none bg-[#1a1a1c] border border-[#2e2e30] rounded-xl px-4 py-3 text-sm text-zinc-300 outline-none focus:border-[#f9671a]/60 focus:ring-1 focus:ring-[#f9671a]/20 transition-all cursor-pointer pr-10"
      >
        <option value="" disabled>{placeholder}</option>
        <option>Raw Material</option>
        <option>Vegetable</option>
        <option>Dairy</option>
        <option>Bakery</option>
      </select>
      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
    </div>
  );
}

export default function AddStockPage() {
  const router = useRouter();
  const handleBack = () => router.push("/admin/inventory");
  const [distEntry, setDistEntry] = useState<StockEntry | null>(null);

  const handleUpdate = () => {
    toast.success("Stock updated successfully");
    router.push("/admin/inventory");
  };

  return (
    <div className="flex-1  min-h-screen text-white flex flex-col">

      {/* ── Top Bar ── */}
      <div className="px-6 py-5 border-b border-[#1e1e20]">
        <div className="flex items-center gap-3">
          <button
            onClick={handleBack}
            className="w-8 h-8 rounded-lg bg-[#252527] flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={15} />
          </button>
          <h1 className="text-lg font-bold text-white">Add Stock</h1>
        </div>
      </div>

      {/* ── Form ── */}
      <div className="flex-1 px-6 py-6 space-y-5 ">
        <div className="border border-[#2e2e30] rounded-2xl p-7 space-y-5">

          {/* Row 1: Item Name | Category | Unite */}
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_180px] gap-5 items-end">
            <div>
              <Label>Item Name</Label>
              <SelectField placeholder="e.g. Pepperoni Feast" />
            </div>
            <div>
              <Label>Category</Label>
              <SelectField placeholder="Raw Material" defaultValue="Raw Material" />
            </div>
            <div>
              <Label>Unit</Label>
              <InputField placeholder="0.00" icon="£" type="number" />
            </div>
          </div>

          {/* Row 2: QTY | COST | SUPPLIER | INVOICE NO. */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
            <div>
              <Label>QTY</Label>
              <InputField placeholder="Enter qty" type="number" />
            </div>
            <div>
              <Label>Cost</Label>
              <InputField placeholder="Enter cost" type="number" />
            </div>
            <div>
              <Label>Supplier</Label>
              <InputField placeholder="Raw Material" />
            </div>
            <div>
              <Label>Invoice No.</Label>
              <InputField placeholder="Enter invoice" />
            </div>
          </div>

          {/* Add button */}
          <div className="flex justify-end">
            <button 
              onClick={() => toast.success("Stock entry added")}
              className="px-5 py-2 rounded-xl bg-[#f9671a] text-white text-sm font-semibold hover:bg-[#e05a15] transition-colors"
            >
              Add
            </button>
          </div>

          {/* ── Stock Entries Table ── */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#1f1f21] border-y border-[#2e2e30]">
                  {["ITEM", "DATE", "SUPPLIER", "INVOICE NO.", "UNIT", "UNIT COST", "STOCK VALUE", "ACTION"].map((h) => (
                    <th
                      key={h}
                      className="text-left text-zinc-400 font-semibold py-2.5 px-4 whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2e2e30]/60">
                {STOCK_ENTRIES.map((entry, i) => (
                  <tr key={i} className="hover:bg-zinc-800/20 transition-colors">
                    {/* Item */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <span className="text-lg leading-none">{entry.emoji}</span>
                        <div>
                          <p className="text-white font-medium whitespace-nowrap">{entry.name}</p>
                          <p className="text-zinc-500 text-[10px]">{entry.id}</p>
                        </div>
                      </div>
                    </td>
                    {/* Date */}
                    <td className="py-3 px-4">
                      <p className="text-zinc-300 whitespace-nowrap">{entry.date}</p>
                      <p className="text-zinc-500 text-[10px]">{entry.time}</p>
                    </td>
                    {/* Supplier */}
                    <td className="py-3 px-4 text-zinc-300">{entry.supplier}</td>
                    {/* Invoice */}
                    <td className="py-3 px-4 text-zinc-400">{entry.invoiceNo}</td>
                    {/* Unit */}
                    <td className="py-3 px-4 text-zinc-300">{entry.unit}</td>
                    {/* Unit Cost */}
                    <td className="py-3 px-4 text-zinc-300">{entry.unitCost}</td>
                    {/* Stock Value */}
                    <td className="py-3 px-4 text-white font-semibold">{entry.stockValue}</td>
                    {/* Action */}
                    <td className="py-3 px-4">
                      <button
                        onClick={() => setDistEntry(entry)}
                        className="px-3 py-1.5 rounded-lg bg-[#f9671a] text-white text-xs font-semibold hover:bg-[#e05a15] transition-colors whitespace-nowrap"
                      >
                        Distribution
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="flex items-center justify-end gap-3 px-6 pb-6">
        <button
          onClick={handleBack}
          className="px-6 py-2.5 rounded-xl bg-[#252527] border border-[#2e2e30] text-zinc-300 text-sm font-medium hover:text-white hover:border-zinc-500 transition-all"
        >
          Cancel
        </button>
        <button onClick={handleUpdate} className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#f9671a] text-white text-sm font-semibold hover:bg-[#e05a15] transition-colors shadow-lg shadow-[#f9671a]/20">
          <CheckCircle size={15} /> Update
        </button>
      </div>

      {/* Distribution Modal */}
      {distEntry && (
        <DistributionModal entry={distEntry} onClose={() => setDistEntry(null)} />
      )}
    </div>
  );
}