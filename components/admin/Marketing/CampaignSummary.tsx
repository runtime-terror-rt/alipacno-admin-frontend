import React from 'react';
import { ArrowUp } from "lucide-react";

interface CampaignRow {
  label: string;
  value: string;
  percentage1: string;
  percentage2: string;
}

// Micro curve matching the mini campaign indicators
function MicroSparkline() {
  return (
    <div className="w-12 h-6 flex-shrink-0 opacity-60 mr-1.5 self-center">
      <svg viewBox="0 0 60 30" className="w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="campaignGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f9671a" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#f9671a" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M 0 28 Q 15 25, 25 18 T 45 14 T 60 2 L 60 30 L 0 30 Z"
          fill="url(#campaignGlow)"
        />
        <path
          d="M 0 28 Q 15 25, 25 18 T 45 14 T 60 2"
          fill="none"
          stroke="#f9671a"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

const CAMPAIGN_ROWS: CampaignRow[] = [
  { label: "Total Campaigns", value: "32", percentage1: "14%", percentage2: "14%" },
  { label: "Active Campaigns", value: "24", percentage1: "14%", percentage2: "14%" },
  { label: "Completed Campaigns", value: "18", percentage1: "14%", percentage2: "14%" },
  { label: "Completed Campaigns", value: "32", percentage1: "14%", percentage2: "14%" },
];

export default function CampaignSummary() {
  return (
    <div className="bg-[#18181a] border border-[#2e2e30] rounded-2xl p-4 flex flex-col w-full  select-none">
      <h3 className="text-sm font-bold text-zinc-100 tracking-wide mb-4">
        Campaign Summary
      </h3>

      <div className="flex flex-col">
        {CAMPAIGN_ROWS.map((row, i) => (
          <div 
            key={i} 
            className="flex items-center justify-between py-3.5 border-b border-[#2e2e30]/50 last:border-0 first:pt-1 last:pb-1"
          >
            {/* Left Column: Stacked Title & Value */}
            <div className="flex flex-col gap-1">
              <span className="text-[12px] font-medium text-zinc-500 tracking-wide">
                {row.label}
              </span>
              <span className="text-base font-bold text-zinc-100 tracking-tight">
                {row.value}
              </span>
            </div>

            {/* Right Column: Mini Sparkline + Double Performance Badges */}
            <div className="flex items-center gap-1">
              <MicroSparkline />
              
              <div className="flex flex-col gap-0.5 justify-center min-w-[44px]">
                <span className="text-[11px] font-bold text-emerald-500 flex items-center justify-end gap-0.5 leading-tight">
                  <ArrowUp className="w-2.5 h-2.5 stroke-[3.5]" />
                  {row.percentage1}
                </span>
                <span className="text-[11px] font-bold text-emerald-500 flex items-center justify-end gap-0.5 leading-tight">
                  <ArrowUp className="w-2.5 h-2.5 stroke-[3.5]" />
                  {row.percentage2}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}