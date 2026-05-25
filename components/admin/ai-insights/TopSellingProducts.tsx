"use client";

import { Sparkles, Zap } from "lucide-react";
import Image from "next/image";

interface TopProduct {
  name: string;
  sub?: string;
  image: string;
  weeklyOrders: number;
  weeklyChange: string;
  weeklyPositive: boolean;
  totalQty: number;
  revenue: string;
  pickTime: string;
  topArea: string;
  aiSuggestion: string;
  emojiColor: string;
}

const TopSellingProducts = () => {
  const TOP_PRODUCTS: TopProduct[] = [
    { name: "Burger Combo Deluxe", image: "/admin/food/pizza.jpg", emojiColor: "bg-orange-500", weeklyOrders: 1248, weeklyChange: "+28%", weeklyPositive: true, totalQty: 1468, revenue: "£19,822", pickTime: "6PM–8PM", topArea: "DOWNTOWN", aiSuggestion: "Increases combo promotion in downtown high-repeat order rate" },
    { name: "Pepperoni Pizza",     image: "/admin/food/cheeseburger.png", emojiColor: "bg-red-500",    weeklyOrders: 1248, weeklyChange: "+32%", weeklyPositive: true, totalQty: 1468, revenue: "£16,922", pickTime: "6PM–8PM", topArea: "DOWNTOWN", aiSuggestion: "Increases combo promotion in downtown high-repeat order rate" },
    { name: "Chicken Wings", sub: "Spicy", image: "/admin/food/media3.jpg", emojiColor: "bg-yellow-500", weeklyOrders: 1248, weeklyChange: "+45%", weeklyPositive: true, totalQty: 1468, revenue: "£16,822", pickTime: "6PM–8PM", topArea: "DOWNTOWN", aiSuggestion: "Increases combo promotion in downtown high-repeat order rate" },
    { name: "Margarita Pizza",    image: "/admin/food/media4.jpg", emojiColor: "bg-green-500",  weeklyOrders: 1248, weeklyChange: "+18%", weeklyPositive: true, totalQty: 1468, revenue: "£16,822", pickTime: "6PM–8PM", topArea: "DOWNTOWN", aiSuggestion: "Increases combo promotion in downtown high-repeat order rate" },
    { name: "Zero Cola 360ml",    image: "/admin/food/pizza.jpg", emojiColor: "bg-blue-500",   weeklyOrders: 1248, weeklyChange: "+12%", weeklyPositive: true, totalQty: 1468, revenue: "£16,522", pickTime: "6PM–8PM", topArea: "DOWNTOWN", aiSuggestion: "Increases combo promotion in downtown high-repeat order rate" },
  ];

  return (
    <div className="bg-[#1a1a1c] border border-[#2e2e30] rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2 items-center">
          <h2 className="text-sm font-semibold text-white">Top Selling Products</h2>
          <p className="text-[10px] text-zinc-500 mt-0.5">( This Week )</p>
        </div>
      </div>
      
      <div className="w-full overflow-x-auto">
        <table className="w-full text-sm border-separate border-spacing-y-2">
          <thead>
            <tr className="bg-[#3D3D3A] text-gray-100">
              {[
                "PRODUCT NAME",
                "WEEKLY ORDERS",
                "TOTAL QTY SOLD",
                "REVENUE",
                "PICK ORDER TIME",
                "TOP AREA",
                "AI MARKETING SUGGESTION"
              ].map((h) => (
                <th 
                  key={h} 
                  className="text-left text-[11px] font-semibold py-4 pr-4 first:pl-4 last:pr-4 whitespace-nowrap tracking-wider uppercase align-middle first:rounded-l-xl last:rounded-r-xl"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          
          <tbody>
            {TOP_PRODUCTS.map((p, i) => (
              <tr key={i} className="bg-[#1A1A1C] border border-[#2e2e30] hover:bg-zinc-800/10 transition-colors">
                {/* PRODUCT NAME */}
                <td className="py-3.5 pr-4 pl-4 border-y border-l border-[#2e2e30]/70 rounded-l-xl align-middle">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-zinc-800 bg-zinc-900 flex-shrink-0">
                      <Image 
                        src={p.image} 
                        alt={p.name} 
                        fill
                        sizes="40px"
                        className="object-cover" 
                      />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-xs whitespace-nowrap">{p.name}</p>
                      {p.sub && <p className="text-zinc-500 text-[10px] font-medium mt-0.5">{p.sub}</p>}
                    </div>
                  </div>
                </td>

                {/* WEEKLY ORDERS */}
                <td className="py-3.5 pr-4 border-y border-[#2e2e30]/70 align-middle whitespace-nowrap">
                  <p className="text-white font-semibold text-xs">{p.weeklyOrders.toLocaleString()}</p>
                  <span className={`text-[10px] font-bold ${p.weeklyPositive ? "text-green-400" : "text-red-400"}`}>
                    {p.weeklyChange}
                  </span>
                </td>

                {/* TOTAL QTY SOLD */}
                <td className="py-3.5 pr-4 text-xs font-medium text-zinc-300 border-y border-[#2e2e30]/70 align-middle whitespace-nowrap">
                  {p.totalQty.toLocaleString()}
                </td>

                {/* REVENUE */}
                <td className="py-3.5 pr-4 text-xs font-semibold text-white border-y border-[#2e2e30]/70 align-middle whitespace-nowrap">
                  {p.revenue}
                </td>

                {/* PICK ORDER TIME */}
                <td className="py-3.5 pr-4 text-xs font-medium text-zinc-400 border-y border-[#2e2e30]/70 align-middle whitespace-nowrap">
                  {p.pickTime}
                </td>

                {/* TOP AREA */}
                <td className="py-3.5 pr-4 border-y border-[#2e2e30]/70 align-middle whitespace-nowrap">
                  <span className="text-[#f9671a] text-[10px] font-bold uppercase tracking-wider bg-[#f9671a]/10 px-2 py-0.5 rounded-md border border-[#f9671a]/20">
                    {p.topArea}
                  </span>
                </td>

                {/* AI MARKETING SUGGESTION */}
                <td className="py-3.5 pr-4 last:pr-4 border-y border-r border-[#2e2e30]/70 rounded-r-xl align-middle">
                  <div className="flex items-start gap-1.5 max-w-[220px]">
                    <Sparkles  size={20} className="text-[#f9671a] flex-shrink-0 mt-0.5 fill-primary" />
                    <span className="text-[10px] text-zinc-400 font-medium leading-relaxed">{p.aiSuggestion}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopSellingProducts;