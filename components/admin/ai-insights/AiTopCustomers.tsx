"use client";

import { ChevronRight } from "lucide-react";
import Image from "next/image";

interface TopCustomer {
  name: string;
  image: string;
  orders: number;
  avgOrderValue: string;
  favoriteItem: string;
  totalSpend: string;
  aiSuggestion: string;
}

const TOP_CUSTOMERS: TopCustomer[] = [
  { name: "James Smith", image: "/admin/avatar/default.png", orders: 34, avgOrderValue: "£29.90", favoriteItem: "Burger Combo", totalSpend: "£1,020", aiSuggestion: "20% OFF\nNEXT OFFERS" },
  { name: "James Smith", image: "/admin/avatar/default.png", orders: 34, avgOrderValue: "£29.90", favoriteItem: "Burger Combo", totalSpend: "£1,020", aiSuggestion: "20% OFF\nNEXT OFFERS" },
  { name: "James Smith", image: "/admin/avatar/default.png", orders: 34, avgOrderValue: "£29.90", favoriteItem: "Burger Combo", totalSpend: "£1,020", aiSuggestion: "20% OFF\nNEXT OFFERS" },
  { name: "James Smith", image: "/admin/avatar/default.png", orders: 34, avgOrderValue: "£29.90", favoriteItem: "Burger Combo", totalSpend: "£1,020", aiSuggestion: "20% OFF\nNEXT OFFERS" },
  { name: "James Smith", image: "/admin/avatar/default.png", orders: 34, avgOrderValue: "£29.90", favoriteItem: "Burger Combo", totalSpend: "£1,020", aiSuggestion: "20% OFF\nNEXT OFFERS" },
];

const AiTopCustomers = () => {
  return (
    <div className="bg-[#1a1a1c] border border-[#2e2e30] rounded-2xl p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-1.5 items-baseline">
          <h2 className="text-base font-bold text-white tracking-tight">Top Customers</h2>
          <span className="text-xs text-zinc-400 font-normal">(by Orders)</span>
        </div>
        <button className="flex items-center gap-0.5 text-xs text-[#f9671a] font-medium hover:brightness-110 transition-all">
          View all <ChevronRight size={14} className="mt-0.5" />
        </button>
      </div>

      {/* Table Container */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#3D3D3A] text-gray-200">
              {[
                "CUSTOMER",
                "ORDERS",
                "AVG.ORDERS VALUE",
                "FAVORITE ITEM",
                "TOTAL SPEND",
                "AI SUGGESTION"
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
            {TOP_CUSTOMERS.map((c, i) => (
              <tr key={i} className="bg-[#1A1A1C] border border-[#2e2e30] hover:bg-zinc-800/10 transition-colors">
                {/* CUSTOMER */}
                <td className="py-4 pr-4 pl-5 border-y border-l border-[#2e2e30]/70 rounded-l-xl align-middle">
                  <div className="flex items-center gap-3">
                    <div className="relative w-9 h-9 rounded-full overflow-hidden border border-zinc-800 bg-zinc-900 flex-shrink-0">
                      <Image 
                        src={c.image} 
                        alt={c.name} 
                        fill
                        sizes="36px"
                        className="object-cover" 
                      />
                    </div>
                    <span className="text-[#f9671a] font-semibold text-xs whitespace-nowrap">
                      {c.name}
                    </span>
                  </div>
                </td>

                {/* ORDERS */}
                <td className="py-4 pr-4 text-xs font-medium text-zinc-300 border-y border-[#2e2e30]/70 align-middle whitespace-nowrap">
                  {c.orders}
                </td>

                {/* AVG ORDERS VALUE */}
                <td className="py-4 pr-4 text-xs font-medium text-zinc-300 border-y border-[#2e2e30]/70 align-middle whitespace-nowrap">
                  {c.avgOrderValue}
                </td>

                {/* FAVORITE ITEM */}
                <td className="py-4 pr-4 text-xs font-medium text-zinc-300 border-y border-[#2e2e30]/70 align-middle whitespace-nowrap">
                  {c.favoriteItem}
                </td>

                {/* TOTAL SPEND */}
                <td className="py-4 pr-4 text-xs font-medium text-zinc-300 border-y border-[#2e2e30]/70 align-middle whitespace-nowrap">
                  {c.totalSpend}
                </td>

                {/* AI SUGGESTION */}
                <td className="py-4 pr-5 last:pr-5 border-y border-r border-[#2e2e30]/70 rounded-r-xl align-middle whitespace-nowrap">
                  <span className="block text-[10px] font-bold text-zinc-300 leading-tight tracking-wide whitespace-pre-line">
                    {c.aiSuggestion}
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

export default AiTopCustomers;