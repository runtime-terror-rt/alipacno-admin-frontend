"use client";

import { useRouter } from "next/navigation";
import Button from "../ui/Button";
import Pagination from "../ui/Pagination";

// ── Types ──────────────────────────────────────────────────────────────────
export type CallStatus = "Answered" | "Missed";

interface ConvertedOrder {
  time: string;
  number: string;
  customer: string;
  duration: string;
  order: string;
  orderType: string;
  status: "Completed";
  postcode: string;
}

const CONVERTED_ORDERS: ConvertedOrder[] = [
  { time: "08:42 PM", number: "+44 3050 244896", customer: "Sarah Mitchell", duration: "04:12", order: "#4569 (£300)", orderType: "Delivery", status: "Completed", postcode: "NW1 6XE" },
  { time: "08:42 PM", number: "+44 3050 244896", customer: "Sarah Mitchell", duration: "04:12", order: "#4569 (£300)", orderType: "Delivery", status: "Completed", postcode: "NW1 6XE" },
  { time: "08:42 PM", number: "+44 3050 244896", customer: "Sarah Mitchell", duration: "04:12", order: "#4569 (£300)", orderType: "Delivery", status: "Completed", postcode: "NW1 6XE" },
];

const ConvertedCallOrders = () => {
  const router = useRouter();

  return (
    <div className="bg-[#1a1a1c] border border-[#2e2e30] rounded-2xl p-5 space-y-4">
      {/* Header section */}
      <div className="flex items-center gap-3">
        <h2 className="text-sm font-semibold text-white">Converted Call Orders</h2>
      </div>

      {/* Styled Table Section */}
      <div className="w-full overflow-x-auto rounded-xl border border-zinc-800/80 bg-[#1e1e1e]/20">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[#3D3D3A] border-b border-zinc-800/80 [&>th:first-child]:rounded-tl-xl [&>th:last-child]:rounded-tr-xl">
              {["TIME", "CALL NUMBER", "CUSTOMER", "DURATION", "#ORDER", "ORDER TYPE", "STATUS", "POSTCODE", "ACTION"].map((h) => (
                <th
                  key={h}
                  className="text-left text-xs text-gray-100 font-semibold py-4 pr-4 first:pl-4 last:pr-4 whitespace-nowrap tracking-wider uppercase align-middle"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-800/60">
            {CONVERTED_ORDERS.map((row, i) => (
              <tr key={i} className="hover:bg-zinc-800/30 transition-colors">
                {/* TIME */}
                <td className="py-3.5 pr-4 pl-4 text-xs font-medium text-zinc-300 align-middle whitespace-nowrap">
                  {row.time}
                </td>

                {/* CALL NUMBER */}
                <td className="py-3.5 pr-4 text-xs font-medium text-zinc-300 align-middle whitespace-nowrap">
                  {row.number}
                </td>

                {/* CUSTOMER */}
                <td className="py-3.5 pr-4 text-xs font-semibold text-white align-middle whitespace-nowrap">
                  {row.customer}
                </td>

                {/* DURATION */}
                <td className="py-3.5 pr-4 text-xs font-medium text-zinc-300 align-middle whitespace-nowrap">
                  {row.duration}
                </td>

                {/* #ORDER */}
                <td className="py-3.5 pr-4 text-xs font-semibold text-green-400 align-middle whitespace-nowrap">
                  {row.order}
                </td>

                {/* ORDER TYPE */}
                <td className="py-3.5 pr-4 text-xs font-medium text-[#f9671a] align-middle whitespace-nowrap">
                  {row.orderType}
                </td>

                {/* STATUS */}
                <td className="py-3.5 pr-4 align-middle whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/15 text-green-400 border border-green-500/25">
                    {row.status}
                  </span>
                </td>

                {/* POSTCODE */}
                <td className="py-3.5 pr-4 text-xs font-medium text-zinc-300 align-middle whitespace-nowrap">
                  {row.postcode}
                </td>

                {/* ACTION */}
                <td className="py-3.5 pr-4 last:pr-4 align-middle text-right whitespace-nowrap">
                  <Button onClick={() => router.push('/admin/call-logs/2')} variant="table">
                    View Order
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination />
    </div>
  );
};

export default ConvertedCallOrders;