function RevenueTrendChart() {
  // Simple SVG line chart
  const data = [
    { x: 0, y: 60 },
    { x: 60, y: 40 },
    { x: 120, y: 55 },
    { x: 180, y: 30 },
    { x: 240, y: 50 },
    { x: 300, y: 35 },
    { x: 360, y: 45 },
  ];
  const pts = data.map((d) => `${d.x},${d.y}`).join(" ");
  const fillPts = `0,80 ${pts} 360,80`;
  return (
    <svg viewBox="0 0 360 80" className="w-full h-20" preserveAspectRatio="none">
      <defs>
        <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E8833A" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#E8833A" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon fill="url(#revGrad)" points={fillPts} />
      <polyline fill="none" stroke="#E8833A" strokeWidth="2" points={pts} strokeLinecap="round" strokeLinejoin="round" />
      {data.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r="3" fill="#E8833A" />
      ))}
    </svg>
  );
}
const OrdersRevenueTrend = () => {
  return (
    <div className="bg-[#1C1C1E] rounded-xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-white">Revenue Trend</h3>
                  <span className="text-xs text-zinc-500">(Last 7 Days)</span>
                </div>
                <div className="flex justify-between text-xs text-zinc-500 mb-1">
                  {["£10k", "£7.5k", "£5k", "£2.5k", "0"].map((l) => (
                    <span key={l}>{l}</span>
                  ))}
                </div>
                <RevenueTrendChart />
                <div className="flex justify-between text-xs text-zinc-500 mt-1">
                  {["Apr 28", "Apr 29", "Apr 30", "May 1", "May 2", "May 3", "May 4"].map((d) => (
                    <span key={d}>{d}</span>
                  ))}
                </div>
              </div>
  )
}

export default OrdersRevenueTrend;
