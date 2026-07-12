"use client";

import { ChevronDown } from "lucide-react";

function InputField({ label, placeholder, defaultValue, disabled }: { label: string, placeholder?: string, defaultValue?: string, disabled?: boolean }) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-xs font-semibold text-zinc-300">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        defaultValue={defaultValue}
        disabled={disabled}
        className={`bg-[#2a2a2c] border border-[#3a3a3c] rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition-colors w-full ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
      />
    </div>
  );
}

function SelectField({ label, value, options }: { label: string, value?: string, options: string[] }) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-xs font-semibold text-zinc-300">{label}</label>
      <div className="relative">
        <select
          className="appearance-none bg-[#2a2a2c] border border-[#3a3a3c] rounded-lg px-3 py-2 pr-8 text-sm text-white focus:outline-none focus:border-orange-500 transition-colors w-full cursor-pointer"
          defaultValue={value}
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
      </div>
    </div>
  );
}

export default function AddStockView() {
  return (
    <div className="flex-1 min-h-screen text-white p-5 space-y-6">
      
      <div>
        <h1 className="text-xl font-bold text-white">Add stock</h1>
        <p className="text-zinc-500 text-sm mt-0.5">
          Log a new raw material purchase, convert it into prepared items, then distribute to branches.
        </p>
      </div>

      {/* ── Stock raw material ── */}
      <div className="bg-[#1e1e20] border border-[#2e2e30] rounded-xl p-5 space-y-4">
        <h2 className="text-base font-bold text-white">Stock raw material</h2>
        
        <div className="flex flex-col md:flex-row md:items-end gap-5 w-full">
          <div className="flex-1 min-w-[200px]">
            <SelectField label="Raw material" value="Minced Beef" options={["Minced Beef", "Potato", "Tomato"]} />
          </div>
          <div className="flex-1 min-w-[150px]">
            <InputField label="Qty purchased" placeholder="e.g. 7" />
          </div>
          <div className="flex-1 min-w-[150px]">
            <InputField label="Cost" placeholder="£ 0.00" />
          </div>
          <button className="px-6 py-2 bg-orange-500 hover:bg-orange-600 transition-colors rounded-full text-white text-sm font-semibold cursor-pointer h-[38px] whitespace-nowrap">
            + Add stock
          </button>
        </div>
      </div>

      {/* ── Convert to prepared item ── */}
      <div className="bg-[#1e1e20] border border-[#2e2e30] rounded-xl p-5 space-y-4">
        <div>
          <h2 className="text-base font-bold text-white">Convert to prepared item</h2>
          <p className="text-zinc-500 text-[13px] mt-0.5">
            Ratios come from the "Items and conversions" page — edit them there any time.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-end gap-5 w-full">
          <div className="flex-1 min-w-[200px]">
            <SelectField label="Prepared item" value="Beef Patty" options={["Beef Patty", "Mozzarella Stick"]} />
          </div>
          <div className="flex-1 min-w-[150px]">
            <InputField label="Packs to convert" defaultValue="1" />
          </div>
          <div className="flex-1 min-w-[150px] flex flex-col gap-1.5">
             <label className="text-xs font-semibold text-zinc-300">Yield preview</label>
             <div className="h-[38px] flex items-center text-sm text-zinc-500">
               +50 PCS (uses 7 Kg Minced Beef)
             </div>
          </div>
          <button className="px-6 py-2 bg-orange-500 hover:bg-orange-600 transition-colors rounded-full text-white text-sm font-semibold cursor-pointer h-[38px] whitespace-nowrap">
            Convert now
          </button>
        </div>
      </div>

      {/* ── Distribute to branch ── */}
      <div className="bg-[#1e1e20] border border-[#2e2e30] rounded-xl p-5 space-y-4">
        <h2 className="text-base font-bold text-white">Distribute to branch</h2>
        
        <div className="flex flex-col md:flex-row md:items-end gap-5 w-full">
          <div className="flex-1 min-w-[200px]">
            <SelectField label="Item" value="Minced Beef" options={["Minced Beef", "Potato", "Beef Patty"]} />
          </div>
          <div className="flex-1 min-w-[200px]">
            <SelectField label="Branch" value="Eltham" options={["Eltham", "Greenwich", "Woolwich"]} />
          </div>
          <div className="flex-1 min-w-[150px]">
            <InputField label="Qty to send" placeholder="e.g. 10" />
          </div>
          <button className="px-6 py-2 bg-orange-500 hover:bg-orange-600 transition-colors rounded-full text-white text-sm font-semibold cursor-pointer h-[38px] whitespace-nowrap">
            Distribute
          </button>
        </div>
      </div>

    </div>
  );
}
