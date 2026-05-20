export default function MarketingOverviewDonutChart() {
  const cx = 70, cy = 70, r = 52;
  const segments = [
    { pct: 59.2, color: "#f9671a" },
    { pct: 24.1, color: "#22c55e" },
    { pct: 16.7, color: "#3b82f6" },
  ];
  let cum = 0;
  const paths = segments.map((s) => {
    const start = (cum / 100) * 2 * Math.PI - Math.PI / 2;
    cum += s.pct;
    const end = (cum / 100) * 2 * Math.PI - Math.PI / 2;
    const x1 = cx + r * Math.cos(start), y1 = cy + r * Math.sin(start);
    const x2 = cx + r * Math.cos(end),   y2 = cy + r * Math.sin(end);
    const large = s.pct > 50 ? 1 : 0;
    return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`;
  });

  return (
    <div className="flex items-center gap-5">
      <svg viewBox="0 0 140 140" className="w-40 h-40 flex-shrink-0">
        {paths.map((d, i) => <path key={i} d={d} fill={segments[i].color} />)}
        <circle cx={cx} cy={cy} r={36} fill="#1a1a1c" />
        <text x={cx} y={cy - 5} textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">45.9k</text>
        <text x={cx} y={cy + 10} textAnchor="middle" fill="#71717a" fontSize="8">Reached</text>
      </svg>
      <div className="space-y-4 border-l border-zinc-400 pl-4 ">
        {[
          { label: "SMS",       value: "29.5k (59.2%)", color: "bg-[#f9671a]" },
          { label: "Email",     value: "11.2k (24.1%)", color: "bg-green-500" },
          { label: "Campaigns", value: "7.6k (4.1%)",   color: "bg-blue-500" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <div className={`w-2.5 h-2.5 rounded-full ${item.color} flex-shrink-0`} />
            <span className="text-xs text-zinc-400">{item.label}</span>
            <span className="text-xs font-semibold text-white">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}