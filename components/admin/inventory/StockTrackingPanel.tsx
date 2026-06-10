"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";
import {
  Search, Plus, Download, MoreVertical, ChevronDown,
  ChevronLeft, ChevronRight, ArrowLeft, Upload, X,
  Package, AlertTriangle, CheckCircle, XCircle,
} from "lucide-react";
import Pagination from "../ui/Pagination";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

type StockStatus = "In Stock" | "Low Stock" | "Out Of Stock";
type View = "table" | "add-item" | "add-stock";

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  branch: string;
  unit: string;
  qty: number;
  unitCost: number;
  stockValue: number;
  status: StockStatus;
  threshold: number;
  lastUpdate: string;
  emoji: string;
}

interface StockEntry {
  id: string;
  name: string;
  emoji: string;
  date: string;
  supplier: string;
  invoiceNo: string;
  unit: string;
  unitCost: number;
  stockValue: number;
}

// ─────────────────────────────────────────────
// Mock Data
// ─────────────────────────────────────────────

const ITEMS: InventoryItem[] = [
  { id: "ID1TM001", name: "Beef Patty",   emoji: "🥩", category: "Raw Material", branch: "All Branches", unit: "PCS", qty: 1243, unitCost: 50, stockValue: 50,  status: "In Stock",     threshold: 50, lastUpdate: "5May,2026 8AM" },
  { id: "ID1TM001", name: "Burger Bun",   emoji: "🍞", category: "Raw Material", branch: "All Branches", unit: "PCS", qty: 3,    unitCost: 34, stockValue: 34,  status: "Low Stock",    threshold: 34, lastUpdate: "5May,2026 8AM" },
  { id: "ID1TM001", name: "Cheese Slice", emoji: "🧀", category: "Raw Material", branch: "All Branches", unit: "Kg",  qty: 0,    unitCost: 12, stockValue: 12,  status: "Out Of Stock", threshold: 12, lastUpdate: "5May,2026 8AM" },
  { id: "ID1TM001", name: "Lettuce",      emoji: "🥬", category: "Vegetable",    branch: "All Branches", unit: "Kg",  qty: 54,   unitCost: 13, stockValue: 13,  status: "In Stock",     threshold: 13, lastUpdate: "5May,2026 8AM" },
  { id: "ID1TM001", name: "Tomato",       emoji: "🍅", category: "Vegetable",    branch: "All Branches", unit: "Kg",  qty: 0,    unitCost: 78, stockValue: 78,  status: "Out Of Stock", threshold: 78, lastUpdate: "5May,2026 8AM" },
];

const STOCK_ENTRIES: StockEntry[] = [
  { id: "#ITM001", name: "Beef Patty", emoji: "🥩", date: "5May,2026 8AM", supplier: "Raw Material", invoiceNo: "All Branches", unit: "PCS", unitCost: 50, stockValue: 50 },
  { id: "#ITM001", name: "Beef Patty", emoji: "🥩", date: "5May,2026 8AM", supplier: "Raw Material", invoiceNo: "All Branches", unit: "PCS", unitCost: 34, stockValue: 34 },
  { id: "#ITM001", name: "Beef Patty", emoji: "🥩", date: "5May,2026 8AM", supplier: "Raw Material", invoiceNo: "All Branches", unit: "Kg",  unitCost: 12, stockValue: 12 },
  { id: "#ITM001", name: "Beef Patty", emoji: "🥩", date: "5May,2026 8AM", supplier: "Vegetable",    invoiceNo: "All Branches", unit: "Kg",  unitCost: 13, stockValue: 13 },
  { id: "#ITM001", name: "Beef Patty", emoji: "🥩", date: "5May,2026 8AM", supplier: "Vegetable",    invoiceNo: "All Branches", unit: "Kg",  unitCost: 78, stockValue: 78 },
];

const PURCHASE_HISTORY = STOCK_ENTRIES;

function DropPill({ label }: { label: string }) {
  return (
    <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#1f1f21] border border-[#2e2e30] text-zinc-400 hover:text-white text-xs font-medium transition-colors whitespace-nowrap">
      {label} <ChevronDown size={12} />
    </button>
  );
}

function StockBadge({ status }: { status: StockStatus }) {
  const map: Record<StockStatus, string> = {
    "In Stock":     "bg-green-500/15 text-green-400 border-green-500/30",
    "Low Stock":    "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
    "Out Of Stock": "bg-red-500/15 text-red-400 border-red-500/30",
  };
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold border whitespace-nowrap ${map[status]}`}>{status}</span>;
}

function QtyDisplay({ qty, status }: { qty: number; status: StockStatus }) {
  const color = status === "In Stock" ? "text-green-400" : status === "Low Stock" ? "text-yellow-400" : "text-red-400";
  return <span className={`font-bold ${color}`}>{qty}</span>;
}


function DatePill({ label, active, onClick }: { label: string; active?: boolean; onClick?: () => void }) {
  return (
    <button onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
        active ? "bg-[#f9671a]/10 text-[#f9671a] border border-[#f9671a]/50" : "bg-[#1f1f21] text-zinc-400 hover:text-white border border-transparent"
      }`}
    >{label}</button>
  );
}

