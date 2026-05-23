export default function HourlySalesChart() {
  const times = ["9pm", "12pm", "3pm", "6pm", "9pm", "11pm"];
  const values = [0.3, 0.8, 1.8, 1.2, 3.5, 4.0];
  const maxVal = 5;
  const W = 580;
  const H = 200;
  const padL = 55;
  const padB = 20;

  const pts = values.map((v, i) => {
    const x = padL + (i / (values.length - 1)) * (W - padL - 10);
    const y = H - padB - (v / maxVal) * (H - padB - 15);
    return { x, y };
  });

  const polyline = pts.map((p) => `${p.x},${p.y}`).join(" ");
  const fillPath = `M ${pts[0].x},${H - padB} ` + pts.map((p) => `L ${p.x},${p.y}`).join(" ") + ` L ${pts[pts.length - 1].x},${H - padB} Z`;

  const yLabels = [0, 1000, 2000, 3000, 4000, 5000];

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 200 }}>
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f9671a" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#f9671a" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Y gridlines */}
        {yLabels.map((v) => {
          const y = H - padB - (v / (maxVal * 1000)) * (H - padB - 15);
          return (
            <g key={v}>
              <line x1={padL - 4} y1={y} x2={W - 8} y2={y} stroke="#2e2e30" strokeWidth={1} />
              <text x={padL - 8} y={y + 4} textAnchor="end" fill="#525252" fontSize={9}>£{v === 0 ? "0k" : `${v / 1000}k`}</text>
            </g>
          );
        })}

        {/* Area fill */}
        <path d={fillPath} fill="url(#lineGrad)" />

        {/* Line */}
        <polyline points={polyline} fill="none" stroke="#f9671a" strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />

        {/* Dots + tooltip label at peak */}
        {pts.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r={5} fill="#f9671a" stroke="#121214" strokeWidth={2} />
            {i === 4 && (
              <>
                <text x={p.x} y={p.y - 12} textAnchor="middle" fill="white" fontSize={10} fontWeight="bold">
                  £1800
                </text>
              </>
            )}
          </g>
        ))}
      </svg>

      {/* X axis labels */}
      <div className="flex justify-between mt-1" style={{ paddingLeft: 48, paddingRight: 8 }}>
        {times.map((t) => (
          <span key={t} className="text-[10px] text-zinc-500">{t}</span>
        ))}
      </div>
    </div>
  );
}