export default function BarChart({
  branches,
  thisPeriod,
  lastPeriod,
}: {
  branches: string[];
  thisPeriod: number[];
  lastPeriod: number[];
}) {
  const maxValue = 8500;
  const barWidth = 38;
  const gap = 28;

  return (
    <div className="relative h-[280px]">
      <svg width="100%" height="260" viewBox="0 0 480 260">
        {[0, 2000, 4000, 6000, 8000].map((val, i) => {
          const y = 220 - (val / maxValue) * 200;
          return (
            <g key={i}>
              <line x1="45" y1={y} x2="460" y2={y} stroke="#343436" strokeWidth="1" />
              <text x="35" y={y + 4} textAnchor="end" fill="#626262" fontSize="11">
                £{val / 1000}k
              </text>
            </g>
          );
        })}

        {branches.map((branch, i) => {
          const x = 70 + i * (barWidth * 2 + gap);
          const thisHeight = (thisPeriod[i] / maxValue) * 200;
          const lastHeight = (lastPeriod[i] / maxValue) * 200;

          return (
            <g key={i}>
              {/* Last Period (Gray) */}
              <rect
                x={x + 4}
                y={220 - lastHeight}
                width={barWidth}
                height={lastHeight}
                rx="4"
                fill="#3D3D3D"
              />
              {/* This Period (Orange) */}
              <rect
                x={x + barWidth + 8}
                y={220 - thisHeight}
                width={barWidth}
                height={thisHeight}
                rx="4"
                fill="#f9671a"
              />

              <text
                x={x + barWidth + 4}
                y="245"
                textAnchor="middle"
                fill="#a1a1aa"
                fontSize="12"
              >
                {branch}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="flex items-center gap-6 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#f9671a] rounded-full" />
          <span className="text-zinc-300">This Period</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-zinc-600 rounded-full" />
          <span className="text-zinc-300">Last Period</span>
        </div>
      </div>
    </div>
  );
}