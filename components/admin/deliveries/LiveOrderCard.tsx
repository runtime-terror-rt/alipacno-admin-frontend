"use client";

import { Clock, Eye, Navigation, Phone } from "lucide-react";
import { ILiveOrder, OrderStatus } from "./LiveOrdersSidebar";
import { useRouter } from "next/navigation";

function StatusBadge({ status }: { status: OrderStatus }) {
  const map: Record<OrderStatus, string> = {
    "Live Order": "bg-green-500/15 text-green-400 border-green-500/30",
    "On Delivery": "bg-blue-500/15 text-blue-400 border-blue-500/30",
    "Ready": "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
    "Preparing": "bg-[#f9671a]/15 text-[#f9671a] border-[#f9671a]/30",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${map[status]}`}>
      {status}
    </span>
  );
}

export default function LiveOrderCard({ order }: { order: ILiveOrder }) {
  const router = useRouter()
  return (
    <div className="bg-[#1f1f21] border border-[#2e2e30] rounded-xl p-3 space-y-2 hover:border-[#f9671a]/30 transition-colors">
      <div className="flex items-center justify-between">
        <span className="text-[#f9671a] text-xs font-bold">{order.id}</span>
        <StatusBadge status={order.status} />
      </div>
      <div className="flex items-center gap-2">
        <div className="min-w-0">
          <p className="text-xs font-medium text-white truncate">{order.customer}</p>
          <p className="text-[10px] text-zinc-500 truncate">{order.address}</p>
        </div>
      </div>
      <div className="flex items-center justify-between text-[10px] text-zinc-400">
        <span className="flex items-center gap-1"><Clock size={9} /> {order.eta}</span>
        <span className="flex items-center gap-1"><Navigation size={9} /> {order.distance}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <button className="flex-1 py-1 rounded-lg bg-[#252527] text-zinc-400 text-[10px] hover:text-white transition-colors flex items-center justify-center gap-1">
          <Phone size={9} /> Call
        </button>
        <button onClick={() => router.push('/admin/call-logs/2')} className="flex-1 py-1 rounded-lg border border-[#f9671a]/50 text-[#f9671a] text-[10px] hover:bg-[#f9671a]/10 transition-colors flex items-center justify-center gap-1">
          <Eye size={9} /> View Order
        </button>
      </div>
    </div>
  );
}