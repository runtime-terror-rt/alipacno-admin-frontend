import { BarChart2, TrendingDown, TrendingUp, MonitorPlay } from "lucide-react";
import Image from "next/image";

export interface IStatCard {
  label: string;
  value: string;
  change: string;
  positive: boolean;
}

function TrendBadge({ change, positive }: { change: string; positive: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1 px-2 py-1 rounded-md">
        {positive ? (
          <TrendingUp size={28} className={`p-1 rounded-lg text-green-400 bg-green-500/10`} />
        ) : (
          <TrendingDown size={16} className="text-red-400" />
        )}
        <span className={`text-[13px] font-semibold ${positive ? "text-green-400" : "text-red-400"}`}>
          +{change}
        </span>
      </div>
      <div className="w-px h-5 bg-[#3d3d3d]" />
      <span className="text-[#626262] text-[12px]">vs last week</span>
    </div>
  );
}

export default function SignageStatCard({ card }: { card: IStatCard }) {
  return (
    <div className="bg-[#1E1E20] rounded-3xl border-2 border-[#343436] p-4 flex flex-col gap-4 relative overflow-hidden h-full">
      {/* Background decorative arc */}
      <div className="absolute right-0 top-0 w-40 h-40">
        <Image src="/admin/common/stats.svg" alt="Decorative arc" layout="fill" objectFit="cover" />
      </div>

      {/* Icon */}
      <div className="flex items-center justify-between relative z-10">
        <div className="w-6 h-6 text-[#f9671a]">
          {card.label.includes("Screen") ? (
            <MonitorPlay size={20} />
          ) : (
            <BarChart2 size={20} />
          )}
        </div>
      </div>

      {/* Value */}
      <div className="flex flex-col gap-1 relative z-10 mt-auto">
        <p className="text-white text-xs font-bold">
          {card.label}
        </p>
        <p className="text-xl font-bold text-orange-500 leading-none mt-1 mb-2">
          {card.value}
        </p>
      </div>

      {/* Trend badge */}
      <div className="relative z-10">
        <TrendBadge change={card.change} positive={card.positive} />
      </div>
    </div>
  );
}
