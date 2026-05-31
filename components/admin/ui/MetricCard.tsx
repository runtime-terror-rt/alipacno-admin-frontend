import {
  ChartNoAxesColumnIncreasing,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import React from "react";
export interface IMetricCard {
  label: string;
  value: string;
  change: string;
  positive: boolean;
  note?: string;
  icon?: React.ReactNode;
}

function TrendBadge({
  change,
  positive,
  note,
}: {
  change: string;
  positive: boolean;
  note?: string;
}) {
  return (
    <div className="flex items-center gap-2  border border-[#3D3D3DAA] w-fit p-2 rounded-lg ">
      <div className={`flex items-center gap-1 px-2 py-1 rounded-md  `}>
        {positive ? (
          <TrendingUp
            size={28}
            className={`p-1 rounded-lg text-[#0E8013] font-bold ${
              positive ? "bg-green-500/10" : "bg-red-500/10"
            }`}
          />
        ) : (
          <TrendingDown size={16} className="text-red-400 font-bold" />
        )}
        <span
          className={`text-[13px] font-semibold ${
            positive ? "text-[#00A706]" : "text-red-400"
          }`}
        >
          {change}
        </span>
      </div>
      <div className="w-[2px] h-6 bg-[#3d3d3d]" />
      <span className="text-[#626262] text-[12px]">
        {note ? note : "vs last period"}
      </span>
    </div>
  );
}

export default function MetricCard({
  iconBorder = true,
  card,
}: {
  iconBorder?: boolean;
  card: IMetricCard;
}) {
  return (
    <div className="bg-[#1E1E20] rounded-2xl border border-[#2e2e30] p-4 flex flex-col gap-4 relative overflow-hidden">
      {/* Background decorative arc */}
      {/* <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full border-[20px] border-[#f9671a]/5" /> */}
      <div className="absolute  right-0 top-0 w-40 h-40 ">
        <Image
          src="/admin/common/stats.svg"
          alt="Decorative arc"
          layout="fill"
          objectFit="cover"
          className=""
        />
      </div>

      {/* Icon */}
      <div className="flex items-center justify-between">
        <div
          className={`w-9 h-9 rounded-md text-[#f9671a] bg-[#1E1E20] p-2 flex items-cener  ${iconBorder ? "border border-[#FFFFFF1A]" : ""} `}
        >
          {card.icon ? card.icon : <ChartNoAxesColumnIncreasing size={20} />}
        </div>
      </div>

      {/* Value */}
      <div className="flex flex-col gap-1">
        <p className="text-gray-100 text-sm font-bold tracking-widest uppercase">
          {card.label}
        </p>
        <p className="text-sm font-bold text-[#A4542A] leading-none">
          {card.value}
        </p>
      </div>

      {/* Trend badge */}
      <TrendBadge
        change={card.change}
        positive={card.positive}
        note={card.note}
      />
    </div>
  );
}
