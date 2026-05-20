import React from 'react'

function DonutChart() {
  // Segments: Completed 88.2%, Pending 6.1%, On Delivery 4.1%, Cancelled 1.6%
  const segments = [
    { pct: 88.2, color: "#22c55e" },
    { pct: 6.1, color: "#E8833A" },
    { pct: 4.1, color: "#3b82f6" },
    { pct: 1.6, color: "#ef4444" },
  ];
  const r = 60;
  const cx = 80;
  const cy = 80;
  let cumulative = 0;
  const paths = segments.map((seg) => {
    const start = (cumulative / 100) * 2 * Math.PI - Math.PI / 2;
    cumulative += seg.pct;
    const end = (cumulative / 100) * 2 * Math.PI - Math.PI / 2;
    const x1 = cx + r * Math.cos(start);
    const y1 = cy + r * Math.sin(start);
    const x2 = cx + r * Math.cos(end);
    const y2 = cy + r * Math.sin(end);
    const largeArc = seg.pct > 50 ? 1 : 0;
    return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;
  });
  return (
    <svg viewBox="0 0 160 160" className="w-36 h-36 flex-shrink-0">
      {paths.map((d, i) => (
        <path key={i} d={d} fill={segments[i].color} />
      ))}
      <circle cx={cx} cy={cy} r={38} fill="#1C1C1E" />
      <text x={cx} y={cy - 6} textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">1,842</text>
      <text x={cx} y={cy + 10} textAnchor="middle" fill="#71717a" fontSize="7">Total Orders</text>
    </svg>
  );
}

const OrderStatusDonut = () => {
  return (
      <div className="bg-[#1C1C1E] rounded-xl p-5">
                <h3 className="text-sm font-semibold text-white mb-4">Order Status Distribution</h3>
                <div className="flex items-center gap-5">
                  <DonutChart />
                  <div className="space-y-2 flex-1">
                    {[
                      { label: "Completed", count: "1,624", pct: "88.2%", color: "bg-green-500" },
                      { label: "Pending / Preparing", count: "112", pct: "6.1%", color: "bg-[#E8833A]" },
                      { label: "On Delivery", count: "76", pct: "4.1%", color: "bg-blue-500" },
                      { label: "Cancelled", count: "30", pct: "1.6%", color: "bg-red-500" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${item.color} flex-shrink-0`} />
                        <span className="text-xs text-zinc-400 flex-1">{item.label}</span>
                        <span className="text-xs font-semibold text-white">{item.count}</span>
                        <span className="text-xs text-zinc-500 w-12 text-right">({item.pct})</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
  )
}

export default OrderStatusDonut;
