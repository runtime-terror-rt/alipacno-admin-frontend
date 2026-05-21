import { BranchData } from "../dashboard/ChartsRow";

export default function LineChart({ data, dates }: { data: BranchData[]; dates: string[] }) {
  const maxValue = 8.5;
  const height = 240;
  const width = 520;

  return (
    <div className="relative">
      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
        {/* Horizontal grid lines */}
        {[0, 2, 4, 6, 8].map((val) => {
          const y = height - (val / maxValue) * height;
          return (
            <g key={val}>
              <line
                x1="40"
                y1={y}
                x2={width}
                y2={y}
                stroke="#343436"
                strokeWidth="1"
              />
              <text x="28" y={y + 4} textAnchor="end" fill="#626262" fontSize="11">
                £{val}k
              </text>
            </g>
          );
        })}

        {/* Lines */}
        {data.map((branch, idx) => {
          const points = branch.values
            .map((val, i) => {
              const x = 50 + (i / (dates.length - 1)) * (width - 70);
              const y = height - (val / maxValue) * height;
              return `${x},${y}`;
            })
            .join(" ");

          return (
            <polyline
              key={idx}
              points={points}
              fill="none"
              stroke={branch.color}
              strokeWidth="3"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          );
        })}

        {/* Dots */}
        {data.map((branch, bIdx) =>
          branch.values.map((val, i) => {
            const x = 50 + (i / (dates.length - 1)) * (width - 70);
            const y = height - (val / maxValue) * height;
            return (
              <circle
                key={`${bIdx}-${i}`}
                cx={x}
                cy={y}
                r="8"
                fill={branch.color}
                stroke="#121214"
                strokeWidth="2"
              />
            );
          })
        )}
      </svg>

      {/* X-axis labels */}
      <div className="flex justify-between mt-2 px-12 text-[11px] text-[#626262]">
        {dates.map((date, i) => (
          <div key={i} className="text-center w-0">{date}</div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap  gap-x-6 gap-y-2 mt-6 text-sm">
        {data.map((branch) => (
          <div key={branch.name} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: branch.color }} />
            <span className="text-zinc-300 text-sm">{branch.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}