// ─────────────────────────────────────────────
// Purchase History Modal
// ─────────────────────────────────────────────

function PurchaseHistoryModal({ item, onClose }: { item: InventoryItem; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-[#1c1c1e] border border-[#2e2e30] rounded-2xl w-full max-w-xl shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-[#2e2e30]">
          <h2 className="text-base font-bold text-white">Purchase History</h2>
          <button onClick={onClose} className="w-7 h-7 rounded-lg bg-[#252527] flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
            <X size={14} />
          </button>
        </div>

        {/* Item Info */}
        <div className="px-5 py-4 flex items-center gap-3 border-b border-[#2e2e30]">
          <span className="text-3xl">{item.emoji}</span>
          <div>
            <p className="text-sm font-bold text-white">{item.name}</p>
            <p className="text-xs text-zinc-500">ID #{item.id} · Unit: {item.unit}</p>
            <p className="text-xs text-green-400 font-semibold mt-0.5">Current Stock: {item.qty} {item.unit}</p>
          </div>
        </div>

        {/* Table */}
        <div className="px-5 py-3 overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#2e2e30]">
                {["DATE","SUPPLIER","INVOICE NO.","UNIT","UNIT COST","STOCK VALUE"].map((h) => (
                  <th key={h} className="text-left text-zinc-500 font-medium pb-2.5 pr-4 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2e2e30]/60">
              {PURCHASE_HISTORY.map((entry, i) => (
                <tr key={i} className="hover:bg-zinc-800/20">
                  <td className="py-2.5 pr-4">
                    <p className="text-zinc-300 whitespace-nowrap">{entry.date.split(" ")[0]}</p>
                    <p className="text-zinc-500 text-[10px]">{entry.date.split(" ")[1]}</p>
                  </td>
                  <td className="py-2.5 pr-4 text-zinc-300">{entry.supplier}</td>
                  <td className="py-2.5 pr-4 text-zinc-400">{entry.invoiceNo}</td>
                  <td className="py-2.5 pr-4 text-zinc-300">{entry.unit}</td>
                  <td className="py-2.5 pr-4 text-zinc-300">{entry.unitCost}</td>
                  <td className="py-2.5 text-white font-semibold">{entry.stockValue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer stats */}
        <div className="px-5 py-4 border-t border-[#2e2e30] grid grid-cols-3 gap-4">
          <div>
            <p className="text-[9px] text-zinc-500 uppercase tracking-wide mb-0.5">Total Purchased</p>
            <p className="text-sm font-bold text-green-400">1,860 PCS</p>
          </div>
          <div>
            <p className="text-[9px] text-zinc-500 uppercase tracking-wide mb-0.5">Total Spent</p>
            <p className="text-sm font-bold text-[#f9671a]">£894.00</p>
          </div>
          <div>
            <p className="text-[9px] text-zinc-500 uppercase tracking-wide mb-0.5">Average Unit Cost</p>
            <p className="text-sm font-bold text-white">£0.59</p>
          </div>
        </div>
      </div>
    </div>
  );
}



function DeactivateModal({ item, onClose }: { item: InventoryItem; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-[#1c1c1e] border border-[#2e2e30] rounded-2xl w-full max-w-sm shadow-2xl p-6 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-red-500/15 flex items-center justify-center mx-auto">
          <XCircle size={22} className="text-red-400" />
        </div>
        <div>
          <h2 className="text-base font-bold text-white">Deactivate Item?</h2>
          <p className="text-xs text-zinc-500 mt-1">
            <span className="text-white font-semibold">{item.name}</span> will be marked as inactive and hidden from the menu.
          </p>
        </div>
        <div className="flex gap-3 justify-center pt-1">
          <button onClick={onClose} className="px-5 py-2 rounded-xl bg-[#252527] border border-[#2e2e30] text-zinc-300 text-sm hover:text-white transition-all">Cancel</button>
          <button className="px-5 py-2 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors">Deactivate</button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Action Context Menu
// ─────────────────────────────────────────────

function ActionMenu({
  onPurchaseHistory, onDeactivate, onClose,
}: { onPurchaseHistory: () => void; onDeactivate: () => void; onClose: () => void; }) {
  return (
    <>
      <div className="fixed inset-0 z-30" onClick={onClose} />
      <div className="absolute right-0 mt-1 z-40 bg-[#252527] border border-[#3e3e40] rounded-xl shadow-xl py-1.5 min-w-[170px]">
        <button onClick={() => { onPurchaseHistory(); onClose(); }}
          className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-zinc-300 hover:bg-[#2e2e30] hover:text-white transition-colors">
          <Package size={13} className="text-zinc-400" /> Purchase History
        </button>
        <button onClick={() => { onDeactivate(); onClose(); }}
          className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-red-400 hover:bg-[#2e2e30] hover:text-red-300 transition-colors">
          <XCircle size={13} /> Deactivate Item
        </button>
      </div>
    </>
  );
}


// ─────────────────────────────────────────────
// Main Stock Tracking Table
// ─────────────────────────────────────────────

function StockTable({
  onAddItem, onAddStock,
}: {
  onAddItem: () => void;
  onAddStock: () => void;
}) {
  const [activeDate, setActiveDate] = useState("Today");
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [purchaseItem, setPurchaseItem] = useState<InventoryItem | null>(null);
  const [deactivateItem, setDeactivateItem] = useState<InventoryItem | null>(null);
  const dateTabs = ["Today", "Weekly", "Monthly", "Custom Range"];

  return (
    <div className="space-y-5 ">
      {/* Header */}
      <div>
        <h2 className="text-lg font-bold text-white">Stock Tracking</h2>
        <p className="text-xs text-zinc-500 mt-0.5">Track inventory availability, and stock levels</p>
      </div>

      {/* Filter row */}
      <div className="flex flex-wrap items-center gap-2 justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <DropPill label="Categories" />
          <DropPill label="Branch" />
          <DropPill label="Stock Status" />
        </div>
        {/* Date tabs */}
        <div className="flex items-center gap-1 bg-[#1c1c1e] border border-[#2e2e30] rounded-xl p-1">
          {dateTabs.map((t) => (
            <DatePill key={t} label={t} active={activeDate === t} onClick={() => setActiveDate(t)} />
          ))}
        </div>
      </div>

      {/* Search + Actions row */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[180px] max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input type="text" placeholder="Search categories, branch..." className="w-full bg-[#1f1f21] border border-[#2e2e30] rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-zinc-600 outline-none focus:border-[#f9671a]/50 transition-all" />
        </div>
      
        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={onAddStock}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-green-500/50 text-green-400 text-sm font-medium hover:bg-green-500/10 transition-colors whitespace-nowrap"
          >
            <Plus size={14} /> Add Stock
          </button>
          <button
            onClick={onAddItem}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#f9671a] text-white text-sm font-medium hover:bg-[#e05a15] transition-colors whitespace-nowrap"
          >
            <Plus size={14} /> Add Items
          </button>
          <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#2e2e30] text-zinc-400 text-sm font-medium hover:text-white transition-colors whitespace-nowrap">
            <Download size={14} /> Export Excel
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#1c1c1e] border border-[#2e2e30] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#2e2e30]">
                {["ITEM","CATEGORY","BRANCH","UNIT","STOCK QTY","UNIT COST","STOCK VALUE","STATUS","THRESHOLD","LAST UPDATE","ACTION"].map((h) => (
                  <th key={h} className="text-left text-zinc-500 font-medium py-3 px-4 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2e2e30]/60">
              {ITEMS.map((item, i) => (
                <tr key={i} className="hover:bg-zinc-800/20 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl leading-none">{item.emoji}</span>
                      <div>
                        <p className="text-white font-medium whitespace-nowrap">{item.name}</p>
                        <p className="text-zinc-500 text-[10px]">{item.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-zinc-300 whitespace-nowrap">{item.category}</td>
                  <td className="py-3 px-4 text-zinc-300 whitespace-nowrap">{item.branch}</td>
                  <td className="py-3 px-4 text-zinc-400">{item.unit}</td>
                  <td className="py-3 px-4"><QtyDisplay qty={item.qty} status={item.status} /></td>
                  <td className="py-3 px-4 text-zinc-300">{item.unitCost}</td>
                  <td className="py-3 px-4 text-zinc-300">{item.stockValue}</td>
                  <td className="py-3 px-4"><StockBadge status={item.status} /></td>
                  <td className="py-3 px-4 text-zinc-300">{item.threshold}</td>
                  <td className="py-3 px-4 text-zinc-400 whitespace-nowrap text-[10px]">{item.lastUpdate}</td>
                  <td className="py-3 px-4 relative">
                    <button
                      onClick={() => setOpenMenu(openMenu === i ? null : i)}
                      className="p-1.5 rounded-lg hover:bg-[#252527] text-zinc-400 hover:text-white transition-colors"
                    >
                      <MoreVertical size={14} />
                    </button>
                    {openMenu === i && (
                      <ActionMenu
                        onPurchaseHistory={() => setPurchaseItem(item)}
                        onDeactivate={() => setDeactivateItem(item)}
                        onClose={() => setOpenMenu(null)}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 pb-4"><Pagination /></div>
      </div>

      {/* Modals */}
      {purchaseItem  && <PurchaseHistoryModal item={purchaseItem}  onClose={() => setPurchaseItem(null)} />}
      {deactivateItem && <DeactivateModal item={deactivateItem} onClose={() => setDeactivateItem(null)} />}
    </div>
  );
}

// ─────────────────────────────────────────────
// Root — orchestrates views
// ─────────────────────────────────────────────

export default function StockTrackingPage() {
  const router = useRouter();
  
  return (
    <div className="flex-1 min-h-screen text-white">
      <StockTable 
        onAddItem={() => router.push("/admin/inventory/add-item")} 
        onAddStock={() => router.push("/admin/inventory/add-stock")} 
      />
    </div>
  );
}