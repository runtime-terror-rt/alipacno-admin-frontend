"use client";

import { MoreVertical } from 'lucide-react';
import Image from 'next/image';
import { Order, OrderStatus } from './OrderReportPanel';

interface OrdersTableProps {
  ORDERS: Order[];
  selectedRows: number[];
  toggleRow: (index: number) => void;
}

// Status Config local context binding
const statusConfig: Record<OrderStatus, { label: string; className: string }> = {
  Completed: { label: "Completed", className: "bg-(--color-grant)/10 text-(--color-grant) border border-(--color-grant)/20" },
  Preparing: { label: "Preparing", className: "bg-(--color-brand)/10 text-(--color-brand) border border-(--color-brand)/20" },
  "On Delivery": { label: "On Delivery", className: "bg-blue-500/10 text-blue-400 border border-blue-500/20" },
  Cancelled: { label: "Cancel", className: "bg-red-500/10 text-red-400 border border-red-500/20" },
};

function StatusBadge({ status }: { status: OrderStatus }) {
  const cfg = statusConfig[status];
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${cfg.className}`}>
      {cfg.label}
    </span>
  );
}

const OrdersTable = ({ ORDERS, selectedRows, toggleRow }: OrdersTableProps) => {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-[#353535] bg-[#1e1e1e]/20 ">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-[#3D3D3A] border-b border-zinc-800/80 [&>th:first-child]:rounded-tl-xl [&>th:last-child]:rounded-tr-xl">
            {["ORDER ID", "CUSTOMER", "BRANCH", "ORDER TYPE", "AMOUNT", "PAYMENT", "STATUS", "DRIVER", "TIME", "ACTION"].map((h) => (
              <th 
                key={h} 
                className="text-left text-xs text-gray-100 font-semibold py-4 pr-4 first:pl-4 last:pr-4 whitespace-nowrap tracking-wider uppercase align-middle"
              >
                {h === "ORDER ID" ? (
                  <div className="flex items-center gap-2.5">
                    <input 
                      type="checkbox" 
                      className="rounded bg-zinc-700 border-zinc-600 text-(--color-brand) focus:ring-0 cursor-pointer" 
                      readOnly 
                    />
                    <span>{h}</span>
                  </div>
                ) : (
                  h
                )}
              </th>
            ))}
          </tr>
        </thead>
        
        <tbody className="divide-y divide-zinc-800/60">
          {ORDERS.map((order, i) => (
            <tr key={i} className="hover:bg-zinc-800/30 transition-colors">
              {/* ORDER ID */}
              <td className="py-3.5 pr-4 pl-4 align-middle">
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(i)}
                    onChange={() => toggleRow(i)}
                    className="rounded bg-gray-900 border-zinc-600 text-(--color-brand) focus:ring-0 cursor-pointer"
                  />
                  <span className="text-(--color-brand) text-xs font-semibold tracking-wide">{order.id}</span>
                </div>
              </td>

              {/* CUSTOMER */}
              <td className="py-3.5 pr-4 align-middle">
                <div className="flex items-center gap-3">
                  <div className="relative w-9 h-9 rounded-full overflow-hidden border border-zinc-800 bg-zinc-900 flex-shrink-0">
                    <Image 
                      src={order.image} 
                      alt={order.customer} 
                      fill
                      sizes="36px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white whitespace-nowrap">{order.customer}</p>
                    <p className="text-[11px] text-zinc-500 font-medium mt-0.5">{order.phone}</p>
                  </div>
                </div>
              </td>

              {/* BRANCH */}
              <td className="py-3.5 pr-4 text-xs font-medium text-zinc-300 align-middle whitespace-nowrap">
                {order.branch}
              </td>

              {/* ORDER TYPE */}
              <td className="py-3.5 pr-4 text-xs font-medium text-zinc-300 align-middle whitespace-nowrap">
                {order.orderType}
              </td>

              {/* AMOUNT */}
              <td className="py-3.5 pr-4 text-xs font-semibold text-white align-middle whitespace-nowrap">
                {order.amount}
              </td>

              {/* PAYMENT */}
              <td className="py-3.5 pr-4 align-middle whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-4 rounded-sm flex-shrink-0 ${order.payment === "Card" ? "bg-gradient-to-r from-zinc-600 to-zinc-500" : "bg-zinc-700"} flex items-center justify-center border border-zinc-600/30`}>
                    <div className="w-2.5 h-1.5 rounded-sm bg-zinc-400/40" />
                  </div>
                  <span className="text-xs font-medium text-zinc-300">{order.payment}</span>
                </div>
              </td>

              {/* STATUS */}
              <td className="py-3.5 pr-4 align-middle">
                <StatusBadge status={order.status} />
              </td>

              {/* DRIVER */}
              <td className="py-3.5 pr-4 align-middle">
                <div className="flex items-center gap-2.5">
                  <div className="relative w-7 h-7 rounded-full overflow-hidden border border-zinc-800 bg-zinc-900 flex-shrink-0">
                    <Image 
                      src={order.image} 
                      alt={order.driver} 
                      fill
                      sizes="28px"
                      className="object-cover"
                    />
                  </div>
                  <span className="text-xs font-medium text-zinc-300 whitespace-nowrap">{order.driver}</span>
                </div>
              </td>

              {/* TIME & DATE */}
              <td className="py-3.5 pr-4 align-middle whitespace-nowrap">
                <p className="text-xs font-medium text-zinc-300">{order.time}</p>
                <p className="text-[11px] text-zinc-500 font-medium mt-0.5">{order.date}</p>
              </td>

              {/* ACTION */}
              <td className="py-3.5 pr-4 last:pr-4 align-middle text-right">
                <button className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer inline-flex items-center justify-center">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;