"use client";

import { useState } from "react";
import { ArrowLeft, ChevronDown, Upload, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import UploadZone from "@/components/admin/Marketing/UploadZone";

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
        <option>Beverages</option>
      </select>
      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
    </div>
  );
}



// ─────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────

export default function AddNewItemPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  
  const handleBack = () => router.push("/admin/inventory");
  
  const handleSubmit = () => {
    toast.success("Item added successfully");
    router.push("/admin/inventory");
  };
  return (
    <div className="min-h-screen text-white flex flex-col">

      {/* ── Top Bar ── */}
      <div className="px-6 py-5 border-b border-[#1e1e20]">
        <div className="flex items-center gap-3">
          <button
            onClick={handleBack}
            className="w-8 h-8 rounded-lg bg-[#252527] flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={15} />
          </button>
          <div>
            <h1 className="text-lg font-bold text-white">Add New Item</h1>
            <p className="text-xs text-zinc-500 mt-0.5">
              Configure item details, pricing, and availability for your kitchen terminal.
            </p>
          </div>
        </div>
      </div>

      {/* ── Form ── */}
      <div className=" px-6 py-6">
        <div className="bg-[#141416] border border-[#2e2e30] rounded-2xl p-7 space-y-6">

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

          {/* Description */}
          <div>
            <Label>Description</Label>
            <textarea
              placeholder="Tell customers about ingredients or allergens..."
              rows={4}
              className="w-full bg-[#1a1a1c] border border-[#2e2e30] rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none focus:border-[#f9671a]/60 focus:ring-1 focus:ring-[#f9671a]/20 transition-all resize-none h-full min-h-[108px]"
            />
          </div>

          {/* Item Photo */}
          <div>
            <Label>Item Photo</Label>
            <UploadZone file={file} onFileChange={setFile} />
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="flex items-center gap-3 px-6 pb-6">
        <button
          onClick={handleBack}
          className="px-6 py-2.5 rounded-xl bg-[#252527] border border-[#2e2e30] text-zinc-300 text-sm font-medium hover:text-white hover:border-zinc-500 transition-all"
        >
          Cancel
        </button>
        <button onClick={handleSubmit} className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#f9671a] text-white text-sm font-semibold hover:bg-[#e05a15] transition-colors shadow-lg shadow-[#f9671a]/20">
          <ShoppingBag size={15} /> Add Item
        </button>
      </div>
    </div>
  );
}