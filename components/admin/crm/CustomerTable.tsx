"use client";

import { Customer } from "@/app/(admin)/admin/crm/page";
import Button from "../ui/Button";
import { useRouter } from "next/navigation";


function TagBadge({ tag }: { tag: "Regular" | "VIP" | "Loyalty" }) {
  const map: Record<string, string> = {
    Regular: "bg-[#00A70633] text-[#0E8013] border-[#00A706]",
    VIP: "bg-[#f9671a]/15 text-[#f9671a] border-[#f9671a]/30",
    Loyalty: "bg-purple-500/15 text-purple-400 border-purple-500/30",
  };
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${map[tag]}`}>{tag}</span>;
}

export default function CustomerTable({ rows }: { rows: Customer[] }) {
  const router = useRouter();
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="bg-[#3D3D3A] border-b border-zinc-800/80 [&>th:first-child]:rounded-tl-xl [&>th:last-child]:rounded-tr-xl"

          >
            {["NAME", "CALLER NUMBER", "LAST VISIT", "TOTAL ORDERS", "TOTAL VISITS", "TOTAL SPEND", "TAGS", "ACTION"].map((h) => (
              <th key={h} className="text-left py-2 pl-1 text-white font-medium pb-2.5 pr-4 whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#2e2e30]/60">
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-zinc-800/20 transition-colors">
              <td className="py-3 pr-4">
                <div className="flex items-center gap-2">
                  <span className="text-white pl-3 font-medium whitespace-nowrap">{row.name}</span>
                </div>
              </td>
              <td className="py-3 pr-4 text-zinc-300 whitespace-nowrap">{row.caller}</td>
              <td className="py-3 pr-4 text-zinc-400">{row.lastVisit}</td>
              <td className="py-3 pr-4 text-zinc-300">{row.totalOrders}</td>
              <td className="py-3 pr-4 text-zinc-300">{row.totalVisits}</td>
              <td className="py-3 pr-4 text-white font-medium">{row.totalSpend}</td>
              <td className="py-3 pr-4">
                <div className="flex items-center gap-1 flex-wrap">
                  {row.tags.map((t) => <TagBadge key={t} tag={t} />)}
                </div>
              </td>
              <td className="py-3"><Button onClick={() => router.push('/admin/call-logs/2')} variant="table" >View Order</Button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}