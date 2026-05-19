export default function DeliveriesBarChart() {
  const data = [
    { name: "Ahmed Khan", val: 24 },
    { name: "City Star", val: 20 },
    { name: "Flex", val: 16 },
    { name: "City Star", val: 10 },
    { name: "City Star", val: 8 },
    { name: "City Star", val: 6 },
  ];
  const max = 24;
  return (
    <div className="space-y-2">
      {data.map((d, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="text-[10px] text-zinc-400 w-20 truncate flex-shrink-0">{d.name}</span>
          <div className="flex-1 h-3 bg-[#252527] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-[#f9671a] transition-all"
              style={{ width: `${(d.val / max) * 100}%` }}
            />
          </div>
          <span className="text-[10px] font-semibold text-white w-5 text-right">{d.val}</span>
        </div>
      ))}
    </div>
  );
}