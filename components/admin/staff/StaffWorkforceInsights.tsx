import React from 'react';
import { 
  Store, 
  Clock, 
  Star, 
  Hourglass, 
  ArrowUp, 
  ArrowDown 
} from "lucide-react";

// Highly accurate wave sparkline matching the uploaded design
function CustomSparkline({ color = "#f9671a" }: { color?: string }) {
  const gradientId = `gradient-${color.replace("#", "")}`;
  return (
    <div className="w-28 h-12 flex-shrink-0 opacity-80 self-end -mb-1">
      <svg viewBox="0 0 120 40" className="w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.25" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Closed area path for background gradient fill */}
        <path
          d="M 0 40 Q 15 35, 25 22 T 50 20 T 75 25 T 95 10 T 120 2 Z L 120 40 Z"
          fill={`url(#${gradientId})`}
        />
        {/* Main continuous wave line path */}
        <path
          d="M 0 40 Q 15 35, 25 22 T 50 20 T 75 25 T 95 10 T 120 2"
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

// Complete Dashboard Data Array
const INSIGHTS_DATA = [
  {
    type: "progress",
    label: "Most Active Branch",
    value: "Eltham (EL01)",
    icon: <Store size={14} className="text-[#f9671a]" />,
    employeeCount: "642 Employee",
    percentage: "34.8%",
  },
  {
    type: "sparkline",
    label: "Attendance Rate",
    value: "92.4%",
    icon: <Clock size={14} className="text-[#f9671a]" />,
    change: "6.3%",
    isPositive: false, // Green down arrow is favorable here
    subtext: "vs last week",
    color: "#f9671a",
  },
  {
    type: "profile",
    label: "Best Employee This Week",
    value: "Brooklyn Simmons",
    icon: <Star size={14} className="text-[#f9671a]" />,
    subtext: "98% Performance",
    rating: "4.9",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100", // Replace with your path
  },
  {
    type: "sparkline",
    label: "Late Arrivals Today",
    value: "7 Employees",
    icon: <Clock size={14} className="text-[#f9671a]" />,
    change: "6.3%",
    isPositive: false, // Red down arrow
    subtext: "vs yesterday",
    color: "#ef4444", // Red design theme variation
  },
  {
    type: "sparkline",
    label: "Overtime Hours",
    value: "28.6 hrs",
    icon: <Hourglass size={14} className="text-[#f9671a]" />,
    change: "6.3%",
    isPositive: true, // Green up arrow
    color: "#f9671a",
  },
];

export default function StaffWorkforceInsights() {
  return (
    <div className="bg-[#18181a] border border-[#2e2e30] rounded-2xl p-5 flex flex-col gap-3.5 max-w-sm w-full select-none">
      <h2 className="text-lg font-bold text-zinc-100 tracking-wide px-1 mb-1">
        Workforce Insights
      </h2>

      <div className="flex flex-col gap-3">
        {INSIGHTS_DATA.map((card, index) => (
          <div
            key={index}
            className="border border-[#262629] bg-[#1c1c1e] rounded-xl p-4 flex flex-col justify-between min-h-[96px]"
          >
            {/* Row 1: Common Top Section (Icon & Label) */}
            <div className="flex items-center gap-2">
              <div className="text-[#f9671a]">{card.icon}</div>
              <span className="text-[12px] font-semibold text-zinc-200 tracking-wide">
                {card.label}
              </span>
            </div>

            {/* Row 2: Conditioned Bottom Component Structures */}
            {card.type === "progress" && (
              <div className="flex flex-col mt-2.5 w-full">
                <span className="text-sm font-bold text-zinc-100">{card.value}</span>
                <div className="flex items-center justify-between text-[11px] text-zinc-500 font-medium mt-1 mb-1.5">
                  <span>{card.employeeCount}</span>
                  <span>{card.percentage}</span>
                </div>
                <div className="w-full h-[3px] rounded-full bg-[#29292b]">
                  <div 
                    className="h-full rounded-full bg-[#f9671a]" 
                    style={{ width: card.percentage }} 
                  />
                </div>
              </div>
            )}

            {card.type === "sparkline" && (
              <div className="flex items-end justify-between mt-2">
                <div className="flex flex-col">
                  <span className="text-base font-bold text-zinc-100 tracking-tight">
                    {card.value}
                  </span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className={`flex items-center text-[11px] font-bold ${
                      card.color === "#ef4444" ? "text-red-500" : "text-emerald-500"
                    }`}>
                      {card.isPositive ? (
                        <ArrowUp className="w-3 h-3 mr-0.5 stroke-[3]" />
                      ) : (
                        <ArrowDown className="w-3 h-3 mr-0.5 stroke-[3]" />
                      )}
                      {card.change}
                    </span>
                    {card.subtext && (
                      <span className="text-[10px] text-zinc-500 font-medium">
                        {card.subtext}
                      </span>
                    )}
                  </div>
                </div>
                <CustomSparkline color={card.color} />
              </div>
            )}

            {card.type === "profile" && (
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-2.5">
                  <img
                    src={card.avatar}
                    alt={card.value}
                    className="w-9 h-9 rounded-full object-cover border border-zinc-700"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-zinc-200">
                      {card.value}
                    </span>
                    <span className="text-[10px] text-zinc-500 font-medium mt-0.5">
                      {card.subtext}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-emerald-950/20 px-1.5 py-0.5 rounded-md">
                  <span className="text-xs font-bold text-emerald-500">
                    {card.rating}
                  </span>
                  <Star className="w-3 h-3 fill-emerald-500 text-emerald-500" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Action Footer Call to Action Button */}
      <button className="w-full mt-2 py-3 rounded-xl border border-[#d35400]/40 bg-[#e67e22]/10 text-[#f9671a] hover:bg-[#e67e22]/15 text-xs font-semibold tracking-wide transition-all duration-200">
        View All Insights
      </button>
    </div>
  );
}