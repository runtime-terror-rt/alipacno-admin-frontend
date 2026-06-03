"use client";

import { useState } from "react";
import {
  ArrowLeft, ChevronDown, Upload, X, CheckCircle,
  XCircle, ShoppingBag, Plus,
} from "lucide-react";
import { useRouter } from "next/navigation";

// ─────────────────────────────────────────────
// Sub-components
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
        <option>Beverages</option>
        <option>Desserts</option>
        <option>Sides</option>
      </select>
      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
    </div>
  );
}

// ─────────────────────────────────────────────
// Upload Zone
// ─────────────────────────────────────────────

function UploadZone() {
  const [dragging, setDragging] = useState(false);

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => { e.preventDefault(); setDragging(false); }}
      onClick={() => document.getElementById("menu-item-photo")?.click()}
      className={`w-full border-2 border-dashed rounded-2xl flex flex-col items-center justify-center py-14 gap-3 cursor-pointer transition-all ${
        dragging
          ? "border-[#f9671a] bg-[#f9671a]/5"
          : "border-[#2e2e30] bg-[#1a1a1c] hover:border-[#f9671a]/40 hover:bg-[#f9671a]/5"
      }`}
    >
      <input id="menu-item-photo" type="file" accept=".png,.jpg,.pdf" className="hidden" />
      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-colors ${dragging ? "bg-[#f9671a]/20" : "bg-[#252527]"}`}>
        <Upload size={20} className={dragging ? "text-[#f9671a]" : "text-zinc-400"} />
      </div>
      <div className="text-center">
        <p className="text-sm text-zinc-300">
          <span className="text-[#f9671a] font-medium hover:underline">Click to upload</span> or drag and drop
        </p>
        <p className="text-xs text-zinc-500 mt-1">PNG, JPG or PDF (max. 5MB)</p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Branch Tag
// ─────────────────────────────────────────────

function BranchTag({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#252527] border border-[#3e3e40] text-sm text-zinc-200">
      {label}
      <button
        onClick={onRemove}
        className="w-4 h-4 rounded-full bg-zinc-600 flex items-center justify-center hover:bg-zinc-500 transition-colors"
      >
        <X size={9} className="text-white" />
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────

export default function AddMenuItemPage() {
  const [availability, setAvailability] = useState<"available" | "soldout">("available");
  const [branches, setBranches] = useState(["Eltham", "Greenwich", "All Branches"]);

  const removeBranch = (label: string) =>
    setBranches((prev) => prev.filter((b) => b !== label));

  const router = useRouter();

  const onBack = () => router.back();

  const onCancel = () => router.back();

  return (
    <div className="flex-1 min-h-screen text-white flex flex-col">

      {/* ── Top Bar ── */}
      <div className="px-6 py-5 flex items-center gap-3 border-b border-[#1e1e20]">
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-lg bg-[#252527] flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={15} />
        </button>
        <div>
          <h1 className="text-lg font-bold text-white">Add New Menu Item</h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Configure item details, pricing, and availability for your kitchen terminal.
          </p>
        </div>
      </div>

      {/* ── Form ── */}
      <div className="flex-1 px-6 py-6">
        <div className="bg-[#141416] border border-[#2e2e30] rounded-2xl p-7 space-y-7">

          {/* Row 1: Item Name | Category | Price */}
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-5 items-end">
            <div>
              <Label>Item Name</Label>
              <SelectField placeholder="e.g. Pepperoni Feast" />
            </div>
            <div>
              <Label>Category</Label>
              <SelectField placeholder="Select category" defaultValue="Raw Material" />
            </div>
            <div className="sm:w-52">
              <Label>Price</Label>
              <InputField placeholder="0.00" icon="£" type="number" />
            </div>
          </div>

          {/* Row 2: Stock Qty | Unit */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <Label>Stock Qty</Label>
              <InputField placeholder="enter stock qty" type="number" />
            </div>
            <div>
              <Label>Unit</Label>
              <InputField placeholder="enter unit" />
            </div>
          </div>

          {/* Row 3: Availability | Description */}
          <div className="grid grid-cols-1 sm:grid-cols-[220px_1fr] gap-5 items-start">
            {/* Availability toggle */}
            <div>
              <Label>Availability</Label>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setAvailability("available")}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                    availability === "available"
                      ? "bg-green-500/10 border-green-500/40 text-green-400"
                      : "bg-[#1a1a1c] border-[#2e2e30] text-zinc-500 hover:border-zinc-500"
                  }`}
                >
                  <CheckCircle size={15} className={availability === "available" ? "text-green-400" : "text-zinc-600"} />
                  Available
                </button>
                <button
                  onClick={() => setAvailability("soldout")}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                    availability === "soldout"
                      ? "bg-red-500/10 border-red-500/40 text-red-400"
                      : "bg-[#1a1a1c] border-[#2e2e30] text-zinc-500 hover:border-zinc-500"
                  }`}
                >
                  <XCircle size={15} className={availability === "soldout" ? "text-red-400" : "text-zinc-600"} />
                  Sold Out
                </button>
              </div>
            </div>

            {/* Description */}
            <div>
              <Label>Description</Label>
              <textarea
                placeholder="Tell customers about ingredients or allergens..."
                rows={4}
                className="w-full bg-[#1a1a1c] border border-[#2e2e30] rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none focus:border-[#f9671a]/60 focus:ring-1 focus:ring-[#f9671a]/20 transition-all resize-none h-full min-h-[108px]"
              />
            </div>
          </div>

          {/* Item Photo */}
          <div>
            <Label>Item Photo</Label>
            <UploadZone />
          </div>

          {/* Active Branches */}
          <div>
            <Label>Active Branches</Label>
            <div className="bg-[#1a1a1c] border border-[#2e2e30] rounded-xl px-4 py-3 flex flex-wrap items-center gap-2">
              {branches.map((b) => (
                <BranchTag key={b} label={b} onRemove={() => removeBranch(b)} />
              ))}
              {/* Add Branch dropdown button */}
              <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#f9671a]/60 bg-[#f9671a]/10 text-[#f9671a] text-sm font-medium hover:bg-[#f9671a]/20 transition-colors">
                Add Branch <ChevronDown size={13} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="flex items-center justify-end gap-3 px-6 pb-6">
        <button
          onClick={onCancel}
          className="px-6 py-2.5 rounded-xl bg-[#252527] border border-[#2e2e30] text-zinc-300 text-sm font-medium hover:text-white hover:border-zinc-500 transition-all"
        >
          Cancel
        </button>
        <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#f9671a] text-white text-sm font-semibold hover:bg-[#e05a15] transition-colors shadow-lg shadow-[#f9671a]/20">
          <ShoppingBag size={15} /> Add Item
        </button>
      </div>
    </div>
  );
}