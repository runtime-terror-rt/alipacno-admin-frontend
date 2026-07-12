"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface OrderingArea {
  name: string;
  tag?: string;
  tagColor?: string;
  totalOrders: number;
  avgOrderValue: string;
  peakHours?: string;
  totalSpend: string;
  topItem: string;
}

const ORDERING_AREAS: OrderingArea[] = [
  { name: "Down Street", tag: "Recommended", tagColor: "text-[#f9671a]", totalOrders: 2856, avgOrderValue: "£24,502",  totalSpend: "Burger Combo", topItem: "BURGER COMBO" },
  { name: "Midland",     totalOrders: 2656, avgOrderValue: "£24,502",  totalSpend: "Burger Combo", topItem: "PIZZA" },
  { name: "Midland",     totalOrders: 2656, avgOrderValue: "£24,502", peakHours: "6PM–10PM", totalSpend: "Burger Combo", topItem: "PIZZA" },
  { name: "Brithwood",   tag: "Recommended", tagColor: "text-[#f9671a]", totalOrders: 2656, avgOrderValue: "£24,502", peakHours: "6PM–10PM", totalSpend: "Burger Combo", topItem: "CHICKEN WINGS" },
  { name: "Carlisle",    totalOrders: 2856, avgOrderValue: "£24,502", peakHours: "6PM–10PM", totalSpend: "Burger Combo", topItem: "MARGARITA PIZZA" },
  { name: "Westside",    totalOrders: 2656, avgOrderValue: "£24,502", peakHours: "6PM–10PM", totalSpend: "Burger Combo", topItem: "SOFT DRINKS" },
];

const AiTopOrderingAreas = () => {
  return (
    <div className="bg-[#1a1a1c] border border-[#2e2e30] rounded-2xl p-5">
      {/* Header matching image_ba01a4.png architecture */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-1.5 items-baseline">
          <h2 className="text-base font-bold text-white tracking-tight">Top Ordering Areas</h2>
          <span className="text-xs text-zinc-400 font-normal">(by Region)</span>
        </div>
        <Link href="/admin/orders" className="flex items-center gap-0.5 text-xs text-[#f9671a] font-medium hover:brightness-110 transition-all">
          View all <ChevronRight size={14} className="mt-0.5" />
        </Link>
      </div>

      {/* Styled Boxed Table Layout */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-sm ">
          <thead>
            <tr className="bg-[#3D3D3A] text-gray-200">
              {[
                "AREA",
                "TOTAL ORDERS",
                "AVG.ORDERS VALUE",
                "PEAK HOURS",
                "TOTAL SPEND",
                "TOP ITEMS"
              ].map((h) => (
                <th 
                  key={h} 
                  className="text-left text-[11px] font-semibold py-4 pr-4 first:pl-5 last:pr-5 whitespace-nowrap tracking-wider uppercase align-middle first:rounded-l-xl last:rounded-r-xl"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          
          <tbody>
            {ORDERING_AREAS.map((a, i) => (
              <tr key={i} className="bg-[#1A1A1C] border border-[#2e2e30] hover:bg-zinc-800/10 transition-colors">
                {/* AREA */}
                <td className="py-4 pr-4 pl-5 border-y border-l border-[#2e2e30]/70 rounded-l-xl align-middle">
                  <div>
                    <p className="text-white font-semibold text-xs whitespace-nowrap">{a.name}</p>
                    {a.tag && (
                      <span className={`text-[9px] font-bold uppercase tracking-wider mt-0.5 block ${a.tagColor}`}>
                        {a.tag}
                      </span>
                    )}
                  </div>
                </td>

                {/* TOTAL ORDERS */}
                <td className="py-4 pr-4 text-xs font-medium text-zinc-300 border-y border-[#2e2e30]/70 align-middle whitespace-nowrap">
                  {a.totalOrders.toLocaleString()}
                </td>

                {/* AVG ORDERS VALUE */}
                <td className="py-4 pr-4 text-xs font-medium text-zinc-300 border-y border-[#2e2e30]/70 align-middle whitespace-nowrap">
                  {a.avgOrderValue}
                </td>

                {/* PEAK HOURS */}
                <td className="py-4 pr-4 text-xs font-medium text-zinc-400 border-y border-[#2e2e30]/70 align-middle whitespace-nowrap">
                  {a.peakHours || "—"}
                </td>

                {/* TOTAL SPEND */}
                <td className="py-4 pr-4 text-xs font-medium text-zinc-300 border-y border-[#2e2e30]/70 align-middle whitespace-nowrap">
                  {a.totalSpend}
                </td>

                {/* TOP ITEMS */}
                <td className="py-4 pr-5 last:pr-5 border-y border-r border-[#2e2e30]/70 rounded-r-xl align-middle whitespace-nowrap">
                  <span className="text-[#f9671a] text-[10px] font-bold uppercase tracking-wider bg-[#f9671a]/10 px-2 py-0.5 rounded-md border border-[#f9671a]/20">
                    #{a.topItem}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AiTopOrderingAreas;