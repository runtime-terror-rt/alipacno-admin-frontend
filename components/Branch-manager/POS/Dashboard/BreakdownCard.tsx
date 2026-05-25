// components/common/BreakdownCard.tsx

import React from "react";

interface BreakdownItem {
  label: string;
  value: string;
  percentage: string;
  color: string;
}

interface BreakdownCardProps {
  title: string;
  subtitle: string;
  centerValue: string;
  centerLabel: string;
  footerLabel: string;
  footerValue: string;
  items: BreakdownItem[];
}

export default function BreakdownCard({
  title,
  subtitle,
  centerValue,
  centerLabel,
  footerLabel,
  footerValue,
  items,
}: BreakdownCardProps) {
  return (
    <div className="bg-[#252527] border border-[#2B2B2E] rounded-2xl p-5 relative overflow-hidden">
      {/* top */}
      <div className="mb-6">
        <h3 className="text-white text-[18px] font-bold">{title}</h3>
        <p className="text-[#6B6B6D] text-sm mt-1">{subtitle}</p>
      </div>

      {/* content */}
      <div className="flex items-center gap-6">
        {/* donut */}
        <div className="relative w-28 h-28 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-10 border-[#2F2F33]" />

          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `conic-gradient(
                #FF6B1A 0% 41%,
                #16A34A 41% 66%,
                #22C55E 66% 83%,
                #9333EA 83% 95%,
                #71717A 95% 100%
              )`,
              WebkitMask:
                "radial-gradient(circle at center, transparent 52%, black 53%)",
              mask: "radial-gradient(circle at center, transparent 52%, black 53%)",
            }}
          />

          <div className="z-10 text-center">
            <p className="text-white text-sm font-bold">{centerValue}</p>
            <p className="text-[#6B6B6D] text-xs">{centerLabel}</p>
          </div>
        </div>

        {/* list */}
        <div className="flex-1 flex flex-col gap-3">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: item.color }}
                />
                <span className="text-sm text-[#E4E4E7]">{item.label}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-white text-sm font-semibold">
                  {item.value}
                </span>

                <span className="text-[#8A8A8F] text-sm">
                  ({item.percentage})
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* footer */}
      <div className="mt-6 flex items-center gap-2 text-xs">
        <span className="text-[#6B6B6D]">{footerLabel}</span>

        <span className="text-[#FF6B1A] font-bold uppercase">
          {footerValue}
        </span>
      </div>
    </div>
  );
}
