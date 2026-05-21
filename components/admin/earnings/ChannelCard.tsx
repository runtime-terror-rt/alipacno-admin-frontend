import { ChannelCardProps } from "@/app/(admin)/admin/earnings/page";
import { ShoppingCart, Store, TrendingDown, TrendingUp, Truck } from "lucide-react";

export default function ChannelCard({ title, value, change, positive, meta, metaLabel, icon }: ChannelCardProps) {
  return (
    <div className="bg-[#1a1a1c] border border-[#2e2e30] rounded-2xl p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <p className="text-sm text-gray-100">{title}</p>
        <div className="w-9 h-9 rounded-xl bg-[#f9671a]/10 flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
      </div>
      <div className="flex items-end justify-between gap-2">
        <p className="text-2xl font-bold text-[#f9671a]">{value}</p>
        <p className="text-sm text-zinc-400 mb-0.5 whitespace-nowrap">
          <span className="font-semibold text-white">{meta}</span> {metaLabel}
        </p>
      </div>
      {title === "Shop Revenue" && (
        <p className="text-xs text-gray-100">500 Orders</p>
      )}
      <div className="flex items-center gap-1.5 mt-auto pt-2 ">
        {positive ? <TrendingUp size={12} className="text-green-400" /> : <TrendingDown size={12} className="text-red-400" />}
        <span className={`text-xs font-semibold ${positive ? "text-green-400" : "text-red-400"}`}>{change}</span>
        <span className="text-xs text-zinc-500">| vs last period</span>
      </div>
    </div>
  );
}