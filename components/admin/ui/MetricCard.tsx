import { BarChart2, TrendingDown, TrendingUp } from "lucide-react";
import Image from "next/image";

export interface IMetricCard {
  label: string;
  value: string;
  change: string;
  positive: boolean;
}

function TrendBadge({ change, positive }: { change: string; positive: boolean }) {
  return (
    <div className="flex items-center gap-2 ">
      <div
        className={`flex items-center gap-1 px-2 py-1 rounded-md `}
      >
        {positive ? (
          <TrendingUp size={28} className={`p-1 rounded-lg text-green-400 ${
          positive ? "bg-green-500/10" : "bg-red-500/10"
        }`} />
        ) : (
          <TrendingDown size={16} className="text-red-400" />
        )}
        <span
          className={`text-[13px] font-semibold ${
            positive ? "text-green-400" : "text-red-400"
          }`}
        >
          {change}
        </span>
      </div>
      <div className="w-px h-5 bg-[#3d3d3d]" />
      <span className="text-[#626262] text-[12px]">vs last period</span>
    </div>
  );
}


export default function MetricCard({ card }: { card: IMetricCard
 }) {
  return (
    <div className="bg-[#26262680] rounded-3xl border-2 border-[#343436] p-4 flex flex-col gap-4 relative overflow-hidden">
      {/* Background decorative arc */}
      {/* <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full border-[20px] border-[#f9671a]/5" /> */}
      <div className="absolute  right-0 top-0 w-40 h-40 " >
          <Image src="/admin/common/stats.svg" alt="Decorative arc" layout="fill" objectFit="cover" className="" />
      </div>


      {/* Icon */}
      <div className="flex items-center justify-between">
        <div className="w-6 h-6 text-[#f9671a]">
          <BarChart2 size={20} />
        </div>
      </div>

      {/* Value */}
      <div className="flex flex-col gap-1">
        <p className="text-[#626262] text-[11px] tracking-widest uppercase">
          {card.label}
        </p>
        <p className="text-sm font-bold text-primary leading-none">
          {card.value}
        </p>
      </div>

      {/* Trend badge */}
      <TrendBadge change={card.change} positive={card.positive} />
    </div>
  );
}