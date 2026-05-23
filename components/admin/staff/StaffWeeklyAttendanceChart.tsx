export default function StaffWeeklyAttendanceChart() {
  const vals = [95, 78, 88, 100, 82, 92, 86];
  const days = ["May 12","May 13","May 14","May 15","May 16","May 17","May 18"];
  const W = 460, H = 120, padL = 28, padB = 22;
  const maxVal = 100;

  const pts = vals.map((v, i) => {
    const x = padL + (i / (vals.length - 1)) * (W - padL - 8);
    const y = H - padB - (v / maxVal) * (H - padB - 10);
    return { x, y };
  });
  const polyline = pts.map((p) => `${p.x},${p.y}`).join(" ");
  const fillPath = `M ${pts[0].x},${H - padB} ` + pts.map((p) => `L ${p.x},${p.y}`).join(" ") + ` L ${pts[pts.length-1].x},${H - padB} Z`;
  const yTicks = [0, 25, 50, 75, 100];

  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 120 }}>
        <defs>
          <linearGradient id="attGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f9671a" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#f9671a" stopOpacity="0" />
          </linearGradient>
        </defs>
        {yTicks.map((v) => {
          const y = H - padB - (v / maxVal) * (H - padB - 10);
          return (
            <g key={v}>
              <line x1={padL - 4} y1={y} x2={W} y2={y} stroke="#2e2e30" strokeWidth={1} />
              <text x={padL - 6} y={y + 4} textAnchor="end" fill="#525252" fontSize={8}>{v}%</text>
            </g>
          );
        })}
        <path d={fillPath} fill="url(#attGrad)" />
        <polyline points={polyline} fill="none" stroke="#f9671a" strokeWidth={2.5}
          strokeLinejoin="round" strokeLinecap="round" />
        {pts.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={4} fill="#f9671a" stroke="#0f0f11" strokeWidth={2} />
        ))}
      </svg>
      <div className="flex justify-between mt-1" style={{ paddingLeft: 20 }}>
        {days.map((d) => (
          <span key={d} className="text-[9px] text-zinc-500">{d}</span>
        ))}
      </div>
    </div>
  );
}