import React from 'react';
import { 
  BarChart3, 
  ShoppingCart, 
  AlertTriangle, 
  Zap, 
  Star, 
  Trash2, 
  TrendingUp,
  ArrowUp,
  ArrowDown
} from "lucide-react";

interface AlertRow {
  icon: React.ReactNode;
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  color: string;
  isProfileCard?: boolean;
  subtext?: string;
}

// A highly accurate smooth bezier curve sparkline wave to match the theme
function CustomSparkline({ color = "#f9671a" }: { color?: string }) {
  const gradientId = `gradient-spark-${color.replace("#", "")}`;
  return (
    <div className="w-20 h-9 flex-shrink-0 opacity-80 self-end -mb-0.5">
      <svg viewBox="0 0 100 40" className="w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.25" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M 0 35 Q 15 32, 25 18 T 50 22 T 75 14 T 100 2 L 100 40 L 0 40 Z"
          fill={`url(#${gradientId})`}
        />
        <path
          d="M 0 35 Q 15 32, 25 18 T 50 22 T 75 14 T 100 2"
          fill="none"
          stroke={color}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

const ALERTS: AlertRow[] = [
  { icon: <BarChart3 size={14} />, label: "Stock Value", value: "18,650", change: "6.3%", isPositive: false, color: "#f9671a" },
  { icon: <ShoppingCart size={14} />, label: "Inventory Turnover", value: "2.8x", change: "6.3%", isPositive: true, color: "#2ecc71" },
  { icon: <AlertTriangle size={14} />, label: "Low Stock Alerts", value: "12 Items", change: "6.3%", isPositive: false, color: "#f1c40f" },
  { icon: <AlertTriangle size={14} />, label: "Out of Stock", value: "5 Items", change: "6.3%", isPositive: false, color: "#ef4444" },
  { icon: <Zap size={14} />, label: "Avg. Daily Consumption", value: "£620", change: "6.3%", isPositive: true, color: "#f9671a" },
  { 
    icon: <Star size={14} />, 
    label: "Top Selling Products", 
    value: "Beef Patty", 
    subtext: "450 units",
    change: "6.3%", 
    isPositive: true, 
    color: "#2ecc71", 
    isProfileCard: true 
  },
  { icon: <Trash2 size={14} />, label: "Damaged / Wasted Items", value: "415 Items", change: "6.3%", isPositive: false, color: "#ef4444" },
  { icon: <TrendingUp size={14} />, label: "Sales from Stock", value: "2.8x", change: "6.3%", isPositive: true, color: "#2ecc71" },
];

export default function InventoryStockOverview() {
  return (
    <div className="bg-[#18181a] border border-[#2e2e30] rounded-2xl p-5 flex flex-col gap-3.5 max-w-sm w-full select-none">
      <h2 className="text-lg font-bold text-zinc-100 tracking-wide px-1 mb-1">
        Stock Alert Overview
      </h2>

      <div className="flex flex-col gap-2.5">
        {ALERTS.map((item, index) => (
          <div
            key={index}
            className="border border-[#262629] bg-[#1c1c1e] rounded-xl p-3.5 flex flex-col justify-between min-h-[92px] transition-all hover:border-zinc-800"
          >
            {/* Top Row: Icon and Metric Header Name */}
            <div className="flex items-center gap-2">
              <div style={{ color: item.color }}>{item.icon}</div>
              <span className="text-[12px] font-semibold text-zinc-200 tracking-wide">
                {item.label}
              </span>
            </div>

            {/* Bottom Row: Dynamic value mapping with custom graph alignments */}
            <div className="flex items-end justify-between mt-1.5">
              <div className="flex flex-col min-w-0">
                {item.isProfileCard ? (
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-zinc-100 truncate">
                      {item.value}
                    </span>
                    <span className="text-[10px] text-zinc-500 font-medium mt-0.5">
                      {item.subtext}
                    </span>
                  </div>
                ) : (
                  <span className="text-base font-bold text-zinc-100 tracking-tight">
                    {item.value}
                  </span>
                )}

                {/* Sub-context performance badge indicator */}
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span 
                    className="flex items-center text-[11px] font-bold"
                    style={{ color: item.isPositive ? "#2ecc71" : "#ef4444" }}
                  >
                    {item.isPositive ? (
                      <ArrowUp className="w-3 h-3 mr-0.5 stroke-[3]" />
                    ) : (
                      <ArrowDown className="w-3 h-3 mr-0.5 stroke-[3]" />
                    )}
                    {item.change}
                  </span>
                  <span className="text-[10px] text-zinc-500 font-medium">
                    vs {index < 2 ? "last week" : "yesterday"}
                  </span>
                </div>
              </div>

              {/* Injected contextual Sparkline segment */}
              <CustomSparkline color={item.color} />
            </div>
          </div>
        ))}
      </div>

      {/* Action CTA View Button Footer */}
      <button className="w-full mt-1.5 py-3 rounded-xl border border-[#d35400]/40 bg-[#e67e22]/10 text-[#f9671a] hover:bg-[#e67e22]/15 text-xs font-semibold tracking-wide transition-all duration-200">
        View All reports
      </button>
    </div>
  );
}