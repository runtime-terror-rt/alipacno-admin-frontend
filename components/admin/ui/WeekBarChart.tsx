"use client";

import { useState } from "react";

export default function WeekBarChart() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const lastWeek = [3.5, 4.2, 3.0, 5.5, 4.8, 2.8, 1.5];
  const currentWeek = [2.5, 6.5, 4.0, 8.5, 3.5, 5.0, 2.0];
  const maxVal = 10;
  const W = 580;
  const H = 240;
  const barW = 14;
  const gap = 6;
  const groupW = barW * 2 + gap;
  const groupGap = (W - 40) / days.length;

  const [tooltip, setTooltip] = useState<{ x: number; y: number; day: string; lw: number; cw: number } | null>(null);

  return (
    <div className="relative">
      {/* Legend */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-zinc-500" />
          <span className="text-xs text-zinc-400">Last Week</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#f9671a]" />
          <span className="text-xs text-zinc-400">Current Period</span>
        </div>
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        style={{ height: 200 }}
        onMouseLeave={() => setTooltip(null)}
      >
        {/* Y-axis gridlines */}
        {[0, 2.5, 5, 7.5, 10].map((v) => {
          const y = H - 20 - ((v / maxVal) * (H - 30));
          return (
            <g key={v}>
              <line x1={38} y1={y} x2={W} y2={y} stroke="#2e2e30" strokeWidth={1} />
              <text x={32} y={y + 4} textAnchor="end" fill="#525252" fontSize={9}>£{v}k</text>
            </g>
          );
        })}

        {/* Bars */}
        {days.map((day, i) => {
          const baseX = 42 + i * groupGap;
          const lwH = (lastWeek[i] / maxVal) * (H - 30);
          const cwH = (currentWeek[i] / maxVal) * (H - 30);
          const lwY = H - 20 - lwH;
          const cwY = H - 20 - cwH;

          return (
            <g key={day}>
              {/* last week bar */}
              <rect
                x={baseX}
                y={lwY}
                width={barW}
                height={lwH}
                rx={3}
                fill="#ffffff"
                onMouseEnter={() => setTooltip({ x: baseX + barW, y: lwY - 10, day, lw: lastWeek[i], cw: currentWeek[i] })}
              />
              {/* current week bar */}
              <rect
                x={baseX + barW + gap}
                y={cwY}
                width={barW}
                height={cwH}
                rx={3}
                fill="#f9671a"
                onMouseEnter={() => setTooltip({ x: baseX + barW, y: Math.min(lwY, cwY) - 10, day, lw: lastWeek[i], cw: currentWeek[i] })}
              />
              {/* X label */}
              <text x={baseX + barW + gap / 2} y={H - 4} textAnchor="middle" fill="#525252" fontSize={9}>{day}</text>
            </g>
          );
        })}
      </svg>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="absolute pointer-events-none bg-[#252527] border border-[#3e3e40] rounded-xl p-3 text-xs shadow-xl z-10"
          style={{ left: tooltip.x - 10, top: tooltip.y - 60 }}
        >
          <p className="text-zinc-400 mb-1 font-medium">12 May, 2026</p>
          <p className="text-white">TW: £{tooltip.cw}k | LW: £{tooltip.lw}k</p>
          <p className="text-green-400 mt-1">↗ +30% growth</p>
        </div>
      )}
    </div>
  );
}