import { CalendarDays, Download } from "lucide-react";

interface BranchRow {
  name: string;
  orders: number;
  sales: string;
  aov: string;
  targetPct: number;
  status: "PEAK PERFORMANCE" | "STABLE" | "HIGH AOV" | "CRITICAL LAG";
}

const branchRows: BranchRow[] = [
  {
    name: "West Branch (Flagship)",
    orders: 182,
    sales: "£5,420.00",
    aov: "£29.78",
    targetPct: 114,
    status: "PEAK PERFORMANCE",
  },
  {
    name: "West Branch (Flagship)",
    orders: 182,
    sales: "£5,420.00",
    aov: "£29.78",
    targetPct: 98,
    status: "STABLE",
  },
  {
    name: "West Branch (Flagship)",
    orders: 182,
    sales: "£5,420.00",
    aov: "£29.78",
    targetPct: 92,
    status: "STABLE",
  },
  {
    name: "West Branch (Flagship)",
    orders: 182,
    sales: "£5,420.00",
    aov: "£29.78",
    targetPct: 98,
    status: "HIGH AOV",
  },
  {
    name: "West Branch (Flagship)",
    orders: 182,
    sales: "£5,420.00",
    aov: "£29.78",
    targetPct: 98,
    status: "STABLE",
  },
  {
    name: "West Branch (Flagship)",
    orders: 182,
    sales: "£5,420.00",
    aov: "£29.78",
    targetPct: 74,
    status: "CRITICAL LAG",
  },
];

const statusConfig: Record<BranchRow["status"], { color: string; bg: string; dot: string }> = {
  "PEAK PERFORMANCE": { color: "text-[#00A706]", bg: "bg-emerald-500/10", dot: "bg-emerald-400" },
  STABLE: { color: "text-[#E6BDBB]", bg: "bg-[#E6BDBB1A]", dot: "bg-[#E6BDBB]" },
  "HIGH AOV": { color: "text-[#FB951D]", bg: "bg-orange-500/10", dot: "bg-orange-400" },
  "CRITICAL LAG": { color: "text-[#E31837]", bg: "bg-red-500/10", dot: "bg-red-400" },
};

function TableHeaderRow() {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <p className=" text-md ">
          Real-time unit economics per location
        </p>
        <p className="text-[#626262] font-semibold text-sm mt-1">
          Branch Performance Comparison
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-[#E6BDBB] text-sm">
          <CalendarDays size={16} />
          <span>TODAY: SEP 24</span>
        </div>

        <button className="flex items-center gap-2 bg-[#E31837] cursor-pointer hover:bg-red-700 text-white text-xs font-semibold px-5 py-2.5 rounded-md transition-colors">
          EXPORT CSV
        </button>
      </div>
    </div>
  );
}

function BranchTableRow({ row }: { row: BranchRow }) {
  const config = statusConfig[row.status];
  const isAboveTarget = row.targetPct >= 100;

  return (
   <section className="overflow-hidden ">
     <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_2fr] items-center py-4 border-b border-[#343436] last:border-b-0 ">
      {/* Branch Name */}
      <div>
        <span className="text-[#FCDBD9] text-[15px] font-medium">{row.name}</span>
      </div>

      {/* Orders */}
      <span className="text-white text-[15px] text-right font-medium">{row.orders}</span>

      {/* Sales */}
      <span className="text-white text-[15px] text-right font-medium">{row.sales}</span>

      {/* AOV */}
      <span className="text-[#626262] text-[15px] text-right">{row.aov}</span>

      {/* Target % */}
      <span
        className={`text-[15px] text-right font-semibold ${
          isAboveTarget ? "text-[#00A706]" : "text-[#626262]"
        }`}
      >
        {row.targetPct}%
      </span>

      {/* Status */}
      <div className="flex justify-end">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs  ${config.color} ${config.bg}`}
        >
          <span className={`inline-block w-2 h-2 rounded-full ${config.dot}`} />
          {row.status}
        </span>
      </div>
    </div>
   </section>
  );
}

export default function BranchPerformanceTable() {
  return (
    <div className="bg-[#1E1E20] border border-[#343436] rounded-2xl p-6 min-w-0">
      <TableHeaderRow />

      {/* Scroll Container */}
      <div className="w-full overflow-x-auto">
        <div className="min-w-[1000px] ">
          {/* Table Header */}
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_2fr] py-3 bg-[#36363A] px-2 rounded-t-xl text-[#FFFFFF] text-sm tracking-widest uppercase border-b border-[#343436]">
            <span>BRANCH NAME</span>
            <span className="text-right">ORDERS</span>
            <span className="text-right">SALES</span>
            <span className="text-right">AOV</span>
            <span className="text-right">TARGET %</span>
            <span className="text-right">STATUS</span>
          </div>

          {/* Table Rows */}
          <div>
            {branchRows.map((row, i) => (
              <BranchTableRow key={i} row={row} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}